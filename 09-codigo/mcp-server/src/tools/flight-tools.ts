import { z } from 'zod';
import { FlightStateMachine, FlightStage } from '../domain/flight-state-machine.js';
import { AirspaceLimiter, DEFAULT_AIRSPACE_CONFIG } from '../domain/airspace-limiter.js';

export const FlightSchemas = {
  criarRascunho: z.object({
    nome: z.string().min(2, 'Nome do voo muito curto'),
    categoria: z.enum(['profissional', 'pessoal']).default('profissional'),
    motivo: z.string().optional(),
    prazo: z.string().optional(),
  }),

  atualizarPlanoDeVoo: z.object({
    vooId: z.string().uuid(),
    destino: z.string().min(5, 'Destino precisa ser verificável'),
    motivo: z.string().optional(),
    categoria: z.enum(['profissional', 'pessoal']).optional(),
    prazo: z.string().optional(),
  }),

  mudarEstagio: z.object({
    vooId: z.string().uuid(),
    estagioAtual: z.string() as z.ZodType<FlightStage>,
    novoEstagio: z.string() as z.ZodType<FlightStage>,
    categoria: z.enum(['profissional', 'pessoal']),
    activeFlightsCount: z.number().default(0),
    hasVerifiedDestination: z.boolean().default(true),
    hasFirstWaypoint: z.boolean().default(true),
    waypointsCompletionPercentage: z.number().optional(),
    daysRemaining: z.number().optional(),
  }),

  criarVooCurto: z.object({
    nome: z.string(),
    minutos: z.number().max(120).default(30),
    todayShortFlightsCount: z.number().default(0),
  }),
};

export class FlightToolsHandler {
  public static handleCriarRascunho(params: z.infer<typeof FlightSchemas.criarRascunho>) {
    return {
      status: 'success',
      message: `Rascunho do voo '${params.nome}' registrado na categoria ${params.categoria}.`,
      estagio: 'rascunho',
      dados: params,
    };
  }

  public static handleMudarEstagio(params: z.infer<typeof FlightSchemas.mudarEstagio>) {
    const hasCapacity = AirspaceLimiter.hasSlotAvailable(
      params.categoria,
      params.activeFlightsCount,
      DEFAULT_AIRSPACE_CONFIG
    );

    const validation = FlightStateMachine.validateTransition(
      params.estagioAtual,
      params.novoEstagio,
      {
        hasCapacityInAirspace: hasCapacity,
        hasVerifiedDestination: params.hasVerifiedDestination,
        hasFirstWaypoint: params.hasFirstWaypoint,
        waypointsCompletionPercentage: params.waypointsCompletionPercentage,
        daysRemaining: params.daysRemaining,
      }
    );

    if (!validation.allowed) {
      return {
        status: 'error',
        error: validation.reason,
      };
    }

    return {
      status: 'success',
      vooId: params.vooId,
      estagioAnterior: params.estagioAtual,
      novoEstagio: params.novoEstagio,
      message: `Voo transicionado com sucesso para '${params.novoEstagio}' 🛫`,
    };
  }

  public static handleCriarVooCurto(params: z.infer<typeof FlightSchemas.criarVooCurto>) {
    if (!AirspaceLimiter.canCreateShortFlight(params.todayShortFlightsCount)) {
      return {
        status: 'error',
        error: 'Limite diário de voos curtos atingido (máximo 2 por dia - RN04).',
      };
    }

    return {
      status: 'success',
      message: `Voo curto '${params.nome}' pronto na pista! Pouso estimado para hoje.`,
      estagio: 'voo_curto',
      dados: params,
    };
  }
}
