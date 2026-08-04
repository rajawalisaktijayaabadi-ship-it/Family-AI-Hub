import React, { useState } from 'react';
import { useHealthStore } from '../../stores/useHealthStore';
import { FoodDiaryModel } from '../../types/health';
import {
  Apple,
  Plus,
  Utensils,
  Calculator,
  Target,
  Flame,
  Salad,
  Sparkles,
} from 'lucide-react';

export const NutritionAndFoodDiaryModule: React.FC = () => {
  const {
    profiles,
    selectedMemberId,
    foodDiary,
    goal,
    addFoodEntry,
    saveGoal,
  } = useHealthStore();

  const activeProfile = profiles.find((p) => p.memberId === selectedMemberId) || profiles[0];

  // Modals state
  const [showAddFood, setShowAddFood] = useState(false);
  const [mealType, setMealType] = useState<FoodDiaryModel['mealType']>('Sarapan');
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState(350);
  const [protein, setProtein] = useState(15);
  const [carbs, setCarbs] = useState(40);
  const [fat, setFat] = useState(10);

  const [showGoalModal, setShowGoalModal] = useState(false);
  const [targetWeight, setTargetWeight] = useState(goal?.targetWeightKg || 65);
  const [targetCalories, setTargetCalories] = useState(goal?.targetDailyCalories || 2100);

  const totalCaloriesToday = foodDiary.reduce((sum, f) => sum + f.calories, 0);
  const totalProteinToday = foodDiary.reduce((sum, f) => sum + f.proteinGrams, 0);
  const totalCarbsToday = foodDiary.reduce((sum, f) => sum + f.carbsGrams, 0);
  const totalFatToday = foodDiary.reduce((sum, f) => sum + f.fatGrams, 0);

  const handleCreateFood = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodName || !activeProfile) return;

    await addFoodEntry({
      memberId: activeProfile.memberId,
      date: new Date().toISOString().split('T')[0],
      mealType,
      foodName,
      calories: Number(calories),
      proteinGrams: Number(protein),
      carbsGrams: Number(carbs),
      fatGrams: Number(fat),
      fiberGrams: 4,
    });

    setShowAddFood(false);
    setFoodName('');
  };

  const handleSaveGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProfile) return;

    await saveGoal({
      id: goal?.id || `hg-${Date.now()}`,
      memberId: activeProfile.memberId,
      targetWeightKg: Number(targetWeight),
      targetDailySteps: 10000,
      targetSleepHours: 7.5,
      targetWaterMl: 2500,
      targetDailyCalories: Number(targetCalories),
    });

    setShowGoalModal(false);
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Nutrition Summary */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
              <Apple className="w-4 h-4 text-emerald-500" /> Ringkasan Nutrisi Harian ({activeProfile?.memberName})
            </h4>
            <span className="text-[10px] text-slate-400 font-bold">
              Asupan Kalori & Makronutrisi (Protein, Karbo, Lemak)
            </span>
          </div>

          <button
            onClick={() => setShowGoalModal(true)}
            className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400"
          >
            Atur Target
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
          <div className="p-2.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[9px] text-slate-400 block font-sans">Kalori</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400">{totalCaloriesToday}</span>
            <span className="text-[8px] text-slate-400 block font-sans">/ {goal?.targetDailyCalories || 2100} kcal</span>
          </div>

          <div className="p-2.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[9px] text-slate-400 block font-sans">Protein</span>
            <span className="font-mono text-blue-600 dark:text-blue-400">{totalProteinToday}g</span>
            <span className="text-[8px] text-slate-400 block font-sans">Target 60g</span>
          </div>

          <div className="p-2.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[9px] text-slate-400 block font-sans">Karbo</span>
            <span className="font-mono text-amber-600 dark:text-amber-400">{totalCarbsToday}g</span>
            <span className="text-[8px] text-slate-400 block font-sans">Target 220g</span>
          </div>

          <div className="p-2.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[9px] text-slate-400 block font-sans">Lemak</span>
            <span className="font-mono text-purple-600 dark:text-purple-400">{totalFatToday}g</span>
            <span className="text-[8px] text-slate-400 block font-sans">Target 50g</span>
          </div>
        </div>
      </div>

      {/* Food Diary Log */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
              <Utensils className="w-4 h-4 text-amber-500" /> Jurnal Makanan (Food Diary)
            </h4>
            <span className="text-[10px] text-slate-400 font-bold">
              Catatan sarapan, makan siang, makan malam & cemilan
            </span>
          </div>

          <button
            onClick={() => setShowAddFood(true)}
            className="px-3 py-1.5 rounded-xl bg-amber-600 text-white text-[11px] font-bold shadow-2xs flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Catat Makanan
          </button>
        </div>

        <div className="space-y-2">
          {foodDiary.map((f) => (
            <div
              key={f.id}
              className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between"
            >
              <div>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-[9px] font-bold">
                  {f.mealType}
                </span>
                <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">
                  {f.foodName}
                </h5>
                <span className="text-[10px] font-mono text-slate-400 block">
                  P: {f.proteinGrams}g • K: {f.carbsGrams}g • L: {f.fatGrams}g
                </span>
              </div>

              <span className="text-xs font-black font-mono text-emerald-600 dark:text-emerald-400">
                +{f.calories} kcal
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Add Food */}
      {showAddFood && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-heading">
              Catat Menu Makanan ({activeProfile?.memberName})
            </h3>

            <form onSubmit={handleCreateFood} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Menu / Nama Makanan
                </label>
                <input
                  type="text"
                  required
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  placeholder="Nasi Goreng Ayam + Telur"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Waktu Makan
                  </label>
                  <select
                    value={mealType}
                    onChange={(e) =>
                      setMealType(e.target.value as FoodDiaryModel['mealType'])
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  >
                    <option value="Sarapan">Sarapan</option>
                    <option value="Makan Siang">Makan Siang</option>
                    <option value="Makan Malam">Makan Malam</option>
                    <option value="Snack">Snack</option>
                    <option value="Minuman">Minuman</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Kalori (kcal)
                  </label>
                  <input
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Protein (g)
                  </label>
                  <input
                    type="number"
                    value={protein}
                    onChange={(e) => setProtein(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Karbo (g)
                  </label>
                  <input
                    type="number"
                    value={carbs}
                    onChange={(e) => setCarbs(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Lemak (g)
                  </label>
                  <input
                    type="number"
                    value={fat}
                    onChange={(e) => setFat(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddFood(false)}
                  className="px-4 py-2 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold bg-amber-600 text-white shadow-md"
                >
                  Simpan Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Goal Setup */}
      {showGoalModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-heading">
              Atur Target Nutrisi & Kesehatan ({activeProfile?.memberName})
            </h3>

            <form onSubmit={handleSaveGoal} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Target Berat Badan (kg)
                </label>
                <input
                  type="number"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Target Kalori Harian (kcal)
                </label>
                <input
                  type="number"
                  value={targetCalories}
                  onChange={(e) => setTargetCalories(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGoalModal(false)}
                  className="px-4 py-2 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold bg-emerald-600 text-white shadow-md"
                >
                  Simpan Target
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
