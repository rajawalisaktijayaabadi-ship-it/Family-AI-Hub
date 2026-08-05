import {
  PlanModel,
  SubscriptionModel,
  UsageModel,
  InvoiceModel,
  CouponModel,
  LicenseModel,
  ReferralModel,
  PlanId,
} from '../../types/subscription';

export class SubscriptionService {
  private static STORAGE_KEY_SUB = 'familyai_subscription_v1';
  private static STORAGE_KEY_USAGE = 'familyai_usage_v1';

  static DEFAULT_PLANS: PlanModel[] = [
    {
      id: 'free',
      name: 'Family Free',
      tagline: 'Mulai perjalanan digital keluarga secara gratis',
      priceMonthly: 0,
      priceYearly: 0,
      features: [
        'Akses 50 Toko AI Gemini / Hari',
        '1 GB Penyimpanan Cloud Keluarga',
        'Maksimal 3 Anggota Keluarga',
        'Unggah 20 Foto & 2 Video / Bulan',
        '10 Menit Perintah Suara AI',
        '5 Slot Memori AI Terpinned',
      ],
      quotaLimits: {
        aiTokensPerDay: 50,
        storageGB: 1,
        familyMembersLimit: 3,
        photoUploadsPerMonth: 20,
        videoUploadsPerMonth: 2,
        voiceMinutesPerMonth: 10,
        memorySlots: 5,
        dataExportCount: 1,
      },
    },
    {
      id: 'starter',
      name: 'Family Starter',
      tagline: 'Untuk keluarga muda yang ingin teratur',
      priceMonthly: 29000,
      priceYearly: 290000,
      features: [
        '500 Token AI Gemini 3.6 / Hari',
        '10 GB Cloud Storage Aman',
        'Hingga 6 Anggota Keluarga',
        '200 Foto & 10 Video / Bulan',
        '60 Menit Vokal AI Interaktif',
        '30 Slot AI Memory Engine',
        'Laporan Keuangan & Kesehatan Harian',
      ],
      quotaLimits: {
        aiTokensPerDay: 500,
        storageGB: 10,
        familyMembersLimit: 6,
        photoUploadsPerMonth: 200,
        videoUploadsPerMonth: 10,
        voiceMinutesPerMonth: 60,
        memorySlots: 30,
        dataExportCount: 10,
      },
    },
    {
      id: 'premium',
      name: 'Family Premium Pro',
      tagline: 'Pilihan paling favorit untuk perlindungan & produktivitas lengkap',
      priceMonthly: 79000,
      priceYearly: 790000,
      isPopular: true,
      features: [
        '2.000 Token AI Gemini 3.6 / Hari',
        '50 GB Cloud Storage Aman',
        'Hingga 12 Anggota Keluarga',
        'Unggah Foto Tanpa Batas',
        '50 Video & 300 Menit Vokal AI / Bulan',
        'Slot Memori AI Tanpa Batas',
        'Fitur Safe Zone GPS & Deteksi Darurat',
        'Ekspor Data PDF/Excel Tanpa Batas',
      ],
      quotaLimits: {
        aiTokensPerDay: 2000,
        storageGB: 50,
        familyMembersLimit: 12,
        photoUploadsPerMonth: 999999,
        videoUploadsPerMonth: 50,
        voiceMinutesPerMonth: 300,
        memorySlots: 999999,
        dataExportCount: 999999,
      },
    },
    {
      id: 'family_plus',
      name: 'Family Plus Ultimate',
      tagline: 'Untuk keluarga besar & proteksi multi-generasi',
      priceMonthly: 149000,
      priceYearly: 1490000,
      features: [
        'Token AI Gemini 3.6 Tanpa Batas',
        '200 GB Super Cloud Storage',
        'Hingga 25 Anggota Keluarga',
        'Foto & Video Unggahan Tanpa Batas',
        'Vokal AI & Transkripsi Tanpa Batas',
        'Prioritas Server Serverless Gemini',
        'Dukungan Layanan Pelanggan 24/7 VIP',
      ],
      quotaLimits: {
        aiTokensPerDay: 999999,
        storageGB: 200,
        familyMembersLimit: 25,
        photoUploadsPerMonth: 999999,
        videoUploadsPerMonth: 999999,
        voiceMinutesPerMonth: 999999,
        memorySlots: 999999,
        dataExportCount: 999999,
      },
    },
    {
      id: 'lifetime',
      name: 'Lifetime Enterprise Pass',
      tagline: 'Bayar sekali, nikmati akses penuh selamanya untuk seluruh keturunan',
      priceMonthly: 1999000,
      priceYearly: 1999000,
      priceLifetime: 1999000,
      features: [
        'Akses Seumur Hidup Tanpa Biaya Bulanan',
        '500 GB Cloud Storage Abadi',
        'Hingga 50 Anggota Keluarga Multi-Generasi',
        'Semua Fitur Premium & Update AI Masa Depan',
        'Sertifikat Lisensi Resmi Digital',
      ],
      quotaLimits: {
        aiTokensPerDay: 999999,
        storageGB: 500,
        familyMembersLimit: 50,
        photoUploadsPerMonth: 999999,
        videoUploadsPerMonth: 999999,
        voiceMinutesPerMonth: 999999,
        memorySlots: 999999,
        dataExportCount: 999999,
      },
    },
  ];

