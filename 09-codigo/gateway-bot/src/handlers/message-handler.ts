/**
 * BFFD — Message Handler
 * Processa mensagens de texto e áudio recebidas no bot e devolve confirmação imediata.
 * Referência: RF01, RF06.
 */

import { MediaTranscriber } from '../media-transcriber.js';

export interface TelegramIncomingMessage {
  telegramUserId: number;
  messageId: number;
  type: 'text' | 'voice' | 'photo';
  text?: string;
  audioBuffer?: Buffer;
}

export interface BotResponse {
  replyText: string;
  capturedContent: string;
  mediaType: string;
  destination: string;
}

export class MessageHandler {
  public static async handleMessage(msg: TelegramIncomingMessage): Promise<BotResponse> {
    let capturedContent = '';
    let mediaType = msg.type;

    if (msg.type === 'voice' && msg.audioBuffer) {
      const transcription = await MediaTranscriber.transcribeAudio(msg.audioBuffer);
      capturedContent = transcription.text;
    } else {
      capturedContent = msg.text || '';
    }

    // Regra RF06: resposta de 1 linha sem perguntas bloqueantes
    const replyText = 'Anotado e no radar! ✈️';

    return {
      replyText,
      capturedContent,
      mediaType,
      destination: 'inbox',
    };
  }
}
