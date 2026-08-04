import { MedicalRecordModel, VaccinationModel } from '../types/health';

const initialMedicalRecords: MedicalRecordModel[] = [
  {
    id: 'med-rec-1',
    memberId: 'm-1',
    date: '2026-07-20',
    doctorName: 'dr. Andi Wijaya, Sp.PD',
    hospitalName: 'RS Siloam Kirana',
    complaints: 'Pusing dan leher kaku setelah lembur',
    diagnosis: 'Kelelahan & Otot Tegang (Tensi 130/85)',
    prescriptions: ['Paracetamol 500mg', 'Vitamin B Complex'],
    notes: 'Disarankan istirahat cukup dan kurangi asupan garam berlebih.',
  },
  {
    id: 'med-rec-2',
    memberId: 'm-3',
    date: '2026-06-15',
    doctorName: 'dr. Budi Santoso, Sp.A',
    hospitalName: 'Klinik Medika Ibu & Anak',
    complaints: 'Batuk pilek dan demam ringan 37.8C',
    diagnosis: 'ISPA Ringan',
    prescriptions: ['Obat Batuk Sirup Anak', 'Multivitamin C'],
    notes: 'Banyak minum air hangat dan istirahat 3 hari.',
  },
];

const initialVaccinations: VaccinationModel[] = [
  {
    id: 'vac-1',
    memberId: 'm-1',
    vaccineName: 'Influenza Tahunan',
    date: '2025-11-10',
    location: 'Puskesmas Kecamatan',
    status: 'Sudah Vaksin',
  },
  {
    id: 'vac-2',
    memberId: 'm-3',
    vaccineName: 'DPT Booster & MR',
    date: '2025-08-14',
    location: 'RS Hermina',
    status: 'Sudah Vaksin',
  },
  {
    id: 'vac-3',
    memberId: 'm-2',
    vaccineName: 'Vaksin HPV Dose 2',
    date: '2026-09-01',
    location: 'Klinik Utama',
    status: 'Jadwal Datang',
  },
];

export class MedicalRepository {
  private records: MedicalRecordModel[] = [...initialMedicalRecords];
  private vaccinations: VaccinationModel[] = [...initialVaccinations];

  async getMedicalRecords(memberId?: string): Promise<MedicalRecordModel[]> {
    if (!memberId) return this.records;
    return this.records.filter((r) => r.memberId === memberId);
  }

  async addMedicalRecord(record: Omit<MedicalRecordModel, 'id'>): Promise<MedicalRecordModel> {
    const newRec: MedicalRecordModel = {
      ...record,
      id: `med-rec-${Date.now()}`,
    };
    this.records.unshift(newRec);
    return newRec;
  }

  async getVaccinations(memberId?: string): Promise<VaccinationModel[]> {
    if (!memberId) return this.vaccinations;
    return this.vaccinations.filter((v) => v.memberId === memberId);
  }

  async addVaccination(vac: Omit<VaccinationModel, 'id'>): Promise<VaccinationModel> {
    const newVac: VaccinationModel = {
      ...vac,
      id: `vac-${Date.now()}`,
    };
    this.vaccinations.unshift(newVac);
    return newVac;
  }
}
