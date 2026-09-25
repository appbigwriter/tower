import React from 'react';

export interface HorizonAltitude {
  nivel: string;
  altitudePes: string;
  descricao: string;
  itens: string[];
}

export const FocusHorizonsView: React.FC = () => {
  const horizons: HorizonAltitude[] = [
    { nivel: 'Propósito & Princípios', altitudePes: '50.000 pés', descricao: 'Por que existo e o que guia minhas decisões', itens: ['Construir tecnologia empática para mentes neurodivergentes'] },
    { nivel: 'Visão', altitudePes: '40.000 pés', descricao: 'Onde quero estar em 3 a 5 anos', itens: ['BFFD consolidado com 10.000 pilotos ativos no Brasil'] },
    { nivel: 'Metas de 1 a 2 anos', altitudePes: '30.000 pés', descricao: 'Conquistas estratégicas de médio prazo', itens: ['Lançar planos familiares e versão para profissionais de saúde'] },
    { nivel: 'Áreas de Foco & Responsabilidade', altitudePes: '20.000 pés', descricao: 'Padrões a manter (Saúde, Finanças, Engenharia)', itens: ['Saúde mental estável', 'Arquitetura com zero vazamento de dados'] },
    { nivel: 'Projetos (Voos)', altitudePes: '10.000 pés', descricao: 'Voos ativos e em preparação', itens: ['App Clínica (Em Rota)', 'Loja Online (Hold)'] },
    { nivel: 'Pista (Próximas Manobras)', altitudePes: 'Solo / Pista', descricao: 'Ações físicas imediatas de 15 a 45 min', itens: ['Escrever schema do banco', 'Configurar webhook do Telegram'] }
  ];

  return (
    <div style={{ padding: '24px', background: '#0f172a', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '8px', color: '#38bdf8' }}>✈️ Altitudes de Voo (Horizontes de Foco GTD)</h1>
      <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Conecte as manobras da pista ao seu propósito a 50 mil pés.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {horizons.map((h, i) => (
          <div key={i} style={{ background: '#1e293b', borderRadius: '12px', padding: '16px', borderLeft: '4px solid #38bdf8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>{h.nivel}</h3>
              <span style={{ fontSize: '12px', color: '#38bdf8', background: '#0f172a', padding: '4px 10px', borderRadius: '12px' }}>{h.altitudePes}</span>
            </div>
            <p style={{ margin: '6px 0', fontSize: '13px', color: '#94a3b8' }}>{h.descricao}</p>
            <ul style={{ margin: '8px 0 0', paddingLeft: '20px', fontSize: '14px', color: '#cbd5e1' }}>
              {h.itens.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
