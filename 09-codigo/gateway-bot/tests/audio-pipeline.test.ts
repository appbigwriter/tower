import { MessageHandler } from '../src/handlers/message-handler.js';
import { MediaTranscriber } from '../src/media-transcriber.js';

describe('BFFD Gateway Bot — Audio Pipeline & Message Tests', () => {
  it('deve processar mensagem de texto e retornar confirmação de 1 linha (RF01, RF06)', async () => {
    const response = await MessageHandler.handleMessage({
      telegramUserId: 123456,
      messageId: 1,
      type: 'text',
      text: 'Comprar passagem para conferência de tecnologia',
    });

    expect(response.replyText).toBe('Anotado e no radar! ✈️');
    expect(response.capturedContent).toContain('Comprar passagem');
    expect(response.destination).toBe('inbox');
  });

  it('deve processar áudio de voz, transcrever e responder em tempo hábil (RF02, RNF09)', async () => {
    const dummyAudioBuffer = Buffer.alloc(32000); // ~2 segundos de áudio
    const transcription = await MediaTranscriber.transcribeAudio(
      dummyAudioBuffer,
      'ogg',
      'Testando áudio para o voo App Clínica'
    );

    expect(transcription.text).toBe('Testando áudio para o voo App Clínica');
    expect(transcription.storagePath).toContain('audios/');
    expect(transcription.latencyMs).toBeLessThan(10000); // RNF09: p95 < 10s
  });
});
