import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Bot, MessageSquare, Mic, X, ChevronRight, Zap } from 'lucide-react';

interface FloatingAIButtonProps {
  onOpenAI: () => void;
  onQuickActionSelect?: (actionKey: string) => void;
}

export const FloatingAIButton: React.FC<FloatingAIButtonProps> = ({
  onOpenAI,
  onQuickActionSelect,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed bottom-20 right-4 z-40 font-sans">
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="mb-3 p-3 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-indigo-200 dark:border-indigo-800 space-y-2 w-64 text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Gemini AI Orchestrator
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Pilih mode bantuan pintar AI untuk keluarga Anda:
            </p>

            <div className="space-y-1.5">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenAI();
                }}
                className="w-full p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300 font-bold flex items-center justify-between hover:bg-indigo-100 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Buka AI Family Assistant</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onQuickActionSelect?.('OPEN_VOICE_AI');
                }}
                className="w-full p-2.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-300 font-bold flex items-center justify-between hover:bg-teal-100 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4" />
                  <span>Perintah Suara (Voice AI)</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onQuickActionSelect?.('OPEN_MOOD_MODAL');
                }}
                className="w-full p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300 font-bold flex items-center justify-between hover:bg-amber-100 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>Analisis Mood Keluarga</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-teal-500 text-white shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all relative group ring-4 ring-white dark:ring-slate-900"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
        {isMenuOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Sparkles className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
        )}
      </button>
    </div>
  );
};
