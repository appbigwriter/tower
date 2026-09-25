import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { FlightToolsHandler, FlightSchemas } from './tools/flight-tools.js';
import { CaptureToolsHandler, CaptureSchemas } from './tools/capture-tools.js';

const server = new Server(
  {
    name: 'bffd-traffic-control-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 1. Listar Ferramentas MCP expostas para a Bia Torres
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'registrar_captura',
        description: 'Salva uma nova captura de texto, áudio ou imagem no radar da Caixa de Entrada ou anexada a um voo.',
        inputSchema: {
          type: 'object',
          properties: {
            conteudo: { type: 'string', description: 'Texto da captura ou transcrição' },
            midia: { type: 'string', enum: ['texto', 'audio', 'imagem', 'documento'] },
            tipo: { type: 'string', enum: ['ideia', 'tarefa', 'decisao', 'referencia', 'bloqueio', 'progresso'] },
            vooId: { type: 'string', description: 'UUID do voo opcional se já identificado' },
          },
          required: ['conteudo'],
        },
      },
      {
        name: 'criar_rascunho',
        description: 'Cria um voo em estágio de Rascunho após confirmação do piloto.',
        inputSchema: {
          type: 'object',
          properties: {
            nome: { type: 'string', description: 'Nome do voo/projeto' },
            categoria: { type: 'string', enum: ['profissional', 'pessoal'] },
            motivo: { type: 'string', description: 'Por que este voo importa (propósito)' },
          },
          required: ['nome'],
        },
      },
      {
        name: 'mudar_estagio',
        description: 'Move um voo entre estágios aplicando as regras de espaço aéreo (RN01 a RN08).',
        inputSchema: {
          type: 'object',
          properties: {
            vooId: { type: 'string' },
            estagioAtual: { type: 'string' },
            novoEstagio: { type: 'string' },
            categoria: { type: 'string', enum: ['profissional', 'pessoal'] },
            activeFlightsCount: { type: 'number', description: 'Quantidade de voos ativos na categoria' },
          },
          required: ['vooId', 'estagioAtual', 'novoEstagio', 'categoria'],
        },
      },
      {
        name: 'criar_voo_curto',
        description: 'Registra um voo curto (demanda urgente para pousar no mesmo dia, máx 2/dia).',
        inputSchema: {
          type: 'object',
          properties: {
            nome: { type: 'string', description: 'Nome do voo curto' },
            minutos: { type: 'number', description: 'Duração estimada em minutos' },
            todayShortFlightsCount: { type: 'number', description: 'Quantidade de voos curtos já feitos hoje' },
          },
          required: ['nome'],
        },
      },
    ],
  };
});

// 2. Executar Chamada de Ferramenta
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'registrar_captura': {
        const parsed = CaptureSchemas.registrarCaptura.parse(args);
        const result = CaptureToolsHandler.handleRegistrarCaptura(parsed);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      }

      case 'criar_rascunho': {
        const parsed = FlightSchemas.criarRascunho.parse(args);
        const result = FlightToolsHandler.handleCriarRascunho(parsed);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      }

      case 'mudar_estagio': {
        const parsed = FlightSchemas.mudarEstagio.parse(args);
        const result = FlightToolsHandler.handleMudarEstagio(parsed);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      }

      case 'criar_voo_curto': {
        const parsed = FlightSchemas.criarVooCurto.parse(args);
        const result = FlightToolsHandler.handleCriarVooCurto(parsed);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      }

      default:
        throw new Error(`Ferramenta desconhecida: ${name}`);
    }
  } catch (error: any) {
    return {
      content: [{ type: 'text', text: JSON.stringify({ status: 'error', message: error.message }) }],
      isError: true,
    };
  }
});

// Inicialização via STDIO
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error('Falha ao iniciar MCP Server BFFD:', err);
  process.exit(1);
});
