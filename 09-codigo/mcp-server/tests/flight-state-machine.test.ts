import { FlightStateMachine } from '../src/domain/flight-state-machine.js';
import { AirspaceLimiter } from '../src/domain/airspace-limiter.js';

describe('BFFD Flight State Machine & Airspace Limiter Tests', () => {
  describe('Transições Básicas do Grafo', () => {
    it('deve permitir transição de Rascunho para Plano de Voo', () => {
      expect(FlightStateMachine.canTransition('rascunho', 'plano_de_voo')).toBe(true);
    });

    it('deve rejeitar transição direta de Rascunho para Em Rota sem passar por preparação', () => {
      expect(FlightStateMachine.canTransition('rascunho', 'em_rota')).toBe(false);
    });

    it('deve permitir transição de Em Rota para Hold e para Aproximação Final', () => {
      expect(FlightStateMachine.canTransition('em_rota', 'hold')).toBe(true);
      expect(FlightStateMachine.canTransition('em_rota', 'aproximacao_final')).toBe(true);
    });

    it('deve permitir transição de Aproximação Final para Manutenção (Pouso)', () => {
      expect(FlightStateMachine.canTransition('aproximacao_final', 'manutencao')).toBe(true);
    });
  });

  describe('Regras de Negócio de Espaço Aéreo (RN01, RN08)', () => {
    it('deve bloquear decolagem (ProntoParaDecolar -> EmRota) se o espaço aéreo profissional estiver lotado (2 ativos)', () => {
      const result = FlightStateMachine.validateTransition(
        'pronto_para_decolar',
        'em_rota',
        { hasCapacityInAirspace: false }
      );
      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('Espaço aéreo cheio');
    });

    it('deve autorizar decolagem se houver vaga no espaço aéreo', () => {
      const result = FlightStateMachine.validateTransition(
        'pronto_para_decolar',
        'em_rota',
        { hasCapacityInAirspace: true }
      );
      expect(result.allowed).toBe(true);
    });
  });

  describe('Regras de Voos Curtos (RN03, RN04, RN05)', () => {
    it('deve permitir até 2 voos curtos por dia e bloquear o terceiro', () => {
      expect(AirspaceLimiter.canCreateShortFlight(0)).toBe(true);
      expect(AirspaceLimiter.canCreateShortFlight(1)).toBe(true);
      expect(AirspaceLimiter.canCreateShortFlight(2)).toBe(false);
    });

    it('deve permitir conversão de Voo Curto para Em Rota quando passar de 1 dia', () => {
      const result = FlightStateMachine.validateTransition('voo_curto', 'em_rota', {
        isSameDay: false,
      });
      expect(result.allowed).toBe(true);
    });
  });

  describe('Regra de Aproximação Final (RN06)', () => {
    it('deve autorizar aproximação final se 80% dos waypoints estiverem concluídos', () => {
      const result = FlightStateMachine.validateTransition('em_rota', 'aproximacao_final', {
        waypointsCompletionPercentage: 85,
        daysRemaining: 15,
      });
      expect(result.allowed).toBe(true);
    });

    it('deve autorizar aproximação final se faltarem 7 dias ou menos para o prazo', () => {
      const result = FlightStateMachine.validateTransition('em_rota', 'aproximacao_final', {
        waypointsCompletionPercentage: 50,
        daysRemaining: 5,
      });
      expect(result.allowed).toBe(true);
    });

    it('deve bloquear aproximação final com menos de 80% e prazo distante', () => {
      const result = FlightStateMachine.validateTransition('em_rota', 'aproximacao_final', {
        waypointsCompletionPercentage: 40,
        daysRemaining: 20,
      });
      expect(result.allowed).toBe(false);
    });
  });
});
