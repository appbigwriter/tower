/**
 * BFFD — Daily Briefing Job
 * Agendamento matinal às 09:00 em dias úteis com 1 voo e 1 próxima ação.
 * Referência: RN11, RN15, RF28, RF32.
 */

export interface BriefingPayload {
  pilotId: string;
  pilotName: string;
  flightName: string;
  nextAction: string;
  estimatedMinutes: number;
}

export class DailyBriefingJob {
  /**
   * Monta a mensagem matinal da Bia Torres (máximo 3 linhas, persona aviação).
   */
  public static formatBriefingMessage(payload: BriefingPayload): string {
    return `Bom dia, ${payload.pilotName}! ☕\nHoje o céu tá limpo pro voo *${payload.flightName}*.\nPróxima manobra: ${payload.nextAction} (~${payload.estimatedMinutes} min). Partiu? 🛫`;
  }

  /**
   * Verifica se o dia atual é dia útil (1=Segunda a 5=Sexta) para envio (RN15).
   */
  public static shouldSendBriefing(dayOfWeek: number): boolean {
    // 0 = Domingo, 6 = Sábado
    return dayOfWeek >= 1 && dayOfWeek <= 5;
  }
}
