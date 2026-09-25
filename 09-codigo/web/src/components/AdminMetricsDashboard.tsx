import React from 'react';

export const AdminMetricsDashboard: React.FC = () => {
  return (
    <div style={{ padding: '24px', background: '#0f172a', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', margin: 0, color: '#f59e0b' }}>🔒 Console do Operador BFFD</h1>
        <p style={{ color: '#94a3b8', margin: '4px 0 0' }}>Métricas de infraestrutura e custos (sem acesso ao conteúdo dos pilotos - MT11).</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
          <span style={{ fontSize: '13px', color: '#94a3b8' }}>Tenants Ativos</span>
          <h2 style={{ fontSize: '28px', margin: '8px 0 0', color: '#38bdf8' }}>142</h2>
        </div>
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
          <span style={{ fontSize: '13px', color: '#94a3b8' }}>Disponibilidade (SLA)</span>
          <h2 style={{ fontSize: '28px', margin: '8px 0 0', color: '#10b981' }}>99.8%</h2>
        </div>
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
          <span style={{ fontSize: '13px', color: '#94a3b8' }}>Custo Total de IA (Mês)</span>
          <h2 style={{ fontSize: '28px', margin: '8px 0 0', color: '#f59e0b' }}>$184.20</h2>
        </div>
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
          <span style={{ fontSize: '13px', color: '#94a3b8' }}>Latência Média p95</span>
          <h2 style={{ fontSize: '28px', margin: '8px 0 0', color: '#a855f7' }}>1.4s</h2>
        </div>
      </div>
    </div>
  );
};
