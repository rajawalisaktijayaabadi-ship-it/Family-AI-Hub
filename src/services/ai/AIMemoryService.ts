import { AIMemoryModel } from '../../types/ai';

const MEMORY_STORAGE_KEY = 'familyai_memories_v1';

export class AIMemoryService {
  private static initialMemories: AIMemoryModel[] = [
    {
      id: 'mem_1',
      userId: 'usr_default',
      familyId: 'fam_rahardjo',
      category: 'Kesehatan',
      key: 'Alergi Anak',
      value: 'Anak kedua (Siti) memiliki alergi ringan terhadap kacang tanah',
      isPinned: true,
      confidenceScore: 0.98,
      createdAt: '2026-08-01T08:00:00.000Z',
      updatedAt: '2026-08-01T08:00:00.000Z',
    },
    {
      id: 'mem_2',
      userId: 'usr_default',
      familyId: 'fam_rahardjo',
      category: 'Keuangan',
      key: 'Target Tabungan Edukasi',
      value: 'Target dana kuliah anak Rp 50 Juta pada Desember 2026',
      isPinned: true,
      confidenceScore: 0.95,
      createdAt: '2026-08-02T10:00:00.000Z',
      updatedAt: '2026-08-02T10:00:00.000Z',
    },
    {
      id: 'mem_3',
      userId: 'usr_default',
      familyId: 'fam_rahardjo',
      category: 'Keluarga',
      key: 'Jadwal Liburan Rutin',
      value: 'Setiap Sabtu sore adalah Family Quality Time tanpa gawai',
      isPinned: false,
      confidenceScore: 0.92,
      createdAt: '2026-08-03T14:00:00.000Z',
      updatedAt: '2026-08-03T14:00:00.000Z',
    },
  ];

  static getMemories(): AIMemoryModel[] {
    try {
      const data = localStorage.getItem(MEMORY_STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Error loading AI memories:', e);
    }
    return this.initialMemories;
  }

  static saveMemories(memories: AIMemoryModel[]) {
    try {
      localStorage.setItem(MEMORY_STORAGE_KEY, JSON.stringify(memories));
    } catch (e) {
      console.error('Error saving AI memories:', e);
    }
  }

  static addMemory(memory: Omit<AIMemoryModel, 'id' | 'createdAt' | 'updatedAt'>): AIMemoryModel {
    const memories = this.getMemories();
    const newMemory: AIMemoryModel = {
      ...memory,
      id: `mem_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memories.unshift(newMemory);
    this.saveMemories(memories);
    return newMemory;
  }

  static togglePinMemory(id: string): AIMemoryModel[] {
    const memories = this.getMemories().map((m) =>
      m.id === id ? { ...m, isPinned: !m.isPinned, updatedAt: new Date().toISOString() } : m
    );
    this.saveMemories(memories);
    return memories;
  }

  static deleteMemory(id: string): AIMemoryModel[] {
    const memories = this.getMemories().filter((m) => m.id !== id);
    this.saveMemories(memories);
    return memories;
  }

  static clearAllMemories() {
    localStorage.removeItem(MEMORY_STORAGE_KEY);
  }

  static searchMemories(query: string): AIMemoryModel[] {
    const memories = this.getMemories();
    if (!query.trim()) return memories;
    const lower = query.toLowerCase();
    return memories.filter(
      (m) =>
        m.key.toLowerCase().includes(lower) ||
        m.value.toLowerCase().includes(lower) ||
        m.category.toLowerCase().includes(lower)
    );
  }

  static getPinnedMemories(): AIMemoryModel[] {
    return this.getMemories().filter((m) => m.isPinned);
  }
}
