import { MedicalRepository } from '../repositories/MedicalRepository';
import { MedicalRecordModel, VaccinationModel } from '../types/health';

export class MedicalService {
  private repo = new MedicalRepository();

  async fetchMedicalRecords(memberId?: string): Promise<MedicalRecordModel[]> {
    return this.repo.getMedicalRecords(memberId);
  }

  async addMedicalRecord(record: Omit<MedicalRecordModel, 'id'>): Promise<MedicalRecordModel> {
    return this.repo.addMedicalRecord(record);
  }

  async fetchVaccinations(memberId?: string): Promise<VaccinationModel[]> {
    return this.repo.getVaccinations(memberId);
  }

  async addVaccination(vac: Omit<VaccinationModel, 'id'>): Promise<VaccinationModel> {
    return this.repo.addVaccination(vac);
  }
}
