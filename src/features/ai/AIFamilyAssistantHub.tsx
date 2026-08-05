import React, { useState, useEffect } from 'react';
import { useAIStore, AITabType } from '../../stores/useAIStore';
import { AIHomeScreen } from './AIHomeScreen';
import { AIChatScreen } from './AIChatScreen';
import { ConversationManagerModal } from './ConversationManagerModal';
import { PromptLibraryModal } from './PromptLibraryModal';
import { PromptTemplateModal } from './PromptTemplateModal';
import { AIHistoryModal } from './AIHistoryModal';
import { AIFavoritesModal } from './AIFavoritesModal';
import { AISearchModal } from './AISearchModal';
import { AISettingsModal } from './AISettingsModal';
import { AIMemoryTab } from './tabs/AIMemoryTab';
import { AIPrivacyConsentTab } from './tabs/AIPrivacyConsentTab';
import { AIInsightCenterTab } from './tabs/AIInsightCenterTab';
import { AISettingsTab } from './tabs/AISettingsTab';

import {
  Home,
  MessageSquare,
  Zap,
  Bookmark,
  History,
  Search,
  Sliders,
  X,
  Bot,
  ChevronLeft,
  FileText,
  Brain,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface AIFamilyAssistantHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIFamilyAssistantHub: React.FC<AIFamilyAssistantHubProps> = ({ isOpen, onClose }) => {
  const { activeAITab, setActiveAITab, loadInitialData } = useAIStore();

  const [isConvModalOpen, setIsConvModalOpen] = useState(false);
  const [isPromptsModalOpen, setIsPromptsModalOpen] = useState(false);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadInitialData();
    }
  }, [isOpen, loadInitialData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 flex flex-col font-sans max-w-md mx-auto select-none overflow-hidden">
      {/* Top Header Navigation */}
      <div className="px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 shadow-xs z-30">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onClose}
            className="p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
            title="Tutup AI Hub"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-500 text-white flex items-center justify-center font-bold shadow-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-extrabold font-heading text-slate-900 dark:text-white leading-tight">
                AI Family Assistant
              </h2>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                Google Gemini Production Engine
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
            title="Cari"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveAITab('settings')}
            className={`p-2 rounded-xl transition ${
              activeAITab === 'settings'
                ? 'text-emerald-600 bg-emerald-50'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Pengaturan"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative p-4">
        {activeAITab === 'home' && (
          <AIHomeScreen
            onOpenChat={() => setActiveAITab('chat')}
            onOpenPrompts={() => setIsPromptsModalOpen(true)}
            onOpenHistory={() => setIsHistoryModalOpen(true)}
            onOpenFavorites={() => setIsFavoritesModalOpen(true)}
            onOpenSettings={() => setActiveAITab('settings')}
            onOpenSearch={() => setIsSearchModalOpen(true)}
          />
        )}

        {activeAITab === 'chat' && (
          <AIChatScreen
            onBack={() => setActiveAITab('home')}
            onOpenSettings={() => setActiveAITab('settings')}
          />
        )}

        {activeAITab === 'insight' && <AIInsightCenterTab />}
        {activeAITab === 'memory' && <AIMemoryTab />}
        {activeAITab === 'privacy' && <AIPrivacyConsentTab />}
        {activeAITab === 'settings' && <AISettingsTab />}
      </div>

      {/* Sub-navigation Bottom Bar inside Hub */}
      <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-3 py-2 flex items-center justify-around text-slate-500 dark:text-slate-400 font-bold shrink-0 z-30">
        <button
          onClick={() => setActiveAITab('home')}
          className={`flex flex-col items-center gap-0.5 text-[10px] transition ${
            activeAITab === 'home' ? 'text-emerald-600 font-extrabold' : 'hover:text-slate-700'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Beranda</span>
        </button>

        <button
          onClick={() => setActiveAITab('chat')}
          className={`flex flex-col items-center gap-0.5 text-[10px] transition ${
            activeAITab === 'chat' ? 'text-emerald-600 font-extrabold' : 'hover:text-slate-700'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Chat AI</span>
        </button>

        <button
          onClick={() => setActiveAITab('insight')}
          className={`flex flex-col items-center gap-0.5 text-[10px] transition ${
            activeAITab === 'insight' ? 'text-emerald-600 font-extrabold' : 'hover:text-slate-700'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Insight</span>
        </button>

        <button
          onClick={() => setActiveAITab('memory')}
          className={`flex flex-col items-center gap-0.5 text-[10px] transition ${
            activeAITab === 'memory' ? 'text-emerald-600 font-extrabold' : 'hover:text-slate-700'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>Memory</span>
        </button>

        <button
          onClick={() => setActiveAITab('privacy')}
          className={`flex flex-col items-center gap-0.5 text-[10px] transition ${
            activeAITab === 'privacy' ? 'text-emerald-600 font-extrabold' : 'hover:text-slate-700'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Privasi</span>
        </button>
      </div>

      {/* Modals Orchestration */}
      <ConversationManagerModal
        isOpen={isConvModalOpen}
        onClose={() => setIsConvModalOpen(false)}
        onOpenChat={() => setActiveAITab('chat')}
      />

      <PromptLibraryModal
        isOpen={isPromptsModalOpen}
        onClose={() => setIsPromptsModalOpen(false)}
        onOpenChat={() => setActiveAITab('chat')}
      />

      <PromptTemplateModal
        isOpen={isTemplatesModalOpen}
        onClose={() => setIsTemplatesModalOpen(false)}
        onOpenChat={() => setActiveAITab('chat')}
      />

      <AIHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        onOpenChat={() => setActiveAITab('chat')}
      />

      <AIFavoritesModal
        isOpen={isFavoritesModalOpen}
        onClose={() => setIsFavoritesModalOpen(false)}
        onOpenChat={() => setActiveAITab('chat')}
      />

      <AISearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onOpenChat={() => setActiveAITab('chat')}
      />

      <AISettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </div>
  );
};
