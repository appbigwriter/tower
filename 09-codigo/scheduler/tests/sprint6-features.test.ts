import { ActionSelectorEngine, CandidateAction } from '../../mcp-server/src/domain/action-selector.js';
import { DailyRoutinesJob } from '../src/jobs/checkin-debriefing.js';

describe('BFFD — Sprint 6 Routine & Action Selection Tests', () => {
  it('deve selecionar ação compatível com contexto, tempo disponível e energia do piloto (RF55)', () => {
    const actions: CandidateAction[] = [
      {
        id: '1',
        flightName: 'App Clínica',
        descricao: 'Montar arquitetura do banco',
        minutos: 60,
        contexto: 'computador',
        energia: 'alta',
        prioridadeVoo: 1,
      },
      {
        id: '2',
        flightName: 'App Clínica',
        descricao: 'Responder e-mail de fornecedor',
        minutos: 15,
        contexto: 'celular',
        energia: 'baixa',
        prioridadeVoo: 1,
      },
    ];

    // Piloto no celular com 20 min e baixa energia
    const selected = ActionSelectorEngine.selectBestAction(actions, {
      currentContext: 'celular',
      availableMinutes: 20,
      currentEnergy: 'baixa',
    });

    expect(selected).not.toBeNull();
    expect(selected?.id).toBe('2');
    expect(selected?.descricao).toBe('Responder e-mail de fornecedor');
  });

  it('deve gerar mensagens de check-in com botões e debriefing sem julgamento (RF29, RF30)', () => {
    const checkin = DailyRoutinesJob.formatCheckinMessage('App Clínica');
    expect(checkin.buttons.length).toBe(4);
    expect(checkin.text).toContain('App Clínica');

    const debriefingZero = DailyRoutinesJob.formatDebriefingMessage(0);
    expect(debriefingZero).toContain('sem neura');
  });
});
