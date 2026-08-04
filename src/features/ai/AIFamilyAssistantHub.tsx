import React, { useState, useEffect } from 'react';
import { useAIStore } from '../../stores/useAIStore';
import { AIHomeScreen } from './AIHomeScreen';
import { AIChatScreen } from './AIChatScreen';
import { ConversationManagerModal } from './ConversationManagerModal';
import { PromptLibraryModal } from './PromptLibraryModal';
import { PromptTemplateModal } from './PromptTemplateModal';
import { AIHistoryModal } from './AIHistoryModal';
import { AIFavoritesModal } from './AIFavoritesModal';
import { AISearchModal } from './AISearchModal';
import { AISettingsModal } from './AISettingsModal';

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
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 text-white flex items-center justify-center font-bold shadow-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-extrabold font-heading text-slate-900 dark:text-white leading-tight">
                AI Family Assistant
              </h2>
              <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold block">
                FamilyAI Hub Indonesia
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
            onClick={() => setIsSettingsModalOpen(true)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
            title="Pengaturan"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative">
        {activeAITab === 'home' && (
          <AIHomeScreen
            onOpenChat={() => setActiveAITab('chat')}
            onOpenPrompts={() => setIsPromptsModalOpen(true)}
            onOpenHistory={() => setIsHistoryModalOpen(true)}
            onOpenFavorites={() => setIsFavoritesModalOpen(true)}
            onOpenSettings={() => setIsSettingsModalOpen(true)}
            onOpenSearch={() => setIsSearchModalOpen(true)}
          />
        )}

        {activeAITab === 'chat' && (
          <AIChatScreen
            onBack={() => setActiveAITab('home')}
            onOpenSettings={() => setIsSettingsModalOpen(true)}
          />
        )}
      </div>

      {/* Sub-navigation Bottom Bar inside Hub */}
      <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-3 py-2 flex items-center justify-around text-slate-500 dark:text-slate-400 font-bold shrink-0 z-30">
        <button
          onClick={() => setActiveAITab('home')}
          className={`flex flex-col items-center gap-0.5 text-[10px] transition ${
            activeAITab === 'home' ? 'text-blue-600 dark:text-blue-400' : 'hover:text-slate-700'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Beranda</span>
        </button>

        <button
          onClick={() => setActiveAITab('chat')}
          className={`flex flex-col items-center gap-0.5 text-[10px] transition ${
            activeAITab === 'chat' ? 'text-blue-600 dark:text-blue-400' : 'hover:text-slate-700'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Chat UI</span>
        </button>

        <button
          onClick={() => setIsConvModalOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] hover:text-slate-700 transition"
        >
          <Bot className="w-4 h-4" />
          <span>Obrolan</span>
        </button>

        <button
          onClick={() => setIsPromptsModalOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] hover:text-slate-700 transition"
        >
          <Zap className="w-4 h-4 text-indigo-500" />
          <span>Prompt</span>
        </button>

        <button
          onClick={() => setIsTemplatesModalOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] hover:text-slate-700 transition"
        >
          <FileText className="w-4 h-4 text-purple-500" />
          <span>Template</span>
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