  static getActiveSubscription(workspaceId: string = 'fam_rahardjo'): SubscriptionModel {
    try {
      const stored = localStorage.getItem(`${this.STORAGE_KEY_SUB}_${workspaceId}`);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error loading subscription:', e);
    }

    return {
      id: `sub_${workspaceId}_default`,
      workspaceId,
      planId: 'premium',
      status: 'active',
      billingCycle: 'monthly',
      startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      autoRenew: true,
      paymentMethod: 'Midtrans QRIS',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  static saveSubscription(subscription: SubscriptionModel) {
    try {
      localStorage.setItem(
        `${this.STORAGE_KEY_SUB}_${subscription.workspaceId}`,
        JSON.stringify(subscription)
      );
    } catch (e) {
      console.error('Error saving subscription:', e);
    }
  }

  static getUsage(workspaceId: string = 'fam_rahardjo'): UsageModel {
    try {
      const stored = localStorage.getItem(`${this.STORAGE_KEY_USAGE}_${workspaceId}`);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error loading usage stats:', e);
    }

    return {
      workspaceId,
      aiTokensUsedToday: 320,
      storageUsedBytes: 4.8 * 1024 * 1024 * 1024, // 4.8 GB
      photosUploadedThisMonth: 142,
      videosUploadedThisMonth: 12,
      voiceMinutesUsedThisMonth: 45,
      memorySlotsUsed: 18,
      lastResetDate: new Date().toISOString(),
    };
  }

  static saveUsage(usage: UsageModel) {
    try {
      localStorage.setItem(`${this.STORAGE_KEY_USAGE}_${usage.workspaceId}`, JSON.stringify(usage));
    } catch (e) {
      console.error('Error saving usage stats:', e);
    }
  }

  static validateCoupon(code: string): CouponModel | null {
    const coupons: CouponModel[] = [
      {
        code: 'FAMILYID2026',
        description: 'Diskon 50% Khusus Keluarga Indonesia Baru',
        discountPercentage: 50,
        expiresAt: '2026-12-31',
        minSpend: 25000,
        usageCount: 142,
        maxUsage: 1000,
      },
      {
        code: 'RAMADAN50',
        description: 'Potongan Rp 30.000 Semua Paket Langganan',
        discountAmount: 30000,
        expiresAt: '2026-12-31',
        minSpend: 50000,
        usageCount: 88,
        maxUsage: 500,
      },
    ];

    const found = coupons.find((c) => c.code.toUpperCase() === code.toUpperCase());
    return found || null;
  }
}
