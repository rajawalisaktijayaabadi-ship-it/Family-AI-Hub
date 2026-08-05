import {
  EmergencyContactModel,
  EmergencyInfoModel,
  RenewalModel,
} from '../types/protection';

const initialContacts: EmergencyContactModel[] = [
  {
    id: 'emc-1',
    name: 'Budi Santoso',
    relationship: 'Paman / Keluarga Dekat',
    phoneNumber: '081234567890',
    address: 'Jl. Merdeka No. 45, Jakarta Selatan',
    priority: 'Primary',
  },
  {
    id: 'emc-2',
    name: 'Dr. Ahmad Dahlan, Sp.A',
    relationship: 'Dokter Anak Keluarga',
    phoneNumber: '081199887766',
    address: 'RS Siloam Kebon Jeruk',
    priority: 'Doctor',
  },
  {
    id: 'emc-3',
    name: 'Siti Aminah',
    relationship: 'Nenek',
    phoneNumber: '081311223344',
    address: 'Jl. Melati No. 12, Bandung',
    priority: 'Secondary',
  },
];

const initialEmergencyInfo: EmergencyInfoModel = {
  bloodType: 'O+',
  allergies: ['Penisilin', 'Seafood / Udang'],
  chronicDiseases: ['Asma Ringan'],
  routineMedications: ['Inhaler Ventolin (jika sesak)'],
  primaryDoctorName: 'Dr. Ahmad Dahlan, Sp.A',
  primaryDoctorPhone: '081199887766',
  hospitalPreference: 'RS Siloam Kebon Jeruk / RS Pondok Indah',
};

const initialRenewals: RenewalModel[] = [
  {
    id: 'rnw-1',
    title: 'Perpanjangan SIM A Ayah',
    type: 'SIM',
    dueDate: '2027-02-18',
    reminderDaysBefore: 30,
    isCompleted: false,
    costEstimate: 250000,
  },
  {
    id: 'rnw-2',
    title: 'Perpanjangan STNK Honda CR-V',
    type: 'STNK',
    dueDate: '2026-09-01',
    reminderDaysBefore: 14,
    isCompleted: false,
    costEstimate: 4500000,
  },
  {
    id: 'rnw-3',
    title: 'Perpanjangan Paspor RI Ayah',
    type: 'Passport',
    dueDate: '2028-11-20',
    reminderDaysBefore: 90,
    isCompleted: false,
    costEstimate: 650000,
  },
];

export class EmergencyRepository {
  private contacts: EmergencyContactModel[] = [...initialContacts];
  private emergencyInfo: EmergencyInfoModel = { ...initialEmergencyInfo };
  private renewals: RenewalModel[] = [...initialRenewals];

  async getContacts(): Promise<EmergencyContactModel[]> {
    return this.contacts;
  }

  async addContact(contact: Omit<EmergencyContactModel, 'id'>): Promise<EmergencyContactModel> {
    const newContact: EmergencyContactModel = {
      ...contact,
      id: `emc-${Date.now()}`,
    };
    this.contacts.push(newContact);
    return newContact;
  }

  async getEmergencyInfo(): Promise<EmergencyInfoModel> {
    return this.emergencyInfo;
  }

  async updateEmergencyInfo(info: EmergencyInfoModel): Promise<EmergencyInfoModel> {
    this.emergencyInfo = { ...info };
    return this.emergencyInfo;
  }

  async getRenewals(): Promise<RenewalModel[]> {
    return this.renewals;
  }

  async toggleRenewalCompleted(id: string): Promise<RenewalModel | undefined> {
    const r = this.renewals.find((item) => item.id === id);
    if (r) {
      r.isCompleted = !r.isCompleted;
    }
    return r;
  }

  async addRenewal(renewal: Omit<RenewalModel, 'id' | 'isCompleted'>): Promise<RenewalModel> {
    const newRnw: RenewalModel = {
      ...renewal,
      id: `rnw-${Date.now()}`,
      isCompleted: false,
    };
    this.renewals.unshift(newRnw);
    return newRnw;
  }
}
