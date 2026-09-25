/**
 * BFFD — GTD Clarify Engine
 * Implementa o fluxo de esclarecimento: exige ação? + regra dos 2 minutos (RF51, RF52).
 */

export type ClarifyDecision =
  | { actionRequired: false; destination: 'lixo' | 'referencia' | 'hold' }
  | {
      actionRequired: true;
      resultadoDesejado: string;
      proximaAcaoFisica: string;
      isTwoMinuteRule: boolean;
      minutosEstimados: number;
    };

export class GtdClarifyEngine {
  public static clarifyItem(
    actionRequired: boolean,
    params?: {
      nonActionType?: 'lixo' | 'referencia' | 'hold';
      resultadoDesejado?: string;
      proximaAcaoFisica?: string;
      minutosEstimados?: number;
    }
  ): ClarifyDecision {
    if (!actionRequired) {
      return {
        actionRequired: false,
        destination: params?.nonActionType || 'referencia',
      };
    }

    const minutos = params?.minutosEstimados ?? 15;
    const isTwoMinuteRule = minutos <= 2;

    return {
      actionRequired: true,
      resultadoDesejado: params?.resultadoDesejado || 'Resultado a definir',
      proximaAcaoFisica: params?.proximaAcaoFisica || 'Próximo passo a definir',
      isTwoMinuteRule,
      minutosEstimados: minutos,
    };
  }
}
