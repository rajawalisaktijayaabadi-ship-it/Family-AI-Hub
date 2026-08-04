import { JournalRepository } from '../repositories/JournalRepository';
import { MoodJournalModel } from '../types/mood';

export class JournalService {
  static getJournals(): MoodJournalModel[] {
    return JournalRepository.getAllJournals();
  }

  static addJournal(
    userName: string,
    title: string,
    note: string,
    tags: string[] = [],
    activity: string = 'Lainnya',
    photoUrl?: string,
    location?: string,
    moodId?: string
  ): MoodJournalModel[] {
    const newJournal: MoodJournalModel = {
      id: `j_${Date.now()}`,
      moodId,
      userId: `u_${userName.toLowerCase().replace(/\s+/g, '_')}`,
      userName,
      title,
      note,
      photoUrl,
      location,
      tags,
      activity,
      createdAt: new Date().toISOString(),
    };

    return JournalRepository.saveJournal(newJournal);
  }

  static deleteJournal(id: string): MoodJournalModel[] {
    return JournalRepository.deleteJournal(id);
  }
}
