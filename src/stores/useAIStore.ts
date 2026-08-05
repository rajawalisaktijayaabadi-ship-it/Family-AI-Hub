import { create } from 'zustand';
import {
  ConversationModel,
  MessageModel,
  PromptModel,
  FavoriteItemModel,
  AISettingsModel,
  PromptCategory,
  Attachment,
  AIMemoryModel,
  PrivacyConsentModel,
  AIUsageModel,
} from '../types/ai';
import { ConversationService } from '../services/ConversationService';
import { PromptService } from '../services/PromptService';
import { AIRepository } from '../repositories/AIRepository';
import { GeminiService } from '../services/ai/GeminiService';
import { AIMemoryService } from '../services/ai/AIMemoryService';

export type AITabType =
  | 'home'
  | 'chat'
  | 'conversations'
  | 'prompts'
  | 'history'
  | 'favorites'
  | 'settings'
  | 'insight'
  | 'memory'
  | 'privacy';

interface AIState {
  // Navigation & View Mode
  activeAITab: AITabType;

  // State data
  conversations: ConversationModel[];
  activeConversationId: string | null;
  messages: MessageModel[];
  prompts: PromptModel[];
  favorites: FavoriteItemModel[];
  settings: AISettingsModel;
  memories: AIMemoryModel[];
  privacyConsent: PrivacyConsentModel;
  usageStats: AIUsageModel;

  // UI States
  isTyping: boolean;
  streamingText: string;
  searchQuery: string;
  selectedCategory: PromptCategory | 'Semua';

  // Actions
  setActiveAITab: (tab: AITabType) => void;
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

  // Memory & Privacy Actions
  addMemory: (key: string, value: string, category?: PromptCategory | 'General') => void;
  togglePinMemory: (id: string) => void;
  deleteMemory: (id: string) => void;
  clearAllMemories: () => void;
  updatePrivacyConsent: (consent: Partial<PrivacyConsentModel>) => void;
}

export const useAIStore = create<AIState>((set, get) => ({
  activeAITab: 'home',
  conversations: [],
  activeConversationId: null,
  messages: [],
  prompts: [],
  favorites: [],
  settings: AIRepository.getSettings(),
  memories: AIMemoryService.getMemories(),
  privacyConsent: {
    userId: 'usr_default',
    aiDataUsageAccepted: true,
    memoryCollectionAccepted: true,
    personalizationAccepted: true,
    acceptedAt: new Date().toISOString(),
  },
  usageStats: {
    userId: 'usr_default',
    totalRequestsToday: 14,
    tokenCountToday: 3240,
    dailyLimit: 100,
    resetDate: new Date().toISOString(),
  },
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
    const memories = AIMemoryService.getMemories();

    const initialActiveId = convs.length > 0 ? convs[0].id : null;
    const initialMessages = initialActiveId ? ConversationService.getMessages(initialActiveId) : [];

    set({
      conversations: convs,
      activeConversationId: initialActiveId,
      messages: initialMessages,
      prompts,
      favorites,
      settings,
      memories,
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

  createNewConversation: (title = 'Obrolan AI Keluarga', category = 'Umum') => {
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
    const { activeConversationId, createNewConversation, settings, usageStats } = get();
    let convId = activeConversationId;

    if (!convId) {
      convId = createNewConversation(
        text.length > 25 ? `${text.substring(0, 25)}...` : text,
        'Umum'
      );
    }

    const currentConv = get().conversations.find((c) => c.id === convId);
    const category = currentConv?.category || 'Umum';

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

    // Call Production Gemini AI Service
    try {
      const response = await GeminiService.generateAssistantResponse(text, {
        category,
        language: settings.language,
        tone: settings.tone,
        currentScreen: 'chat',
        onStreamChunk: (chunk) => {
          set({ streamingText: chunk });
        },
      });

      const aiMsg: MessageModel = {
        id: `m_${Date.now()}_ai`,
        conversationId: convId,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        responseType: 'markdown',
      };

      ConversationService.addMessage(convId, aiMsg);

      set({
        messages: ConversationService.getMessages(convId),
        isTyping: false,
        streamingText: '',
        conversations: ConversationService.getAllConversations(),
        usageStats: {
          ...usageStats,
          totalRequestsToday: usageStats.totalRequestsToday + 1,
          tokenCountToday: usageStats.tokenCountToday + Math.round(text.length * 1.5),
        },
      });
    } catch (err) {
      console.error('Gemini production response error:', err);
      set({ isTyping: false, streamingText: '' });
    }
  },

  regenerateLastResponse: async () => {
    const { messages, sendMessage } = get();
    if (messages.length === 0) return;

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
    AIRepository.addFavorite(item);
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
    const newId = get().createNewConversation('Obrolan AI Baru', 'Umum');
    set({ activeConversationId: newId, messages: [], activeAITab: 'chat' });
  },

  // Memory & Privacy Actions
  addMemory: (key, value, category = 'General') => {
    const memory = AIMemoryService.addMemory({
      userId: 'usr_default',
      familyId: 'fam_rahardjo',
      category,
      key,
      value,
      isPinned: true,
      confidenceScore: 0.95,
    });
    set({ memories: AIMemoryService.getMemories() });
  },

  togglePinMemory: (id) => {
    const updated = AIMemoryService.togglePinMemory(id);
    set({ memories: updated });
  },

  deleteMemory: (id) => {
    const updated = AIMemoryService.deleteMemory(id);
    set({ memories: updated });
  },

  clearAllMemories: () => {
    AIMemoryService.clearAllMemories();
    set({ memories: [] });
  },

  updatePrivacyConsent: (newConsent) => {
    const updated = { ...get().privacyConsent, ...newConsent };
    set({ privacyConsent: updated });
  },
}));
