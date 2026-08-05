import { AvatarModel } from '../types/memories';

const STORAGE_KEY = 'familyai_avatars_v1';

const INITIAL_AVATARS: AvatarModel[] = [
  {
    id: 'av_1',
    memberId: 'usr_fai_me',
    memberName: 'Bapak Hendra (Ayah)',
    avatarCategory: 'Dad',
    style: '3D Pixar',
    theme: 'Warm',
    personality: 'Bijaksana, Protektif, Pengayom, Humoris',
    voiceType: 'Warm Father (Suara Hangat Ayah)',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    isAnimated: true,
  },
  {
    id: 'av_2',
    memberId: 'usr_mother',
    memberName: 'Ibu Dewi',
    avatarCategory: 'Mom',
    style: 'Anime',
    theme: 'Pastel',
    personality: 'Penyayang, Teliti, Cerdas, Lembut',
    voiceType: 'Gentle Indonesian (Suara Ibu Ramah)',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    isAnimated: true,
  },
  {
    id: 'av_3',
    memberId: 'usr_child',
    memberName: 'Ahmad Rizky (Anak)',
    avatarCategory: 'Child',
    style: '3D Pixar',
    theme: 'Neon',
    personality: 'Penuh Semangat, Ingin Tahu, Suka Petualangan',
    voiceType: 'Cheerful Kid (Suara Ceria Anak)',
    avatarUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80',
    isAnimated: true,
  },
];

export class AvatarRepository {
  static getAvatars(): AvatarModel[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : INITIAL_AVATARS;
    } catch {
      return INITIAL_AVATARS;
    }
  }

  static saveAvatars(avatars: AvatarModel[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(avatars));
    } catch (e) {
      console.error('Failed to save avatars', e);
    }
  }

  static updateAvatar(id: string, updates: Partial<AvatarModel>): AvatarModel[] {
    const list = this.getAvatars().map((a) => (a.id === id ? { ...a, ...updates } : a));
    this.saveAvatars(list);
    return list;
  }

  static addAvatar(avatar: AvatarModel): AvatarModel[] {
    const list = this.getAvatars();
    const updated = [avatar, ...list];
    this.saveAvatars(updated);
    return updated;
  }
}
