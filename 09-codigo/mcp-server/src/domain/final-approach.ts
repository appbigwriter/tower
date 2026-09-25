/**
 * BFFD — Final Approach & Scope Lock Engine
 * Bloqueia novas ideias na reta final e desvia para o backlog de pós-pouso.
 * Referência: RF34, RF35, RN06, J5.
 */

export interface FinalApproachCheckResult {
  isFinalApproach: boolean;
  action: 'normal' | 'divert_to_post_landing_backlog';
  message: string;
}

export class FinalApproachEngine {
  /**
   * Avalia captura enviada para voo em Aproximação Final e desvia novas ideias.
   */
  public static processCaptureInFlight(
    flightStage: string,
    captureType: 'ideia' | 'tarefa' | 'decisao' | 'progresso'
  ): FinalApproachCheckResult {
    if (flightStage === 'aproximacao_final' && captureType === 'ideia') {
      return {
        isFinalApproach: true,
        action: 'divert_to_post_landing_backlog',
        message: 'Atenção piloto, estamos em aproximação final! Salvei essa nova ideia no backlog pós-pouso para não poluir a pista. 🛫🔒',
      };
    }

    return {
      isFinalApproach: flightStage === 'aproximacao_final',
      action: 'normal',
      message: 'Captura anexada normalmente.',
    };
  }
}
