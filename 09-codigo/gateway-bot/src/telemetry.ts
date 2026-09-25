/**
 * BFFD — Telemetry & Cost Tracker
 * Monitora tokens de IA, latência e custo financeiro por chamada.
 * Referência: HM09, MT12, RNF14, RNF15.
 */

export interface TelemetryEvent {
  traceId: string;
  tenantId: string;
  pilotId: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCostUsd: number;
  latencyMs: number;
  timestamp: string;
}

export class TelemetryService {
  // Custo estimado padrão ($0.0015 por 1k tokens)
  private static readonly COST_PER_1K_TOKENS = 0.0015;

  public static trackCall(params: {
    tenantId: string;
    pilotId: string;
    model: string;
    promptTokens: number;
    completionTokens: number;
    latencyMs: number;
  }): TelemetryEvent {
    const totalTokens = params.promptTokens + params.completionTokens;
    const estimatedCostUsd = (totalTokens / 1000) * this.COST_PER_1K_TOKENS;
    const traceId = `tr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    return {
      traceId,
      tenantId: params.tenantId,
      pilotId: params.pilotId,
      model: params.model,
      promptTokens: params.promptTokens,
      completionTokens: params.completionTokens,
      totalTokens,
      estimatedCostUsd,
      latencyMs: params.latencyMs,
      timestamp: new Date().toISOString(),
    };
  }
}
