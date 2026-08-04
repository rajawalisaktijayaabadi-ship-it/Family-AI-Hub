import { FoodDiaryModel } from '../types/health';

const initialFoodDiaries: FoodDiaryModel[] = [
  {
    id: 'food-1',
    memberId: 'm-1',
    date: '2026-08-04',
    mealType: 'Sarapan',
    foodName: 'Nasi Merah + Telur Dada Dadar + Sup Sayur',
    calories: 380,
    proteinGrams: 18,
    carbsGrams: 45,
    fatGrams: 12,
    fiberGrams: 6,
    notes: 'Sarapan bergizi seimbang',
  },
  {
    id: 'food-2',
    memberId: 'm-1',
    date: '2026-08-04',
    mealType: 'Makan Siang',
    foodName: 'Ayam Bakar + Tumis Kangkung + Nasi Putih',
    calories: 520,
    proteinGrams: 32,
    carbsGrams: 60,
    fatGrams: 15,
    fiberGrams: 4,
  },
  {
    id: 'food-3',
    memberId: 'm-1',
    date: '2026-08-04',
    mealType: 'Snack',
    foodName: 'Buah Apel + Jus Alpukat Tanpa Gula',
    calories: 180,
    proteinGrams: 3,
    carbsGrams: 28,
    fatGrams: 8,
    fiberGrams: 5,
  },
];

export class NutritionRepository {
  private foodEntries: FoodDiaryModel[] = [...initialFoodDiaries];

  async getFoodDiary(memberId: string, date?: string): Promise<FoodDiaryModel[]> {
    return this.foodEntries.filter((f) => {
      const matchMember = f.memberId === memberId;
      const matchDate = date ? f.date === date : true;
      return matchMember && matchDate;
    });
  }

  async addFoodEntry(entry: Omit<FoodDiaryModel, 'id'>): Promise<FoodDiaryModel> {
    const newEntry: FoodDiaryModel = {
      ...entry,
      id: `food-${Date.now()}`,
    };
    this.foodEntries.unshift(newEntry);
    return newEntry;
  }
}
