/**
 * BFFD — Turbulence Monitor Job
 * Avalia diariamente afastamento e sobrecarga para ajustar o comportamento da Bia.
 * Referência: RF39, RF40, RF41, RN16 a RN21.
 */

export type TurbulenceLevel = 'normal' | 'leve' | 'moderada' | 'forte' | 'sobrecarga';

export interface PilotMetrics {
  daysWithoutInteraction: number; // RN16
  holdFlightsWithoutInteractionDays: number; // RN17
  preparationFlightsCount: number; // RN19 (>5)
  holdFlightsCount: number; // RN20 (>10)
  sentimentDiscouraged: boolean; // RN21
}

export class TurbulenceMonitorEngine {
  public static calculateTurbulenceLevel(metrics: PilotMetrics): {
    level: TurbulenceLevel;
    behavior: string;
  } {
    // 1. Sobrecarga estrutural
    if (metrics.preparationFlightsCount > 5 || metrics.holdFlightsCount > 10) {
      return {
        level: 'sobrecarga',
        behavior: 'Propor triagem rápida de 10 min: escolher o que volta a voar, o que segue em hold e o que é arquivado.',
      };
    }

    // 2. Afastamento por dias corridos sem interação (RN16)
    if (metrics.daysWithoutInteraction >= 8) {
      return {
        level: 'forte',
        behavior: 'Perguntar como o piloto está sem falar de trabalho; sugerir apoio de alguém de confiança ou profissional.',
      };
    }

    if (metrics.daysWithoutInteraction >= 4) {
      return {
        level: 'moderada',
        behavior: 'Suspender check-ins e debriefings; mandar só briefing focado em reconexão suave.',
      };
    }

    if (metrics.daysWithoutInteraction >= 1 || metrics.sentimentDiscouraged) {
      return {
        level: 'leve',
        behavior: 'Mensagem curta e leve, sem cobrança, sugerindo um passo físico de até 2 minutos.',
      };
    }

    return {
      level: 'normal',
      behavior: 'Operação padrão de controle de tráfego aéreo.',
    };
  }
}
