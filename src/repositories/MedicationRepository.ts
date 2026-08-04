import { MedicationModel, ReminderModel } from '../types/health';

const initialMedications: MedicationModel[] = [
  {
    id: 'med-1',
    memberId: 'm-1',
    name: 'Amlodipine 5mg',
    dosage: '1 Tablet',
    frequency: '1x Sehari',
    scheduleTimes: ['07:00'],
    startDate: '2026-08-01',
    endDate: '2026-08-30',
    isActive: true,
    notes: 'Diminum sesudah makan pagi',
  },
  {
    id: 'med-2',
    memberId: 'm-2',
    name: 'Sangobion / Vitamin Sangobion',
    dosage: '1 Kapsul',
    frequency: '1x Sehari',
    scheduleTimes: ['20:00'],
    startDate: '2026-08-01',
    endDate: '2026-08-15',
    isActive: true,
    notes: 'Suplemen penambah darah sebelum tidur',
  },
];

const initialReminders: ReminderModel[] = [
  {
    id: 'rem-1',
    memberId: 'm-1',
    type: 'Obat',
    title: 'Minum Amlodipine 5mg',
    time: '07:00',
    isCompletedToday: true,
  },
  {
    id: 'rem-2',
    memberId: 'm-1',
    type: 'Minum Air',
    title: 'Minum 2 Gelas Air Putih',
    time: '11:00',
    isCompletedToday: false,
  },
  {
    id: 'rem-3',
    memberId: 'm-2',
    type: 'Obat',
    title: 'Minum Sangobion Kapsul',
    time: '20:00',
    isCompletedToday: false,
  },
  {
    id: 'rem-4',
    memberId: 'm-1',
    type: 'Kontrol Dokter',
    title: 'Kontrol Rutin Tensi dr. Andi',
    time: '2026-08-10 09:00',
    isCompletedToday: false,
  },
];

export class MedicationRepository {
  private medications: MedicationModel[] = [...initialMedications];
  private reminders: ReminderModel[] = [...initialReminders];

  async getMedications(memberId?: string): Promise<MedicationModel[]> {
    if (!memberId) return this.medications;
    return this.medications.filter((m) => m.memberId === memberId);
  }

  async addMedication(med: Omit<MedicationModel, 'id'>): Promise<MedicationModel> {
    const newMed: MedicationModel = {
      ...med,
      id: `med-${Date.now()}`,
    };
    this.medications.unshift(newMed);
    return newMed;
  }

  async getReminders(memberId?: string): Promise<ReminderModel[]> {
    if (!memberId) return this.reminders;
    return this.reminders.filter((r) => r.memberId === memberId);
  }

  async toggleReminder(id: string): Promise<ReminderModel | undefined> {
    const item = this.reminders.find((r) => r.id === id);
    if (item) {
      item.isCompletedToday = !item.isCompletedToday;
    }
    return item;
  }

  async addReminder(rem: Omit<ReminderModel, 'id' | 'isCompletedToday'>): Promise<ReminderModel> {
    const newRem: ReminderModel = {
      ...rem,
      id: `rem-${Date.now()}`,
      isCompletedToday: false,
    };
    this.reminders.unshift(newRem);
    return newRem;
  }
}
