import { z } from 'zod';

export const ChildModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  nickname: z.string(),
  birthDate: z.string(),
  gender: z.enum(['Laki-laki', 'Perempuan']),
  school: z.string(),
  grade: z.string(),
  hobbies: z.array(z.string()),
  allergies: z.array(z.string()),
  parentNotes: z.string().optional(),
  photoUrl: z.string().optional(),
  createdAt: z.string(),
});

export type ChildModel = z.infer<typeof ChildModelSchema>;

export const DevelopmentModelSchema = z.object({
  id: z.string(),
  childId: z.string(),
  date: z.string(),
  heightCm: z.number(),
  weightKg: z.number(),
  milestones: z.array(
    z.object({
      title: z.string(),
      isAchieved: z.boolean(),
      dateAchieved: z.string().optional(),
    })
  ),
  achievements: z.array(z.string()),
  activitySummary: z.string(),
});

export type DevelopmentModel = z.infer<typeof DevelopmentModelSchema>;

export const HabitModelSchema = z.object({
  id: z.string(),
  childId: z.string(),
  title: z.string(),
  category: z.enum(['Belajar', 'Kesehatan', 'Karakter', 'Rutinitas']),
  frequency: z.enum(['daily', 'weekly', 'monthly']),
  streak: z.number(),
  completionRate: z.number(),
  completedDates: z.array(z.string()),
  pointsReward: z.number(),
});

export type HabitModel = z.infer<typeof HabitModelSchema>;

export const RewardModelSchema = z.object({
  id: z.string(),
  childId: z.string(),
  title: z.string(),
  pointsRequired: z.number(),
  isUnlocked: z.boolean(),
  isClaimed: z.boolean(),
  iconName: z.string(),
});

export type RewardModel = z.infer<typeof RewardModelSchema>;

export const ChoreModelSchema = z.object({
  id: z.string(),
  childId: z.string(),
  title: z.string(),
  assignedChildName: z.string(),
  deadline: z.string(),
  status: z.enum(['pending', 'completed']),
  rewardPoints: z.number(),
});

export type ChoreModel = z.infer<typeof ChoreModelSchema>;

export const SchoolActivitySchema = z.object({
  id: z.string(),
  childId: z.string(),
  title: z.string(),
  type: z.enum(['homework', 'exam', 'event']),
  date: z.string(),
  teacherNote: z.string().optional(),
  isDone: z.boolean(),
});

export type SchoolActivity = z.infer<typeof SchoolActivitySchema>;

export const FamilyActivityModelSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.enum([
    'Weekend Plan',
    'Family Trip',
    'Movie Night',
    'Cooking Together',
    'Exercise',
    'Reading Together',
    'Game Night',
    'Custom Activity',
  ]),
  date: z.string(),
  participants: z.array(z.string()),
  status: z.enum(['planned', 'completed']),
  notes: z.string().optional(),
});

export type FamilyActivityModel = z.infer<typeof FamilyActivityModelSchema>;

export const ScreenTimeModelSchema = z.object({
  id: z.string(),
  childId: z.string(),
  targetMinutes: z.number(),
  dailyUsageMinutes: z.number(),
  weeklyLimitMinutes: z.number(),
  reminderActive: z.boolean(),
});

export type ScreenTimeModel = z.infer<typeof ScreenTimeModelSchema>;

export const LearningGoalModelSchema = z.object({
  id: z.string(),
  childId: z.string(),
  goalType: z.enum(['reading', 'memorization', 'exercise', 'skill', 'custom']),
  title: z.string(),
  targetValue: z.number(),
  currentValue: z.number(),
  unit: z.string(),
  deadline: z.string(),
});

export type LearningGoalModel = z.infer<typeof LearningGoalModelSchema>;

export const FamilyChallengeSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.enum(['Weekly', 'Reading', 'Cleaning', 'Healthy']),
  pointsReward: z.number(),
  progressPercent: z.number(),
  isCompleted: z.boolean(),
});

export type FamilyChallenge = z.infer<typeof FamilyChallengeSchema>;

export const ParentingJournalModelSchema = z.object({
  id: z.string(),
  childId: z.string(),
  title: z.string(),
  note: z.string(),
  photoUrl: z.string().optional(),
  milestoneTag: z.string().optional(),
  createdAt: z.string(),
});

export type ParentingJournalModel = z.infer<typeof ParentingJournalModelSchema>;

export const AIParentingInsightSchema = z.object({
  dailyTips: z.string(),
  habitRecommendations: z.array(z.string()),
  learningSuggestions: z.array(z.string()),
  activityRecommendations: z.array(z.string()),
  motivationQuote: z.string(),
});

export type AIParentingInsight = z.infer<typeof AIParentingInsightSchema>;
