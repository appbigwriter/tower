import React from 'react';

export interface FlightFullDetails {
  id: string;
  nome: string;
  destino: string;
  motivo: string;
  prazo: string;
  waypoints: Array<{
    id: string;
    titulo: string;
    criterioPronto: string;
    status: 'pendente' | 'em_andamento' | 'concluido';
    acoes: Array<{ id: string; descricao: string; minutos: number; status: string }>;
  }>;
  caixaPreta: Array<{ id: string; tipo: string; criadoEm: string }>;
}

export const FlightDetails: React.FC<{ flight: FlightFullDetails; onBack: () => void }> = ({
  flight,
  onBack,
}) => {
  return (
    <div style={{ padding: '24px', background: '#0f172a', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <button onClick={onBack} style={{ background: '#334155', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>
        ← Voltar ao Radar
      </button>

      <div style={{ marginTop: '20px', background: '#1e293b', padding: '24px', borderRadius: '12px', border: '1px solid #334155' }}>
        <h1 style={{ margin: 0, fontSize: '24px', color: '#38bdf8' }}>✈️ {flight.nome}</h1>
        <p style={{ margin: '8px 0', color: '#94a3b8' }}><strong>🎯 Destino:</strong> {flight.destino}</p>
        <p style={{ margin: '8px 0', color: '#94a3b8' }}><strong>💡 Motivo:</strong> {flight.motivo}</p>

        <h3 style={{ marginTop: '24px', borderBottom: '1px solid #334155', paddingBottom: '8px' }}>📍 Waypoints e Próximas Manobras</h3>
        {flight.waypoints.map((wp) => (
          <div key={wp.id} style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', marginTop: '12px' }}>
            <h4 style={{ margin: 0, color: '#f8fafc' }}>{wp.titulo}</h4>
            <p style={{ margin: '4px 0', fontSize: '13px', color: '#94a3b8' }}>Critério de pronto: {wp.criterioPronto}</p>
            <div style={{ marginTop: '8px' }}>
              {wp.acoes.map((acao) => (
                <div key={acao.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #1e293b' }}>
                  <span style={{ fontSize: '14px' }}>👉 {acao.descricao}</span>
                  <span style={{ fontSize: '12px', color: '#38bdf8' }}>{acao.minutos} min</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
