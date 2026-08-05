import { KnowledgeRepository } from '../repositories/KnowledgeRepository';
import { KnowledgeModel } from '../types/education';

export class KnowledgeService {
  private repo = new KnowledgeRepository();

  async fetchArticles(): Promise<KnowledgeModel[]> {
    return this.repo.getArticles();
  }

  async toggleFavorite(id: string): Promise<KnowledgeModel | undefined> {
    return this.repo.toggleFavorite(id);
  }

  async toggleBookmark(id: string): Promise<KnowledgeModel | undefined> {
    return this.repo.toggleBookmark(id);
  }
}
