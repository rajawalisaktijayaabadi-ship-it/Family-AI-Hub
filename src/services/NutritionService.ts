import { NutritionRepository } from '../repositories/NutritionRepository';
import { FoodDiaryModel } from '../types/health';

export class NutritionService {
  private repo = new NutritionRepository();

  async fetchFoodDiary(memberId: string, date?: string): Promise<FoodDiaryModel[]> {
    return this.repo.getFoodDiary(memberId, date);
  }

  async addFoodEntry(entry: Omit<FoodDiaryModel, 'id'>): Promise<FoodDiaryModel> {
    return this.repo.addFoodEntry(entry);
  }
}
