import { z } from 'zod';

export type ResponseType = 'plain' | 'markdown' | 'checklist' | 'bullet' | 'table' | 'quote';
export type AttachmentType = 'photo' | 'document' | 'voice' | 'location';
export type PromptCategory =
  | 'Keluarga'
  | 'Mood'
  | 'Parenting'
  | 'Kesehatan'
  | 'Keuangan'
  | 'Pendidikan'
  | 'Asuransi'
  | 'Kalender'
  | 'Makanan'
  | 'Rumah'
  | 'Keamanan'
  | 'Memori'
  | 'Produktivitas';

export interface Attachment {
  id: string;
  type: AttachmentType;
  name: string;
  url: string;
  size?: string;
}

export interface MessageModel {
  id: string;
  conversationId: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  responseType?: ResponseType;
  attachments?: Attachment[];
  metadata?: {
    promptId?: string;
    isEdited?: boolean;
    isLiked?: boolean;
    isFavorite?: boolean;
    quickCommand?: string;
    checklistItems?: { id: string; text: string; done: boolean }[];
    tableData?: { headers: string[]; rows: string[][] };
  };
}

export interface ConversationModel {
  id: string;
  workspaceId: string;
  userId: string;
  title: string;
  category: PromptCategory | 'Umum';
  isPinned: boolean;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  lastMessageText: string;
  messageCount: number;
  context: {
    familyName: string;
    memberCount: number;
    activeRole: string;
  };
}

export interface PromptModel {
  id: string;
  title: string;
  description: string;
  category: PromptCategory;
  templateText: string;
  isFavorite: boolean;
  isPinned: boolean;
  isRecent?: boolean;
  tags: string[];
  quickCommand?: string;
}

export interface HistoryGroupModel {
  period: 'today' | 'yesterday' | 'last_week' | 'last_month';
  title: string;
  conversations: ConversationModel[];
}

export interface FavoriteItemModel {
  id: string;
  type: 'prompt' | 'response' | 'conversation';
  itemId: string;
  title: string;
  contentPreview: string;
  createdAt: string;
  category?: string;
}

export interface AISettingsModel {
  responseLength: 'ringkas' | 'sedang' | 'detail';
  language: 'id' | 'en';
  creativity: 'terfokus' | 'seimbang' | 'kreatif';
  autoScroll: boolean;
  showSystemPrompt: boolean;
  saveOffline: boolean;
}

// Zod Schemas
export const MessageSchema = z.object({
  id: z.string(),
  conversationId: z.string(),
  sender: z.enum(['user', 'assistant', 'system']),
  text: z.string(),
  timestamp: z.string(),
  responseType: z.enum(['plain', 'markdown', 'checklist', 'bullet', 'table', 'quote']).optional(),
  attachments: z
    .array(
      z.object({
        id: z.string(),
        type: z.enum(['photo', 'document', 'voice', 'location']),
        name: z.string(),
        url: z.string(),
        size: z.string().optional(),
      })
    )
    .optional(),
});

export const ConversationSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  userId: z.string(),
  title: z.string(),
  category: z.string(),
  isPinned: z.boolean(),
  isFavorite: z.boolean(),
  isArchived: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  lastMessageText: z.string(),
  messageCount: z.number(),
  context: z.object({
    familyName: z.string(),
    memberCount: z.number(),
    activeRole: z.string(),
  }),
});

export const PromptSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  templateText: z.string(),
  isFavorite: z.boolean(),
  isPinned: z.boolean(),
  isRecent: z.boolean().optional(),
  tags: z.array(z.string()),
  quickCommand: z.string().optional(),
});
