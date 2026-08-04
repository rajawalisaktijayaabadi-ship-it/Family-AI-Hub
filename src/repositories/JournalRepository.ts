import { MoodJournalModel } from '../types/mood';

const JOURNAL_STORAGE_KEY = 'family_ai_journals';

const INITIAL_JOURNALS: MoodJournalModel[] = [
  {
    id: 'j_1',
    moodId: 'm_1',
    userId: 'u_ayah',
    userName: 'Ayah (Budi)',
    title: 'Keberhasilan Proyek & Makan Malam Keluarga',
    note: 'Hari ini evaluasi kuartal berjalan lancar. Di rumah, anak-anak dengan semangat menceritakan pengalaman belajarnya.',
    photoUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&auto=format&fit=crop&q=60',
    location: 'Rumah Utama',
    tags: ['Pekerjaan', 'Anak', 'Rumah'],
    activity: 'Kumpul Keluarga',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'j_2',
    moodId: 'm_2',
    userId: 'u_ibu',
    userName: 'Ibu (Siti)',
    title: 'Merawat Tanaman & Resep Baru',
    note: 'Menghabiskan pagi merawat tanaman hias di halaman depan dan mencoba resep sup sayur organik.',
    photoUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500&auto=format&fit=crop&q=60',
    location: 'Taman Depan',
    tags: ['Kesehatan', 'Rumah'],
    activity: 'Berkebun',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
];

export class JournalRepository {
  static getAllJournals(): MoodJournalModel[] {
    try {
      const data = localStorage.getItem(JOURNAL_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(INITIAL_JOURNALS));
        return INITIAL_JOURNALS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_JOURNALS;
    }
  }

  static saveJournal(journal: MoodJournalModel): MoodJournalModel[] {
    const journals = this.getAllJournals();
    const existingIndex = journals.findIndex((j) => j.id === journal.id);
    let updated: MoodJournalModel[];
    if (existingIndex >= 0) {
      updated = [...journals];
      updated[existingIndex] = journal;
    } else {
      updated = [journal, ...journals];
    }
    localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }

  static deleteJournal(id: string): MoodJournalModel[] {
    const journals = this.getAllJournals().filter((j) => j.id !== id);
    localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(journals));
    return journals;
  }
}
