import {
  FamilyMemberLocation,
  SafeZoneModel,
  FamilyCheckInModel,
  SOSAlertModel,
  EmergencyPlanModel,
  IncidentReportModel,
  FamilyTravelModel,
  AISafetyRecommendation,
} from '../types/family_safety';

export class MockSafetyAIService {
  private static familyMembers: FamilyMemberLocation[] = [
    {
      id: 'mem-1',
      memberName: 'Hendra Wijaya',
      role: 'Ayah',
      avatarBg: 'bg-blue-600',
      currentStatus: 'At Office',
      locationName: 'Gedung Wisma GKBI, Jakarta Pusat',
      batteryLevel: 82,
      lastCheckIn: '10:15 WIB',
      gpsSignal: 'Strong',
      latitude: -6.2146,
      longitude: 106.808,
      speedKmH: 0,
    },
    {
      id: 'mem-2',
      memberName: 'Ratna Saraswati',
      role: 'Ibu',
      avatarBg: 'bg-pink-600',
      currentStatus: 'At Home',
      locationName: 'Rumah Utama - Kebayoran Baru',
      batteryLevel: 94,
      lastCheckIn: '09:30 WIB',
      gpsSignal: 'Strong',
      latitude: -6.2415,
      longitude: 106.799,
      speedKmH: 0,
    },
    {
      id: 'mem-3',
      memberName: 'Kinan Wijaya',
      role: 'Anak Sulung (10 thn)',
      avatarBg: 'bg-emerald-600',
      currentStatus: 'At School',
      locationName: 'Sekolah SD Al-Azhar Kebayoran',
      batteryLevel: 68,
      lastCheckIn: '07:45 WIB (Masuk Gerbang)',
      gpsSignal: 'Strong',
      latitude: -6.2372,
      longitude: 106.7981,
      speedKmH: 0,
    },
    {
      id: 'mem-4',
      memberName: 'Arka Wijaya',
      role: 'Anak Bungsu (5 thn)',
      avatarBg: 'bg-amber-600',
      currentStatus: 'At Home',
      locationName: 'Rumah Utama - Kebayoran Baru',
      batteryLevel: 88,
      lastCheckIn: '08:00 WIB',
      gpsSignal: 'Strong',
      latitude: -6.2415,
      longitude: 106.799,
      speedKmH: 0,
    },
  ];

  private static safeZones: SafeZoneModel[] = [
    {
      id: 'sz-1',
      name: 'Rumah Utama',
      address: 'Jl. Wijaya IX No. 12, Kebayoran Baru, Jakarta Selatan',
      radiusMeters: 150,
      notifyOnEnter: true,
      notifyOnExit: true,
      activeMembersCount: 2,
      icon: 'Home',
      color: 'bg-emerald-500',
    },
    {
      id: 'sz-2',
      name: 'Sekolah Kinan (Al-Azhar)',
      address: 'Jl. Sisingamangaraja, Kebayoran Baru',
      radiusMeters: 200,
      notifyOnEnter: true,
      notifyOnExit: true,
      activeMembersCount: 1,
      icon: 'GraduationCap',
      color: 'bg-blue-500',
    },
    {
      id: 'sz-3',
      name: 'Kantor Ayah (GKBI)',
      address: 'Jl. Jend. Sudirman Kav. 28, Jakarta Pusat',
      radiusMeters: 250,
      notifyOnEnter: true,
      notifyOnExit: false,
      activeMembersCount: 1,
      icon: 'Building',
      color: 'bg-purple-500',
    },
    {
      id: 'sz-4',
      name: 'Rumah Kakek & Nenek',
      address: 'Jl. Cik Ditiro No. 45, Menteng',
      radiusMeters: 180,
      notifyOnEnter: true,
      notifyOnExit: true,
      activeMembersCount: 0,
      icon: 'Heart',
      color: 'bg-amber-500',
    },
  ];

