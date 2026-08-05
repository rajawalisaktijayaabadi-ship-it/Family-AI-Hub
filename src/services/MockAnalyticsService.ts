import {
  AnalyticsModel,
  ReportModel,
  InsightModel,
  NotificationModel,
  AnnouncementModel,
  AuditLogModel,
  SystemStatusModel,
  FeatureFlagModel,
  AdminModel,
} from '../types/analytics';

export class MockAnalyticsService {
  static getInitialAnalytics(): AnalyticsModel {
    return {
      familyScore: 88,
      healthScore: 92,
      financeScore: 85,
      moodScore: 90,
      educationScore: 84,
      safetyScore: 96,
      activityScore: 82,
      nutritionScore: 88,
      productivityCompletionRate: 86,
      lastUpdated: new Date().toISOString(),
    };
  }

  static getInitialReports(): ReportModel[] {
    return [
      {
        id: 'rep_1',
        title: 'Laporan Kesehatan & Nutrisi Keluarga (Agustus 2026)',
        category: 'Health',
        timeframe: 'Monthly Report',
        dateRange: '01 Agu - 31 Agu 2026',
        summary: 'Keluarga mencapai target olahraga harian 85% dan asupan gizi seimbang berjalan sangat baik.',
        keyMetrics: { 'Rata-rata Kalori': '2,100 kcal', 'Aktivitas Fisik': '4x / Minggu', 'Skor Kesehatan': 92 },
        generatedAt: '2026-08-01',
      },
      {
        id: 'rep_2',
        title: 'Ringkasan Keuangan & Tabungan Edukasi Harian',
        category: 'Finance',
        timeframe: 'Daily Report',
        dateRange: '04 Agu 2026',
        summary: 'Pengeluaran harian hemat 12% di bawah anggaran bulanan. Dana darurat aman.',
        keyMetrics: { 'Pengeluaran Hari Ini': 'Rp 145.000', 'Sisa Budget': 'Rp 4.250.000', 'Efisiensi': '91%' },
        generatedAt: '2026-08-04',
      },
      {
        id: 'rep_3',
        title: 'Laporan Perkembangan Belajar & Parenting Anak',
        category: 'Education',
        timeframe: 'Weekly Report',
        dateRange: '28 Jul - 04 Agu 2026',
        summary: 'Anak menyelesaikan 6 modul membaca dan matematika interaktif tepat waktu.',
        keyMetrics: { 'Modul Selesai': 6, 'Waktu Belajar Total': '8.5 Jam', 'Skor Kognitif': 89 },
        generatedAt: '2026-08-04',
      },
      {
        id: 'rep_4',
        title: 'Audit Keamanan & Lokasi Cerdas Rumah',
        category: 'Safety',
        timeframe: 'Monthly Report',
        dateRange: 'Juli 2026',
        summary: 'Sistem Geofence dan Sensor IoT rumah pintar bekerja 100% tanpa insiden.',
        keyMetrics: { 'Status Geofence': 'Aktif', 'Insiden': 0, 'Uptime IoT': '99.9%' },
        generatedAt: '2026-08-01',
      },
    ];
  }

  static getInitialInsights(): InsightModel[] {
    return [
      {
        id: 'ins_1',
        title: 'Optimalisasi Waktu Tidur & Deteksi Kelelahan',
        category: 'Health',
        priority: 'High',
        description: 'Tingkat stres ringan terdeteksi pada akhir pekan. Disarankan menambah waktu istirahat malam 30 menit.',
        actionableStep: 'Atur pengingat "Rutin Tidur Malam" pada Smart Calendar pukul 21.30 WIB.',
        riskDetection: 'Potensi penurunan imun 10% jika kurang tidur berlanjut.',
        trendPrediction: 'Tren kualitas tidur diprediksi meningkat setelah jadwal olahraga konsisten.',
        date: '2026-08-04',
        isArchived: false,
      },
      {
        id: 'ins_2',
        title: 'Peluang Tabungan Investasi Pendidikan Anak',
        category: 'Finance',
        priority: 'Medium',
        description: 'Ada surplus pengeluaran mingguan sebesar Rp 350.000 yang bisa dialokasikan ke Portofolio Edukasi.',
        actionableStep: 'Transfer otomatis ke tabungan berjangka pendidikan bulan ini.',
        riskDetection: 'Sensitivitas inflasi biaya sekolah tahunan.',
        trendPrediction: 'Target dana kuliah tercapai 2 tahun lebih awal.',
        date: '2026-08-03',
        isArchived: false,
      },
      {
        id: 'ins_3',
        title: 'Peningkatan Aktivitas Motorik & Kreativitas',
        category: 'Parenting',
        priority: 'Medium',
        description: 'Anak sangat antusias dengan aktivitas mewarnai dan puzzle kognitif minggu ini.',
        actionableStep: 'Jadwalkan sesi taman bermain outdoor pada hari Sabtu pukul 08.00 WIB.',
        trendPrediction: 'Keterampilan pemecahan masalah naik 15%.',
        date: '2026-08-02',
        isArchived: false,
      },
    ];
  }

