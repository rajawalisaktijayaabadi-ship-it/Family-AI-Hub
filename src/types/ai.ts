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
  aiEnabled: boolean;
  memoryEnabled: boolean;
  contextEnabled: boolean;
  personalizationEnabled: boolean;
  provider: 'gemini' | 'openai' | 'claude';
  modelName: string;
  responseLength: 'ringkas' | 'sedang' | 'detail';
  language: 'id' | 'en';
  tone: 'ramah' | 'profesional' | 'santai' | 'edukatif';
  creativity: 'terfokus' | 'seimbang' | 'kreatif';
  autoScroll: boolean;
  showSystemPrompt: boolean;
  saveOffline: boolean;
}

export interface AIMemoryModel {
  id: string;
  userId: string;
  familyId: string;
  category: PromptCategory | 'General';
  key: string;
  value: string;
  isPinned: boolean;
  confidenceScore: number;
  sourceConversationId?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AIContextModel {
  userId: string;
  familyId: string;
  familyName: string;
  memberCount: number;
  currentScreen?: string;
  recentActivities: string[];
  healthOverview?: { score: number; notes: string };
  financeOverview?: { monthlyBudget: number; spent: number };
  educationOverview?: { activeCourses: number; progress: number };
  moodOverview?: { dominantMood: string; averageScore: number };
  smartHomeStatus?: { activeDevices: number; alerts: number };
  safetyStatus?: { level: string; activeCheckins: number };
  pinnedMemories: AIMemoryModel[];
  updatedAt: string;
}

export interface AIHistoryModel {
  id: string;
  conversationId: string;
  userId: string;
  promptText: string;
  responseText: string;
  tokensUsed: number;
  latencyMs: number;
  timestamp: string;
}

export interface AIPromptModel extends PromptModel {}
export interface AIConversationModel extends ConversationModel {}

export interface AIUsageModel {
  userId: string;
  totalRequestsToday: number;
  tokenCountToday: number;
  dailyLimit: number;
  resetDate: string;
}

export interface AIFeedbackModel {
  id: string;
  messageId: string;
  userId: string;
  rating: 'thumbs_up' | 'thumbs_down';
  comment?: string;
  createdAt: string;
}

export interface RAGSearchResult {
  id: string;
  title: string;
  content: string;
  sourceModule: string;
  score: number;
  citationMetadata?: {
    date?: string;
    author?: string;
    url?: string;
  };
}

export interface PrivacyConsentModel {
  userId: string;
  aiDataUsageAccepted: boolean;
  memoryCollectionAccepted: boolean;
  personalizationAccepted: boolean;
  acceptedAt?: string;
}

// Zod Schemas
export const AIMemorySchema = z.object({
  id: z.string(),
  userId: z.string(),
  familyId: z.string(),
  category: z.string(),
  key: z.string(),
  value: z.string(),
  isPinned: z.boolean(),
  confidenceScore: z.number(),
  sourceConversationId: z.string().optional(),
  expiresAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const AIContextSchema = z.object({
  userId: z.string(),
  familyId: z.string(),
  familyName: z.string(),
  memberCount: z.number(),
  currentScreen: z.string().optional(),
  recentActivities: z.array(z.string()),
  pinnedMemories: z.array(AIMemorySchema),
  updatedAt: z.string(),
});

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
