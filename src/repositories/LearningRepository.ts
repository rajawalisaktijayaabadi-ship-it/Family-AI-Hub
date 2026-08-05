import {
  StudyPlanModel,
  ReadingModel,
  CourseModel,
  QuizModel,
  FlashcardModel,
  LearningGoalModel,
  CertificateModel,
  AchievementModel,
} from '../types/education';

const initialStudyPlans: StudyPlanModel[] = [
  {
    id: 'stp-1',
    studentId: 'std-1',
    title: 'Sesi Fokus Matematika: Latihan Aljabar',
    date: '2026-08-04',
    startTime: '16:00',
    endTime: '17:30',
    focusSubject: 'Matematika Terapan',
    durationMinutes: 90,
    isCompleted: false,
    notes: 'Metode Pomodoro 3x 25 Menit',
  },
  {
    id: 'stp-2',
    studentId: 'std-1',
    title: 'Membaca Bab 3 Fisika Magnet & Listrik',
    date: '2026-08-04',
    startTime: '19:30',
    endTime: '20:30',
    focusSubject: 'IPA Terpadu',
    durationMinutes: 60,
    isCompleted: true,
  },
];

const initialReadings: ReadingModel[] = [
  {
    id: 'rd-1',
    studentId: 'std-1',
    bookTitle: 'Ensiklopedia Sains Populer Anak Bangsa',
    author: 'Tim Penulis LIPI',
    category: 'Sains',
    totalPages: 240,
    pagesRead: 180,
    rating: 5,
    isCompleted: false,
    notes: 'Sangat menarik penjelasan tentang galaksi dan tata surya.',
  },
  {
    id: 'rd-2',
    studentId: 'std-1',
    bookTitle: 'Laskar Pelangi',
    author: 'Andrea Hirata',
    category: 'Fiksi',
    totalPages: 340,
    pagesRead: 340,
    rating: 5,
    isCompleted: true,
    notes: 'Inspiratif tentang perjuangan sekolah di Gantitung.',
  },
];

const initialCourses: CourseModel[] = [
  {
    id: 'crs-1',
    title: 'Dasar Pemrograman Python untuk Pelajar SMP',
    category: 'Coding & Teknologi',
    providerPlaceholder: 'Ruangguru Academy',
    totalModules: 12,
    completedModules: 8,
    isBookmarked: true,
    isCompleted: false,
  },
  {
    id: 'crs-2',
    title: 'Bahasa Inggris Percakapan Sehari-hari (Basic Conversation)',
    category: 'Bahasa',
    providerPlaceholder: 'Duolingo / Family Tutor',
    totalModules: 20,
    completedModules: 20,
    isBookmarked: false,
    isCompleted: true,
  },
];

const initialQuizzes: QuizModel[] = [
  {
    id: 'qz-1',
    subjectCategory: 'Matematika',
    title: 'Kuis Aljabar & Rumus Dasar Persamaan',
    difficulty: 'Sedang',
    totalQuestions: 10,
    lastScore: 90,
    completedAt: '2026-08-02',
  },
  {
    id: 'qz-2',
    subjectCategory: 'IPA',
    title: 'Kuis Struktur Sel & Sistem Organ Tumbuhan',
    difficulty: 'Mudah',
    totalQuestions: 8,
    lastScore: 100,
    completedAt: '2026-08-01',
  },
];

const initialFlashcards: FlashcardModel[] = [
  {
    id: 'fc-1',
    subjectName: 'Bahasa Inggris',
    category: 'Vocabulary',
    frontText: 'Perseverance',
    backText: 'Ketekunan / Gigih pantang menyerah dalam mencapai tujuan',
    isFavorite: true,
  },
  {
    id: 'fc-2',
    subjectName: 'IPA',
    category: 'Fisika',
    frontText: 'Rumus Hukum II Newton',
    backText: 'F = m × a (Gaya = Massa × Percepatan)',
    isFavorite: true,
  },
];

const initialGoals: LearningGoalModel[] = [
  {
    id: 'gl-1',
    studentId: 'std-1',
    goalType: 'Academic',
    title: 'Rata-Rata Nilai Rapor Semester 1 Minimal 90.0',
    targetDate: '2026-12-20',
    progressPercent: 85,
    isCompleted: false,
  },
  {
    id: 'gl-2',
    studentId: 'std-1',
    goalType: 'Skill',
    title: 'Menguasai Logic Python & Membuat 3 Mini-Games',
    targetDate: '2026-10-30',
    progressPercent: 65,
    isCompleted: false,
  },
];

