import { DailyBriefingJob } from '../src/jobs/daily-briefing.js';

describe('BFFD Scheduler — Daily Briefing & Weekend Silence Tests', () => {
  it('deve formatar o briefing dentro do limite de 3 linhas com tom amigável (RF28, Seção 9.1)', () => {
    const msg = DailyBriefingJob.formatBriefingMessage({
      pilotId: 'p-1',
      pilotName: 'Sergio',
      flightName: 'App Clínica',
      nextAction: 'Montar a tela de login',
      estimatedMinutes: 40,
    });

    const lines = msg.split('\n');
    expect(lines.length).toBeLessThanOrEqual(3);
    expect(msg).toContain('Bom dia, Sergio');
    expect(msg).toContain('App Clínica');
    expect(msg).toContain('Partiu? 🛫');
  });

  it('deve enviar briefing em dias úteis e silenciar aos fins de semana (RN11, RN15, RF32)', () => {
    expect(DailyBriefingJob.shouldSendBriefing(1)).toBe(true);  // Segunda
    expect(DailyBriefingJob.shouldSendBriefing(5)).toBe(true);  // Sexta
    expect(DailyBriefingJob.shouldSendBriefing(6)).toBe(false); // Sábado (silêncio)
    expect(DailyBriefingJob.shouldSendBriefing(0)).toBe(false); // Domingo (silêncio)
  });
});
