import { HomeworkModel, ExamModel } from '../types/education';

const initialHomeworks: HomeworkModel[] = [
  {
    id: 'hw-1',
    studentId: 'std-1',
    subjectId: 'sbj-1',
    subjectName: 'Matematika Terapan',
    title: 'Latihan Soal Aljabar & Teorema Pythagoras',
    description: 'Kerjakan Buku Paket Halaman 104-106 Nomor 1 sampai 15 di buku latihan.',
    deadlineDate: '2026-08-10',
    status: 'Dalam Proses',
    priority: 'High',
    isOfflineAvailable: true,
  },
  {
    id: 'hw-2',
    studentId: 'std-1',
    subjectId: 'sbj-3',
    subjectName: 'Informatika & Pemrograman',
    title: 'Membuat Algoritma Flowchart Peminjaman Buku',
    description: 'Buat diagram alir flowchart dan penjelasan logika dalam format PDF/Catatan.',
    deadlineDate: '2026-08-12',
    status: 'Belum Dikerjakan',
    priority: 'Medium',
    isOfflineAvailable: true,
  },
  {
    id: 'hw-3',
    studentId: 'std-1',
    subjectId: 'sbj-2',
    subjectName: 'IPA Terpadu',
    title: 'Laporan Praktikum Fotosintesis Tumbuhan',
    description: 'Rangkuman pengamatan warna daun setelah ditetesi larutan iodine.',
    deadlineDate: '2026-08-05',
    status: 'Selesai',
    priority: 'Low',
    isOfflineAvailable: true,
  },
];

const initialExams: ExamModel[] = [
  {
    id: 'ex-1',
    studentId: 'std-1',
    subjectId: 'sbj-1',
    subjectName: 'Matematika Terapan',
    examType: 'PTS (Tengah Semester)',
    examDate: '2026-09-15',
    targetScore: 92,
    notes: 'Materi: Bab 1 Sistem Persamaan Linear & Bab 2 Fungsi Kuadrat',
  },
  {
    id: 'ex-2',
    studentId: 'std-1',
    subjectId: 'sbj-2',
    subjectName: 'IPA Terpadu',
    examType: 'Ulangan Harian',
    examDate: '2026-08-20',
    targetScore: 90,
    achievedScore: 88,
  },
];

export class HomeworkRepository {
  private homeworks: HomeworkModel[] = [...initialHomeworks];
  private exams: ExamModel[] = [...initialExams];

  async getHomeworks(studentId?: string): Promise<HomeworkModel[]> {
    if (studentId) {
      return this.homeworks.filter((h) => h.studentId === studentId);
    }
    return this.homeworks;
  }

  async addHomework(hw: Omit<HomeworkModel, 'id'>): Promise<HomeworkModel> {
    const newHw: HomeworkModel = { ...hw, id: `hw-${Date.now()}` };
    this.homeworks.unshift(newHw);
    return newHw;
  }

  async updateHomeworkStatus(id: string, status: HomeworkModel['status']): Promise<HomeworkModel | undefined> {
    const hw = this.homeworks.find((item) => item.id === id);
    if (hw) {
      hw.status = status;
    }
    return hw;
  }

  async getExams(studentId?: string): Promise<ExamModel[]> {
    if (studentId) {
      return this.exams.filter((e) => e.studentId === studentId);
    }
    return this.exams;
  }

  async addExam(exam: Omit<ExamModel, 'id'>): Promise<ExamModel> {
    const newExam: ExamModel = { ...exam, id: `ex-${Date.now()}` };
    this.exams.unshift(newExam);
    return newExam;
  }
}
