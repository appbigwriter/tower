import { TelemetryService } from '../src/telemetry.js';

describe('BFFD Telemetry & AI Cost Tracker Tests', () => {
  it('deve calcular corretamente total de tokens e custo estimado em USD (HM09, RNF14)', () => {
    const event = TelemetryService.trackCall({
      tenantId: 'tenant-123',
      pilotId: 'pilot-456',
      model: 'gpt-4o-mini',
      promptTokens: 800,
      completionTokens: 200,
      latencyMs: 850,
    });

    expect(event.totalTokens).toBe(1000);
    expect(event.estimatedCostUsd).toBeCloseTo(0.0015, 5);
    expect(event.traceId).toContain('tr_');
    expect(event.latencyMs).toBe(850);
  });
});
