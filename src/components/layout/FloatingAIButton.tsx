import React, { useState } from 'react';
import { Sparkles, Mic, MessageSquare, Zap, X } from 'lucide-react';
import { useUIStore } from '../../stores/useUIStore';

export interface FloatingAIButtonProps {
  onOpenAIChat: () => void;
}

export const FloatingAIButton: React.FC<FloatingAIButtonProps> = ({ onOpenAIChat }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { addToast } = useUIStore.getState ? { addToast: (t: any) => {} } : { addToast: () => {} };

  const handleVoicePlaceholder = () => {
    setIsOpenMenu(false);
    alert('Asisten Suara AI FamilyAI: Fitur perekaman suara langsung sedang disiapkan untuk integrasi Gemini Live API.');
  };

  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-2 font-sans">
      {/* Quick Command Menu */}
      {isOpenMenu && (
        <div className="glass-card p-3 rounded-2xl shadow-2xl space-y-2 border border-teal-500/30 w-52 animate-scale-up">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
            <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Quick Command
            </span>
            <button
              onClick={() => setIsOpenMenu(false)}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => {
              setIsOpenMenu(false);
              onOpenAIChat();
            }}
            className="w-full text-left p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-teal-50 dark:hover:bg-teal-950/50 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 transition"
          >
            <MessageSquare className="w-4 h-4 text-teal-500" />
            <span>Tanya Chatbot AI</span>
          </button>

          <button
            onClick={handleVoicePlaceholder}
            className="w-full text-left p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-teal-50 dark:hover:bg-teal-950/50 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 transition"
          >
            <Mic className="w-4 h-4 text-blue-500" />
            <span>Perintah Suara</span>
          </button>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpenMenu(!isOpenMenu)}
        aria-label="Floating AI Button"
        className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-400 text-white flex items-center justify-center shadow-2xl shadow-blue-500/40 hover:scale-105 active-press transition duration-200 focus:outline-none focus:ring-4 focus:ring-teal-400/40"
      >
        <span className="absolute inset-0 rounded-full bg-teal-400/30 animate-ping pointer-events-none" />
        {isOpenMenu ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6 animate-pulse" />}
      </button>
    </div>
  );
};
