import { AIContextModel, AIMemoryModel, RAGSearchResult } from '../../types/ai';

export class PromptEngineService {
  static sanitizeInput(input: string): string {
    // Remove potential prompt injection payloads or malicious system overrides
    return input
      .replace(/system instruction:/gi, '[sanitized]')
      .replace(/ignore previous instructions/gi, '[sanitized]')
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  }

  static buildSystemPrompt(
    category: string = 'Umum',
    language: string = 'id',
    tone: string = 'ramah'
  ): string {
    return `Anda adalah FamilyAI Assistant, asisten AI resmi keluarga Indonesia.
- Bahasa: ${language === 'id' ? 'Bahasa Indonesia yang santun, hangat, dan mudah dipahami' : 'English'}
- Tone: ${tone}
- Fokus Kategori: ${category}
- Kepribadian: Solutif, suportif, berorientasi pada keharmonisan keluarga.
- Privasi: Menjaga kerahasiaan data keluarga.
`;
  }

  static enrichUserPrompt(
    userText: string,
    context?: AIContextModel,
    memories: AIMemoryModel[] = [],
    ragDocs: RAGSearchResult[] = []
  ): string {
    const sanitizedText = this.sanitizeInput(userText);
    let prompt = sanitizedText;

    if (context) {
      prompt = `[KONTEKS AKTIF KELUARGA]
Keluarga: ${context.familyName} (${context.memberCount} Anggota)
Layar Saat Ini: ${context.currentScreen || 'General'}
Skor Kesehatan: ${context.healthOverview?.score}%
Status Keuangan: Budget M:${context.financeOverview?.monthlyBudget.toLocaleString('id-ID')} / Terpakai: ${context.financeOverview?.spent.toLocaleString('id-ID')}
Mood Utama: ${context.moodOverview?.dominantMood}

${prompt}`;
    }

    if (memories.length > 0) {
      const memoryLines = memories.map((m) => `- ${m.key}: ${m.value}`).join('\n');
      prompt = `[MEMORI KELUARGA TERPINNED]
${memoryLines}

${prompt}`;
    }

    if (ragDocs.length > 0) {
      const ragLines = ragDocs.map((d) => `[${d.title}] ${d.content}`).join('\n');
      prompt = `[KNOWLEDGE & REFERENSI TERKAIT]
${ragLines}

${prompt}`;
    }

    return prompt;
  }
}
