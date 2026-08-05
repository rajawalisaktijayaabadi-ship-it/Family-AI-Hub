import { FamilyEventModel } from '../types/calendar';

const initialFamilyEvents: FamilyEventModel[] = [
  {
    id: 'fe-1',
    title: 'Liburan Keluarga Akhir Tahun ke Bali',
    category: 'Vacation',
    date: '2026-12-20',
    location: 'Nusa Dua & Ubud, Bali',
    organizer: 'Ayah & Ibu',
    budgetEstimate: 15000000,
    actualSpent: 2500000,
    participantsCount: 4,
    description: 'Perencanaan penerbangan, villa, dan itinerary wisata pantai & budaya.',
  },
  {
    id: 'fe-2',
    title: 'Rapat Evaluasi Anggaran & Edukasi Semesteran',
    category: 'Meeting',
    date: '2026-08-15',
    location: 'Ruang Keluarga Rumah Utama',
    organizer: 'Ayah',
    budgetEstimate: 200000,
    actualSpent: 150000,
    participantsCount: 4,
    description: 'Review tabungan pendidikan anak dan pencapaian target bulanan.',
  },
  {
    id: 'fe-3',
    title: 'Peringatan Hari Guru & Pentas Seni Sekolah',
    category: 'School Event',
    date: '2026-08-28',
    location: 'Aula SD Garuda Harapan',
    organizer: 'Rayhan',
    budgetEstimate: 300000,
    actualSpent: 280000,
    participantsCount: 3,
    description: 'Mendukung penampilan tarian tradisional Aisyah dan puisi Rayhan.',
  },
];

export class EventRepository {
  private familyEvents: FamilyEventModel[] = [...initialFamilyEvents];

  async getFamilyEvents(): Promise<FamilyEventModel[]> {
    return this.familyEvents;
  }

  async addFamilyEvent(evt: Omit<FamilyEventModel, 'id'>): Promise<FamilyEventModel> {
    const newEvt: FamilyEventModel = { ...evt, id: `fe-${Date.now()}` };
    this.familyEvents.unshift(newEvt);
    return newEvt;
  }
}
