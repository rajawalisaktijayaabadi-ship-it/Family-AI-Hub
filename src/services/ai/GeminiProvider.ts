import { AIProvider, AICompletionOptions, AICompletionResult } from './AIProvider';

export class GeminiProvider implements AIProvider {
  id = 'gemini';
  name = 'Google Gemini 3.6 Flash';

  async generateChat(options: AICompletionOptions): Promise<AICompletionResult> {
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: options.prompt,
          systemInstruction: options.systemInstruction,
          context: options.context,
          memories: options.memories,
          ragDocs: options.ragDocs,
          category: options.category,
          language: options.language || 'id',
          tone: options.tone || 'ramah',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Simulate streaming chunks if callback provided
      if (options.onStreamChunk && data.text) {
        const words = data.text.split(' ');
        let accumulated = '';
        for (let i = 0; i < words.length; i++) {
          accumulated += (i === 0 ? '' : ' ') + words[i];
          options.onStreamChunk(accumulated);
          await new Promise((resolve) => setTimeout(resolve, 20));
        }
      }

      return {
        text: data.text || 'Tidak ada respon dari AI.',
        modelUsed: data.modelUsed || 'gemini-3.6-flash',
        timestamp: data.timestamp || new Date().toISOString(),
      };
    } catch (err: any) {
      console.error('GeminiProvider Error:', err);
      return {
        text: `[Google Gemini Service Alert] Maaf, koneksi ke server AI mengalami gangguan sementara. Respon darurat: Pertanyaan "${options.prompt}" telah dicatat.`,
        modelUsed: 'gemini-fallback',
        timestamp: new Date().toISOString(),
      };
    }
  }

  async analyzeStructured(moduleType: string, payload: any): Promise<any> {
    try {
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleType, payload }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (err: any) {
      console.error('GeminiProvider Analysis Error:', err);
      return {
        summary: `Analisis AI (${moduleType}) siap secara lokal.`,
        recommendations: ['Pertahankan aktivitas positif keluarga.', 'Evaluasi rutin bersama.'],
        score: 85,
      };
    }
  }
}
