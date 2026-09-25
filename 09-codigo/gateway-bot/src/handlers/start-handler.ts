/**
 * BFFD — Start / Onboarding Link Handler
 * Valida o token temporário de 15 minutos e vincula o telegram_user_id ao piloto (MT03, J1).
 */

export interface StartValidationResult {
  success: boolean;
  pilotId?: string;
  message: string;
}

export class StartHandler {
  // Simulação de cache de tokens de pareamento válidos por 15 minutos
  private static readonly TOKEN_STORE = new Map<string, { pilotId: string; expiresAt: number }>();

  public static registerInviteToken(token: string, pilotId: string): void {
    this.TOKEN_STORE.set(token, {
      pilotId,
      expiresAt: Date.now() + 15 * 60 * 1000,
    });
  }

  public static validateAndLink(token: string, telegramUserId: number): StartValidationResult {
    const record = this.TOKEN_STORE.get(token);

    if (!record) {
      return {
        success: false,
        message: 'Link de convite inválido ou já utilizado.',
      };
    }

    if (Date.now() > record.expiresAt) {
      this.TOKEN_STORE.delete(token);
      return {
        success: false,
        message: 'Link de convite expirou. Gere um novo link no painel web.',
      };
    }

    // Token consumido com sucesso (uso único)
    this.TOKEN_STORE.delete(token);

    return {
      success: true,
      pilotId: record.pilotId,
      message: 'Bora colocar esse céu em ordem? 🛫\nVamos fazer uma varredura rápida de 5 minutos pra tirar o peso da cabeça?',
    };
  }
}
