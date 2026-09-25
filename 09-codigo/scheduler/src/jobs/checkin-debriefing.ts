/**
 * BFFD — Check-in & Debriefing Jobs
 * Rotinas diárias proativas da tarde (14h) e noite (19h) em dias úteis.
 * Referência: RF29, RF30, RN12, RN13.
 */

export class DailyRoutinesJob {
  /**
   * Mensagem do Check-in das 14h (1 pergunta curta com botões rápidos).
   */
  public static formatCheckinMessage(flightName: string): { text: string; buttons: string[] } {
    return {
      text: `Passando na torre rapidinho! ⏱️\nComo tá a altitude do voo *${flightName}* hoje?`,
      buttons: ['Concluí! 🚀', 'Em andamento ⏳', 'Tranquei 🛑', 'Mudei o foco 🔄'],
    };
  }

  /**
   * Mensagem do Debriefing das 19h (fechamento acolhedor sem julgamento).
   */
  public static formatDebriefingMessage(completedCount: number): string {
    if (completedCount > 0) {
      return `Fechando o espaço aéreo por hoje! 🌙\nVocê concluiu ${completedCount} manobra(s) importante(s). Registrado na caixa-preta. Descanse bem!`;
    }
    return `Fechando o espaço aéreo por hoje! 🌙\nDia mais pesado? Tudo certo, sem neura. Amanhã a gente retoma com pista limpa. Bom descanso!`;
  }
}
