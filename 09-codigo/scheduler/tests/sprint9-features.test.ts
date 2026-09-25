import { PlanLimiter } from '../../gateway-bot/src/plan-limiter.js';
import { DataPurgePipeline, AccountDeletionRequest } from '../src/jobs/data-purge.js';

describe('BFFD — Sprint 9 Billing & LGPD Purge Tests', () => {
  it('deve aplicar limite de minutos de áudio conforme o plano (MT07)', () => {
    // Plano Solo: 120 min
    const ok = PlanLimiter.canProcessAudio('solo', 100, 10);
    expect(ok.allowed).toBe(true);

    const exceed = PlanLimiter.canProcessAudio('solo', 115, 10);
    expect(exceed.allowed).toBe(false);
    expect(exceed.reason).toContain('Limite de áudio mensal');
  });

  it('deve selecionar apenas contas com solicitação de exclusão superior a 30 dias para expurgo (MT10)', () => {
    const now = Date.now();
    const requests: AccountDeletionRequest[] = [
      {
        tenantId: 't-1',
        pilotId: 'p-1',
        requestedAt: new Date(now - 35 * 24 * 60 * 60 * 1000), // 35 dias atrás (elegível)
        status: 'pending',
      },
      {
        tenantId: 't-2',
        pilotId: 'p-2',
        requestedAt: new Date(now - 10 * 24 * 60 * 60 * 1000), // 10 dias atrás (não elegível)
        status: 'pending',
      },
    ];

    const eligible = DataPurgePipeline.getEligibleForPurge(requests);
    expect(eligible.length).toBe(1);
    expect(eligible[0].pilotId).toBe('p-1');

    const result = DataPurgePipeline.executePurge(eligible[0]);
    expect(result.status).toBe('purged');
    expect(result.purgedEntities).toContain('vector_embeddings');
  });
});