const initialCertificates: CertificateModel[] = [
  {
    id: 'crt-1',
    studentId: 'std-1',
    title: 'Sertifikat Lomba Kuis Matematika Tingkat Kota',
    issuer: 'Dinas Pendidikan DKI Jakarta',
    category: 'Kompetisi',
    issueDate: '2026-05-14',
  },
  {
    id: 'crt-2',
    studentId: 'std-1',
    title: 'Sertifikat Kelulusan Kursus Dasar Python',
    issuer: 'Ruangguru Code Academy',
    category: 'Kursus Online',
    issueDate: '2026-04-10',
  },
];

const initialAchievements: AchievementModel[] = [
  {
    id: 'ach-1',
    studentId: 'std-1',
    title: 'Juara 2 Olimpiade Sains SMP 2026',
    category: 'Olimpiade / Lomba',
    dateReceived: '2026-05-14',
    description: 'Meraih medali perak bidang Matematika tingkat kota.',
    iconName: 'Trophy',
  },
  {
    id: 'ach-2',
    studentId: 'std-1',
    title: 'Kutu Buku Mania (10+ Buku Dibaca)',
    category: 'Badge Membaca',
    dateReceived: '2026-07-01',
    description: 'Menyelesaikan 10 buku literasi sains dan fiksi populer.',
    iconName: 'BookOpen',
  },
];

export class LearningRepository {
  private studyPlans: StudyPlanModel[] = [...initialStudyPlans];
  private readings: ReadingModel[] = [...initialReadings];
  private courses: CourseModel[] = [...initialCourses];
  private quizzes: QuizModel[] = [...initialQuizzes];
  private flashcards: FlashcardModel[] = [...initialFlashcards];
  private goals: LearningGoalModel[] = [...initialGoals];
  private certificates: CertificateModel[] = [...initialCertificates];
  private achievements: AchievementModel[] = [...initialAchievements];

  async getStudyPlans(studentId?: string): Promise<StudyPlanModel[]> {
    if (studentId) return this.studyPlans.filter((s) => s.studentId === studentId);
    return this.studyPlans;
  }

  async addStudyPlan(plan: Omit<StudyPlanModel, 'id'>): Promise<StudyPlanModel> {
    const newPlan: StudyPlanModel = { ...plan, id: `stp-${Date.now()}` };
    this.studyPlans.unshift(newPlan);
    return newPlan;
  }

  async toggleStudyPlanCompleted(id: string): Promise<StudyPlanModel | undefined> {
    const plan = this.studyPlans.find((p) => p.id === id);
    if (plan) plan.isCompleted = !plan.isCompleted;
    return plan;
  }

  async getReadings(studentId?: string): Promise<ReadingModel[]> {
    if (studentId) return this.readings.filter((r) => r.studentId === studentId);
    return this.readings;
  }

  async addReading(reading: Omit<ReadingModel, 'id'>): Promise<ReadingModel> {
    const newReading: ReadingModel = { ...reading, id: `rd-${Date.now()}` };
    this.readings.unshift(newReading);
    return newReading;
  }

  async getCourses(): Promise<CourseModel[]> {
    return this.courses;
  }

  async getQuizzes(): Promise<QuizModel[]> {
    return this.quizzes;
  }

  async getFlashcards(): Promise<FlashcardModel[]> {
    return this.flashcards;
  }

  async addFlashcard(card: Omit<FlashcardModel, 'id'>): Promise<FlashcardModel> {
    const newFc: FlashcardModel = { ...card, id: `fc-${Date.now()}` };
    this.flashcards.unshift(newFc);
    return newFc;
  }

  async getGoals(studentId?: string): Promise<LearningGoalModel[]> {
    if (studentId) return this.goals.filter((g) => g.studentId === studentId);
    return this.goals;
  }

  async addGoal(goal: Omit<LearningGoalModel, 'id'>): Promise<LearningGoalModel> {
    const newGoal: LearningGoalModel = { ...goal, id: `gl-${Date.now()}` };
    this.goals.unshift(newGoal);
    return newGoal;
  }

  async getCertificates(studentId?: string): Promise<CertificateModel[]> {
    if (studentId) return this.certificates.filter((c) => c.studentId === studentId);
    return this.certificates;
  }

  async addCertificate(cert: Omit<CertificateModel, 'id'>): Promise<CertificateModel> {
    const newCert: CertificateModel = { ...cert, id: `crt-${Date.now()}` };
    this.certificates.unshift(newCert);
    return newCert;
  }

  async getAchievements(studentId?: string): Promise<AchievementModel[]> {
    if (studentId) return this.achievements.filter((a) => a.studentId === studentId);
    return this.achievements;
  }
}
