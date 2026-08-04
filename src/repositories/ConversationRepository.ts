import { ConversationModel, MessageModel, PromptCategory } from '../types/ai';

const CONVERSATIONS_CACHE_KEY = 'family_ai_conversations_v1';
const MESSAGES_CACHE_KEY_PREFIX = 'family_ai_messages_v1_';

const INITIAL_CONVERSATIONS: ConversationModel[] = [
  {
    id: 'conv_1',
    workspaceId: 'ws_default',
    userId: 'user_1',
    title: 'Rencana Menu Masakan Mingguan',
    category: 'Makanan',
    isPinned: true,
    isFavorite: true,
    isArchived: false,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    lastMessageText: 'Rekomendasi menu selama 7 hari sudah dirancang sehat dan ekonomis.',
    messageCount: 3,
    context: {
      familyName: 'Keluarga Rahardjo',
      memberCount: 4,
      activeRole: 'Kepala Keluarga',
    },
  },
  {
    id: 'conv_2',
    workspaceId: 'ws_default',
    userId: 'user_1',
    title: 'Diskusi Anggaran Pendidikan Anak',
    category: 'Keuangan',
    isPinned: true,
    isFavorite: false,
    isArchived: false,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    lastMessageText: 'Alokasi tabungan pendidikan sudah dicatat ke dalam target bulanan.',
    messageCount: 4,
    context: {
      familyName: 'Keluarga Rahardjo',
      memberCount: 4,
      activeRole: 'Ibu Rumah Tangga',
    },
  },
  {
    id: 'conv_3',
    workspaceId: 'ws_default',
    userId: 'user_1',
    title: 'Ide Akhir Pekan di Taman Kota',
    category: 'Keluarga',
    isPinned: false,
    isFavorite: true,
    isArchived: false,
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    lastMessageText: 'Piknik santai dengan perbekalan buah segar dan sepeda santai.',
    messageCount: 2,
    context: {
      familyName: 'Keluarga Rahardjo',
      memberCount: 4,
      activeRole: 'Anggota Keluarga',
    },
  },
];

const INITIAL_MESSAGES: Record<string, MessageModel[]> = {
  conv_1: [
    {
      id: 'm1',
      conversationId: 'conv_1',
      sender: 'user',
      text: 'Tolong buatkan susunan menu makan siang & malam sehat untuk 4 orang.',
      timestamp: new Date(Date.now() - 3600000 * 2).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      responseType: 'plain',
    },
    {
      id: 'm2',
      conversationId: 'conv_1',
      sender: 'assistant',
      text: 'Tentu! Berikut rekomendasi **Rencana Menu Sehat Mingguan** untuk Keluarga Rahardjo:',
      timestamp: new Date(Date.now() - 3600000 * 1.8).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      responseType: 'markdown',
    },
    {
      id: 'm3',
      conversationId: 'conv_1',
      sender: 'assistant',
      text: 'Daftar resep pilihan:',
      timestamp: new Date(Date.now() - 3600000 * 1.5).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      responseType: 'checklist',
      metadata: {
        checklistItems: [
          { id: 'c1', text: 'Senin: Sup Ayam Wortel & Tempe Bacem', done: true },
          { id: 'c2', text: 'Selasa: Tumis Kangkung & Ikan Gurame Bakar', done: false },
          { id: 'c3', text: 'Rabu: Sayur Lodeh & Tahu Penyet', done: false },
          { id: 'c4', text: 'Kamis: Capcay Seafood & Telur Dadar Gulung', done: false },
        ],
      },
    },
  ],
  conv_2: [
    {
      id: 'm4',
      conversationId: 'conv_2',
      sender: 'user',
      text: 'Bagaimana cara membagi dana tabungan les dan sekolah semester depan?',
      timestamp: 'Kemarin 14:20',
      responseType: 'plain',
    },
    {
      id: 'm5',
      conversationId: 'conv_2',
      sender: 'assistant',
      text: 'Rekomendasi alokasi tabungan pendidikan:',
      timestamp: 'Kemarin 14:22',
      responseType: 'table',
      metadata: {
        tableData: {
          headers: ['Komponen', 'Alokasi (%)', 'Target Bulanan'],
          rows: [
            ['SPP Sekolah', '50%', 'Rp 1.500.000'],
            ['Les & Ekstrakurikuler', '30%', 'Rp 900.000'],
            ['Buku & Peralatan', '20%', 'Rp 600.000'],
          ],
        },
      },
    },
  ],
  conv_3: [
    {
      id: 'm6',
      conversationId: 'conv_3',
      sender: 'user',
      text: 'Ada rekomendasi tempat rekreasi murah dekat rumah?',
      timestamp: '3 hari lalu',
      responseType: 'plain',
    },
    {
      id: 'm7',
      conversationId: 'conv_3',
      sender: 'assistant',
      text: '"Keluarga yang menghabiskan waktu bersama di alam terbuka akan menumbuhkan ingatan manis yang tak ternilai harganya."',
      timestamp: '3 hari lalu',
      responseType: 'quote',
    },
  ],
};

