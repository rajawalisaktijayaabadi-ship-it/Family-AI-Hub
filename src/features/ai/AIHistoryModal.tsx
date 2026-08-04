import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAIStore } from '../../stores/useAIStore';
import { History as HistoryIcon, X, Calendar, ChevronRight, MessageSquare, Trash2 } from 'lucide-react';

interface AIHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: () => void;
}

export const AIHistoryModal: React.FC<AIHistoryModalProps> = ({ isOpen, onClose, onOpenChat }) => {
  const { conversations, setActiveConversationId, clearHistory } = useAIStore();
  const [activePeriod, setActivePeriod] = useState<'today' | 'yesterday' | 'last_week' | 'last_month'>(
    'today'
  );

  if (!isOpen) return null;

  // Group conversations logically into Periods
  const now = Date.now();
  const todayConvs = conversations.filter(
    (c) => now - new Date(c.updatedAt).getTime() < 3600000 * 24
  );
  const yesterdayConvs = conversations.filter(
    (c) =>
      now - new Date(c.updatedAt).getTime() >= 3600000 * 24 &&
      now - new Date(c.updatedAt).getTime() < 3600000 * 48
  );
  const lastWeekConvs = conversations.filter(
    (c) =>
      now - new Date(c.updatedAt).getTime() >= 3600000 * 48 &&
      now - new Date(c.updatedAt).getTime() < 3600000 * 24 * 7
  );
  const lastMonthConvs = conversations.filter(
    (c) => now - new Date(c.updatedAt).getTime() >= 3600000 * 24 * 7
  );

  const currentList =
    activePeriod === 'today'
      ? todayConvs
      : activePeriod === 'yesterday'
      ? yesterdayConvs
      : activePeriod === 'last_week'
      ? lastWeekConvs
      : lastMonthConvs;

  const handleSelectConv = (id: string) => {
    setActiveConversationId(id);
    onOpenChat();
    onClose();
  };

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
            <div className="p-2 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600">
              <HistoryIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 font-heading">
                Riwayat Aktivitas AI
              </h3>
              <p className="text-[10px] text-slate-400 font-medium">Luring & Terenkripsi</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Period Filter Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-[11px] font-bold">
          <button
            onClick={() => setActivePeriod('today')}
            className={`flex-1 py-1.5 rounded-xl transition ${
              activePeriod === 'today'
                ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Hari Ini ({todayConvs.length})
          </button>
          <button
            onClick={() => setActivePeriod('yesterday')}
            className={`flex-1 py-1.5 rounded-xl transition ${
              activePeriod === 'yesterday'
                ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Kemarin ({yesterdayConvs.length})
          </button>
          <button
            onClick={() => setActivePeriod('last_week')}
            className={`flex-1 py-1.5 rounded-xl transition ${
              activePeriod === 'last_week'
                ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Minggu Lalu ({lastWeekConvs.length})
          </button>
          <button
            onClick={() => setActivePeriod('last_month')}
            className={`flex-1 py-1.5 rounded-xl transition ${
              activePeriod === 'last_month'
                ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Bulan Lalu ({lastMonthConvs.length})
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar pr-1">
          {currentList.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              Tidak ada riwayat aktivitas pada periode ini.
            </div>
          ) : (
            currentList.map((conv) => (
              <div
                key={conv.id}
                onClick={() => handleSelectConv(conv.id)}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-teal-50 dark:hover:bg-teal-950/40 border border-slate-200 dark:border-slate-700 cursor-pointer transition flex items-center justify-between"
              >
                <div className="space-y-1 overflow-hidden pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300">
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
            ))
          )}
        </div>

        {conversations.length > 0 && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              onClick={() => {
                clearHistory();
                onClose();
              }}
              className="text-xs text-rose-500 hover:text-rose-600 font-bold flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Bersihkan Seluruh Riwayat
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
