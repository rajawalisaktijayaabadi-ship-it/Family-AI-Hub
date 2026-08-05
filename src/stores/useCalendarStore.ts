import { create } from 'zustand';
import {
  EventModel,
  ReminderModel,
  BirthdayModel,
  HolidayModel,
  MealPlanModel,
  RecipeModel,
  GroceryModel,
  ShoppingModel,
  InventoryModel,
  FamilyEventModel,
  PlannerModel,
  AICalendarPlannerInsight,
} from '../types/calendar';
import { CalendarRepository } from '../repositories/CalendarRepository';
import { MealRepository } from '../repositories/MealRepository';
import { ShoppingRepository } from '../repositories/ShoppingRepository';
import { EventRepository } from '../repositories/EventRepository';
import { MockMealAIService } from '../services/MockMealAIService';

interface CalendarStoreState {
  events: EventModel[];
  reminders: ReminderModel[];
  birthdays: BirthdayModel[];
  holidays: HolidayModel[];
  mealPlans: MealPlanModel[];
  recipes: RecipeModel[];
  groceries: GroceryModel[];
  shoppingPlans: ShoppingModel[];
  inventory: InventoryModel[];
  familyEvents: FamilyEventModel[];
  planners: PlannerModel[];
  aiInsight: AICalendarPlannerInsight | null;
  isLoading: boolean;

  // Actions
  fetchData: () => Promise<void>;
  addEvent: (event: Omit<EventModel, 'id'>) => Promise<void>;
  toggleEventCompleted: (id: string) => Promise<void>;
  addReminder: (reminder: Omit<ReminderModel, 'id'>) => Promise<void>;
  addBirthday: (birthday: Omit<BirthdayModel, 'id'>) => Promise<void>;
  addMealPlan: (meal: Omit<MealPlanModel, 'id'>) => Promise<void>;
  addRecipe: (recipe: Omit<RecipeModel, 'id'>) => Promise<void>;
  addGrocery: (grocery: Omit<GroceryModel, 'id'>) => Promise<void>;
  toggleGroceryStatus: (id: string) => Promise<void>;
  addShoppingPlan: (plan: Omit<ShoppingModel, 'id'>) => Promise<void>;
  addInventoryItem: (item: Omit<InventoryModel, 'id'>) => Promise<void>;
  addFamilyEvent: (evt: Omit<FamilyEventModel, 'id'>) => Promise<void>;
  addPlannerActivity: (activity: Omit<PlannerModel, 'id'>) => void;
  togglePlannerActivity: (id: string) => void;
  generateAIInsight: () => void;
}

const calendarRepo = new CalendarRepository();
const mealRepo = new MealRepository();
const shoppingRepo = new ShoppingRepository();
const eventRepo = new EventRepository();