export class ConversationRepository {
  public static getConversations(): ConversationModel[] {
    try {
      const cached = localStorage.getItem(CONVERSATIONS_CACHE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (err) {
      console.warn('Error reading cached conversations:', err);
    }
    localStorage.setItem(CONVERSATIONS_CACHE_KEY, JSON.stringify(INITIAL_CONVERSATIONS));
    return INITIAL_CONVERSATIONS;
  }

  public static saveConversations(conversations: ConversationModel[]): void {
    try {
      localStorage.setItem(CONVERSATIONS_CACHE_KEY, JSON.stringify(conversations));
    } catch (err) {
      console.error('Failed to save conversations:', err);
    }
  }

  public static getMessages(conversationId: string): MessageModel[] {
    try {
      const cached = localStorage.getItem(`${MESSAGES_CACHE_KEY_PREFIX}${conversationId}`);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (err) {
      console.warn('Error reading cached messages:', err);
    }
    const initial = INITIAL_MESSAGES[conversationId] || [];
    this.saveMessages(conversationId, initial);
    return initial;
  }

  public static saveMessages(conversationId: string, messages: MessageModel[]): void {
    try {
      localStorage.setItem(
        `${MESSAGES_CACHE_KEY_PREFIX}${conversationId}`,
        JSON.stringify(messages)
      );
    } catch (err) {
      console.error('Failed to save messages:', err);
    }
  }

  public static createConversation(
    title: string,
    category: PromptCategory | 'Umum' = 'Umum',
    workspaceId = 'ws_default',
    userId = 'user_1'
  ): ConversationModel {
    const conversations = this.getConversations();
    const newConv: ConversationModel = {
      id: `conv_${Date.now()}`,
      workspaceId,
      userId,
      title,
      category,
      isPinned: false,
      isFavorite: false,
      isArchived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastMessageText: 'Percakapan baru dimulai',
      messageCount: 0,
      context: {
        familyName: 'Keluarga Rahardjo',
        memberCount: 4,
        activeRole: 'Kepala Keluarga',
      },
    };

    const updated = [newConv, ...conversations];
    this.saveConversations(updated);
    return newConv;
  }

  public static updateConversation(
    id: string,
    updates: Partial<ConversationModel>
  ): ConversationModel | null {
    const conversations = this.getConversations();
    let updatedConv: ConversationModel | null = null;
    const updated = conversations.map((c) => {
      if (c.id === id) {
        updatedConv = { ...c, ...updates, updatedAt: new Date().toISOString() };
        return updatedConv;
      }
      return c;
    });
    this.saveConversations(updated);
    return updatedConv;
  }

  public static deleteConversation(id: string): void {
    const conversations = this.getConversations();
    const filtered = conversations.filter((c) => c.id !== id);
    this.saveConversations(filtered);
    localStorage.removeItem(`${MESSAGES_CACHE_KEY_PREFIX}${id}`);
  }
}
