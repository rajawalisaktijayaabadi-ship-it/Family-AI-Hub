import {
  MemoryModel,
  FamilyTreeModel,
  FavoriteModel,
  StorageModel,
} from '../types/memories';

const STORAGE_KEYS = {
  MEMORIES: 'familyai_memories_v1',
  FAMILY_TREE: 'familyai_family_tree_v1',
  FAVORITES: 'familyai_favorites_v1',
};

const INITIAL_MEMORIES: MemoryModel[] = [
  {
    id: 'mem_1',
    title: 'Ulang Tahun Ke-10 Ahmad Rizky',
    description: 'Pesta ulang tahun meriah di rumah bersama kakek, nenek, dan sepupu.',
    category: 'Birthday',
    date: '2026-05-12',
    time: '15:30 WIB',
    locationName: 'Rumah Utama Keluarga Hendra, Jakarta',
    latitude: -6.2088,
    longitude: 106.8456,
    familyMemberId: 'usr_child',
    familyMemberName: 'Ahmad Rizky (Anak)',
    tags: ['UlangTahun', 'Rizky', 'KeluargaBesar', 'Bahagia'],
    isFavorite: true,
    isArchived: false,
    coverUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    mediaType: 'photo',
    createdAt: '2026-05-12T16:00:00Z',
  },
  {
    id: 'mem_2',
    title: 'Liburan Musim Panas di Bali',
    description: 'Menikmati sunset di Pantai Kuta dan belajar snorkeling di Nusa Dua.',
    category: 'Vacation',
    date: '2026-01-05',
    time: '18:00 WIB',
    locationName: 'Pantai Kuta, Bali',
    latitude: -8.718,
    longitude: 115.169,
    familyMemberId: 'usr_fai_me',
    familyMemberName: 'Bapak Hendra',
    tags: ['Liburan', 'Bali', 'Pantai', 'Sunset'],
    isFavorite: true,
    isArchived: false,
    coverUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    mediaType: 'photo',
    createdAt: '2026-01-05T19:00:00Z',
  },
  {
    id: 'mem_3',
    title: 'Wisuda Sarjana Ibu Dewi',
    description: 'Momen berharga saat Ibu merayakan kelulusan magister manajemen.',
    category: 'Graduation',
    date: '2025-11-20',
    time: '09:00 WIB',
    locationName: 'Balai Kartini, Jakarta',
    latitude: -6.231,
    longitude: 106.829,
    familyMemberId: 'usr_mother',
    familyMemberName: 'Ibu Dewi',
    tags: ['Wisuda', 'Kebanggaan', 'IbuDewi'],
    isFavorite: false,
    isArchived: false,
    coverUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    mediaType: 'photo',
    createdAt: '2025-11-20T10:00:00Z',
  },
  {
    id: 'mem_4',
    title: 'Rekaman Dongeng Pengantar Tidur Nenek',
    description: 'Nenek menceritakan kisah Kancil dan Buaya untuk Rizky sebelum tidur.',
    category: 'Daily Life',
    date: '2026-07-28',
    time: '20:15 WIB',
    locationName: 'Kamar Anak',
    familyMemberId: 'usr_grandparent',
    familyMemberName: 'Nenek Maryam',
    tags: ['Dongeng', 'SuaraNenek', 'AudioMemory'],
    isFavorite: true,
    isArchived: false,
    coverUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
    mediaType: 'audio',
    createdAt: '2026-07-28T20:20:00Z',
  },
];

const INITIAL_TREE: FamilyTreeModel[] = [
  {
    id: 'ft_1',
    name: 'Kakek Sutrisno',
    relation: 'Grandparent',
    birthDate: '1952-04-10',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    notes: 'Kepala Keluarga Besar Generasi Ke-1',
    generation: 1,
  },
  {
    id: 'ft_2',
    name: 'Nenek Maryam',
    relation: 'Grandparent',
    birthDate: '1956-08-15',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    notes: 'Ibu Penyayang Suka Memasak',
    generation: 1,
  },
  {
    id: 'ft_3',
    name: 'Bapak Hendra',
    relation: 'Parent',
    parentId: 'ft_1',
    birthDate: '1984-02-12',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    notes: 'Ayah / Kepala Rumah Tangga',
    generation: 2,
  },
  {
    id: 'ft_4',
    name: 'Ibu Dewi',
    relation: 'Parent',
    birthDate: '1987-06-25',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    notes: 'Ibu / Pengelola Pendidikan & Keuangan',
    generation: 2,
  },
  {
    id: 'ft_5',
    name: 'Ahmad Rizky',
    relation: 'Child',
    parentId: 'ft_3',
    birthDate: '2016-05-12',
    avatarUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=200&q=80',
    notes: 'Anak Sulung - Kelas 5 SD',
    generation: 3,
  },
  {
    id: 'ft_6',
    name: 'Siti Aisyah',
    relation: 'Child',
    parentId: 'ft_3',
    birthDate: '2020-09-08',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    notes: 'Anak Bungsu - TK B',
    generation: 3,
  },
];

