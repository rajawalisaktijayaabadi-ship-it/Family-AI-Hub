import { create } from 'zustand';
import {
  SupportTicketModel,
  FeedbackModel,
  KnowledgeBaseModel,
  MarketingCampaignModel,
  LoyaltyBadgeModel,
  BusinessAnalyticsModel,
} from '../types/commercial';
import { CommercialService } from '../services/commercial/CommercialService';

interface CommercialStore {
  // Support & Help Center
  tickets: SupportTicketModel[];
  feedbacks: FeedbackModel[];
  knowledgeBase: KnowledgeBaseModel[];
  
  // BI & Analytics
  metrics: BusinessAnalyticsModel;
  campaigns: MarketingCampaignModel[];
  loyaltyBadges: LoyaltyBadgeModel[];
  userLoyaltyPoints: number;

  // Onboarding & PWA / Version State
  hasCompletedOnboarding: boolean;
  appVersion: {
    currentVersion: string;
    latestVersion: string;
    hasUpdateAvailable: boolean;
    releaseNotes: string;
  };
  pwaInstallPromptable: boolean;

  // Actions
  completeOnboarding: () => void;
  submitSupportTicket: (subject: string, category: SupportTicketModel['category'], priority: SupportTicketModel['priority'], message: string) => void;
  submitFeedback: (rating: number, category: FeedbackModel['category'], comment: string) => void;
  claimCampaignVoucher: (code: string) => boolean;
}

export const useCommercialStore = create<CommercialStore>((set, get) => ({
  tickets: [
    {
      id: 'tkt_1001',
      workspaceId: 'ws_fam_01',
      userId: 'usr_owner_01',
      userEmail: 'budi.santoso@familyai.id',
      subject: 'Pertanyaan Integrasi Notifikasi WA BMKG',
      category: 'technical',
      priority: 'medium',
      status: 'resolved',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
      messages: [
        {
          sender: 'user',
          text: 'Apakah notifikasi gempa BMKG bisa terkirim otomatis ke HP anggota keluarga?',
          timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        },
        {
          sender: 'support_agent',
          text: 'Halo Pak Budi! Ya, notifikasi darurat BMKG otomatis diteruskan via Firebase Cloud Messaging & WhatsApp.',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
        },
      ],
    },
  ],

  feedbacks: [],
  knowledgeBase: CommercialService.getInstance().getKnowledgeBaseArticles(),
  metrics: CommercialService.getInstance().getBusinessMetrics(),
  campaigns: CommercialService.getInstance().getMarketingCampaigns(),
  loyaltyBadges: CommercialService.getInstance().getLoyaltyBadges(),
  userLoyaltyPoints: 350,

  hasCompletedOnboarding: true,
  appVersion: {
    currentVersion: 'v3.2.0-indonesia',
    latestVersion: 'v3.2.0-indonesia',
    hasUpdateAvailable: false,
    releaseNotes: 'Fitur Komersial Release: Customer Support Center, Business Intelligence Dashboard, & PWA Ready.',
  },
  pwaInstallPromptable: true,

  completeOnboarding: () => set({ hasCompletedOnboarding: true }),

  submitSupportTicket: (subject, category, priority, message) => {
    const newTicket: SupportTicketModel = {
      id: `tkt_${Date.now()}`,
      workspaceId: 'ws_fam_01',
      userId: 'usr_owner_01',
      userEmail: 'budi.santoso@familyai.id',
      subject,
      category,
      priority,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          sender: 'user',
          text: message,
          timestamp: new Date().toISOString(),
        },
      ],
    };

    set((state) => ({ tickets: [newTicket, ...state.tickets] }));
  },

  submitFeedback: (rating, category, comment) => {
    const newFeedback: FeedbackModel = {
      id: `fb_${Date.now()}`,
      userId: 'usr_owner_01',
      rating,
      category,
      comment,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({ feedbacks: [newFeedback, ...state.feedbacks] }));
  },

  claimCampaignVoucher: (code) => {
    const cmp = get().campaigns.find((c) => c.code.toUpperCase() === code.toUpperCase() && c.isActive);
    if (cmp) {
      set((state) => ({ userLoyaltyPoints: state.userLoyaltyPoints + 150 }));
      return true;
    }
    return false;
  },
}));
