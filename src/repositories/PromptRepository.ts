import { PromptModel, PromptCategory } from '../types/ai';
import { DEFAULT_PROMPTS } from '../core/aiConstants';

const PROMPTS_CACHE_KEY = 'family_ai_prompts_v1';

export class PromptRepository {
  public static getPrompts(): PromptModel[] {
    try {
      const cached = localStorage.getItem(PROMPTS_CACHE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (err) {
      console.warn('Error loading prompts:', err);
    }
    localStorage.setItem(PROMPTS_CACHE_KEY, JSON.stringify(DEFAULT_PROMPTS));
    return DEFAULT_PROMPTS;
  }

  public static savePrompts(prompts: PromptModel[]): void {
    try {
      localStorage.setItem(PROMPTS_CACHE_KEY, JSON.stringify(prompts));
    } catch (err) {
      console.error('Failed to save prompts:', err);
    }
  }

  public static toggleFavoritePrompt(id: string): PromptModel[] {
    const prompts = this.getPrompts();
    const updated = prompts.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
    this.savePrompts(updated);
    return updated;
  }

  public static togglePinPrompt(id: string): PromptModel[] {
    const prompts = this.getPrompts();
    const updated = prompts.map((p) => (p.id === id ? { ...p, isPinned: !p.isPinned } : p));
    this.savePrompts(updated);
    return updated;
  }

  public static addPrompt(
    title: string,
    description: string,
    category: PromptCategory,
    templateText: string,
    tags: string[],
    quickCommand?: string
  ): PromptModel {
    const prompts = this.getPrompts();
    const newPrompt: PromptModel = {
      id: `prompt_${Date.now()}`,
      title,
      description,
      category,
      templateText,
      isFavorite: false,
      isPinned: false,
      isRecent: true,
      tags,
      quickCommand,
    };
    const updated = [newPrompt, ...prompts];
    this.savePrompts(updated);
    return newPrompt;
  }
}
