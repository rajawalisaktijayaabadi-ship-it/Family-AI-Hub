import { HabitRepository } from '../repositories/HabitRepository';
import { HabitModel, RewardModel, ChoreModel } from '../types/parenting';

export class HabitService {
  private repo = new HabitRepository();

  public async fetchHabits(childId?: string): Promise<HabitModel[]> {
    return this.repo.getHabits(childId);
  }

  public async toggleHabit(habitId: string, dateStr: string): Promise<HabitModel | undefined> {
    return this.repo.toggleHabitCompletion(habitId, dateStr);
  }

  public async createHabit(
    data: Omit<HabitModel, 'id' | 'streak' | 'completionRate' | 'completedDates'>
  ): Promise<HabitModel> {
    return this.repo.addHabit(data);
  }

  public async fetchRewards(childId?: string): Promise<RewardModel[]> {
    return this.repo.getRewards(childId);
  }

  public async claimReward(rewardId: string): Promise<RewardModel | undefined> {
    return this.repo.claimReward(rewardId);
  }

  public async createReward(
    data: Omit<RewardModel, 'id' | 'isUnlocked' | 'isClaimed'>
  ): Promise<RewardModel> {
    return this.repo.addReward(data);
  }

  public async fetchChores(childId?: string): Promise<ChoreModel[]> {
    return this.repo.getChores(childId);
  }

  public async toggleChore(choreId: string): Promise<ChoreModel | undefined> {
    return this.repo.toggleChoreStatus(choreId);
  }

  public async createChore(data: Omit<ChoreModel, 'id' | 'status'>): Promise<ChoreModel> {
    return this.repo.addChore(data);
  }
}
