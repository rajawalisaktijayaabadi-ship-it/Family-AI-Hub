import { HomeworkRepository } from '../repositories/HomeworkRepository';
import { HomeworkModel, ExamModel } from '../types/education';

export class HomeworkService {
  private repo = new HomeworkRepository();

  async fetchHomeworks(studentId?: string): Promise<HomeworkModel[]> {
    return this.repo.getHomeworks(studentId);
  }

  async addHomework(hw: Omit<HomeworkModel, 'id'>): Promise<HomeworkModel> {
    return this.repo.addHomework(hw);
  }

  async updateHomeworkStatus(id: string, status: HomeworkModel['status']): Promise<HomeworkModel | undefined> {
    return this.repo.updateHomeworkStatus(id, status);
  }

  async fetchExams(studentId?: string): Promise<ExamModel[]> {
    return this.repo.getExams(studentId);
  }

  async addExam(exam: Omit<ExamModel, 'id'>): Promise<ExamModel> {
    return this.repo.addExam(exam);
  }
}
