import { MealPlanModel, RecipeModel } from '../types/calendar';
import { MockMealAIService } from '../services/MockMealAIService';

const initialMealPlans: MealPlanModel[] = [
  {
    id: 'mp-1',
    date: '2026-08-04',
    mealType: 'Breakfast',
    recipeName: 'Oatmeal Pisang Madu & Telur Rebus',
    caloriesEstimate: 310,
    assignedMember: 'Ibu',
  },
  {
    id: 'mp-2',
    date: '2026-08-04',
    mealType: 'Lunch',
    recipeName: 'Sup Ayam Kampung Bumbu Jahe Penambah Imun',
    caloriesEstimate: 320,
    assignedMember: 'Ibu',
  },
  {
    id: 'mp-3',
    date: '2026-08-04',
    mealType: 'Dinner',
    recipeName: 'Tumis Tempe Tahu Bumbu Kecap Hemat',
    caloriesEstimate: 280,
    assignedMember: 'Ayah',
  },
  {
    id: 'mp-4',
    date: '2026-08-05',
    mealType: 'Breakfast',
    recipeName: 'Nasi Goreng Sayur Pelangi Favorit Anak',
    caloriesEstimate: 410,
    assignedMember: 'Ibu',
  },
];

export class MealRepository {
  private mealPlans: MealPlanModel[] = [...initialMealPlans];
  private recipes: RecipeModel[] = MockMealAIService.getRecommendedRecipes();

  async getMealPlans(): Promise<MealPlanModel[]> {
    return this.mealPlans;
  }

  async addMealPlan(plan: Omit<MealPlanModel, 'id'>): Promise<MealPlanModel> {
    const newMp: MealPlanModel = { ...plan, id: `mp-${Date.now()}` };
    this.mealPlans.unshift(newMp);
    return newMp;
  }

  async getRecipes(): Promise<RecipeModel[]> {
    return this.recipes;
  }

  async addRecipe(recipe: Omit<RecipeModel, 'id'>): Promise<RecipeModel> {
    const newRec: RecipeModel = { ...recipe, id: `rec-${Date.now()}` };
    this.recipes.unshift(newRec);
    return newRec;
  }
}
