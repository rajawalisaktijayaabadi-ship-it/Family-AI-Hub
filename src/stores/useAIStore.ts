import { create } from 'zustand';
import {
  ConversationModel,
  MessageModel,
  PromptModel,
  FavoriteItemModel,
  AISettingsModel,
  PromptCategory,
  Attachment,
} from '../types/ai';
import { ConversationService } from '../services/ConversationService';
import { PromptService } from '../services/PromptService';
import { AIRepository } from '../repositories/AIRepository';
import { MockAIService } from '../services/MockAIService';

interface AIState {
  // Navigation & View Mode
  activeAITab: 'home' | 'chat' | 'conversations' | 'prompts' | 'history' | 'favorites' | 'settings';

  // State data
  conversations: ConversationModel[];
  activeConversationId: string | null;
  messages: MessageModel[];
  prompts: PromptModel[];
  favorites: FavoriteItemModel[];
  settings: AISettingsModel;

  // UI States
  isTyping: boolean;
  streamingText: string;
  searchQuery: string;
  selectedCategory: PromptCategory | 'Semua';

  // Actions
  setActiveAITab: (tab: 'home' | 'chat' | 'conversations' | 'prompts' | 'history' | 'favorites' | 'settings') => void;
  loadInitialData: () => void;
  setActiveConversationId: (id: string | null) => void;
  createNewConversation: (title?: string, category?: PromptCategory | 'Umum') => string;
  sendMessage: (text: string, attachments?: Attachment[], promptId?: string) => Promise<void>;
  regenerateLastResponse: () => Promise<void>;
  editMessage: (messageId: string, newText: string) => void;
  deleteMessage: (messageId: string) => void;
  renameConversation: (id: string, newTitle: string) => void;
  togglePinConversation: (id: string) => void;
  toggleFavoriteConversation: (id: string) => void;
  archiveConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  toggleFavoritePrompt: (id: string) => void;
  togglePinPrompt: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: PromptCategory | 'Semua') => void;
  updateSettings: (newSettings: Partial<AISettingsModel>) => void;
  addFavorite: (item: Omit<FavoriteItemModel, 'id' | 'createdAt'>) => void;
  removeFavorite: (id: string) => void;
  clearHistory: () => void;
  resetChat: () => void;
}

