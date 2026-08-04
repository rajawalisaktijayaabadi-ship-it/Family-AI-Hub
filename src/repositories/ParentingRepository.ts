import {
  SchoolActivity,
  FamilyActivityModel,
  ScreenTimeModel,
  LearningGoalModel,
  FamilyChallenge,
  ParentingJournalModel,
} from '../types/parenting';

const MOCK_SCHOOL_ACTIVITIES: SchoolActivity[] = [
  {
    id: 'sch-1',
    childId: 'child-1',
    title: 'PR Matematika Halaman 42',
    type: 'homework',
    date: '2026-08-05',
    teacherNote: 'Mohon dibantu memeriksa ketelitian perkalian angka 2 digit.',
    isDone: false,
  },
  {
    id: 'sch-2',
    childId: 'child-1',
    title: 'Ujian Tengah Semester Bahasa Indonesia',
    type: 'exam',
    date: '2026-08-10',
    teacherNote: 'Materi bab 1 sampai bab 3.',
    isDone: false,
  },
  {
    id: 'sch-3',
    childId: 'child-2',
    title: 'Pentas Seni & Kebudayaan TK',
    type: 'event',
    date: '2026-08-12',
    teacherNote: 'Memakai pakaian adat daerah.',
    isDone: false,
  },
];

const MOCK_FAMILY_ACTIVITIES: FamilyActivityModel[] = [
  {
    id: 'act-1',
    title: 'Piknik Keluarga Akhir Pekan',
    category: 'Weekend Plan',
    date: '2026-08-08',
    participants: ['Ayah', 'Ibu', 'Aisyah', 'Fathan'],
    status: 'planned',
    notes: 'Membawa bekal buah segar, karpet, dan bola plastik.',
  },
  {
    id: 'act-2',
    title: 'Nonton Film Edukasi Bersama',
    category: 'Movie Night',
    date: '2026-08-04',
    participants: ['Ayah', 'Ibu', 'Aisyah', 'Fathan'],
    status: 'completed',
    notes: 'Menonton film petualangan hewan dan diskusi moral cerita.',
  },
  {
    id: 'act-3',
    title: 'Membuat Kue Kering Bersama Ibu',
    category: 'Cooking Together',
    date: '2026-08-06',
    participants: ['Ibu', 'Aisyah'],
    status: 'planned',
    notes: 'Belajar takaran dan ketelatenan bentuk nastar.',
  },
];

const MOCK_SCREEN_TIME: ScreenTimeModel[] = [
  {
    id: 'st-1',
    childId: 'child-1',
    targetMinutes: 60,
    dailyUsageMinutes: 45,
    weeklyLimitMinutes: 420,
    reminderActive: true,
  },
  {
    id: 'st-2',
    childId: 'child-2',
    targetMinutes: 30,
    dailyUsageMinutes: 20,
    weeklyLimitMinutes: 210,
    reminderActive: true,
  },
];

const MOCK_LEARNING_GOALS: LearningGoalModel[] = [
  {
    id: 'lg-1',
    childId: 'child-1',
    goalType: 'reading',
    title: 'Membaca 5 Buku Cerita Edukasi',
    targetValue: 5,
    currentValue: 3,
    unit: 'Buku',
    deadline: '2026-08-31',
  },
  {
    id: 'lg-2',
    childId: 'child-1',
    goalType: 'memorization',
    title: 'Hafalan Surat Juz Amma (10 Surat)',
    targetValue: 10,
    currentValue: 7,
    unit: 'Surat',
    deadline: '2026-08-25',
  },
  {
    id: 'lg-3',
    childId: 'child-2',
    goalType: 'skill',
    title: 'Mengenal Warna & Angka Inggris 1-10',
    targetValue: 10,
    currentValue: 8,
    unit: 'Angka',
    deadline: '2026-08-20',
  },
];

const MOCK_CHALLENGES: FamilyChallenge[] = [
  {
    id: 'fc-1',
    title: 'Tantangan Bebas Gadget Saat Makan Malam',
    category: 'Weekly',
    pointsReward: 50,
    progressPercent: 80,
    isCompleted: false,
  },
  {
    id: 'fc-2',
    title: 'Tantangan Membaca Buku 15 Menit Setiap Hari',
    category: 'Reading',
    pointsReward: 100,
    progressPercent: 100,
    isCompleted: true,
  },
  {
    id: 'fc-3',
    title: 'Tantangan Rumah Rapi & Bersih Bersama',
    category: 'Cleaning',
    pointsReward: 60,
    progressPercent: 60,
    isCompleted: false,
  },
];