  static getInitialNotifications(): NotificationModel[] {
    return [
      {
        id: 'notif_1',
        title: 'Pengingat Vaksinasi Anak',
        message: 'Jadwal imunisasi berkala anak di RS Hermina besok pukul 09.00 WIB.',
        type: 'Health',
        priority: 'Urgent',
        timestamp: '10 menit yang lalu',
        isRead: false,
        isPinned: true,
        isArchived: false,
      },
      {
        id: 'notif_2',
        title: 'Laporan Keuangan Mingguan Siap',
        message: 'Ringkasan pengeluaran & kuitansi minggu ini telah diperbarui.',
        type: 'Finance',
        priority: 'Normal',
        timestamp: '1 jam yang lalu',
        isRead: false,
        isPinned: false,
        isArchived: false,
      },
      {
        id: 'notif_3',
        title: 'Geofence Safety Alert: Ibu Tiba di Rumah',
        message: 'Ibu telah sampai di lokasi rumah (Geofence Safe Zone).',
        type: 'Security',
        priority: 'High',
        timestamp: '3 jam yang lalu',
        isRead: true,
        isPinned: false,
        isArchived: false,
      },
      {
        id: 'notif_4',
        title: 'Jadwal Belajar Bersama Keluarga',
        message: 'Sesi kuis edukasi keluarga dijadwalkan pukul 19.30 WIB.',
        type: 'Education',
        priority: 'Normal',
        timestamp: 'Kemarin',
        isRead: true,
        isPinned: false,
        isArchived: false,
      },
    ];
  }

  static getInitialAnnouncements(): AnnouncementModel[] {
    return [
      {
        id: 'anc_1',
        title: 'Pembaruan Fitur: Family Memories & Digital Vault 2.0',
        content: 'Fitur baru penyimpanan foto, audio voice AI, dan enkripsi vault resmi dapat digunakan seluruh anggota keluarga.',
        category: 'Feature Update',
        publishedAt: '2026-08-04',
        isImportant: true,
      },
      {
        id: 'anc_2',
        title: 'Pemeliharaan Rutin Server Cloud Analytics',
        content: 'Sinkronisasi analytics akan mengalami jeda singkat pada hari Minggu pukul 02.00 WIB.',
        category: 'Maintenance',
        publishedAt: '2026-08-02',
        isImportant: false,
      },
    ];
  }

  static getInitialAuditLogs(): AuditLogModel[] {
    return [
      {
        id: 'log_1',
        actor: 'Ayah (Admin)',
        action: 'Login',
        module: 'Authentication',
        details: 'Login sukses dari peranti Android via Biometrik Passkey',
        ipAddress: '180.252.11.45',
        timestamp: '2026-08-05 08:15:22',
      },
      {
        id: 'log_2',
        actor: 'Ibu (Member)',
        action: 'Update',
        module: 'Family Safety',
        details: 'Menambahkan lokasi darurat aman (Safe Zone Sekolah)',
        ipAddress: '180.252.11.46',
        timestamp: '2026-08-04 16:20:10',
      },
      {
        id: 'log_3',
        actor: 'Ayah (Admin)',
        action: 'Export',
        module: 'Report Center',
        details: 'Mengunduh Laporan Keuangan Bulanan format PDF',
        ipAddress: '180.252.11.45',
        timestamp: '2026-08-04 10:05:00',
      },
    ];
  }

  static getInitialFeatureFlags(): FeatureFlagModel[] {
    return [
      {
        id: 'ff_1',
        key: 'enable_voice_ai_transcription',
        name: 'Transkripsi Otomatis Voice AI',
        isEnabled: true,
        description: 'Mengaktifkan pencatatan suara otomatis pada memori keluarga',
      },
      {
        id: 'ff_2',
        key: 'enable_ai_predictive_budget',
        name: 'Prediksi Anggaran Cerdas AI',
        isEnabled: true,
        description: 'Simulasi deteksi pengeluaran membengkak dengan AI',
      },
      {
        id: 'ff_3',
        key: 'enable_geofence_radar',
        name: 'Radar Geofence IoT Realtime',
        isEnabled: true,
        description: 'Fitur pelacak jarak aman keluarga di luar rumah',
      },
    ];
  }

  static getInitialAdminStats(): AdminModel {
    return {
      totalUsers: 4280,
      totalWorkspaces: 1120,
      activeSubscriptions: 950,
      mrrEstimate: 142500000,
    };
  }

  static getInitialSystemStatus(): SystemStatusModel {
    return {
      apiStatus: 'Operational',
      databaseStatus: 'Healthy',
      storageUsageMb: 1420.5,
      activeUsersCount: 128,
      lastCheckTimestamp: new Date().toISOString(),
    };
  }
}
