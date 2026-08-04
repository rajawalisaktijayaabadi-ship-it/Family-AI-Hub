import { MoodModel } from '../types/mood';

const MOOD_STORAGE_KEY = 'family_ai_moods';

const INITIAL_MOODS: MoodModel[] = [
  {
    id: 'm_1',
    userId: 'u_ayah',
    userName: 'Ayah (Budi)',
    userRole: 'Ayah',
    category: '❤️ Bersyukur',
    intensity: 8,
    colorHex: '#ef4444',
    note: 'Anak-anak sekolah dengan lancar, pekerjaan di kantor produktif.',
    photoUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&auto=format&fit=crop&q=60',
    location: 'Jakarta Selatan',
    tags: ['Pekerjaan', 'Rumah'],
    activities: ['Bekerja', 'Kumpul Keluarga'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'm_2',
    userId: 'u_ibu',
    userName: 'Ibu (Siti)',
    userRole: 'Ibu',
    category: '😌 Tenang',
    intensity: 9,
    colorHex: '#10b981',
    note: 'Memasak sop buntut hangat dan mengatur anggaran belanja bulanan dengan hemat.',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60',
    location: 'Dapur Rumah',
    tags: ['Keuangan', 'Rumah', 'Anak'],
    activities: ['Memasak', 'Membaca'],
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'm_3',
    userId: 'u_anak1',
    userName: 'Siti Jr (Anak)',
    userRole: 'Anak',
    category: '😊 Bahagia',
    intensity: 9,
    colorHex: '#3b82f6',
    note: 'Dapat nilai 95 di ujian matematika dan bermain bersama teman di sekolah.',
    photoUrl: '',
    location: 'Sekolah Dasar',
    tags: ['Sekolah', 'Teman'],
    activities: ['Belajar', 'Bermain'],
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'm_4',
    userId: 'u_ayah',
    userName: 'Ayah (Budi)',
    userRole: 'Ayah',
    category: '😴 Lelah',
    intensity: 6,
    colorHex: '#8b5cf6',
    note: 'Lalu lintas macet saat pulang kantor.',
    photoUrl: '',
    location: 'Jalan Tol',
    tags: ['Pekerjaan'],
    activities: ['Mengemudi'],
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 28).toISOString(),
  },
  {
    id: 'm_5',
    userId: 'u_ibu',
    userName: 'Ibu (Siti)',
    userRole: 'Ibu',
    category: '❤️ Bersyukur',
    intensity: 10,
    colorHex: '#f59e0b',
    note: 'Keluarga berkumpul lengkap di meja makan.',
    photoUrl: '',
    location: 'Ruang Makan',
    tags: ['Rumah', 'Pasangan', 'Anak'],
    activities: ['Makan Bersama'],
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

export class MoodRepository {
  static getAllMoods(): MoodModel[] {
    try {
      const data = localStorage.getItem(MOOD_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(MOOD_STORAGE_KEY, JSON.stringify(INITIAL_MOODS));
        return INITIAL_MOODS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_MOODS;
    }
  }

  static saveMood(mood: MoodModel): MoodModel[] {
    const moods = this.getAllMoods();
    const existingIndex = moods.findIndex((m) => m.id === mood.id);
    let updated: MoodModel[];
    if (existingIndex >= 0) {
      updated = [...moods];
      updated[existingIndex] = mood;
    } else {
      updated = [mood, ...moods];
    }
    localStorage.setItem(MOOD_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }

  static deleteMood(id: string): MoodModel[] {
    const moods = this.getAllMoods().filter((m) => m.id !== id);
    localStorage.setItem(MOOD_STORAGE_KEY, JSON.stringify(moods));
    return moods;
  }

  static clearAll(): void {
    localStorage.removeItem(MOOD_STORAGE_KEY);
  }
}