  private static checkIns: FamilyCheckInModel[] = [
    {
      id: 'chk-1',
      memberName: 'Kinan Wijaya',
      locationName: 'Sekolah SD Al-Azhar',
      timestamp: 'Hari ini, 07:45 WIB',
      statusMessage: 'Sudah sampai di sekolah dan siap belajar!',
    },
    {
      id: 'chk-2',
      memberName: 'Hendra Wijaya',
      locationName: 'Kantor Wisma GKBI',
      timestamp: 'Hari ini, 08:30 WIB',
      statusMessage: 'Tiba di kantor dengan lancar.',
    },
    {
      id: 'chk-3',
      memberName: 'Ratna Saraswati',
      locationName: 'Pasar Modern Mayestik',
      timestamp: 'Kemarin, 16:20 WIB',
      statusMessage: 'Selesai belanja kebutuhan mingguan, otw pulang.',
    },
  ];

  private static sosAlerts: SOSAlertModel[] = [
    {
      id: 'sos-1',
      senderName: 'Uji Coba Sistem AI Safety',
      triggerTime: '3 hari lalu, 14:00 WIB',
      locationAddress: 'Rumah Utama - Kebayoran Baru',
      latitude: -6.2415,
      longitude: 106.799,
      status: 'Resolved',
      notes: 'Pengujian rutin tombol panic button oleh pengguna.',
    },
  ];

  private static emergencyPlans: EmergencyPlanModel[] = [
    {
      id: 'plan-1',
      title: 'Prosedur Gempa Bumi & Evakuasi Mandiri',
      category: 'Gempa Bumi',
      meetingPoint: 'Taman Kebayoran (Area Terbuka 100m dari rumah)',
      steps: [
        '1. Berlindung di bawah meja kokoh / lindungi kepala dengan bantal.',
        '2. Matikan saklar listrik utama & valve tabung gas elpiji.',
        '3. Buka pintu utama agar tidak terkunci akibat pergeseran struktur.',
        '4. Keluar dengan tenang menuju Titik Kumpul Taman Kebayoran.',
        '5. Lakukan Check-In di aplikasi FamilyAI Hub.',
      ],
      contacts: [
        { role: 'Ambulans & Gawat Darurat', name: 'RS Pondok Indah', phone: '118 / (021) 7657525' },
        { role: 'Polsek Kebayoran Baru', name: 'Kepolisian Local', phone: '110 / (021) 7222380' },
        { role: 'Petugas Keamanan Komplek', name: 'Pak Satpam Komar', phone: '081311223344' },
      ],
    },
    {
      id: 'plan-2',
      title: 'Rencana Darurat Kebakaran Rumah',
      category: 'Kebakaran',
      meetingPoint: 'Pos Satpam Blok C (Depan Gerbang Utama)',
      steps: [
        '1. Jangan panik, teriakkan PERINGATAN KEBAKARAN.',
        '2. Ambil APAR (Alat Pemadam Api Ringan) di dekat Dapur.',
        '3. Jika api membesar, evakuasi anak-anak melalui pintu belakang/depan.',
        '4. Hubungi Pemadam Kebakaran Jakarta Selatan.',
      ],
      contacts: [
        { role: 'Pemadam Kebakaran (Damkar)', name: 'Damkar Jaksel', phone: '113 / (021) 7515354' },
      ],
    },
  ];

  private static incidentReports: IncidentReportModel[] = [
    {
      id: 'inc-1',
      title: 'Pohon Tumbang Menutup Jalan Komplek',
      reporterName: 'Ratna Saraswati',
      category: 'Lainnya',
      location: 'Jl. Wijaya IX No. 18 (Dekat Taman)',
      dateTime: 'Kemarin, 17:30 WIB',
      description: 'Hujan deras disertai angin kencang menyebabkan cabang pohon cukup besar patah.',
      severity: 'Medium',
    },
  ];

