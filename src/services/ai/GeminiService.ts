import { AIProviderFactory } from './AIProviderFactory';
import { AIContextService } from './AIContextService';
import { AIMemoryService } from './AIMemoryService';
import { RAGService } from './RAGService';
import { PromptEngineService } from './PromptEngineService';
import { AICompletionResult, AICompletionOptions } from './AIProvider';

export class GeminiService {
  static async generateAssistantResponse(
    userText: string,
    options: {
      category?: string;
      language?: 'id' | 'en';
      tone?: 'ramah' | 'profesional' | 'santai' | 'edukatif';
      currentScreen?: string;
      onStreamChunk?: (chunk: string) => void;
    } = {}
  ): Promise<AICompletionResult> {
    const provider = AIProviderFactory.getProvider('gemini');

    // 1. Gather Context
    const pinnedMemories = AIMemoryService.getPinnedMemories();
    const context = AIContextService.getContext(options.currentScreen || 'chat', pinnedMemories);

    // 2. Retrieve Relevant Memories & RAG Knowledge
    const relevantMemories = AIMemoryService.searchMemories(userText);
    const ragDocs = RAGService.retrieveRelevantDocs(userText, 2);

    // 3. Build Prompts
    const systemInstruction = PromptEngineService.buildSystemPrompt(
      options.category || 'Umum',
      options.language || 'id',
      options.tone || 'ramah'
    );

    const completionOptions: AICompletionOptions = {
      prompt: PromptEngineService.sanitizeInput(userText),
      systemInstruction,
      context,
      memories: relevantMemories,
      ragDocs,
      category: options.category || 'Umum',
      language: options.language || 'id',
      tone: options.tone || 'ramah',
      onStreamChunk: options.onStreamChunk,
    };

    // 4. Generate Response via Provider
    return await provider.generateChat(completionOptions);
  }

  static async analyzeModule(moduleType: string, payload: any): Promise<any> {
    const provider = AIProviderFactory.getProvider('gemini');
    return await provider.analyzeStructured(moduleType, payload);
  }
}
