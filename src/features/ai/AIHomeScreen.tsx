import React from 'react';
import { motion } from 'motion/react';
import { useAIStore } from '../../stores/useAIStore';
import { RecommendationService } from '../../services/RecommendationService';
import { AI_CATEGORIES } from '../../core/aiConstants';
import {
  Sparkles,
  Bot,
  MessageSquare,
  Bookmark,
  Zap,
  Clock,
  History as HistoryIcon,
  Search,
  Plus,
  Sliders,
  ChevronRight,
  Command,
  CheckCircle2,
  Users,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

import { AIVoiceAvatarSection } from './tabs/AIVoiceAvatarSection';

interface AIHomeScreenProps {
  onOpenChat: () => void;
  onOpenPrompts: () => void;
  onOpenHistory: () => void;
  onOpenFavorites: () => void;
  onOpenSettings: () => void;
  onOpenSearch: () => void;
}

export const AIHomeScreen: React.FC<AIHomeScreenProps> = ({
  onOpenChat,
  onOpenPrompts,
  onOpenHistory,
  onOpenFavorites,
  onOpenSettings,
  onOpenSearch,
}) => {
  const {
    conversations,
    prompts,
    favorites,
    createNewConversation,
    setActiveConversationId,
    sendMessage,
    setActiveAITab,
    settings,
  } = useAIStore();

  const suggestedQuestions = RecommendationService.getSuggestedQuestions('Kepala Keluarga');
  const quickCommands = RecommendationService.getQuickCommands();

  const recentConvs = conversations.slice(0, 3);
  const favoritePrompts = prompts.filter((p) => p.isFavorite).slice(0, 4);

  const handleSelectSuggested = async (q: string) => {
    const convId = createNewConversation(q.length > 20 ? `${q.substring(0, 20)}...` : q, 'Umum');
    setActiveConversationId(convId);
    onOpenChat();
    await sendMessage(q);
  };

  const handleSelectCommand = async (cmd: string) => {
    const convId = createNewConversation(`Perintah: ${cmd}`, 'Umum');
    setActiveConversationId(convId);
    onOpenChat();
    await sendMessage(cmd);
  };

  return (
    <div className="space-y-4 pb-20 font-sans max-w-md mx-auto">
      {/* 1. Header & AI Status Bar */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 rounded-3xl p-4 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold font-heading leading-tight">
                  AI Family Assistant
                </h2>
                <p className="text-[10px] text-teal-200 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-teal-300" />
                  Privasi Terjaga • Google Gemini Production AI
                </p>
              </div>
            </div>

            <button
              onClick={onOpenSettings}
              className="p-2 rounded-2xl bg-white/20 hover:bg-white/30 transition backdrop-blur-md"
              title="Pengaturan AI"
            >
              <Sliders className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
              <span>Google Gemini 3.6 Flash Active</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-100 border border-emerald-400/30">
              RAG & Memory Engine On
            </span>
          </div>

          <p className="text-xs text-emerald-100 leading-relaxed font-medium">
            Halo! Saya asisten AI keluarga didukung Google Gemini 3.6 Flash. Siap membantu menjawab ide menu, kesehatan, analisis keuangan, dan agenda rutin keluarga.
          </p>
        </div>
      </div>

      {/* Voice & Avatar Interactive Foundation */}
      <AIVoiceAvatarSection />

      {/* 2. Action Grid Navigation Bar */}
      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={() => {
            createNewConversation('Obrolan Baru', 'Umum');
            onOpenChat();
          }}
          className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-1 text-center shadow-xs active:scale-95 transition"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Plus className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Chat Baru</span>
        </button>

        <button
          onClick={onOpenPrompts}
          className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-1 text-center shadow-xs active:scale-95 transition"
        >
          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <Zap className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Pustaka</span>
        </button>

        <button
          onClick={onOpenHistory}
          className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-1 text-center shadow-xs active:scale-95 transition"
        >
          <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
            <HistoryIcon className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Riwayat</span>
        </button>

        <button
          onClick={onOpenFavorites}
          className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-1 text-center shadow-xs active:scale-95 transition"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Bookmark className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Favorit</span>
        </button>
      </div>

      {/* 3. Quick Commands Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold font-heading text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Command className="w-3.5 h-3.5 text-blue-600" /> Pintasan Perintah (/command)
          </h3>
          <span className="text-[10px] text-slate-400 font-semibold">Klik Langsung</span>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {quickCommands.map((qc) => (
            <button
              key={qc.command}
              onClick={() => handleSelectCommand(qc.command)}
              className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl text-left shrink-0 transition"
            >
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block font-mono">
                {qc.command}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block line-clamp-1 max-w-[120px]">
                {qc.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Suggested Questions Widget */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold font-heading text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Rekomendasi Pertanyaan Harian
          </h3>
        </div>

        <div className="space-y-2">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectSuggested(q)}
              className="w-full text-left p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-200 font-semibold flex items-center justify-between transition group"
            >
              <span className="line-clamp-1 flex-1 pr-2">{q}</span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* 5. Recent Conversations Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold font-heading text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-teal-600" /> Percakapan Terakhir ({conversations.length})
          </h3>
          <button
            onClick={() => setActiveAITab('conversations')}
            className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Lihat Semua
          </button>
        </div>

        {recentConvs.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-400">
            Belum ada percakapan. Mulai percakapan pertama Anda di atas!
          </div>
        ) : (
          <div className="space-y-2">
            {recentConvs.map((conv) => (
              <div
                key={conv.id}
                onClick={() => {
                  setActiveConversationId(conv.id);
                  onOpenChat();
                }}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer transition flex items-center justify-between"
              >
                <div className="space-y-1 overflow-hidden pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                      {conv.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {conv.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {conv.lastMessageText}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. Favorite Prompts Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold font-heading text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5 text-amber-500" /> Prompt Favorit Keluarga
          </h3>
          <button
            onClick={onOpenPrompts}
            className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Jelajah Pustaka
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {favoritePrompts.map((p) => (
            <button
              key={p.id}
              onClick={async () => {
                const convId = createNewConversation(p.title, p.category);
                setActiveConversationId(convId);
                onOpenChat();
                await sendMessage(p.templateText, [], p.id);
              }}
              className="p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-slate-200 dark:border-slate-700 rounded-2xl text-left transition flex flex-col justify-between space-y-2"
            >
              <div>
                <span className="text-[9px] font-extrabold text-amber-600 dark:text-amber-400 block uppercase tracking-wider">
                  {p.category}
                </span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 mt-0.5">
                  {p.title}
                </h4>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {p.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
