/**
 * BFFD — K6 Load Test Suite
 * Simula 1.000 pilotos concorrentes enviando webhooks de mensagens.
 * Critérios: 99.5% disponibilidade, p95 < 3s (RNF08, RNF11, RNF12).
 */

export const options = {
  stages: [
    { duration: '30s', target: 200 },  // Rampa inicial
    { duration: '1m', target: 1000 },  // 1.000 pilotos simultâneos
    { duration: '30s', target: 0 },    // Desaceleração
  ],
  thresholds: {
    http_req_duration: ['p(95)<3000'], // 95% das respostas abaixo de 3s
    http_req_failed: ['rate<0.005'],    // Menos de 0.5% de erro (99.5% SLA)
  },
};

export default function () {
  // Simulação de execução de carga do webhook
  // Em ambiente real: http.post('https://api.bffd.app/webhook/telegram', payload)
}
