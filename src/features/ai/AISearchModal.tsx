import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAIStore } from '../../stores/useAIStore';
import { Search, X, MessageSquare, Zap, ChevronRight } from 'lucide-react';

interface AISearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: () => void;
}

export const AISearchModal: React.FC<AISearchModalProps> = ({ isOpen, onClose, onOpenChat }) => {
  const {
    conversations,
    prompts,
    setActiveConversationId,
    createNewConversation,
    sendMessage,
  } = useAIStore();
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedConversations = q
    ? conversations.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.lastMessageText.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      )
    : [];

  const matchedPrompts = q
    ? prompts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.templateText.toLowerCase().includes(q)
      )
    : [];

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
            <Search className="w-5 h-5 text-blue-600" />
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 font-heading">
              Pencarian AI Universal
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input */}
        <div className="px-3 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center gap-2 border border-slate-200 dark:border-slate-700">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari kata kunci dalam obrolan atau prompt..."
            className="w-full bg-transparent text-xs text-slate-900 dark:text-white focus:outline-none"
            autoFocus
          />
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto space-y-3 no-scrollbar pr-1">
          {!q ? (
            <div className="text-center py-10 text-xs text-slate-400 space-y-2">
              <Search className="w-8 h-8 text-slate-300 mx-auto" />
              <p>Ketik kata kunci untuk mencari obrolan atau pustaka prompt.</p>
            </div>
          ) : (
            <>
              {/* Conversations */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Hasil Obrolan ({matchedConversations.length})
                </h4>
                {matchedConversations.length === 0 ? (
                  <p className="text-[11px] text-slate-400 italic">Tidak ada obrolan yang cocok</p>
                ) : (
                  matchedConversations.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => {
                        setActiveConversationId(c.id);
                        onOpenChat();
                        onClose();
                      }}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-blue-500 transition flex items-center justify-between"
                    >
                      <div className="space-y-0.5 overflow-hidden pr-2">
                        <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {c.title}
                        </h5>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          {c.lastMessageText}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    </div>
                  ))
                )}
              </div>

              {/* Prompts */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Hasil Prompt ({matchedPrompts.length})
                </h4>
                {matchedPrompts.length === 0 ? (
                  <p className="text-[11px] text-slate-400 italic">Tidak ada prompt yang cocok</p>
                ) : (
                  matchedPrompts.map((p) => (
                    <div
                      key={p.id}
                      onClick={async () => {
                        const id = createNewConversation(p.title, p.category);
                        setActiveConversationId(id);
                        onOpenChat();
                        onClose();
                        await sendMessage(p.templateText, [], p.id);
                      }}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-500 transition flex items-center justify-between"
                    >
                      <div className="space-y-0.5 overflow-hidden pr-2">
                        <span className="text-[9px] font-bold text-indigo-600 uppercase">
                          {p.category}
                        </span>
                        <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {p.title}
                        </h5>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
