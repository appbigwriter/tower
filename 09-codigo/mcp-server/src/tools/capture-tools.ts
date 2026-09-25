import { z } from 'zod';

export const CaptureSchemas = {
  registrarCaptura: z.object({
    midia: z.enum(['texto', 'audio', 'imagem', 'documento']).default('texto'),
    conteudo: z.string().min(1, 'Conteúdo não pode ser vazio'),
    transcricao: z.string().optional(),
    tipo: z.enum(['ideia', 'tarefa', 'decisao', 'referencia', 'bloqueio', 'progresso']).default('ideia'),
    confianca: z.number().min(0).max(1).optional(),
    vooId: z.string().uuid().optional(),
    storagePath: z.string().optional(),
  }),

  vincularCaptura: z.object({
    capturaId: z.string().uuid(),
    vooId: z.string().uuid(),
    tipo: z.enum(['ideia', 'tarefa', 'decisao', 'referencia', 'bloqueio', 'progresso']).optional(),
  }),
};

export class CaptureToolsHandler {
  public static handleRegistrarCaptura(params: z.infer<typeof CaptureSchemas.registrarCaptura>) {
    const isLinked = !!params.vooId;
    return {
      status: 'success',
      destino: isLinked ? `Voo vinculado (${params.vooId})` : 'Caixa de Entrada (Inbox)',
      message: isLinked
        ? 'Anotado e anexado ao voo! ✈️'
        : 'Captura salva com sucesso no radar da Caixa de Entrada.',
      dados: params,
    };
  }

  public static handleVincularCaptura(params: z.infer<typeof CaptureSchemas.vincularCaptura>) {
    return {
      status: 'success',
      capturaId: params.capturaId,
      vooId: params.vooId,
      message: 'Captura vinculada com sucesso ao voo! 🚀',
    };
  }
}
