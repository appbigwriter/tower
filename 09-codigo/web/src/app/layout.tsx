import React from 'react';

export const metadata = {
  title: 'BFFD — Bring the Flights to the Final Destination',
  description: 'Controle de tráfego aéreo pessoal para mentes com TDAH',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, padding: 0, background: '#0f172a', color: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
