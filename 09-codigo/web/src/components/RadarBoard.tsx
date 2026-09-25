import React from 'react';

export interface FlightSummary {
  id: string;
  nome: string;
  categoria: 'profissional' | 'pessoal';
  estagio: 'em_rota' | 'aproximacao_final' | 'voo_curto' | 'pronto_para_decolar' | 'hold' | 'manutencao';
  prazo?: string;
  proximaAcao?: string;
  percentualConclusao: number;
}

interface RadarBoardProps {
  flights: FlightSummary[];
  onSelectFlight: (id: string) => void;
}

export const RadarBoard: React.FC<RadarBoardProps> = ({ flights, onSelectFlight }) => {
  const activeFlights = flights.filter((f) => f.estagio === 'em_rota' || f.estagio === 'aproximacao_final');
  const shortFlights = flights.filter((f) => f.estagio === 'voo_curto');
  const preparationFlights = flights.filter((f) => f.estagio === 'pronto_para_decolar');
  const holdFlights = flights.filter((f) => f.estagio === 'hold');
  const maintenanceFlights = flights.filter((f) => f.estagio === 'manutencao');

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', background: '#0f172a', color: '#f8fafc', minHeight: '100vh' }}>
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>📡 Radar de Voos</h1>
          <p style={{ margin: '4px 0 0', color: '#94a3b8' }}>BFFD — Controle de Tráfego Aéreo Pessoal</p>
        </div>
        <div style={{ background: '#1e293b', padding: '8px 16px', borderRadius: '8px', border: '1px solid #334155' }}>
          <span style={{ fontSize: '14px', color: '#38bdf8' }}>Espaço Aéreo: {activeFlights.length}/3 Voos Ativos</span>
        </div>
      </header>

      {/* Grid de Seções do Radar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Voos Ativos (Em Rota & Aproximação Final) */}
        <div style={{ background: '#1e293b', borderRadius: '12px', padding: '16px', border: '1px solid #38bdf8' }}>
          <h2 style={{ fontSize: '18px', color: '#38bdf8', marginBottom: '12px' }}>✈️ Em Rota & Aproximação ({activeFlights.length})</h2>
          {activeFlights.map((flight) => (
            <div
              key={flight.id}
              onClick={() => onSelectFlight(flight.id)}
              style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', marginBottom: '8px', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{flight.nome}</strong>
                <span style={{ fontSize: '12px', color: flight.estagio === 'aproximacao_final' ? '#f59e0b' : '#10b981' }}>
                  {flight.estagio === 'aproximacao_final' ? 'APROXIMAÇÃO' : 'EM ROTA'}
                </span>
              </div>
              <p style={{ margin: '6px 0', fontSize: '13px', color: '#cbd5e1' }}>👉 {flight.proximaAcao || 'Definir próxima manobra'}</p>
              <div style={{ background: '#334155', height: '6px', borderRadius: '3px', marginTop: '8px' }}>
                <div style={{ background: '#38bdf8', height: '6px', width: `${flight.percentualConclusao}%`, borderRadius: '3px' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Voos Curtos do Dia */}
        <div style={{ background: '#1e293b', borderRadius: '12px', padding: '16px', border: '1px solid #334155' }}>
          <h2 style={{ fontSize: '18px', color: '#f59e0b', marginBottom: '12px' }}>⚡ Voos Curtos ({shortFlights.length})</h2>
          {shortFlights.map((flight) => (
            <div key={flight.id} onClick={() => onSelectFlight(flight.id)} style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', marginBottom: '8px', cursor: 'pointer' }}>
              <strong>{flight.nome}</strong>
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94a3b8' }}>Pouso estimado para hoje</p>
            </div>
          ))}
        </div>

        {/* Voos em Hold */}
        <div style={{ background: '#1e293b', borderRadius: '12px', padding: '16px', border: '1px solid #334155' }}>
          <h2 style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '12px' }}>⏸️ Em Hold / Espera ({holdFlights.length})</h2>
          {holdFlights.map((flight) => (
            <div key={flight.id} onClick={() => onSelectFlight(flight.id)} style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', marginBottom: '8px', cursor: 'pointer' }}>
              <strong>{flight.nome}</strong>
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Pausa consciente</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
