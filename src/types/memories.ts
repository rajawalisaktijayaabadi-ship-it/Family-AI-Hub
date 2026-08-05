import { z } from 'zod';

export type MemoryCategory =
  | 'Birthday'
  | 'Vacation'
  | 'Wedding'
  | 'Graduation'
  | 'Baby'
  | 'School'
  | 'Achievement'
  | 'Holiday'
  | 'Daily Life'
  | 'Pets'
  | 'Custom';

export type AvatarCategory =
  | 'Dad'
  | 'Mom'
  | 'Child'
  | 'Grandparent'
  | 'Pet'
  | 'Custom Avatar';

export type AvatarStyle = '3D Pixar' | 'Anime' | 'Realism' | 'Cartoon' | 'Cyberpunk';
export type AvatarTheme = 'Warm' | 'Neon' | 'Pastel' | 'Classic';

export const MemoryModelSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Judul memori tidak boleh kosong'),
  description: z.string().optional(),
  category: z.enum([
    'Birthday',
    'Vacation',
    'Wedding',
    'Graduation',
    'Baby',
    'School',
    'Achievement',
    'Holiday',
    'Daily Life',
    'Pets',
    'Custom',
  ]),
  date: z.string(),
  time: z.string().optional(),
  locationName: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  familyMemberId: z.string(),
  familyMemberName: z.string(),
  tags: z.array(z.string()),
  isFavorite: z.boolean(),
  isArchived: z.boolean(),
  coverUrl: z.string().optional(),
  mediaType: z.enum(['photo', 'video', 'audio', 'document']),
  createdAt: z.string(),
});

export type MemoryModel = z.infer<typeof MemoryModelSchema>;

export const AlbumModelSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Nama album wajib diisi'),
  description: z.string().optional(),
  category: z.string(),
  coverUrl: z.string(),
  isPrivate: z.boolean(),
  isShared: z.boolean(),
  tags: z.array(z.string()),
  memberId: z.string(),
  createdAt: z.string(),
  itemCount: z.number(),
});

export type AlbumModel = z.infer<typeof AlbumModelSchema>;

export const PhotoModelSchema = z.object({
  id: z.string(),
  memoryId: z.string().optional(),
  albumId: z.string().optional(),
  title: z.string(),
  url: z.string(),
  thumbnailUrl: z.string(),
  sizeMb: z.number(),
  width: z.number().optional(),
  height: z.number().optional(),
  isFavorite: z.boolean(),
  memberId: z.string(),
  takenAt: z.string(),
});

export type PhotoModel = z.infer<typeof PhotoModelSchema>;

export const VideoModelSchema = z.object({
  id: z.string(),
  memoryId: z.string().optional(),
  albumId: z.string().optional(),
  title: z.string(),
  url: z.string(),
  thumbnailUrl: z.string().optional(),
  durationSeconds: z.number(),
  videoType: z.enum(['Short Video', 'Long Video', 'Family Event', 'School Activity', 'Holiday']),
  sizeMb: z.number(),
  isFavorite: z.boolean(),
  memberId: z.string(),
  takenAt: z.string(),
});

export type VideoModel = z.infer<typeof VideoModelSchema>;

export const AudioModelSchema = z.object({
  id: z.string(),
  memoryId: z.string().optional(),
  title: z.string(),
  url: z.string(),
  durationSeconds: z.number(),
  category: z.enum(['Voice Note', 'Family Story', 'Baby Sound', 'Song / Lullaby', 'Important Log']),
  date: z.string(),
  memberId: z.string(),
  memberName: z.string(),
  transcript: z.string().optional(),
  isFavorite: z.boolean(),
  createdAt: z.string(),
});

export type AudioModel = z.infer<typeof AudioModelSchema>;

export const FavoriteModelSchema = z.object({
  id: z.string(),
  targetId: z.string(),
  targetType: z.enum(['photo', 'video', 'audio', 'document', 'memory']),
  title: z.string(),
  previewUrl: z.string(),
  addedAt: z.string(),
});

export type FavoriteModel = z.infer<typeof FavoriteModelSchema>;

export const FamilyTreeModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  relation: z.enum(['Parent', 'Child', 'Grandparent', 'Sibling', 'Custom Relation']),
  parentId: z.string().optional(),
  birthDate: z.string().optional(),
  avatarUrl: z.string(),
  notes: z.string().optional(),
  generation: z.number(),
});

export type FamilyTreeModel = z.infer<typeof FamilyTreeModelSchema>;

export const VaultModelSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.enum(['Important Media', 'Private Album', 'Secure Folder', 'Document']),
  fileUrl: z.string(),
  isEncrypted: z.boolean(),
  lockedPin: z.string().optional(),
  sizeMb: z.number(),
  addedAt: z.string(),
});

export type VaultModel = z.infer<typeof VaultModelSchema>;

export const AvatarModelSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  memberName: z.string(),
  avatarCategory: z.enum(['Dad', 'Mom', 'Child', 'Grandparent', 'Pet', 'Custom Avatar']),
  style: z.enum(['3D Pixar', 'Anime', 'Realism', 'Cartoon', 'Cyberpunk']),
  theme: z.enum(['Warm', 'Neon', 'Pastel', 'Classic']),
  personality: z.string(),
  voiceType: z.string(),
  avatarUrl: z.string(),
  isAnimated: z.boolean(),
});

export type AvatarModel = z.infer<typeof AvatarModelSchema>;

export interface StorageModel {
  photoCount: number;
  videoCount: number;
  audioCount: number;
  documentCount: number;
  usedBytes: number;
  totalBytes: number;
  photoSizeMb: number;
  videoSizeMb: number;
  audioSizeMb: number;
  docSizeMb: number;
}
