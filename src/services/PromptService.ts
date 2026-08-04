import { PromptRepository } from '../repositories/PromptRepository';
import { PromptModel, PromptCategory } from '../types/ai';

export class PromptService {
  public static getAllPrompts(): PromptModel[] {
    return PromptRepository.getPrompts();
  }

  public static getFavoritePrompts(): PromptModel[] {
    return this.getAllPrompts().filter((p) => p.isFavorite);
  }

  public static getPinnedPrompts(): PromptModel[] {
    return this.getAllPrompts().filter((p) => p.isPinned);
  }

  public static getRecentPrompts(): PromptModel[] {
    return this.getAllPrompts().filter((p) => p.isRecent);
  }

  public static getPromptsByCategory(category: PromptCategory | 'Semua'): PromptModel[] {
    const all = this.getAllPrompts();
    if (category === 'Semua') return all;
    return all.filter((p) => p.category === category);
  }

  public static searchPrompts(query: string): PromptModel[] {
    const q = query.toLowerCase().trim();
    if (!q) return this.getAllPrompts();
    return this.getAllPrompts().filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.templateText.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  public static toggleFavorite(id: string): PromptModel[] {
    return PromptRepository.toggleFavoritePrompt(id);
  }

  public static togglePin(id: string): PromptModel[] {
    return PromptRepository.togglePinPrompt(id);
  }

  public static createCustomPrompt(
    title: string,
    description: string,
    category: PromptCategory,
    templateText: string,
    tags: string[],
    quickCommand?: string
  ): PromptModel {
    return PromptRepository.addPrompt(title, description, category, templateText, tags, quickCommand);
  }
}
