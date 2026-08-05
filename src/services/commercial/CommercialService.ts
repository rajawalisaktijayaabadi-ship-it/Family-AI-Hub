import {
  SupportTicketModel,
  FeedbackModel,
  KnowledgeBaseModel,
  MarketingCampaignModel,
  LoyaltyBadgeModel,
  BusinessAnalyticsModel,
} from '../../types/commercial';

export class CommercialService {
  private static instance: CommercialService;

  private constructor() {}

  static getInstance(): CommercialService {
    if (!CommercialService.instance) {
      CommercialService.instance = new CommercialService();
    }
    return CommercialService.instance;
  }

  getKnowledgeBaseArticles(): KnowledgeBaseModel[] {
    return [
      {
        id: 'kb_1',
        title: 'Cara Menghubungkan Gemini 2.5 Flash ke Memori Keluarga',
        category: 'Kecerdasan AI',
        content: 'Fitur RAG & Memory Context Engine memungkinkan AI mengingat jadwal sekolah anak, tanggal lahir, dan preferensi masakan keluarga Anda secara aman.',
        readTimeMin: 3,
      },
      {
        id: 'kb_2',
        title: 'Panduan Hak Pelindungan Data Pribadi (UU PDP No. 27/2022)',
        category: 'Keamanan & PDP',
        content: 'Anda dapat mengunduh seluruh data keluarga dalam format JSON atau meminta pengakhiran pemrosesan kapan saja melalui Hub Keamanan & Privasi.',
        readTimeMin: 4,
      },
      {
        id: 'kb_3',
        title: 'Cara Pembayaran Otomatis QRIS & E-Wallet (Midtrans/Xendit)',
        category: 'Tagihan & Paket',
        content: 'Dukungan QRIS Instan, GoPay, OVO, ShopeePay, dan Bank Transfer BCA/Mandiri/BRI untuk langganan Family Pro.',
        readTimeMin: 2,
      },
      {
        id: 'kb_4',
        title: 'Aktivasi Notifikasi Bencana Alam BMKG & Cuaca Lokal',
        category: 'Panduan Awal',
        content: 'Fitur peringatan dini gempa dan cuaca BMKG terintegrasi otomatis untuk wilayah Jabodetabek dan seluruh Indonesia.',
        readTimeMin: 3,
      },
    ];
  }

  getBusinessMetrics(): BusinessAnalyticsModel {
    return {
      dau: 4850,
      mau: 28400,
      retention7DayPct: 68.4,
      retention30DayPct: 49.2,
      churnRatePct: 2.1,
      conversionRatePct: 8.7,
      mrrRp: 142000000, // Rp 142.000.000 / bulan
      arrRp: 1704000000,
      totalSubscribers: 1840,
    };
  }

  getMarketingCampaigns(): MarketingCampaignModel[] {
    return [
      {
        id: 'cmp_1',
        code: 'FAMILYINDONESIA2026',
        title: 'Promo Spesial Merdeka Keluarga Pro',
        discountPct: 30,
        validUntil: '2026-08-31',
        description: 'Diskon 30% untuk langganan tahunan Family Enterprise Pro!',
        isActive: true,
      },
      {
        id: 'cmp_2',
        code: 'REFERRAL50K',
        title: 'Program Referral Undang Keluarga',
        discountPct: 20,
        validUntil: '2026-12-31',
        description: 'Dapatkan saldo poin Rp 50.000 setiap mengundang keluarga baru.',
        isActive: true,
      },
    ];
  }

  getLoyaltyBadges(): LoyaltyBadgeModel[] {
    return [
      {
        id: 'bdg_1',
        title: 'Keluarga Pelopor AI',
        description: 'Telah menggunakan AI Assistant lebih dari 50 kali',
        icon: 'Sparkles',
        isUnlocked: true,
        unlockedAt: '2026-07-20',
      },
      {
        id: 'bdg_2',
        title: 'Keluarga Hemat Teratur',
        description: 'Mencatat keuangan & belanja bulanan tanpa putus selama 30 hari',
        icon: 'PiggyBank',
        isUnlocked: true,
        unlockedAt: '2026-08-01',
      },
      {
        id: 'bdg_3',
        title: 'Penjaga Keamanan PDP',
        description: 'Mengaktifkan verifikasi 2FA & melakukan peninjauan privasi data',
        icon: 'ShieldCheck',
        isUnlocked: false,
      },
    ];
  }
}
