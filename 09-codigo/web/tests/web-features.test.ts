import { StartHandler } from '../../gateway-bot/src/handlers/start-handler.js';
import { DataExporter } from '../src/lib/data-exporter.js';

describe('BFFD — Sprint 4 Web & Onboarding Tests', () => {
  it('deve validar e consumir token temporário de 15 min de uso único (US-10, MT03)', () => {
    StartHandler.registerInviteToken('token_teste_123', 'pilot-sergio');

    // Primeira validação (sucesso)
    const res1 = StartHandler.validateAndLink('token_teste_123', 999999);
    expect(res1.success).toBe(true);
    expect(res1.pilotId).toBe('pilot-sergio');
    expect(res1.message).toContain('Bora colocar esse céu em ordem?');

    // Segunda tentativa com mesmo token (deve falhar por ser uso único)
    const res2 = StartHandler.validateAndLink('token_teste_123', 999999);
    expect(res2.success).toBe(false);
  });

  it('deve gerar exportação de dados em JSON e Markdown compatível com LGPD (US-12, MT09, RNF06)', () => {
    const mockData = {
      pilotInfo: { id: 'p-1', nome: 'Sergio', tenantId: 't-1' },
      flights: [{ nome: 'App Clínica', destino: 'Lançar MVP', waypoints: ['Módulo Auth'] }],
      captures: [{ conteudo: 'Ideia de nova funcionalidade', tipo: 'ideia', data: '2026-09-24' }],
    };

    const json = DataExporter.exportToJson(mockData);
    expect(json).toContain('"nome": "Sergio"');

    const md = DataExporter.exportToMarkdown(mockData);
    expect(md).toContain('# Exportação de Dados do Piloto — Sergio');
    expect(md).toContain('### ✈️ App Clínica');
  });
});