const INITIAL_FAVORITES: FavoriteModel[] = [
  {
    id: 'fav_1',
    targetId: 'mem_1',
    targetType: 'memory',
    title: 'Ulang Tahun Ke-10 Ahmad Rizky',
    previewUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=400&q=80',
    addedAt: '2026-05-12T16:00:00Z',
  },
  {
    id: 'fav_2',
    targetId: 'mem_2',
    targetType: 'photo',
    title: 'Sunset Pantai Kuta Bali',
    previewUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
    addedAt: '2026-01-05T19:00:00Z',
  },
];

export class MemoryRepository {
  static getMemories(): MemoryModel[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MEMORIES);
      return data ? JSON.parse(data) : INITIAL_MEMORIES;
    } catch {
      return INITIAL_MEMORIES;
    }
  }

  static saveMemories(memories: MemoryModel[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(memories));
    } catch (e) {
      console.error('Failed to save memories', e);
    }
  }

  static addMemory(memory: MemoryModel): MemoryModel[] {
    const list = this.getMemories();
    const updated = [memory, ...list];
    this.saveMemories(updated);
    return updated;
  }

  static updateMemory(id: string, updates: Partial<MemoryModel>): MemoryModel[] {
    const list = this.getMemories().map((m) => (m.id === id ? { ...m, ...updates } : m));
    this.saveMemories(list);
    return list;
  }

  static deleteMemory(id: string): MemoryModel[] {
    const list = this.getMemories().filter((m) => m.id !== id);
    this.saveMemories(list);
    return list;
  }

  static getFamilyTree(): FamilyTreeModel[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAMILY_TREE);
      return data ? JSON.parse(data) : INITIAL_TREE;
    } catch {
      return INITIAL_TREE;
    }
  }

  static saveFamilyTree(tree: FamilyTreeModel[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.FAMILY_TREE, JSON.stringify(tree));
    } catch (e) {
      console.error('Failed to save family tree', e);
    }
  }

  static addFamilyMember(member: FamilyTreeModel): FamilyTreeModel[] {
    const tree = this.getFamilyTree();
    const updated = [...tree, member];
    this.saveFamilyTree(updated);
    return updated;
  }

  static getFavorites(): FavoriteModel[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : INITIAL_FAVORITES;
    } catch {
      return INITIAL_FAVORITES;
    }
  }

  static toggleFavorite(fav: FavoriteModel): FavoriteModel[] {
    const list = this.getFavorites();
    const exists = list.some((f) => f.targetId === fav.targetId);
    const updated = exists ? list.filter((f) => f.targetId !== fav.targetId) : [fav, ...list];
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save favorites', e);
    }
    return updated;
  }

  static getStorageOverview(): StorageModel {
    const memories = this.getMemories();
    const photoCount = memories.filter((m) => m.mediaType === 'photo').length + 18;
    const videoCount = memories.filter((m) => m.mediaType === 'video').length + 6;
    const audioCount = memories.filter((m) => m.mediaType === 'audio').length + 8;
    const documentCount = 12;

    const photoSizeMb = photoCount * 2.4;
    const videoSizeMb = videoCount * 45;
    const audioSizeMb = audioCount * 5.2;
    const docSizeMb = documentCount * 1.8;
    const usedMb = photoSizeMb + videoSizeMb + audioSizeMb + docSizeMb;

    return {
      photoCount,
      videoCount,
      audioCount,
      documentCount,
      usedBytes: Math.round(usedMb * 1024 * 1024),
      totalBytes: 15 * 1024 * 1024 * 1024, // 15 GB
      photoSizeMb: Math.round(photoSizeMb),
      videoSizeMb: Math.round(videoSizeMb),
      audioSizeMb: Math.round(audioSizeMb),
      docSizeMb: Math.round(docSizeMb),
    };
  }
}
