import { z } from 'zod';

export type PlanId = 'free' | 'starter' | 'premium' | 'family_plus' | 'enterprise' | 'lifetime';

export type SubscriptionStatus = 'active' | 'expired' | 'grace_period' | 'cancelled' | 'pending';

export type BillingCycle = 'monthly' | 'yearly' | 'lifetime';

export interface QuotaLimits {
  aiTokensPerDay: number;
  storageGB: number;
  familyMembersLimit: number;
  photoUploadsPerMonth: number;
  videoUploadsPerMonth: number;
  voiceMinutesPerMonth: number;
  memorySlots: number;
  dataExportCount: number;
}

export interface PlanModel {
  id: PlanId;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceYearly: number;
  priceLifetime?: number;
  isPopular?: boolean;
  features: string[];
  quotaLimits: QuotaLimits;
}

export interface SubscriptionModel {
  id: string;
  workspaceId: string;
  planId: PlanId;
  status: SubscriptionStatus;
  billingCycle: BillingCycle;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  paymentMethod?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceModel {
  id: string;
  invoiceNumber: string;
  workspaceId: string;
  workspaceName: string;
  planName: string;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  status: 'paid' | 'unpaid' | 'refunded' | 'cancelled';
  issueDate: string;
  dueDate: string;
  paidAt?: string;
  paymentMethod?: string;
  downloadUrl?: string;
}

export interface BillingModel {
  workspaceId: string;
  billingEmail: string;
  billingName: string;
  billingAddress: string;
  taxNumberNPWP?: string;
  defaultPaymentMethod?: string;
}

export type PaymentProviderType = 'midtrans' | 'xendit' | 'doku' | 'tripay' | 'qris_national';

export type PaymentMethodType =
  | 'qris'
  | 'va_bca'
  | 'va_mandiri'
  | 'va_bri'
  | 'va_bni'
  | 'gopay'
  | 'ovo'
  | 'shopeepay'
  | 'dana'
  | 'credit_card'
  | 'bank_transfer';

export interface PaymentTransactionModel {
  id: string;
  workspaceId: string;
  planId: PlanId;
  planName: string;
  billingCycle: BillingCycle;
  amount: number;
  provider: PaymentProviderType;
  paymentMethod: PaymentMethodType;
  status: 'pending' | 'success' | 'failed' | 'expired';
  snapToken?: string;
  vaNumber?: string;
  qrCodeUrl?: string;
  redirectUrl?: string;
  createdAt: string;
  paidAt?: string;
}

export interface CouponModel {
  code: string;
  description: string;
  discountPercentage?: number;
  discountAmount?: number;
  expiresAt: string;
  minSpend: number;
  usageCount: number;
  maxUsage: number;
}

export interface LicenseModel {
  id: string;
  licenseKey: string;
  planId: PlanId;
  durationMonths: number;
  isActivated: boolean;
  activatedWorkspaceId?: string;
  activatedAt?: string;
  expiresAt?: string;
}

export interface UsageModel {
  workspaceId: string;
  aiTokensUsedToday: number;
  storageUsedBytes: number;
  photosUploadedThisMonth: number;
  videosUploadedThisMonth: number;
  voiceMinutesUsedThisMonth: number;
  memorySlotsUsed: number;
  lastResetDate: string;
}

export interface ReferralModel {
  workspaceId: string;
  referralCode: string;
  totalInvited: number;
  totalEarnedBonus: number;
  history: Array<{
    id: string;
    invitedEmail: string;
    rewardAmount: number;
    date: string;
  }>;
}

// Zod Validation Schemas
export const QuotaLimitsSchema = z.object({
  aiTokensPerDay: z.number(),
  storageGB: z.number(),
  familyMembersLimit: z.number(),
  photoUploadsPerMonth: z.number(),
  videoUploadsPerMonth: z.number(),
  voiceMinutesPerMonth: z.number(),
  memorySlots: z.number(),
  dataExportCount: z.number(),
});

export const PlanSchema = z.object({
  id: z.enum(['free', 'starter', 'premium', 'family_plus', 'enterprise', 'lifetime']),
  name: z.string(),
  tagline: z.string(),
  priceMonthly: z.number(),
  priceYearly: z.number(),
  priceLifetime: z.number().optional(),
  isPopular: z.boolean().optional(),
  features: z.array(z.string()),
  quotaLimits: QuotaLimitsSchema,
});

export const SubscriptionSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  planId: z.enum(['free', 'starter', 'premium', 'family_plus', 'enterprise', 'lifetime']),
  status: z.enum(['active', 'expired', 'grace_period', 'cancelled', 'pending']),
  billingCycle: z.enum(['monthly', 'yearly', 'lifetime']),
  startDate: z.string(),
  endDate: z.string(),
  autoRenew: z.boolean(),
  paymentMethod: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
