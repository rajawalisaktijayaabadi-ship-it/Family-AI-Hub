import { AISettingsModel, AIMemoryModel, AIContextModel, RAGSearchResult } from '../../types/ai';

export interface AICompletionOptions {
  prompt: string;
  systemInstruction?: string;
  context?: AIContextModel;
  memories?: AIMemoryModel[];
  ragDocs?: RAGSearchResult[];
  category?: string;
  language?: 'id' | 'en';
  tone?: 'ramah' | 'profesional' | 'santai' | 'edukatif';
  temperature?: number;
  onStreamChunk?: (chunk: string) => void;
}

export interface AICompletionResult {
  text: string;
  modelUsed: string;
  tokensUsed?: number;
  timestamp: string;
}

export interface AIProvider {
  id: string;
  name: string;
  generateChat(options: AICompletionOptions): Promise<AICompletionResult>;
  analyzeStructured(moduleType: string, payload: any): Promise<any>;
}
