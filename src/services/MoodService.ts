import { MoodRepository } from '../repositories/MoodRepository';
import { MoodModel } from '../types/mood';

export class MoodService {
  static getMoods(): MoodModel[] {
    return MoodRepository.getAllMoods();
  }

  static addMoodCheckIn(
    userName: string,
    userRole: 'Ayah' | 'Ibu' | 'Anak' | 'Lainnya',
    category: string,
    intensity: number,
    colorHex: string,
    note?: string,
    tags: string[] = [],
    activities: string[] = [],
    photoUrl?: string,
    location?: string
  ): MoodModel[] {
    const newMood: MoodModel = {
      id: `m_${Date.now()}`,
      userId: `u_${userRole.toLowerCase()}`,
      userName,
      userRole,
      category,
      intensity,
      colorHex,
      note,
      photoUrl,
      location,
      tags,
      activities,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return MoodRepository.saveMood(newMood);
  }

  static calculateMoodScore(moods: MoodModel[]): number {
    if (!moods || moods.length === 0) return 75;
    const total = moods.reduce((sum, m) => sum + m.intensity * 10, 0);
    return Math.round(total / moods.length);
  }

  static filterMoods(
    moods: MoodModel[],
    timeRange: 'today' | '7d' | '30d' | '90d' | '1y',
    member: 'all' | 'Ayah' | 'Ibu' | 'Anak'
  ): MoodModel[] {
    const now = Date.now();
    let durationMs = 3600000 * 24; // 1 day default

    if (timeRange === '7d') durationMs = 3600000 * 24 * 7;
    if (timeRange === '30d') durationMs = 3600000 * 24 * 30;
    if (timeRange === '90d') durationMs = 3600000 * 24 * 90;
    if (timeRange === '1y') durationMs = 3600000 * 24 * 365;

    return moods.filter((m) => {
      const matchMember = member === 'all' || m.userRole === member;
      const matchTime = now - new Date(m.createdAt).getTime() <= durationMs;
      return matchMember && matchTime;
    });
  }
}
