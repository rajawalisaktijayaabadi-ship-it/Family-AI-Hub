import { HealthRepository } from '../repositories/HealthRepository';
import { HealthProfileModel, HealthCheckupModel, WellnessModel, SleepModel, WaterModel, HealthGoalModel } from '../types/health';

export class HealthService {
  private repo = new HealthRepository();

  async fetchProfiles(): Promise<HealthProfileModel[]> {
    return this.repo.getHealthProfiles();
  }

  async saveProfile(profile: HealthProfileModel): Promise<HealthProfileModel> {
    return this.repo.updateHealthProfile(profile);
  }

  async fetchCheckups(memberId: string): Promise<HealthCheckupModel[]> {
    return this.repo.getCheckups(memberId);
  }

  async addCheckup(checkup: Omit<HealthCheckupModel, 'id'>): Promise<HealthCheckupModel> {
    return this.repo.addCheckup(checkup);
  }

  async fetchWellness(memberId: string): Promise<WellnessModel | undefined> {
    return this.repo.getWellness(memberId);
  }

  async addSteps(memberId: string, steps: number): Promise<WellnessModel> {
    return this.repo.addWellnessSteps(memberId, steps);
  }

  async fetchSleep(memberId: string): Promise<SleepModel | undefined> {
    return this.repo.getSleep(memberId);
  }

  async fetchWater(memberId: string): Promise<WaterModel | undefined> {
    return this.repo.getWater(memberId);
  }

  async addWater(memberId: string, amountMl: number): Promise<WaterModel> {
    return this.repo.addWater(memberId, amountMl);
  }

  async fetchGoal(memberId: string): Promise<HealthGoalModel | undefined> {
    return this.repo.getGoal(memberId);
  }

  async saveGoal(goal: HealthGoalModel): Promise<HealthGoalModel> {
    return this.repo.saveGoal(goal);
  }
}
