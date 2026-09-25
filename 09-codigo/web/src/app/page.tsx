'use client';

import React, { useState } from 'react';
import { RadarBoard, FlightSummary } from '../components/RadarBoard';
import { FlightDetails, FlightFullDetails } from '../components/FlightDetails';
import { PersonalMetricsDashboard } from '../components/PersonalMetricsDashboard';
import { FocusHorizonsView } from '../components/FocusHorizonsView';
import { AdminMetricsDashboard } from '../components/AdminMetricsDashboard';

export default function Home() {
  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<'radar' | 'metricas' | 'altitudes' | 'admin'>('radar');

  const initialFlights: FlightSummary[] = [
    {
      id: 'c0000000-0000-0000-0000-000000000001',
      nome: 'App Clínica',
      categoria: 'profissional',
      estagio: 'em_rota',
      proximaAcao: 'Montar a tela de login no Next.js (40 min)',
      percentualConclusao: 45,
    },
    {
      id: 'c0000000-0000-0000-0000-000000000002',
      nome: 'Loja Online',
      categoria: 'profissional',
      estagio: 'aproximacao_final',
      proximaAcao: 'Testar checkout e gateway de pagamentos',
      percentualConclusao: 85,
    },
    {
      id: 'c0000000-0000-0000-0000-000000000003',
      nome: 'Emitir Nota Fiscal',
      categoria: 'profissional',
      estagio: 'voo_curto',
      proximaAcao: 'Acessar portal da prefeitura e emitir nota',
      percentualConclusao: 10,
    },
  ];

  const demoFlightDetails: FlightFullDetails = {
    id: 'c0000000-0000-0000-0000-000000000001',
    nome: 'App Clínica',
    destino: 'Lançar MVP do prontuário para os 5 primeiros médicos parceiros',
    motivo: 'Validar modelo de negócio e fluxo de atendimento',
    prazo: '2026-10-24',
    waypoints: [
      {
        id: 'd1',
        titulo: 'Módulo de Autenticação e Perfil Médico',
        criterioPronto: 'Médico consegue logar com e-mail/senha e ver tela inicial',
        status: 'em_andamento',
        acoes: [
          { id: 'a1', descricao: 'Montar a tela de login no Next.js com validação Zod', minutos: 40, status: 'pendente' },
          { id: 'a2', descricao: 'Conectar endpoint de login com Supabase Auth', minutos: 30, status: 'pendente' },
        ],
      },
    ],
    caixaPreta: [
      { id: 'e1', tipo: 'decolagem', criadoEm: '2026-09-24 14:00' },
      { id: 'e2', tipo: 'waypoint_criado', criadoEm: '2026-09-24 14:05' },
    ],
  };

  return (
    <div>
      <nav style={{ background: '#1e293b', borderBottom: '1px solid #334155', padding: '12px 24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ fontWeight: 'bold', color: '#38bdf8', fontSize: '18px', marginRight: '16px' }}>✈️ BFFD Tower</span>
        <button onClick={() => { setSelectedFlightId(null); setCurrentTab('radar'); }} style={{ background: currentTab === 'radar' ? '#38bdf8' : 'transparent', color: currentTab === 'radar' ? '#0f172a' : '#94a3b8', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          Radar
        </button>
        <button onClick={() => { setSelectedFlightId(null); setCurrentTab('metricas'); }} style={{ background: currentTab === 'metricas' ? '#38bdf8' : 'transparent', color: currentTab === 'metricas' ? '#0f172a' : '#94a3b8', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          Indicadores
        </button>
        <button onClick={() => { setSelectedFlightId(null); setCurrentTab('altitudes'); }} style={{ background: currentTab === 'altitudes' ? '#38bdf8' : 'transparent', color: currentTab === 'altitudes' ? '#0f172a' : '#94a3b8', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          Altitudes GTD
        </button>
        <button onClick={() => { setSelectedFlightId(null); setCurrentTab('admin'); }} style={{ background: currentTab === 'admin' ? '#38bdf8' : 'transparent', color: currentTab === 'admin' ? '#0f172a' : '#94a3b8', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          Admin
        </button>
      </nav>

      <main>
        {selectedFlightId ? (
          <FlightDetails flight={demoFlightDetails} onBack={() => setSelectedFlightId(null)} />
        ) : (
          <>
            {currentTab === 'radar' && <RadarBoard flights={initialFlights} onSelectFlight={(id) => setSelectedFlightId(id)} />}
            {currentTab === 'metricas' && <PersonalMetricsDashboard />}
            {currentTab === 'altitudes' && <FocusHorizonsView />}
            {currentTab === 'admin' && <AdminMetricsDashboard />}
          </>
        )}
      </main>
    </div>
  );
}
