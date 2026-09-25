import { GtdClarifyEngine } from '../src/domain/gtd-clarify.js';

describe('BFFD — GTD Clarify & 2-Minute Rule Tests', () => {
  it('deve direcionar item sem ação para Lixo, Referência ou Hold (RF51)', () => {
    const lixo = GtdClarifyEngine.clarifyItem(false, { nonActionType: 'lixo' });
    expect(lixo.actionRequired).toBe(false);
    if (!lixo.actionRequired) {
      expect(lixo.destination).toBe('lixo');
    }

    const ref = GtdClarifyEngine.clarifyItem(false, { nonActionType: 'referencia' });
    expect(ref.actionRequired).toBe(false);
    if (!ref.actionRequired) {
      expect(ref.destination).toBe('referencia');
    }
  });

  it('deve ativar a Regra dos 2 Minutos se a próxima ação levar <= 2 min (RF52)', () => {
    const rapidAction = GtdClarifyEngine.clarifyItem(true, {
      resultadoDesejado: 'Confirmar horário da consulta',
      proximaAcaoFisica: 'Enviar mensagem no WhatsApp da clínica',
      minutosEstimados: 2,
    });

    expect(rapidAction.actionRequired).toBe(true);
    if (rapidAction.actionRequired) {
      expect(rapidAction.isTwoMinuteRule).toBe(true);
    }
  });

  it('não deve ativar regra dos 2 minutos para ações longas', () => {
    const longAction = GtdClarifyEngine.clarifyItem(true, {
      resultadoDesejado: 'Tela de login pronta',
      proximaAcaoFisica: 'Escrever código do formulário',
      minutosEstimados: 40,
    });

    expect(longAction.actionRequired).toBe(true);
    if (longAction.actionRequired) {
      expect(longAction.isTwoMinuteRule).toBe(false);
    }
  });
});
