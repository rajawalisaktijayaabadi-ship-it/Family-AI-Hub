import { AIContextModel, AIMemoryModel } from '../../types/ai';

export class AIContextService {
  static getContext(
    currentScreen: string = 'dashboard',
    pinnedMemories: AIMemoryModel[] = []
  ): AIContextModel {
    return {
      userId: 'usr_default',
      familyId: 'fam_rahardjo',
      familyName: 'Keluarga Rahardjo',
      memberCount: 4,
      currentScreen,
      recentActivities: [
        'Budi menyelesaikan olah raga pagi 15 menit',
        'Siti mencatat pengeluaran belanja Rp 150.000',
        'Anak-anak membaca buku edukasi 30 menit',
      ],
      healthOverview: {
        score: 92,
        notes: 'Pemeriksaan rutin keluarga lengkap, tekanan darah normal.',
      },
      financeOverview: {
        monthlyBudget: 15000000,
        spent: 8500000,
      },
      educationOverview: {
        activeCourses: 3,
        progress: 82,
      },
      moodOverview: {
        dominantMood: 'Bahagia & Harmonis',
        averageScore: 9.2,
      },
      smartHomeStatus: {
        activeDevices: 8,
        alerts: 0,
      },
      safetyStatus: {
        level: 'Sangat Aman',
        activeCheckins: 4,
      },
      pinnedMemories,
      updatedAt: new Date().toISOString(),
    };
  }
}
