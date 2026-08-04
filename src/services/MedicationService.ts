import { MedicationRepository } from '../repositories/MedicationRepository';
import { MedicationModel } from '../types/health';

export class MedicationService {
  private repo = new MedicationRepository();

  async fetchMedications(memberId?: string): Promise<MedicationModel[]> {
    return this.repo.getMedications(memberId);
  }

  async addMedication(med: Omit<MedicationModel, 'id'>): Promise<MedicationModel> {
    return this.repo.addMedication(med);
  }
}
