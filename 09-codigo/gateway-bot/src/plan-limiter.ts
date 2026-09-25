/**
 * BFFD — Plan & Usage Limiter
 * Controla limites mensais de minutos de áudio e pilotos por plano (Solo, Família, Profissional).
 * Referência: MT07, MT08, Seção 6.4.
 */

export interface PlanLimits {
  name: 'solo' | 'familia' | 'profissional';
  maxPilots: number;
  monthlyAudioMinutesPerPilot: number;
}

export const PLANS: Record<string, PlanLimits> = {
  solo: { name: 'solo', maxPilots: 1, monthlyAudioMinutesPerPilot: 120 },
  familia: { name: 'familia', maxPilots: 4, monthlyAudioMinutesPerPilot: 120 },
  profissional: { name: 'profissional', maxPilots: 20, monthlyAudioMinutesPerPilot: 300 },
};

export class PlanLimiter {
  public static canProcessAudio(
    planName: string,
    currentMonthAudioMinutes: number,
    additionalMinutes: number
  ): { allowed: boolean; reason?: string } {
    const plan = PLANS[planName] || PLANS.solo;
    const projectedTotal = currentMonthAudioMinutes + additionalMinutes;

    if (projectedTotal > plan.monthlyAudioMinutesPerPilot) {
      return {
        allowed: false,
        reason: `Limite de áudio mensal do plano ${plan.name.toUpperCase()} atingido (${plan.monthlyAudioMinutesPerPilot} min). Considere fazer upgrade.`,
      };
    }

    return { allowed: true };
  }
}
