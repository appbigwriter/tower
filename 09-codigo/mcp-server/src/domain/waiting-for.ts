/**
 * BFFD — Waiting For & Action Contexts
 * Gerencia a lista de ações delegadas (Aguardando) e filtros por contexto (RF53, RF54).
 */

export interface DelegatedAction {
  id: string;
  descricao: string;
  aguardandoDe: string;
  aguardandoDesde: Date;
}

export class WaitingForManager {
  /**
   * Identifica ações delegadas há mais de X dias para sugerir cobrança.
   */
  public static getStaleWaitingActions(actions: DelegatedAction[], maxDays: number = 5): DelegatedAction[] {
    const now = Date.now();
    const thresholdMs = maxDays * 24 * 60 * 60 * 1000;

    return actions.filter((action) => {
      const elapsed = now - action.aguardandoDesde.getTime();
      return elapsed > thresholdMs;
    });
  }

  /**
   * Filtra ações pelo contexto físico de execução (@computador, @celular, @rua, @casa).
   */
  public static filterByContext<T extends { contexto: string }>(actions: T[], targetContext: string): T[] {
    return actions.filter((a) => a.contexto.toLowerCase() === targetContext.toLowerCase());
  }
}
