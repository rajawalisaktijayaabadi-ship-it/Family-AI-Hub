import { ChildRepository } from '../repositories/ChildRepository';
import { ChildModel, DevelopmentModel } from '../types/parenting';

export class ChildService {
  private repo = new ChildRepository();

  public async fetchChildren(): Promise<ChildModel[]> {
    return this.repo.getChildren();
  }

  public async createChild(data: Omit<ChildModel, 'id' | 'createdAt'>): Promise<ChildModel> {
    return this.repo.addChild(data);
  }

  public async fetchDevelopment(childId: string): Promise<DevelopmentModel | undefined> {
    return this.repo.getDevelopment(childId);
  }

  public async saveDevelopment(
    childId: string,
    updates: Partial<DevelopmentModel>
  ): Promise<DevelopmentModel> {
    return this.repo.updateDevelopment(childId, updates);
  }
}
