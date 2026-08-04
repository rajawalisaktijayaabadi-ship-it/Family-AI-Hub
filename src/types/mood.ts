import { z } from 'zod';

export type MoodCategoryType =
  | '😊 Bahagia'
  | '😁 Sangat Bahagia'
  | '😌 Tenang'
  | '😐 Biasa'
  | '😴 Lelah'
  | '😟 Cemas'
  | '😢 Sedih'
  | '😡 Marah'
  | '🤯 Stres'
  | '❤️ Bersyukur';

export type EmotionTagType =
  | 'Pekerjaan'
  | 'Sekolah'
  | 'Pasangan'
  | 'Anak'
  | 'Keuangan'
  | 'Kesehatan'
  | 'Teman'
  | 'Rumah'
  | 'Liburan'
  | 'Lainnya';

export type FamilyMemberRole = 'Ayah' | 'Ibu' | 'Anak' | 'Lainnya';

// Zod Schemas
export const MoodModelSchema = z.object({
  id: z.string(),
  userId: z.string(),
  userName: z.string(),
  userRole: z.enum(['Ayah', 'Ibu', 'Anak', 'Lainnya']),
  category: z.string(),
  intensity: z.number().min(1).max(10),
  colorHex: z.string(),
  note: z.string().optional(),
  photoUrl: z.string().optional(),
  location: z.string().optional(),
  tags: z.array(z.string()),
  activities: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type MoodModel = z.infer<typeof MoodModelSchema>;

export const MoodJournalModelSchema = z.object({
  id: z.string(),
  moodId: z.string().optional(),
  userId: z.string(),
  userName: z.string(),
  title: z.string(),
  note: z.string(),
  photoUrl: z.string().optional(),
  location: z.string().optional(),
  tags: z.array(z.string()),
  activity: z.string(),
  createdAt: z.string(),
});

export type MoodJournalModel = z.infer<typeof MoodJournalModelSchema>;

export const AIMoodInsightSchema = z.object({
  summary: z.string(),
  triggers: z.array(z.string()),
  recommendations: z.array(z.string()),
  motivationQuote: z.string(),
  reflectionPrompt: z.string(),
});

export type AIMoodInsight = z.infer<typeof AIMoodInsightSchema>;

export const MoodHistoryFilterSchema = z.object({
  timeRange: z.enum(['today', '7d', '30d', '90d', '1y']),
  familyMember: z.enum(['all', 'Ayah', 'Ibu', 'Anak']),
  categoryFilter: z.string().optional(),
});

export type MoodHistoryFilter = z.infer<typeof MoodHistoryFilterSchema>;
