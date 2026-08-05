export type EventCategory =
  | 'Keluarga'
  | 'Sekolah'
  | 'Pekerjaan'
  | 'Kesehatan'
  | 'Keuangan'
  | 'Liburan'
  | 'Ulang Tahun'
  | 'Hari Jadi'
  | 'Belanja'
  | 'Lainnya';

export type ReminderFrequency = 'One Time' | 'Daily' | 'Weekly' | 'Monthly' | 'Yearly' | 'Custom';

export type FamilyEventCategory =
  | 'Family Gathering'
  | 'Vacation'
  | 'Birthday'
  | 'Meeting'
  | 'School Event'
  | 'Religious Event';

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

export type GroceryCategory =
  | 'Sayur'
  | 'Buah'
  | 'Daging'
  | 'Ikan'
  | 'Minuman'
  | 'Bumbu'
  | 'Snack'
  | 'Kebutuhan Rumah'
  | 'Lainnya';

export interface CalendarModel {
  id: string;
  familyId: string;
  name: string;
  colorHex: string;
}

export interface EventModel {
  id: string;
  title: string;
  category: EventCategory;
  description?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  location?: string;
  participants: string[];
  reminderFrequency: ReminderFrequency;
  attachmentUrl?: string;
  isCompleted?: boolean;
}

export interface ReminderModel {
  id: string;
  title: string;
  eventRefId?: string;
  reminderTime: string;
  frequency: ReminderFrequency;
  isActive: boolean;
}

export interface BirthdayModel {
  id: string;
  memberName: string;
  relation: string;
  birthDate: string; // YYYY-MM-DD
  giftIdea?: string;
  reminderDaysBefore: number;
}

export interface HolidayModel {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  category: 'Hari Libur Nasional' | 'Cuti Bersama' | 'Hari Besar Keagamaan';
  description?: string;
}

export interface MealPlanModel {
  id: string;
  date: string; // YYYY-MM-DD
  mealType: MealType;
  recipeId?: string;
  recipeName: string;
  caloriesEstimate: number;
  assignedMember?: string;
  notes?: string;
}

export interface RecipeModel {
  id: string;
  name: string;
  category: 'Healthy Menu' | 'Family Menu' | 'Kids Menu' | 'Budget Menu' | 'Quick Meal';
  ingredients: string[];
  steps: string[];
  durationMinutes: number;
  calories: number;
  photoUrl?: string;
}

export interface GroceryModel {
  id: string;
  itemName: string;
  category: GroceryCategory;
  quantity: number;
  unit: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Belum Dibeli' | 'Sudah Dibeli';
}

export interface ShoppingModel {
  id: string;
  title: string;
  scheduleDate: string;
  estimatedBudget: number;
  actualSpent?: number;
  status: 'Rencana' | 'Selesai';
  itemIds: string[];
}

export interface InventoryModel {
  id: string;
  itemName: string;
  category: GroceryCategory;
  quantity: number;
  unit: string;
  purchaseDate: string;
  expiredDate: string;
  lowStockThreshold: number;
}

export interface FamilyEventModel {
  id: string;
  title: string;
  category: FamilyEventCategory;
  date: string;
  location: string;
  organizer: string;
  budgetEstimate: number;
  actualSpent?: number;
  participantsCount: number;
  description: string;
}

export interface PlannerModel {
  id: string;
  date: string;
  timeSlot: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  activityTitle: string;
  isDone: boolean;
}

export interface AICalendarPlannerInsight {
  dailySummary: string;
  mealSuggestions: string[];
  scheduleSuggestions: string[];
  activitySuggestions: string[];
  motivationQuote: string;
}
