import React from 'react';

export interface InboxItem {
  id: string;
  conteudo: string;
  midia: 'texto' | 'audio' | 'imagem';
  criadoEm: string;
}

export const InboxManager: React.FC<{
  items: InboxItem[];
  onLinkToFlight: (itemId: string, flightId: string) => void;
  onDiscard: (itemId: string) => void;
}> = ({ items, onDiscard }) => {
  return (
    <div style={{ padding: '24px', background: '#0f172a', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>📥 Caixa de Entrada (Radar de Capturas)</h1>
      <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Itens soltos capturados sem projeto definido.</p>

      {items.length === 0 ? (
        <div style={{ background: '#1e293b', padding: '32px', borderRadius: '12px', textAlign: 'center', color: '#94a3b8' }}>
          🎉 Caixa de entrada limpa! Nenhum tráfego não identificado.
        </div>
      ) : (
        items.map((item) => (
          <div key={item.id} style={{ background: '#1e293b', padding: '16px', borderRadius: '8px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '12px', background: '#334155', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>{item.midia}</span>
              <p style={{ margin: '8px 0 0', fontSize: '15px' }}>{item.conteudo}</p>
            </div>
            <div>
              <button onClick={() => onDiscard(item.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', marginLeft: '8px' }}>
                Descartar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
