import {
  EventModel,
  ReminderModel,
  BirthdayModel,
  HolidayModel,
} from '../types/calendar';

const initialEvents: EventModel[] = [
  {
    id: 'evt-1',
    title: 'Arisan & Makan Bersama Keluarga Besar',
    category: 'Keluarga',
    description: 'Arisan bulanan keluarga di Rumah Nenek Bandung',
    date: '2026-08-09',
    time: '11:00',
    location: 'Rumah Nenek, Bandung',
    participants: ['Ayah', 'Ibu', 'Rayhan', 'Aisyah'],
    reminderFrequency: 'One Time',
    isCompleted: false,
  },
  {
    id: 'evt-2',
    title: 'Pemeriksaan Kesehatan Routine & Vaksinasi Anak',
    category: 'Kesehatan',
    description: 'Cek Tumbuh Tumbuh Anak di Klinik Kasih Ibu',
    date: '2026-08-12',
    time: '09:00',
    location: 'Klinik Kasih Ibu Kelapa Gading',
    participants: ['Ibu', 'Aisyah'],
    reminderFrequency: 'One Time',
    isCompleted: false,
  },
  {
    id: 'evt-3',
    title: 'Pembayaran Tagihan Listrik & WiFi Rumah',
    category: 'Keuangan',
    description: 'Jatuh tempo bulanan tagihan rutin keluarga',
    date: '2026-08-10',
    time: '08:00',
    participants: ['Ayah'],
    reminderFrequency: 'Monthly',
    isCompleted: false,
  },
];

const initialReminders: ReminderModel[] = [
  {
    id: 'rem-1',
    title: 'Ingatkan Belanja Sayur Segar untuk Menu Seminggu',
    reminderTime: '07:00',
    frequency: 'Weekly',
    isActive: true,
  },
  {
    id: 'rem-2',
    title: 'Minum Vitamin C & Madu Keluarga',
    reminderTime: '08:00',
    frequency: 'Daily',
    isActive: true,
  },
];

const initialBirthdays: BirthdayModel[] = [
  {
    id: 'bth-1',
    memberName: 'Rayhan Wijaya',
    relation: 'Anak Pertama',
    birthDate: '2026-08-25',
    giftIdea: 'Buku Komik Sains & Perlengkapan Robotik',
    reminderDaysBefore: 3,
  },
  {
    id: 'bth-2',
    memberName: 'Aisyah Wijaya',
    relation: 'Anak Kedua',
    birthDate: '2026-10-14',
    giftIdea: 'Set Alat Melukis & Sepatu Roda',
    reminderDaysBefore: 5,
  },
];

const initialHolidays: HolidayModel[] = [
  {
    id: 'hol-1',
    title: 'Hari Kemerdekaan Republik Indonesia',
    date: '2026-08-17',
    category: 'Hari Libur Nasional',
    description: 'HUT RI ke-81',
  },
  {
    id: 'hol-2',
    title: 'Maulid Nabi Muhammad SAW',
    date: '2026-08-25',
    category: 'Hari Besar Keagamaan',
    description: 'Libur Keagamaan Nasional',
  },
];

export class CalendarRepository {
  private events: EventModel[] = [...initialEvents];
  private reminders: ReminderModel[] = [...initialReminders];
  private birthdays: BirthdayModel[] = [...initialBirthdays];
  private holidays: HolidayModel[] = [...initialHolidays];

  async getEvents(): Promise<EventModel[]> {
    return this.events;
  }

  async addEvent(event: Omit<EventModel, 'id'>): Promise<EventModel> {
    const newEvt: EventModel = { ...event, id: `evt-${Date.now()}` };
    this.events.unshift(newEvt);
    return newEvt;
  }

  async toggleEventCompleted(id: string): Promise<EventModel | undefined> {
    const evt = this.events.find((e) => e.id === id);
    if (evt) evt.isCompleted = !evt.isCompleted;
    return evt;
  }

  async getReminders(): Promise<ReminderModel[]> {
    return this.reminders;
  }

  async addReminder(reminder: Omit<ReminderModel, 'id'>): Promise<ReminderModel> {
    const newRem: ReminderModel = { ...reminder, id: `rem-${Date.now()}` };
    this.reminders.unshift(newRem);
    return newRem;
  }

  async getBirthdays(): Promise<BirthdayModel[]> {
    return this.birthdays;
  }

  async addBirthday(bth: Omit<BirthdayModel, 'id'>): Promise<BirthdayModel> {
    const newBth: BirthdayModel = { ...bth, id: `bth-${Date.now()}` };
    this.birthdays.push(newBth);
    return newBth;
  }

  async getHolidays(): Promise<HolidayModel[]> {
    return this.holidays;
  }
}