  private static travelPlans: FamilyTravelModel[] = [
    {
      id: 'trv-1',
      tripName: 'Liburan Akhir Tahun Bali 2026',
      destination: 'Nusa Dua & Ubud, Bali',
      startDate: '2026-12-24',
      endDate: '2026-12-30',
      status: 'Upcoming',
      safetyNotes: 'Simpan nomor darurat RS BIMC Siloam Bali & Basarnas Bali.',
      membersInvolved: ['Hendra Wijaya', 'Ratna Saraswati', 'Kinan Wijaya', 'Arka Wijaya'],
    },
  ];

  public static async getFamilyLocations(): Promise<FamilyMemberLocation[]> {
    return [...this.familyMembers];
  }

  public static async getSafeZones(): Promise<SafeZoneModel[]> {
    return [...this.safeZones];
  }

  public static async getCheckIns(): Promise<FamilyCheckInModel[]> {
    return [...this.checkIns];
  }

  public static async getSOSAlerts(): Promise<SOSAlertModel[]> {
    return [...this.sosAlerts];
  }

  public static async getEmergencyPlans(): Promise<EmergencyPlanModel[]> {
    return [...this.emergencyPlans];
  }

  public static async getIncidentReports(): Promise<IncidentReportModel[]> {
    return [...this.incidentReports];
  }

  public static async getTravelPlans(): Promise<FamilyTravelModel[]> {
    return [...this.travelPlans];
  }

  public static async getAISafetyRecommendations(): Promise<AISafetyRecommendation[]> {
    return [
      {
        id: 'rec-1',
        title: 'Baterai HP Kinan Tersisa 68%',
        description:
          'Estimasi baterai cukup hingga jam pulang sekolah (15:00 WIB). Peringatan otomatis akan dikirimkan jika baterai di bawah 20%.',
        riskLevel: 'Low',
        suggestedAction: 'Kirim pengingat cas ke jam tangan / HP Kinan',
      },
      {
        id: 'rec-2',
        title: 'Prakiraan Cuaca Hujan Deras di Kebayoran Baru',
        description:
          'Potensi hujan lebat pukul 14:30 - 17:00 WIB. Disarankan melakukan penjemputan anak sekolah lebih awal atau menyiapkan jas hujan.',
        riskLevel: 'Medium',
        suggestedAction: 'Aktifkan Rute Penjemputan Aman',
      },
      {
        id: 'rec-3',
        title: 'Pemeriksaan Rutin APAR Rumah',
        description:
          'APAR Dapur belum diperiksa dalam 6 bulan terakhir. Pastikan jarum tekanan berada di area hijau.',
        riskLevel: 'Low',
        suggestedAction: 'Jadwalkan Cek APAR',
      },
    ];
  }

  public static async sendCheckIn(
    memberName: string,
    locationName: string,
    statusMessage: string
  ): Promise<FamilyCheckInModel> {
    const newCheckIn: FamilyCheckInModel = {
      id: `chk-${Date.now()}`,
      memberName,
      locationName,
      timestamp: 'Baru Saja',
      statusMessage,
    };
    this.checkIns.unshift(newCheckIn);
    return newCheckIn;
  }

  public static async triggerSOS(senderName: string, notes?: string): Promise<SOSAlertModel> {
    const sos: SOSAlertModel = {
      id: `sos-${Date.now()}`,
      senderName,
      triggerTime: 'Baru Saja (Sinyal Darurat Dipancarkan)',
      locationAddress: 'Rumah Utama - Kebayoran Baru',
      latitude: -6.2415,
      longitude: 106.799,
      status: 'Active',
      notes: notes || 'Sinyal Darurat SOS diaktifkan dari aplikasi!',
    };
    this.sosAlerts.unshift(sos);
    return sos;
  }

  public static async addIncidentReport(
    report: Omit<IncidentReportModel, 'id'>
  ): Promise<IncidentReportModel> {
    const newReport: IncidentReportModel = {
      ...report,
      id: `inc-${Date.now()}`,
    };
    this.incidentReports.unshift(newReport);
    return newReport;
  }
}
