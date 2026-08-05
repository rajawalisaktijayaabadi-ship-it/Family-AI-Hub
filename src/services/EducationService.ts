import { EducationRepository } from '../repositories/EducationRepository';
import { StudentModel, SchoolModel, SubjectModel } from '../types/education';

export class EducationService {
  private repo = new EducationRepository();

  async fetchStudents(): Promise<StudentModel[]> {
    return this.repo.getStudents();
  }

  async addStudent(student: Omit<StudentModel, 'id'>): Promise<StudentModel> {
    return this.repo.addStudent(student);
  }

  async fetchSchools(): Promise<SchoolModel[]> {
    return this.repo.getSchools();
  }

  async fetchSubjects(studentId?: string): Promise<SubjectModel[]> {
    return this.repo.getSubjects(studentId);
  }

  async addSubject(subject: Omit<SubjectModel, 'id'>): Promise<SubjectModel> {
    return this.repo.addSubject(subject);
  }
}
