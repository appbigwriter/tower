/**
 * BFFD — Airspace Limiter
 * Controla os limites de capacidade do espaço aéreo mental (RN01, RN04).
 */

export interface AirspaceConfig {
  maxProfissionais: number; // Padrão: 2
  maxPessoais: number;       // Padrão: 1
  maxVoosCurtosDia: number;  // Padrão: 2
}

export const DEFAULT_AIRSPACE_CONFIG: AirspaceConfig = {
  maxProfissionais: 2,
  maxPessoais: 1,
  maxVoosCurtosDia: 2,
};

export class AirspaceLimiter {
  /**
   * Verifica se há vaga na categoria para um novo voo ativo (Em Rota ou Aproximação Final).
   */
  public static hasSlotAvailable(
    categoria: 'profissional' | 'pessoal',
    activeFlightsCount: number,
    config: AirspaceConfig = DEFAULT_AIRSPACE_CONFIG
  ): boolean {
    const limit = categoria === 'profissional' ? config.maxProfissionais : config.maxPessoais;
    return activeFlightsCount < limit;
  }

  /**
   * Verifica se o limite de voos curtos do dia foi atingido (RN04).
   */
  public static canCreateShortFlight(
    todayShortFlightsCount: number,
    config: AirspaceConfig = DEFAULT_AIRSPACE_CONFIG
  ): boolean {
    return todayShortFlightsCount < config.maxVoosCurtosDia;
  }
}
