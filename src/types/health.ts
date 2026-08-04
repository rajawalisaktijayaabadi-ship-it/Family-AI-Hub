import { z } from 'zod';

export const HealthProfileModelSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  memberName: z.string(),
  bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  heightCm: z.number(),
  weightKg: z.number(),
  bmi: z.number(),
  bmiCategory: z.enum(['Sangat Kurus', 'Kurus', 'Normal', 'Gemuk', 'Obesitas']),
  allergies: z.array(z.string()),
  medicalHistory: z.array(z.string()),
  surgeries: z.array(z.string()),
  hospitalizations: z.array(z.string()),
  notes: z.string().optional(),
});

export type HealthProfileModel = z.infer<typeof HealthProfileModelSchema>;

export const MedicalRecordModelSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  date: z.string(),
  doctorName: z.string(),
  hospitalName: z.string(),
  complaints: z.string(),
  diagnosis: z.string(),
  prescriptions: z.array(z.string()),
  notes: z.string().optional(),
  documentUrl: z.string().optional(),
});

export type MedicalRecordModel = z.infer<typeof MedicalRecordModelSchema>;

export const MedicationModelSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  name: z.string(),
  dosage: z.string(),
  frequency: z.string(),
  scheduleTimes: z.array(z.string()),
  startDate: z.string(),
  endDate: z.string(),
  isActive: z.boolean(),
  notes: z.string().optional(),
});

export type MedicationModel = z.infer<typeof MedicationModelSchema>;

export const VaccinationModelSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  vaccineName: z.string(),
  date: z.string(),
  location: z.string(),
  status: z.enum(['Sudah Vaksin', 'Jadwal Datang', 'Tertunda']),
  certificateUrl: z.string().optional(),
});

export type VaccinationModel = z.infer<typeof VaccinationModelSchema>;

export const HealthCheckupModelSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  date: z.string(),
  bloodPressureSystolic: z.number(),
  bloodPressureDiastolic: z.number(),
  bloodSugarMgDl: z.number(),
  cholesterolMgDl: z.number(),
  uricAcidMgDl: z.number(),
  oxygenSaturationPercent: z.number(),
});

export type HealthCheckupModel = z.infer<typeof HealthCheckupModelSchema>;

export const WellnessModelSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  date: z.string(),
  dailySteps: z.number(),
  stepTarget: z.number(),
  caloriesBurned: z.number(),
  activeMinutes: z.number(),
  exerciseType: z.string(),
});

export type WellnessModel = z.infer<typeof WellnessModelSchema>;

export const SleepModelSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  date: z.string(),
  sleepTime: z.string(),
  wakeTime: z.string(),
  durationHours: z.number(),
  quality: z.enum(['Sangat Baik', 'Baik', 'Cukup', 'Kurang']),
});

export type SleepModel = z.infer<typeof SleepModelSchema>;

export const WaterModelSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  date: z.string(),
  targetMl: z.number(),
  consumedMl: z.number(),
});

export type WaterModel = z.infer<typeof WaterModelSchema>;

export const FoodDiaryModelSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  date: z.string(),
  mealType: z.enum(['Sarapan', 'Makan Siang', 'Makan Malam', 'Snack', 'Minuman']),
  foodName: z.string(),
  calories: z.number(),
  proteinGrams: z.number(),
  carbsGrams: z.number(),
  fatGrams: z.number(),
  fiberGrams: z.number(),
  notes: z.string().optional(),
});

export type FoodDiaryModel = z.infer<typeof FoodDiaryModelSchema>;

export const HealthGoalModelSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  targetWeightKg: z.number(),
  targetDailySteps: z.number(),
  targetSleepHours: z.number(),
  targetWaterMl: z.number(),
  targetDailyCalories: z.number(),
});

export type HealthGoalModel = z.infer<typeof HealthGoalModelSchema>;

export const ReminderModelSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  type: z.enum(['Obat', 'Kontrol Dokter', 'Vaksin', 'Minum Air', 'Olahraga', 'Tidur']),
  title: z.string(),
  time: z.string(),
  isCompletedToday: z.boolean(),
});

export type ReminderModel = z.infer<typeof ReminderModelSchema>;

export const AIHealthInsightSchema = z.object({
  healthScore: z.number(),
  dailySummary: z.string(),
  lifestyleTips: z.array(z.string()),
  activityRecommendations: z.array(z.string()),
  motivationQuote: z.string(),
});

export type AIHealthInsight = z.infer<typeof AIHealthInsightSchema>;
