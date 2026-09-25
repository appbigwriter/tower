import { FinalApproachEngine } from '../src/domain/final-approach.js';
import { LandingChecklistHandler } from '../src/tools/landing-checklist.js';

describe('BFFD — Sprint 7 Final Approach & Landing Tests', () => {
  it('deve desviar novas ideias para o backlog pós-pouso durante Aproximação Final (RF35, J5)', () => {
    const resIdea = FinalApproachEngine.processCaptureInFlight('aproximacao_final', 'ideia');
    expect(resIdea.action).toBe('divert_to_post_landing_backlog');
    expect(resIdea.message).toContain('backlog pós-pouso');

    const resTask = FinalApproachEngine.processCaptureInFlight('aproximacao_final', 'tarefa');
    expect(resTask.action).toBe('normal');
  });

  it('deve permitir declaração de pouso parcial como entrega válida (RF37)', () => {
    const partial = LandingChecklistHandler.declarePartialLanding('App Clínica', 'MVP simplificado sem chat ao vivo');
    expect(partial.status).toBe('success');
    expect(partial.novoEstagio).toBe('manutencao');
    expect(partial.message).toContain('POUSOU!');
  });
});
