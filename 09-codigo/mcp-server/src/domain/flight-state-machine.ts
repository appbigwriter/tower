/**
 * BFFD — Flight State Machine
 * Implementa as transições válidas de estágio dos voos (RN01 a RN08, Seção 3 PRD).
 */

export type FlightStage =
  | 'rascunho'
  | 'plano_de_voo'
  | 'pronto_para_decolar'
  | 'voo_curto'
  | 'em_rota'
  | 'hold'
  | 'aproximacao_final'
  | 'manutencao'
  | 'encerrado'
  | 'arquivado';

export interface TransitionContext {
  hasCapacityInAirspace?: boolean;
  hasVerifiedDestination?: boolean;
  hasFirstWaypoint?: boolean;
  isSameDay?: boolean;
  waypointsCompletionPercentage?: number;
  daysRemaining?: number;
}

export class FlightStateMachine {
  private static readonly VALID_TRANSITIONS: Record<FlightStage, FlightStage[]> = {
    rascunho: ['plano_de_voo', 'arquivado'],
    plano_de_voo: ['pronto_para_decolar', 'rascunho', 'arquivado'],
    pronto_para_decolar: ['em_rota', 'hold', 'plano_de_voo'],
    voo_curto: ['manutencao', 'em_rota', 'arquivado'],
    em_rota: ['hold', 'aproximacao_final', 'manutencao', 'arquivado'],
    hold: ['em_rota', 'arquivado', 'pronto_para_decolar'],
    aproximacao_final: ['manutencao', 'hold'],
    manutencao: ['pronto_para_decolar', 'encerrado', 'arquivado'],
    encerrado: [],
    arquivado: [],
  };

  /**
   * Verifica se uma transição direta é estruturalmente permitida no grafo.
   */
  public static canTransition(currentStage: FlightStage, nextStage: FlightStage): boolean {
    const allowed = this.VALID_TRANSITIONS[currentStage];
    return allowed ? allowed.includes(nextStage) : false;
  }

  /**
   * Valida a transição aplicando as regras de negócio de aviação (RN01 a RN08).
   */
  public static validateTransition(
    currentStage: FlightStage,
    nextStage: FlightStage,
    context: TransitionContext = {}
  ): { allowed: boolean; reason?: string } {
    if (!this.canTransition(currentStage, nextStage)) {
      return {
        allowed: false,
        reason: `Transição inválida de '${currentStage}' para '${nextStage}'.`,
      };
    }

    // Regra: Pronto para Decolar -> Em Rota (RN08: exige vaga no espaço aéreo)
    if (currentStage === 'pronto_para_decolar' && nextStage === 'em_rota') {
      if (context.hasCapacityInAirspace === false) {
        return {
          allowed: false,
          reason: 'Espaço aéreo cheio para esta categoria. Mova um voo ativo para hold antes de decolar (RN01/RN08).',
        };
      }
    }

    // Regra: Plano de Voo -> Pronto para Decolar (exige destino verificável e 1º waypoint)
    if (currentStage === 'plano_de_voo' && nextStage === 'pronto_para_decolar') {
      if (!context.hasVerifiedDestination || !context.hasFirstWaypoint) {
        return {
          allowed: false,
          reason: 'Voo precisa de Destino verificável e pelo menos 1 Waypoint para ficar pronto para decolar.',
        };
      }
    }

    // Regra: Voo Curto que passou de 1 dia vira Em Rota (RN05)
    if (currentStage === 'voo_curto' && nextStage === 'em_rota') {
      if (context.isSameDay === true) {
        return {
          allowed: false,
          reason: 'Voo curto só vira Em Rota se ultrapassar o mesmo dia (RN05).',
        };
      }
    }

    // Regra: Entrada em Aproximação Final (RN06: 80% waypoints ou <= 7 dias)
    if (currentStage === 'em_rota' && nextStage === 'aproximacao_final') {
      const is80Percent = (context.waypointsCompletionPercentage ?? 0) >= 80;
      const isWithin7Days = (context.daysRemaining ?? 999) <= 7;
      if (!is80Percent && !isWithin7Days) {
        return {
          allowed: false,
          reason: 'Aproximação final só é autorizada com 80% dos waypoints concluídos ou prazo em até 7 dias (RN06).',
        };
      }
    }

    return { allowed: true };
  }
}
