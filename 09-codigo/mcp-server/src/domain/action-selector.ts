/**
 * BFFD — Action Selector Engine
 * Seleciona a próxima ação ideal cruzando: Contexto, Tempo, Energia e Prioridade.
 * Referência: RF55, RF19, RF25.
 */

export interface CandidateAction {
  id: string;
  flightName: string;
  descricao: string;
  minutos: number;
  contexto: string;
  energia: 'alta' | 'media' | 'baixa';
  prioridadeVoo: number; // 1 (alta) a 5 (baixa)
}

export interface SelectionCriteria {
  currentContext: string;
  availableMinutes: number;
  currentEnergy: 'alta' | 'media' | 'baixa';
}

export class ActionSelectorEngine {
  private static readonly ENERGY_WEIGHTS: Record<string, number> = {
    baixa: 1,
    media: 2,
    alta: 3,
  };

  public static selectBestAction(
    actions: CandidateAction[],
    criteria: SelectionCriteria
  ): CandidateAction | null {
    const userEnergyLevel = this.ENERGY_WEIGHTS[criteria.currentEnergy] ?? 2;

    const viableActions = actions.filter((a) => {
      // 1. Contexto compatível
      const matchContext =
        a.contexto.toLowerCase() === criteria.currentContext.toLowerCase() ||
        a.contexto.toLowerCase() === 'qualquer';

      // 2. Tempo suficiente
      const matchTime = a.minutos <= criteria.availableMinutes;

      // 3. Energia não excede o nível atual
      const actionEnergyLevel = this.ENERGY_WEIGHTS[a.energia] ?? 2;
      const matchEnergy = actionEnergyLevel <= userEnergyLevel;

      return matchContext && matchTime && matchEnergy;
    });

    if (viableActions.length === 0) return null;

    // Ordena pela prioridade do voo (menor número = maior prioridade)
    viableActions.sort((a, b) => a.prioridadeVoo - b.prioridadeVoo);

    return viableActions[0];
  }
}
