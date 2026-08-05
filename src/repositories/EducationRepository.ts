import {
  StudentModel,
  SchoolModel,
  SubjectModel,
} from '../types/education';

const initialStudents: StudentModel[] = [
  {
    id: 'std-1',
    name: 'Rayhan Wijaya',
    schoolName: 'SMP Negeri 115 Jakarta',
    gradeLevel: 'SMP Kelas 7-9',
    className: 'Kelas 8-B',
    nisPlaceholder: '20241150821',
    academicYear: '2025/2026',
    interests: ['Matematika', 'Informatika', 'Sains Populer', 'Robotik'],
    learningTarget: 'Masuk 5 Besar Paralel & Lolos Seleksi OSN Matematika',
  },
  {
    id: 'std-2',
    name: 'Aisyah Wijaya',
    schoolName: 'SD Al-Azhar Kelapa Gading',
    gradeLevel: 'SD Kelas 4-6',
    className: 'Kelas 4-A',
    nisPlaceholder: '2025004122',
    academicYear: '2025/2026',
    interests: ['Bahasa Inggris', 'Seni Musik', 'Membaca Cerita'],
    learningTarget: 'Lancar Membaca Buku Berekspresi & Juara Kuis Ejaan',
  },
];

const initialSchools: SchoolModel[] = [
  {
    id: 'sch-1',
    schoolName: 'SMP Negeri 115 Jakarta',
    academicYear: '2025/2026',
    currentSemester: 'Ganjil',
    principalName: 'Drs. H. Mulyono, M.Pd.',
    homeroomTeacherName: 'Ibu Rahmawati, S.Pd.',
    contactPhone: '021-88991122',
  },
  {
    id: 'sch-2',
    schoolName: 'SD Al-Azhar Kelapa Gading',
    academicYear: '2025/2026',
    currentSemester: 'Ganjil',
    homeroomTeacherName: 'Ustadzah Fitriana, S.Ag.',
    contactPhone: '021-45123344',
  },
];

const initialSubjects: SubjectModel[] = [
  {
    id: 'sbj-1',
    studentId: 'std-1',
    subjectName: 'Matematika Terapan',
    category: 'Wajib',
    teacherName: 'Pak Budi Hartono, M.Sc.',
    targetScore: 90,
    currentScorePlaceholder: 88,
    notes: 'Perbanyak latihan soal Persamaan Kuadrat dan Aljabar',
  },
  {
    id: 'sbj-2',
    studentId: 'std-1',
    subjectName: 'IPA Terpadu (Fisika & Biologi)',
    category: 'Wajib',
    teacherName: 'Ibu Dr. Ratna Dewi',
    targetScore: 88,
    currentScorePlaceholder: 85,
  },
  {
    id: 'sbj-3',
    studentId: 'std-1',
    subjectName: 'Informatika & Pemrograman Dasar',
    category: 'Peminatan',
    teacherName: 'Pak Rizky Pratama, S.Kom.',
    targetScore: 95,
    currentScorePlaceholder: 92,
  },
  {
    id: 'sbj-4',
    studentId: 'std-1',
    subjectName: 'Bahasa Inggris',
    category: 'Wajib',
    teacherName: 'Mr. John Smith, M.Ed.',
    targetScore: 85,
    currentScorePlaceholder: 84,
  },
];

export class EducationRepository {
  private students: StudentModel[] = [...initialStudents];
  private schools: SchoolModel[] = [...initialSchools];
  private subjects: SubjectModel[] = [...initialSubjects];

  async getStudents(): Promise<StudentModel[]> {
    return this.students;
  }

  async addStudent(student: Omit<StudentModel, 'id'>): Promise<StudentModel> {
    const newStudent: StudentModel = { ...student, id: `std-${Date.now()}` };
    this.students.push(newStudent);
    return newStudent;
  }

  async getSchools(): Promise<SchoolModel[]> {
    return this.schools;
  }

  async getSubjects(studentId?: string): Promise<SubjectModel[]> {
    if (studentId) {
      return this.subjects.filter((s) => s.studentId === studentId);
    }
    return this.subjects;
  }

  async addSubject(subject: Omit<SubjectModel, 'id'>): Promise<SubjectModel> {
    const newSub: SubjectModel = { ...subject, id: `sbj-${Date.now()}` };
    this.subjects.unshift(newSub);
    return newSub;
  }
}
