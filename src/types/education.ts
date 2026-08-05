export type StudentGradeLevel =
  | 'TK'
  | 'SD Kelas 1-3'
  | 'SD Kelas 4-6'
  | 'SMP Kelas 7-9'
  | 'SMA/SMK Kelas 10-12'
  | 'Kuliah / Perguruan Tinggi'
  | 'Umum';

export interface StudentModel {
  id: string;
  name: string;
  avatarUrl?: string;
  schoolName: string;
  gradeLevel: StudentGradeLevel;
  className: string;
  nisPlaceholder: string;
  academicYear: string;
  interests: string[];
  learningTarget: string;
}

export interface SchoolModel {
  id: string;
  schoolName: string;
  academicYear: string;
  currentSemester: 'Ganjil' | 'Genap';
  principalName?: string;
  homeroomTeacherName?: string;
  contactPhone?: string;
}

export interface SubjectModel {
  id: string;
  studentId: string;
  subjectName: string;
  category: 'Wajib' | 'Peminatan' | 'Ekstrakurikuler' | 'Kursus / Skill';
  teacherName: string;
  targetScore: number;
  currentScorePlaceholder?: number;
  notes?: string;
}

export type HomeworkPriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type HomeworkStatus = 'Belum Dikerjakan' | 'Dalam Proses' | 'Selesai' | 'Terlambat';

export interface HomeworkModel {
  id: string;
  studentId: string;
  subjectId: string;
  subjectName: string;
  title: string;
  description: string;
  deadlineDate: string;
  status: HomeworkStatus;
  priority: HomeworkPriority;
  attachmentUrl?: string;
  isOfflineAvailable: boolean;
}

export interface ExamModel {
  id: string;
  studentId: string;
  subjectId: string;
  subjectName: string;
  examType: 'Ulangan Harian' | 'PTS (Tengah Semester)' | 'PAS (Akhir Semester)' | 'UTBK / Ujian Nasional' | 'Kuis';
  examDate: string;
  targetScore: number;
  achievedScore?: number;
  notes?: string;
}

export interface StudyPlanModel {
  id: string;
  studentId: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  focusSubject: string;
  durationMinutes: number;
  isCompleted: boolean;
  notes?: string;
}

export interface ReadingModel {
  id: string;
  studentId: string;
  bookTitle: string;
  author: string;
  category: 'Pelajaran' | 'Fiksi' | 'Sains' | 'Pengembangan Diri' | 'Agama / Moral';
  totalPages: number;
  pagesRead: number;
  rating?: number;
  notes?: string;
  isCompleted: boolean;
}

export interface CourseModel {
  id: string;
  title: string;
  category: string;
  providerPlaceholder: string; // E.g., 'Ruangguru', 'Coursera', 'Internal Family'
  totalModules: number;
  completedModules: number;
  isBookmarked: boolean;
  isCompleted: boolean;
}

export interface QuizModel {
  id: string;
  subjectCategory: string;
  title: string;
  difficulty: 'Mudah' | 'Sedang' | 'Sulit';
  totalQuestions: number;
  lastScore?: number;
  completedAt?: string;
}

export interface FlashcardModel {
  id: string;
  subjectName: string;
  category: string;
  frontText: string;
  backText: string;
  isFavorite: boolean;
}

export interface LearningGoalModel {
  id: string;
  studentId: string;
  goalType: 'Academic' | 'Skill' | 'Reading' | 'Certification';
  title: string;
  targetDate: string;
  progressPercent: number;
  isCompleted: boolean;
}

export interface KnowledgeModel {
  id: string;
  title: string;
  category: 'Parenting Study' | 'Sains & Teknologi' | 'Tips Belajar AI' | 'Pengembangan Karakter' | 'Literasi Keuangan Anak';
  summary: string;
  content: string;
  readTimeMinutes: number;
  isFavorite: boolean;
  isBookmarked: boolean;
}

export interface CertificateModel {
  id: string;
  studentId: string;
  title: string;
  issuer: string;
  category: 'Akademik' | 'Kompetisi' | 'Kursus Online' | 'Pelatihan' | 'Lainnya';
  issueDate: string;
  fileUrl?: string;
}

export interface AchievementModel {
  id: string;
  studentId: string;
  title: string;
  category: 'Juara Kelas' | 'Olimpiade / Lomba' | 'Sertifikat' | 'Badge Membaca' | 'Badge Belajar';
  dateReceived: string;
  description: string;
  iconName: string;
}

export interface LearningReportModel {
  studentId: string;
  totalStudyHoursThisWeek: number;
  homeworkCompletionRatePercent: number;
  averageQuizScore: number;
  booksReadCount: number;
  achievementsCount: number;
}

export interface AILearningInsight {
  learningSummary: string;
  studyRecommendations: string[];
  readingSuggestions: string[];
  motivationQuote: string;
  learningTips: string[];
}
