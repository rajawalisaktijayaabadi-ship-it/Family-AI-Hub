import { LearningRepository } from '../repositories/LearningRepository';
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

export class LearningService {
  private repo = new LearningRepository();

  async fetchStudyPlans(studentId?: string): Promise<StudyPlanModel[]> {
    return this.repo.getStudyPlans(studentId);
  }

  async addStudyPlan(plan: Omit<StudyPlanModel, 'id'>): Promise<StudyPlanModel> {
    return this.repo.addStudyPlan(plan);
  }

  async toggleStudyPlanCompleted(id: string): Promise<StudyPlanModel | undefined> {
    return this.repo.toggleStudyPlanCompleted(id);
  }

  async fetchReadings(studentId?: string): Promise<ReadingModel[]> {
    return this.repo.getReadings(studentId);
  }

  async addReading(reading: Omit<ReadingModel, 'id'>): Promise<ReadingModel> {
    return this.repo.addReading(reading);
  }

  async fetchCourses(): Promise<CourseModel[]> {
    return this.repo.getCourses();
  }

  async fetchQuizzes(): Promise<QuizModel[]> {
    return this.repo.getQuizzes();
  }

  async fetchFlashcards(): Promise<FlashcardModel[]> {
    return this.repo.getFlashcards();
  }

  async addFlashcard(card: Omit<FlashcardModel, 'id'>): Promise<FlashcardModel> {
    return this.repo.addFlashcard(card);
  }

  async fetchGoals(studentId?: string): Promise<LearningGoalModel[]> {
    return this.repo.getGoals(studentId);
  }

  async addGoal(goal: Omit<LearningGoalModel, 'id'>): Promise<LearningGoalModel> {
    return this.repo.addGoal(goal);
  }

  async fetchCertificates(studentId?: string): Promise<CertificateModel[]> {
    return this.repo.getCertificates(studentId);
  }

  async addCertificate(cert: Omit<CertificateModel, 'id'>): Promise<CertificateModel> {
    return this.repo.addCertificate(cert);
  }

  async fetchAchievements(studentId?: string): Promise<AchievementModel[]> {
    return this.repo.getAchievements(studentId);
  }
}
