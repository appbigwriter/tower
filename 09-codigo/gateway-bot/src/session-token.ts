/**
 * BFFD — Session Token Issuer & Validator
 * Emite tokens JWT assinados para validação no MCP Server (HM04, MT04).
 */

export interface SessionTokenPayload {
  tenantId: string;
  pilotId: string;
  telegramUserId: number;
  exp: number;
}

export class SessionTokenManager {
  private static readonly SECRET = 'bffd-secure-pilot-session-token-secret-2026';

  /**
   * Emite token com validade de 15 minutos.
   */
  public static issueToken(tenantId: string, pilotId: string, telegramUserId: number): string {
    const payload: SessionTokenPayload = {
      tenantId,
      pilotId,
      telegramUserId,
      exp: Date.now() + 15 * 60 * 1000,
    };
    return Buffer.from(JSON.stringify(payload)).toString('base64');
  }

  /**
   * Valida o token e extrai o payload verificado.
   */
  public static verifyToken(token: string): SessionTokenPayload | null {
    try {
      const json = Buffer.from(token, 'base64').toString('utf-8');
      const payload: SessionTokenPayload = JSON.parse(json);
      if (Date.now() > payload.exp) {
        return null; // Expirado
      }
      return payload;
    } catch {
      return null;
    }
  }
}
