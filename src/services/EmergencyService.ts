import { EmergencyRepository } from '../repositories/EmergencyRepository';
import {
  EmergencyContactModel,
  EmergencyInfoModel,
  RenewalModel,
} from '../types/protection';

export class EmergencyService {
  private repo = new EmergencyRepository();

  async fetchContacts(): Promise<EmergencyContactModel[]> {
    return this.repo.getContacts();
  }

  async addContact(contact: Omit<EmergencyContactModel, 'id'>): Promise<EmergencyContactModel> {
    return this.repo.addContact(contact);
  }

  async fetchEmergencyInfo(): Promise<EmergencyInfoModel> {
    return this.repo.getEmergencyInfo();
  }

  async updateEmergencyInfo(info: EmergencyInfoModel): Promise<EmergencyInfoModel> {
    return this.repo.updateEmergencyInfo(info);
  }

  async fetchRenewals(): Promise<RenewalModel[]> {
    return this.repo.getRenewals();
  }

  async toggleRenewalCompleted(id: string): Promise<RenewalModel | undefined> {
    return this.repo.toggleRenewalCompleted(id);
  }

  async addRenewal(renewal: Omit<RenewalModel, 'id' | 'isCompleted'>): Promise<RenewalModel> {
    return this.repo.addRenewal(renewal);
  }
}
