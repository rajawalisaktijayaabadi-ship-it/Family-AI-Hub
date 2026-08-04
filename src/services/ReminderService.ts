import { MedicationRepository } from '../repositories/MedicationRepository';
import { ReminderModel } from '../types/health';

export class ReminderService {
  private repo = new MedicationRepository();

  async fetchReminders(memberId?: string): Promise<ReminderModel[]> {
    return this.repo.getReminders(memberId);
  }

  async toggleReminder(id: string): Promise<ReminderModel | undefined> {
    return this.repo.toggleReminder(id);
  }

  async addReminder(rem: Omit<ReminderModel, 'id' | 'isCompletedToday'>): Promise<ReminderModel> {
    return this.repo.addReminder(rem);
  }
}