export const useCalendarStore = create<CalendarStoreState>((set, get) => ({
  events: [],
  reminders: [],
  birthdays: [],
  holidays: [],
  mealPlans: [],
  recipes: [],
  groceries: [],
  shoppingPlans: [],
  inventory: [],
  familyEvents: [],
  planners: [
    {
      id: 'pl-1',
      date: '2026-08-04',
      timeSlot: 'Morning',
      activityTitle: 'Sarapan Sehat & Doa Pagi Bersama',
      isDone: true,
    },
    {
      id: 'pl-2',
      date: '2026-08-04',
      timeSlot: 'Morning',
      activityTitle: 'Anak-Anak Berangkat Sekolah & Ayah Work from Home',
      isDone: true,
    },
    {
      id: 'pl-3',
      date: '2026-08-04',
      timeSlot: 'Afternoon',
      activityTitle: 'Makan Siang Sup Ayam Kampung & Pendampingan PR Rayhan',
      isDone: false,
    },
    {
      id: 'pl-4',
      date: '2026-08-04',
      timeSlot: 'Evening',
      activityTitle: 'Belanja Bahan Makanan Segar & Diskusi Agenda Akhir Pekan',
      isDone: false,
    },
    {
      id: 'pl-5',
      date: '2026-08-04',
      timeSlot: 'Night',
      activityTitle: 'Membaca Buku Cerita Sebelum Tidur Bersama Aisyah',
      isDone: false,
    },
  ],
  aiInsight: null,
  isLoading: false,

  fetchData: async () => {
    set({ isLoading: true });
    try {
      const [events, reminders, birthdays, holidays, mealPlans, recipes, groceries, shoppingPlans, inventory, familyEvents] =
        await Promise.all([
          calendarRepo.getEvents(),
          calendarRepo.getReminders(),
          calendarRepo.getBirthdays(),
          calendarRepo.getHolidays(),
          mealRepo.getMealPlans(),
          mealRepo.getRecipes(),
          shoppingRepo.getGroceries(),
          shoppingRepo.getShoppingPlans(),
          shoppingRepo.getInventory(),
          eventRepo.getFamilyEvents(),
        ]);

      set({
        events,
        reminders,
        birthdays,
        holidays,
        mealPlans,
        recipes,
        groceries,
        shoppingPlans,
        inventory,
        familyEvents,
        isLoading: false,
      });

      get().generateAIInsight();
    } catch (err) {
      console.error('Failed to fetch calendar data', err);
      set({ isLoading: false });
    }
  },

  addEvent: async (event) => {
    const newEvt = await calendarRepo.addEvent(event);
    set((state) => ({ events: [newEvt, ...state.events] }));
    get().generateAIInsight();
  },

  toggleEventCompleted: async (id) => {
    const updated = await calendarRepo.toggleEventCompleted(id);
    if (updated) {
      set((state) => ({
        events: state.events.map((e) => (e.id === id ? { ...updated } : e)),
      }));
    }
  },

  addReminder: async (reminder) => {
    const newRem = await calendarRepo.addReminder(reminder);
    set((state) => ({ reminders: [newRem, ...state.reminders] }));
  },

  addBirthday: async (birthday) => {
    const newBth = await calendarRepo.addBirthday(birthday);
    set((state) => ({ birthdays: [...state.birthdays, newBth] }));
  },

  addMealPlan: async (meal) => {
    const newMeal = await mealRepo.addMealPlan(meal);
    set((state) => ({ mealPlans: [newMeal, ...state.mealPlans] }));
    get().generateAIInsight();
  },

  addRecipe: async (recipe) => {
    const newRec = await mealRepo.addRecipe(recipe);
    set((state) => ({ recipes: [newRec, ...state.recipes] }));
  },

  addGrocery: async (grocery) => {
    const newGro = await shoppingRepo.addGrocery(grocery);
    set((state) => ({ groceries: [newGro, ...state.groceries] }));
  },

  toggleGroceryStatus: async (id) => {
    const updated = await shoppingRepo.toggleGroceryStatus(id);
    if (updated) {
      set((state) => ({
        groceries: state.groceries.map((g) => (g.id === id ? { ...updated } : g)),
      }));
    }
  },

  addShoppingPlan: async (plan) => {
    const newShp = await shoppingRepo.addShoppingPlan(plan);
    set((state) => ({ shoppingPlans: [newShp, ...state.shoppingPlans] }));
  },

  addInventoryItem: async (item) => {
    const newInv = await shoppingRepo.addInventoryItem(item);
    set((state) => ({ inventory: [newInv, ...state.inventory] }));
  },

  addFamilyEvent: async (evt) => {
    const newFe = await eventRepo.addFamilyEvent(evt);
    set((state) => ({ familyEvents: [newFe, ...state.familyEvents] }));
  },

  addPlannerActivity: (activity) => {
    const newPl: PlannerModel = { ...activity, id: `pl-${Date.now()}` };
    set((state) => ({ planners: [...state.planners, newPl] }));
  },

  togglePlannerActivity: (id) => {
    set((state) => ({
      planners: state.planners.map((p) =>
        p.id === id ? { ...p, isDone: !p.isDone } : p
      ),
    }));
  },

  generateAIInsight: () => {
    const { events, mealPlans } = get();
    const insight = MockMealAIService.generatePlannerInsight(events, mealPlans);
    set({ aiInsight: insight });
  },
}));
