import React from 'react';

export const PersonalMetricsDashboard: React.FC = () => {
  return (
    <div style={{ padding: '24px', background: '#0f172a', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', margin: 0, color: '#38bdf8' }}>🏆 Seus Indicadores de Voo</h1>
        <p style={{ color: '#94a3b8', margin: '4px 0 0' }}>Métricas pessoais de progresso e consistência (reforço positivo sem cobrança).</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        {/* Métrica Norte: Pousos por Trimestre */}
        <div style={{ background: '#1e293b', padding: '24px', borderRadius: '12px', border: '2px solid #10b981' }}>
          <span style={{ fontSize: '13px', color: '#10b981', fontWeight: 'bold' }}>⭐ MÉTRICA NORTE</span>
          <h3 style={{ margin: '8px 0 4px', fontSize: '18px' }}>Pousos no Trimestre</h3>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '36px', fontWeight: 'bold', color: '#f8fafc' }}>3</span>
            <span style={{ color: '#94a3b8', fontSize: '14px' }}>/ meta 2 pousos</span>
          </div>
          <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#10b981' }}>🎉 Meta superada! 3 aeronaves entregues no chão.</p>
        </div>

        {/* Waypoints Concluídos */}
        <div style={{ background: '#1e293b', padding: '24px', borderRadius: '12px', border: '1px solid #334155' }}>
          <span style={{ fontSize: '13px', color: '#38bdf8' }}>RITMO SEMANAL</span>
          <h3 style={{ margin: '8px 0 4px', fontSize: '18px' }}>Waypoints Concluídos</h3>
          <span style={{ fontSize: '36px', fontWeight: 'bold', color: '#f8fafc' }}>2</span>
          <span style={{ color: '#94a3b8', fontSize: '14px' }}> nessa semana</span>
          <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#94a3b8' }}>Consistência regular mantida.</p>
        </div>

        {/* Engajamento com Briefings */}
        <div style={{ background: '#1e293b', padding: '24px', borderRadius: '12px', border: '1px solid #334155' }}>
          <span style={{ fontSize: '13px', color: '#f59e0b' }}>ENGAJAMENTO</span>
          <h3 style={{ margin: '8px 0 4px', fontSize: '18px' }}>Resposta aos Briefings</h3>
          <span style={{ fontSize: '36px', fontWeight: 'bold', color: '#f8fafc' }}>78%</span>
          <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#10b981' }}>Acima da meta de 60%.</p>
        </div>
      </div>
    </div>
  );
};