export const useAIStore = create<AIState>((set, get) => ({
  activeAITab: 'home',
  conversations: [],
  activeConversationId: null,
  messages: [],
  prompts: [],
  favorites: [],
  settings: AIRepository.getSettings(),
  isTyping: false,
  streamingText: '',
  searchQuery: '',
  selectedCategory: 'Semua',

  setActiveAITab: (tab) => set({ activeAITab: tab }),

  loadInitialData: () => {
    const convs = ConversationService.getAllConversations();
    const prompts = PromptService.getAllPrompts();
    const favorites = AIRepository.getFavorites();
    const settings = AIRepository.getSettings();

    const initialActiveId = convs.length > 0 ? convs[0].id : null;
    const initialMessages = initialActiveId ? ConversationService.getMessages(initialActiveId) : [];

    set({
      conversations: convs,
      activeConversationId: initialActiveId,
      messages: initialMessages,
      prompts,
      favorites,
      settings,
    });
  },

  setActiveConversationId: (id) => {
    if (!id) {
      set({ activeConversationId: null, messages: [] });
      return;
    }
    const msgs = ConversationService.getMessages(id);
    set({ activeConversationId: id, messages: msgs, activeAITab: 'chat' });
  },

  createNewConversation: (title = 'Obrolan Keluarga Baru', category = 'Umum') => {
    const newConv = ConversationService.createNewConversation(title, category);
    const updatedConvs = ConversationService.getAllConversations();
    set({
      conversations: updatedConvs,
      activeConversationId: newConv.id,
      messages: [],
      activeAITab: 'chat',
    });
    return newConv.id;
  },

  sendMessage: async (text, attachments = [], promptId) => {
    const { activeConversationId, createNewConversation, messages } = get();
    let convId = activeConversationId;

    if (!convId) {
      convId = createNewConversation(
        text.length > 25 ? `${text.substring(0, 25)}...` : text,
        'Umum'
      );
    }

    const userMsg: MessageModel = {
      id: `m_${Date.now()}`,
      conversationId: convId,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      attachments,
      metadata: { promptId },
    };

    // Save user message
    ConversationService.addMessage(convId, userMsg);
    set({
      messages: [...get().messages, userMsg],
      isTyping: true,
      streamingText: '',
      conversations: ConversationService.getAllConversations(),
    });

    // Generate AI response
    try {
      const response = await MockAIService.generateResponse(
        text,
        {
          familyName: 'Keluarga Rahardjo',
          memberCount: 4,
          activeRole: 'Kepala Keluarga',
          attachments,
        },
        (chunk) => {
          set({ streamingText: chunk });
        }
      );

      const aiMsg: MessageModel = {
        id: `m_${Date.now()}_ai`,
        conversationId: convId,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        responseType: response.responseType,
        metadata: {
          checklistItems: response.checklistItems,
          tableData: response.tableData,
        },
      };

      ConversationService.addMessage(convId, aiMsg);

      set({
        messages: ConversationService.getMessages(convId),
        isTyping: false,
        streamingText: '',
        conversations: ConversationService.getAllConversations(),
      });
    } catch (err) {
      console.error('AI response error:', err);
      set({ isTyping: false, streamingText: '' });
    }
  },

  regenerateLastResponse: async () => {
    const { messages, sendMessage } = get();
    if (messages.length === 0) return;

    // Find last user message
    const lastUserMsg = [...messages].reverse().find((m) => m.sender === 'user');
    if (lastUserMsg) {
      await sendMessage(lastUserMsg.text, lastUserMsg.attachments, lastUserMsg.metadata?.promptId);
    }
  },

  editMessage: (messageId, newText) => {
    const { activeConversationId } = get();
    if (!activeConversationId) return;
    const updated = ConversationService.updateMessage(activeConversationId, messageId, newText);
    set({ messages: updated });
  },

  deleteMessage: (messageId) => {
    const { activeConversationId } = get();
    if (!activeConversationId) return;
    const updated = ConversationService.deleteMessage(activeConversationId, messageId);
    set({ messages: updated });
  },

  renameConversation: (id, newTitle) => {
    ConversationService.renameConversation(id, newTitle);
    set({ conversations: ConversationService.getAllConversations() });
  },

  togglePinConversation: (id) => {
    ConversationService.togglePinConversation(id);
    set({ conversations: ConversationService.getAllConversations() });
  },

  toggleFavoriteConversation: (id) => {
    ConversationService.toggleFavoriteConversation(id);
    set({ conversations: ConversationService.getAllConversations() });
  },

  archiveConversation: (id) => {
    ConversationService.archiveConversation(id);
    set({ conversations: ConversationService.getAllConversations() });
  },

  deleteConversation: (id) => {
    ConversationService.deleteConversation(id);
    const convs = ConversationService.getAllConversations();
    const nextActive = convs.length > 0 ? convs[0].id : null;
    set({
      conversations: convs,
      activeConversationId: nextActive,
      messages: nextActive ? ConversationService.getMessages(nextActive) : [],
    });
  },

  toggleFavoritePrompt: (id) => {
    const updated = PromptService.toggleFavorite(id);
    set({ prompts: updated });
  },

  togglePinPrompt: (id) => {
    const updated = PromptService.togglePin(id);
    set({ prompts: updated });
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  setSelectedCategory: (category) => set({ selectedCategory: category }),

  updateSettings: (newSettings) => {
    const updated = { ...get().settings, ...newSettings };
    AIRepository.saveSettings(updated);
    set({ settings: updated });
  },

  addFavorite: (item) => {
    const fav = AIRepository.addFavorite(item);
    set({ favorites: AIRepository.getFavorites() });
  },

  removeFavorite: (id) => {
    AIRepository.removeFavorite(id);
    set({ favorites: AIRepository.getFavorites() });
  },

  clearHistory: () => {
    const { conversations } = get();
    conversations.forEach((c) => ConversationService.deleteConversation(c.id));
    set({
      conversations: [],
      activeConversationId: null,
      messages: [],
    });
  },

  resetChat: () => {
    const { activeConversationId } = get();
    if (activeConversationId) {
      ConversationService.deleteConversation(activeConversationId);
    }
    const newId = get().createNewConversation('Obrolan Baru', 'Umum');
    set({ activeConversationId: newId, messages: [], activeAITab: 'chat' });
  },
}));
