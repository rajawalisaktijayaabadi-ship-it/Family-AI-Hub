import { ParentingRepository } from '../repositories/ParentingRepository';
import {
  SchoolActivity,
  FamilyActivityModel,
  ScreenTimeModel,
  LearningGoalModel,
  FamilyChallenge,
  ParentingJournalModel,
} from '../types/parenting';

export class ParentingService {
  private repo = new ParentingRepository();

  public async fetchSchoolActivities(childId?: string): Promise<SchoolActivity[]> {
    return this.repo.getSchoolActivities(childId);
  }

  public async toggleSchoolActivity(id: string): Promise<SchoolActivity | undefined> {
    return this.repo.toggleSchoolActivity(id);
  }

  public async fetchFamilyActivities(): Promise<FamilyActivityModel[]> {
    return this.repo.getFamilyActivities();
  }

  public async createFamilyActivity(act: Omit<FamilyActivityModel, 'id'>): Promise<FamilyActivityModel> {
    return this.repo.addFamilyActivity(act);
  }

  public async fetchScreenTime(childId: string): Promise<ScreenTimeModel | undefined> {
    return this.repo.getScreenTime(childId);
  }

  public async updateScreenTime(
    childId: string,
    updates: Partial<ScreenTimeModel>
  ): Promise<ScreenTimeModel> {
    return this.repo.updateScreenTime(childId, updates);
  }

  public async fetchLearningGoals(childId?: string): Promise<LearningGoalModel[]> {
    return this.repo.getLearningGoals(childId);
  }

  public async createLearningGoal(goal: Omit<LearningGoalModel, 'id'>): Promise<LearningGoalModel> {
    return this.repo.addLearningGoal(goal);
  }

  public async fetchChallenges(): Promise<FamilyChallenge[]> {
    return this.repo.getChallenges();
  }

  public async fetchJournals(childId?: string): Promise<ParentingJournalModel[]> {
    return this.repo.getJournals(childId);
  }

  public async createJournal(
    journal: Omit<ParentingJournalModel, 'id' | 'createdAt'>
  ): Promise<ParentingJournalModel> {
    return this.repo.addJournal(journal);
  }
}
