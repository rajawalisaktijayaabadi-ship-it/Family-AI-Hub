import { create } from 'zustand';
import {
  HealthProfileModel,
  MedicalRecordModel,
  MedicationModel,
  VaccinationModel,
  HealthCheckupModel,
  WellnessModel,
  SleepModel,
  WaterModel,
  FoodDiaryModel,
  HealthGoalModel,
  ReminderModel,
  AIHealthInsight,
} from '../types/health';
import { HealthService } from '../services/HealthService';
import { MedicalService } from '../services/MedicalService';
import { MedicationService } from '../services/MedicationService';
import { NutritionService } from '../services/NutritionService';
import { ReminderService } from '../services/ReminderService';
import { MockHealthAIService } from '../services/MockHealthAIService';

interface HealthState {
  profiles: HealthProfileModel[];
  selectedMemberId: string;
  medicalRecords: MedicalRecordModel[];
  medications: MedicationModel[];
  vaccinations: VaccinationModel[];
  checkups: HealthCheckupModel[];
  wellness: WellnessModel | undefined;
  sleep: SleepModel | undefined;
  water: WaterModel | undefined;
  foodDiary: FoodDiaryModel[];
  reminders: ReminderModel[];
  goal: HealthGoalModel | undefined;
  aiInsight: AIHealthInsight | undefined;
  isLoading: boolean;
  searchQuery: string;

  // Actions
  initialize: () => Promise<void>;
  setSelectedMemberId: (memberId: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  addMedicalRecord: (record: Omit<MedicalRecordModel, 'id'>) => Promise<void>;
  addVaccination: (vac: Omit<VaccinationModel, 'id'>) => Promise<void>;
  addMedication: (med: Omit<MedicationModel, 'id'>) => Promise<void>;
  toggleReminder: (id: string) => Promise<void>;
  addReminder: (rem: Omit<ReminderModel, 'id' | 'isCompletedToday'>) => Promise<void>;
  addWater: (amountMl: number) => Promise<void>;
  addSteps: (steps: number) => Promise<void>;
  addCheckup: (checkup: Omit<HealthCheckupModel, 'id'>) => Promise<void>;
  addFoodEntry: (entry: Omit<FoodDiaryModel, 'id'>) => Promise<void>;
  saveGoal: (goal: HealthGoalModel) => Promise<void>;
}

const healthService = new HealthService();
const medicalService = new MedicalService();
const medicationService = new MedicationService();
const nutritionService = new NutritionService();
const reminderService = new ReminderService();

export const useHealthStore = create<HealthState>((set, get) => ({
  profiles: [],
  selectedMemberId: 'm-1',
  medicalRecords: [],
  medications: [],
  vaccinations: [],
  checkups: [],
  wellness: undefined,
  sleep: undefined,
  water: undefined,
  foodDiary: [],
  reminders: [],
  goal: undefined,
  aiInsight: undefined,
  isLoading: false,
  searchQuery: '',

  initialize: async () => {
    set({ isLoading: true });
    try {
      const profiles = await healthService.fetchProfiles();
      const selectedMemberId = get().selectedMemberId || profiles[0]?.memberId || 'm-1';

      const medicalRecords = await medicalService.fetchMedicalRecords(selectedMemberId);
      const medications = await medicationService.fetchMedications(selectedMemberId);
      const vaccinations = await medicalService.fetchVaccinations(selectedMemberId);
      const checkups = await healthService.fetchCheckups(selectedMemberId);
      const wellness = await healthService.fetchWellness(selectedMemberId);
      const sleep = await healthService.fetchSleep(selectedMemberId);
      const water = await healthService.fetchWater(selectedMemberId);
      const foodDiary = await nutritionService.fetchFoodDiary(selectedMemberId);
      const reminders = await reminderService.fetchReminders(selectedMemberId);
      const goal = await healthService.fetchGoal(selectedMemberId);

      const profile = profiles.find((p) => p.memberId === selectedMemberId);
      const aiInsight = MockHealthAIService.getInsight(profile, checkups[0], wellness);

      set({
        profiles,
        selectedMemberId,
        medicalRecords,
        medications,
        vaccinations,
        checkups,
        wellness,
        sleep,
        water,
        foodDiary,
        reminders,
        goal,
        aiInsight,
        isLoading: false,
      });
    } catch (e) {
      console.error('Failed initializing health store:', e);
      set({ isLoading: false });
    }
  },

  setSelectedMemberId: async (selectedMemberId: string) => {
    set({ selectedMemberId, isLoading: true });
    const medicalRecords = await medicalService.fetchMedicalRecords(selectedMemberId);
    const medications = await medicationService.fetchMedications(selectedMemberId);
    const vaccinations = await medicalService.fetchVaccinations(selectedMemberId);
    const checkups = await healthService.fetchCheckups(selectedMemberId);
    const wellness = await healthService.fetchWellness(selectedMemberId);
    const sleep = await healthService.fetchSleep(selectedMemberId);
    const water = await healthService.fetchWater(selectedMemberId);
    const foodDiary = await nutritionService.fetchFoodDiary(selectedMemberId);
    const reminders = await reminderService.fetchReminders(selectedMemberId);
    const goal = await healthService.fetchGoal(selectedMemberId);

    const profile = get().profiles.find((p) => p.memberId === selectedMemberId);
    const aiInsight = MockHealthAIService.getInsight(profile, checkups[0], wellness);

    set({
      medicalRecords,
      medications,
      vaccinations,
      checkups,
      wellness,
      sleep,
      water,
      foodDiary,
      reminders,
      goal,
      aiInsight,
      isLoading: false,
    });
  },

  setSearchQuery: (searchQuery: string) => set({ searchQuery }),

  addMedicalRecord: async (record) => {
    const newRec = await medicalService.addMedicalRecord(record);
    set((state) => ({ medicalRecords: [newRec, ...state.medicalRecords] }));
  },

  addVaccination: async (vac) => {
    const newVac = await medicalService.addVaccination(vac);
    set((state) => ({ vaccinations: [newVac, ...state.vaccinations] }));
  },

  addMedication: async (med) => {
    const newMed = await medicationService.addMedication(med);
    set((state) => ({ medications: [newMed, ...state.medications] }));
  },

  toggleReminder: async (id: string) => {
    const updated = await reminderService.toggleReminder(id);
    if (updated) {
      set((state) => ({
        reminders: state.reminders.map((r) => (r.id === id ? { ...r, isCompletedToday: updated.isCompletedToday } : r)),
      }));
    }
  },

  addReminder: async (rem) => {
    const newRem = await reminderService.addReminder(rem);
    set((state) => ({ reminders: [newRem, ...state.reminders] }));
  },

  addWater: async (amountMl: number) => {
    const memberId = get().selectedMemberId;
    const water = await healthService.addWater(memberId, amountMl);
    set({ water });
  },

  addSteps: async (steps: number) => {
    const memberId = get().selectedMemberId;
    const wellness = await healthService.addSteps(memberId, steps);
    set({ wellness });
  },

  addCheckup: async (checkup) => {
    const newHc = await healthService.addCheckup(checkup);
    set((state) => ({ checkups: [newHc, ...state.checkups] }));
  },

  addFoodEntry: async (entry) => {
    const newFood = await nutritionService.addFoodEntry(entry);
    set((state) => ({ foodDiary: [newFood, ...state.foodDiary] }));
  },

  saveGoal: async (goal) => {
    const saved = await healthService.saveGoal(goal);
    set({ goal: saved });
  },
}));
