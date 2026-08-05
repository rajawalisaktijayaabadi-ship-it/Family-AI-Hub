import { z } from 'zod';

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface SupportTicketModel {
  id: string;
  workspaceId: string;
  userId: string;
  userEmail: string;
  subject: string;
  category: 'technical' | 'billing' | 'feature_request' | 'bug_report';
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  messages: Array<{
    sender: 'user' | 'support_agent';
    text: string;
    timestamp: string;
  }>;
}

export interface FeedbackModel {
  id: string;
  userId: string;
  rating: number; // 1 - 5 stars
  category: 'ui_ux' | 'ai_quality' | 'features' | 'performance';
  comment: string;
  createdAt: string;
}

export interface KnowledgeBaseModel {
  id: string;
  title: string;
  category: 'Panduan Awal' | 'Kecerdasan AI' | 'Tagihan & Paket' | 'Keamanan & PDP';
  content: string;
  readTimeMin: number;
}

export interface MarketingCampaignModel {
  id: string;
  code: string;
  title: string;
  discountPct: number;
  validUntil: string;
  description: string;
  isActive: boolean;
}

export interface LoyaltyBadgeModel {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  isUnlocked: boolean;
}

export interface BusinessAnalyticsModel {
  dau: number;
  mau: number;
  retention7DayPct: number;
  retention30DayPct: number;
  churnRatePct: number;
  conversionRatePct: number;
  mrrRp: number;
  arrRp: number;
  totalSubscribers: number;
}

// Zod Validation Schemas
export const SupportTicketSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  userId: z.string(),
  userEmail: z.string(),
  subject: z.string(),
  category: z.enum(['technical', 'billing', 'feature_request', 'bug_report']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  status: z.enum(['open', 'in_progress', 'resolved', 'closed']),
});
