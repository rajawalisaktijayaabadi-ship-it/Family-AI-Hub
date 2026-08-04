import {
  StressModel,
  ReflectionModel,
  GratitudeModel,
  RelationshipModel,
} from '../types/psychology';

const STRESS_STORAGE_KEY = 'family_ai_stress_tests';
const REFLECTION_STORAGE_KEY = 'family_ai_reflections';
const GRATITUDE_STORAGE_KEY = 'family_ai_gratitudes';
const RELATIONSHIP_STORAGE_KEY = 'family_ai_relationship';

const INITIAL_STRESS: StressModel[] = [
  {
    id: 's_1',
    userId: 'u_ayah',
    userName: 'Ayah (Budi)',
    score: 28,
    level: 'Rendah',
    answers: { q1: 1, q2: 2, q3: 1, q4: 1, q5: 2 },
    recommendations: [
      'Pertahankan pola tidur teratur 7-8 jam.',
      'Lakukan peregangan otot ringan setiap 2 jam bekerja.',
    ],
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

const INITIAL_REFLECTIONS: ReflectionModel[] = [
  {
    id: 'r_1',
    userId: 'u_ayah',
    userName: 'Ayah (Budi)',
    dailyReflection: 'Saya belajar mendengarkan tanpa langsung menghakimi saat anak bercerita.',
    achievements: ['Selesai laporan kantor tepat waktu', 'Mendampingi anak belajar 1 jam'],
    lessonsLearned: 'Sabar adalah kunci komunikasi hangat.',
    createdAt: new Date().toISOString(),
  },
];

const INITIAL_GRATITUDES: GratitudeModel[] = [
  {
    id: 'g_1',
    userId: 'u_ibu',
    userName: 'Ibu (Siti)',
    content: 'Bersyukur atas kesehatan keluarga dan cuaca cerah hari ini.',
    isSharedWithFamily: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'g_2',
    userId: 'u_ayah',
    userName: 'Ayah (Budi)',
    content: 'Bersyukur memiliki pasangan yang selalu mendukung dan penuh pengertian.',
    isSharedWithFamily: true,
    createdAt: new Date(Date.now() - 3600000 * 10).toISOString(),
  },
];

const INITIAL_RELATIONSHIP: RelationshipModel = {
  communicationScore: 88,
  familyBondScore: 92,
  qualityTimeHours: 14.5,
  trustScore: 95,
  updatedAt: new Date().toISOString(),
};

export class PsychologyRepository {
  static getStressHistory(): StressModel[] {
    try {
      const data = localStorage.getItem(STRESS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STRESS_STORAGE_KEY, JSON.stringify(INITIAL_STRESS));
        return INITIAL_STRESS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_STRESS;
    }
  }

  static saveStressTest(test: StressModel): StressModel[] {
    const history = this.getStressHistory();
    const updated = [test, ...history];
    localStorage.setItem(STRESS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }

  static getReflections(): ReflectionModel[] {
    try {
      const data = localStorage.getItem(REFLECTION_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(REFLECTION_STORAGE_KEY, JSON.stringify(INITIAL_REFLECTIONS));
        return INITIAL_REFLECTIONS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_REFLECTIONS;
    }
  }

  static saveReflection(ref: ReflectionModel): ReflectionModel[] {
    const list = this.getReflections();
    const updated = [ref, ...list];
    localStorage.setItem(REFLECTION_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }

  static getGratitudes(): GratitudeModel[] {
    try {
      const data = localStorage.getItem(GRATITUDE_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(GRATITUDE_STORAGE_KEY, JSON.stringify(INITIAL_GRATITUDES));
        return INITIAL_GRATITUDES;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_GRATITUDES;
    }
  }

  static saveGratitude(gratitude: GratitudeModel): GratitudeModel[] {
    const list = this.getGratitudes();
    const updated = [gratitude, ...list];
    localStorage.setItem(GRATITUDE_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }

  static getRelationship(): RelationshipModel {
    try {
      const data = localStorage.getItem(RELATIONSHIP_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(RELATIONSHIP_STORAGE_KEY, JSON.stringify(INITIAL_RELATIONSHIP));
        return INITIAL_RELATIONSHIP;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_RELATIONSHIP;
    }
  }

  static updateRelationship(rel: Partial<RelationshipModel>): RelationshipModel {
    const current = this.getRelationship();
    const updated = { ...current, ...rel, updatedAt: new Date().toISOString() };
    localStorage.setItem(RELATIONSHIP_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }
}
