import { z } from 'zod';

export const StressModelSchema = z.object({
  id: z.string(),
  userId: z.string(),
  userName: z.string(),
  score: z.number().min(0).max(100),
  level: z.enum(['Rendah', 'Sedang', 'Tinggi', 'Sangat Tinggi']),
  answers: z.record(z.string(), z.number()),
  recommendations: z.array(z.string()),
  createdAt: z.string(),
});

export type StressModel = z.infer<typeof StressModelSchema>;

export const ReflectionModelSchema = z.object({
  id: z.string(),
  userId: z.string(),
  userName: z.string(),
  dailyReflection: z.string(),
  achievements: z.array(z.string()),
  lessonsLearned: z.string(),
  createdAt: z.string(),
});

export type ReflectionModel = z.infer<typeof ReflectionModelSchema>;

export const GratitudeModelSchema = z.object({
  id: z.string(),
  userId: z.string(),
  userName: z.string(),
  content: z.string(),
  isSharedWithFamily: z.boolean(),
  createdAt: z.string(),
});

export type GratitudeModel = z.infer<typeof GratitudeModelSchema>;

export const RelationshipModelSchema = z.object({
  communicationScore: z.number().min(0).max(100),
  familyBondScore: z.number().min(0).max(100),
  qualityTimeHours: z.number(),
  trustScore: z.number().min(0).max(100),
  updatedAt: z.string(),
});

export type RelationshipModel = z.infer<typeof RelationshipModelSchema>;

export const RecommendationCategorySchema = z.enum([
  'Olahraga',
  'Istirahat',
  'Quality Time',
  'Meditasi',
  'Musik',
]);

export type RecommendationCategory = z.infer<typeof RecommendationCategorySchema>;

export const PsychologyRecommendationSchema = z.object({
  id: z.string(),
  category: RecommendationCategorySchema,
  title: z.string(),
  description: z.string(),
  durationMinutes: z.number(),
  targetRole: z.string(),
  iconName: z.string(),
});

export type PsychologyRecommendation = z.infer<typeof PsychologyRecommendationSchema>;
