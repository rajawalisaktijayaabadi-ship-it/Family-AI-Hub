import { ChildModel, DevelopmentModel } from '../types/parenting';

const MOCK_CHILDREN: ChildModel[] = [
  {
    id: 'child-1',
    name: 'Aisyah Putri',
    nickname: 'Aisyah',
    birthDate: '2017-05-14',
    gender: 'Perempuan',
    school: 'SD IT Al-Azhar',
    grade: 'Kelas 3 SD',
    hobbies: ['Membaca', 'Melukis', 'Berenang'],
    allergies: ['Kacang Tanah'],
    parentNotes: 'Suka belajar hafalan surat pendek dan menggambar pemandangan.',
    photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80',
    createdAt: '2024-01-10',
  },
  {
    id: 'child-2',
    name: 'Fathan Ahmad',
    nickname: 'Fathan',
    birthDate: '2020-09-20',
    gender: 'Laki-laki',
    school: 'TK Pembina',
    grade: 'TK B',
    hobbies: ['Main Lego', 'Sepeda', 'Menyanyi'],
    allergies: [],
    parentNotes: 'Sangat aktif, senang menyusun balok dan bercerita.',
    photoUrl: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=200&auto=format&fit=crop&q=80',
    createdAt: '2024-02-15',
  },
];

const MOCK_DEVELOPMENT: DevelopmentModel[] = [
  {
    id: 'dev-1',
    childId: 'child-1',
    date: '2026-08-01',
    heightCm: 128,
    weightKg: 26.5,
    milestones: [
      { title: 'Mampu membaca 10 halaman buku cerita mandiri', isAchieved: true, dateAchieved: '2026-07-20' },
      { title: 'Menulis jurnal harian dengan rapi', isAchieved: true, dateAchieved: '2026-07-28' },
      { title: 'Mampu mengikat tali sepatu sendiri', isAchieved: true, dateAchieved: '2026-06-15' },
    ],
    achievements: ['Juara 2 Lomba Menggambar Sekolah', 'Hafal Surah Al-Mulk (Ayat 1-10)'],
    activitySummary: 'Aisyah menunjukkan konsentrasi yang baik saat belajar membaca dan sangat kooperatif.',
  },
  {
    id: 'dev-2',
    childId: 'child-2',
    date: '2026-08-01',
    heightCm: 104,
    weightKg: 17.2,
    milestones: [
      { title: 'Menyusun balok 15 tingkat tanpa jatuh', isAchieved: true, dateAchieved: '2026-07-15' },
      { title: 'Mengenal huruf A-Z dan angka 1-20', isAchieved: true, dateAchieved: '2026-07-25' },
      { title: 'Mampu merapikan mainan sendiri setelah bermain', isAchieved: true, dateAchieved: '2026-07-30' },
    ],
    achievements: ['Bintang Kelas Kerapihan TK'],
    activitySummary: 'Fathan sangat antusias saat aktivitas fisik dan motorik halus seperti menyusun lego.',
  },
];

export class ChildRepository {
  private children: ChildModel[] = MOCK_CHILDREN;
  private development: DevelopmentModel[] = MOCK_DEVELOPMENT;

  public async getChildren(): Promise<ChildModel[]> {
    return this.children;
  }

  public async getChildById(id: string): Promise<ChildModel | undefined> {
    return this.children.find((c) => c.id === id);
  }

  public async addChild(child: Omit<ChildModel, 'id' | 'createdAt'>): Promise<ChildModel> {
    const newChild: ChildModel = {
      ...child,
      id: `child-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    this.children.push(newChild);
    return newChild;
  }

  public async updateChild(id: string, updates: Partial<ChildModel>): Promise<ChildModel | undefined> {
    const index = this.children.findIndex((c) => c.id === id);
    if (index === -1) return undefined;
    this.children[index] = { ...this.children[index], ...updates };
    return this.children[index];
  }

  public async getDevelopment(childId: string): Promise<DevelopmentModel | undefined> {
    return this.development.find((d) => d.childId === childId);
  }

  public async updateDevelopment(childId: string, updates: Partial<DevelopmentModel>): Promise<DevelopmentModel> {
    const index = this.development.findIndex((d) => d.childId === childId);
    if (index !== -1) {
      this.development[index] = { ...this.development[index], ...updates };
      return this.development[index];
    } else {
      const newDev: DevelopmentModel = {
        id: `dev-${Date.now()}`,
        childId,
        date: new Date().toISOString().split('T')[0],
        heightCm: updates.heightCm || 110,
        weightKg: updates.weightKg || 20,
        milestones: updates.milestones || [],
        achievements: updates.achievements || [],
        activitySummary: updates.activitySummary || '',
      };
      this.development.push(newDev);
      return newDev;
    }
  }
}
