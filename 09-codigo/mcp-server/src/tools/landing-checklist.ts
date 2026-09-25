/**
 * BFFD — Landing Checklist & Partial Landing
 * Gera checklist dos itens finais e permite declarar pouso parcial (RF36, RF37).
 */

export interface PendingItem {
  id: string;
  descricao: string;
}

export class LandingChecklistHandler {
  public static generateChecklist(flightName: string, pendingItems: PendingItem[]): string {
    let text = `🛬 **Checklist de Pouso — Voo ${flightName}**\n\n`;
    pendingItems.forEach((item, index) => {
      text += `[ ] ${index + 1}. ${item.descricao}\n`;
    });
    text += `\nMarque as manobras finais ou declare pouso parcial se a versão atual já entrega valor!`;
    return text;
  }

  public static declarePartialLanding(flightName: string, notes: string) {
    return {
      status: 'success',
      novoEstagio: 'manutencao',
      tipoPouso: 'parcial',
      message: `POUSOU! 🎉 Voo *${flightName}* no chão em pouso parcial bem-sucedido! "${notes}"`,
    };
  }
}
