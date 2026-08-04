import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAIStore } from '../../stores/useAIStore';
import { Bookmark, X, Trash2, ChevronRight, Zap, MessageSquare, Sparkles } from 'lucide-react';

interface AIFavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: () => void;
}

export const AIFavoritesModal: React.FC<AIFavoritesModalProps> = ({
  isOpen,
  onClose,
  onOpenChat,
}) => {
  const {
    favorites,
    prompts,
    conversations,
    removeFavorite,
    setActiveConversationId,
    createNewConversation,
    sendMessage,
  } = useAIStore();

  const [activeTab, setActiveTab] = useState<'prompt' | 'response' | 'conversation'>('prompt');

  if (!isOpen) return null;

  const favoritePrompts = prompts.filter((p) => p.isFavorite);
  const favoriteConversations = conversations.filter((c) => c.isFavorite);
  const favoriteResponses = favorites.filter((f) => f.type === 'response');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 max-h-[90vh] flex flex-col"
      >
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 font-heading">
                Favorit Keluarga
              </h3>
              <p className="text-[10px] text-slate-400 font-medium">Prompt, Jawaban & Obrolan Tersimpan</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-[11px] font-bold">
          <button
            onClick={() => setActiveTab('prompt')}
            className={`flex-1 py-1.5 rounded-xl transition ${
              activeTab === 'prompt'
                ? 'bg-white dark:bg-slate-900 text-amber-600 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Prompt ({favoritePrompts.length})
          </button>
          <button
            onClick={() => setActiveTab('response')}
            className={`flex-1 py-1.5 rounded-xl transition ${
              activeTab === 'response'
                ? 'bg-white dark:bg-slate-900 text-amber-600 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Jawaban ({favoriteResponses.length})
          </button>
          <button
            onClick={() => setActiveTab('conversation')}
            className={`flex-1 py-1.5 rounded-xl transition ${
              activeTab === 'conversation'
                ? 'bg-white dark:bg-slate-900 text-amber-600 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Obrolan ({favoriteConversations.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar pr-1">
          {activeTab === 'prompt' && (
            <>
              {favoritePrompts.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  Belum ada prompt favorit tersimpan.
                </div>
              ) : (
                favoritePrompts.map((p) => (
                  <div
                    key={p.id}
                    onClick={async () => {
                      const id = createNewConversation(p.title, p.category);
                      setActiveConversationId(id);
                      onOpenChat();
                      onClose();
                      await sendMessage(p.templateText, [], p.id);
                    }}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-slate-200 dark:border-slate-700 cursor-pointer transition flex items-center justify-between"
                  >
                    <div className="space-y-1 overflow-hidden pr-2">
                      <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                        {p.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {p.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {p.description}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </div>
                ))
              )}
            </>
          )}

          {activeTab === 'response' && (
            <>
              {favoriteResponses.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  Belum ada jawaban favorit tersimpan.
                </div>
              ) : (
                favoriteResponses.map((f) => (
                  <div
                    key={f.id}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-amber-600 uppercase">
                        {f.title}
                      </span>
                      <button
                        onClick={() => removeFavorite(f.id)}
                        className="text-slate-400 hover:text-rose-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      "{f.contentPreview}"
                    </p>
                  </div>
                ))
              )}
            </>
          )}

          {activeTab === 'conversation' && (
            <>
              {favoriteConversations.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  Belum ada obrolan favorit tersimpan.
                </div>
              ) : (
                favoriteConversations.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setActiveConversationId(c.id);
                      onOpenChat();
                      onClose();
                    }}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-slate-200 dark:border-slate-700 cursor-pointer transition flex items-center justify-between"
                  >
                    <div className="space-y-1 overflow-hidden pr-2">
                      <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                        {c.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {c.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {c.lastMessageText}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