const MOCK_JOURNALS: ParentingJournalModel[] = [
  {
    id: 'jour-1',
    childId: 'child-1',
    title: 'Aisyah Belajar Berbagi Dengan Adiknya',
    note: 'Hari ini Aisyah dengan ikhlas meminjamkan pensil warnanya kepada Fathan saat mewarnai gambar rumah.',
    milestoneTag: 'Emosional & Sosial',
    createdAt: '2026-08-03',
  },
  {
    id: 'jour-2',
    childId: 'child-2',
    title: 'Fathan Berhasil Mengikat Tali Sepatu',
    note: 'Fathan mencoba 3 kali dan akhirnya berhasil mengikat simpul tali sepatu olahraganya sendiri!',
    milestoneTag: 'Kemandirian Motorik',
    createdAt: '2026-08-02',
  },
];

export class ParentingRepository {
  private schoolActivities = MOCK_SCHOOL_ACTIVITIES;
  private familyActivities = MOCK_FAMILY_ACTIVITIES;
  private screenTime = MOCK_SCREEN_TIME;
  private learningGoals = MOCK_LEARNING_GOALS;
  private challenges = MOCK_CHALLENGES;
  private journals = MOCK_JOURNALS;

  public async getSchoolActivities(childId?: string): Promise<SchoolActivity[]> {
    if (childId) {
      return this.schoolActivities.filter((s) => s.childId === childId);
    }
    return this.schoolActivities;
  }

  public async toggleSchoolActivity(id: string): Promise<SchoolActivity | undefined> {
    const act = this.schoolActivities.find((s) => s.id === id);
    if (act) {
      act.isDone = !act.isDone;
    }
    return act;
  }

  public async getFamilyActivities(): Promise<FamilyActivityModel[]> {
    return this.familyActivities;
  }

  public async addFamilyActivity(act: Omit<FamilyActivityModel, 'id'>): Promise<FamilyActivityModel> {
    const newAct: FamilyActivityModel = {
      ...act,
      id: `act-${Date.now()}`,
    };
    this.familyActivities.push(newAct);
    return newAct;
  }

  public async getScreenTime(childId: string): Promise<ScreenTimeModel | undefined> {
    return this.screenTime.find((s) => s.childId === childId);
  }

  public async updateScreenTime(childId: string, updates: Partial<ScreenTimeModel>): Promise<ScreenTimeModel> {
    const index = this.screenTime.findIndex((s) => s.childId === childId);
    if (index !== -1) {
      this.screenTime[index] = { ...this.screenTime[index], ...updates };
      return this.screenTime[index];
    } else {
      const newSt: ScreenTimeModel = {
        id: `st-${Date.now()}`,
        childId,
        targetMinutes: updates.targetMinutes || 60,
        dailyUsageMinutes: updates.dailyUsageMinutes || 0,
        weeklyLimitMinutes: updates.weeklyLimitMinutes || 420,
        reminderActive: updates.reminderActive ?? true,
      };
      this.screenTime.push(newSt);
      return newSt;
    }
  }

  public async getLearningGoals(childId?: string): Promise<LearningGoalModel[]> {
    if (childId) {
      return this.learningGoals.filter((l) => l.childId === childId);
    }
    return this.learningGoals;
  }

  public async addLearningGoal(goal: Omit<LearningGoalModel, 'id'>): Promise<LearningGoalModel> {
    const newGoal: LearningGoalModel = {
      ...goal,
      id: `lg-${Date.now()}`,
    };
    this.learningGoals.push(newGoal);
    return newGoal;
  }

  public async getChallenges(): Promise<FamilyChallenge[]> {
    return this.challenges;
  }

  public async getJournals(childId?: string): Promise<ParentingJournalModel[]> {
    if (childId) {
      return this.journals.filter((j) => j.childId === childId);
    }
    return this.journals;
  }

  public async addJournal(journal: Omit<ParentingJournalModel, 'id' | 'createdAt'>): Promise<ParentingJournalModel> {
    const newJour: ParentingJournalModel = {
      ...journal,
      id: `jour-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    this.journals.push(newJour);
    return newJour;
  }
}
