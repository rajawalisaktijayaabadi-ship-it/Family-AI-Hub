import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Sparkles, Calendar, Heart, Wallet, Users, ArrowRight } from 'lucide-react';

interface UniversalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (route: string) => void;
}

export const UniversalSearchModal: React.FC<UniversalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const searchItems = [
    { title: 'Catat Mood & Jurnal Perasaan', category: 'Mood AI', route: 'mood', icon: Heart },
    { title: 'Jadwal Les & Agenda Sekolah', category: 'Pendidikan', route: 'calendar', icon: Calendar },
    { title: 'Pemeriksaan Tensi & Jadwal Obat Kakek', category: 'Kesehatan', route: 'health', icon: Heart },
    { title: 'Anggaran & Belanja Sembako Bulanan', category: 'Keuangan', route: 'finance', icon: Wallet },
    { title: 'Anggota Ruang Keluarga & Undangan', category: 'Keluarga', route: 'family', icon: Users },
  ];

  const filteredItems = searchItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/60 backdrop-blur-sm p-4 pt-16 font-sans">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col"
        >
          {/* Search Input Bar */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 dark:border-slate-800">
            <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari fitur, jadwal, anggota, atau asisten AI..."
              className="flex-1 bg-transparent text-sm font-semibold text-slate-800 dark:text-slate-100 outline-hidden placeholder-slate-400"
            />
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Quick Tags */}
          <div className="flex items-center gap-1.5 px-5 py-2.5 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar text-[11px] font-bold">
            <span className="text-slate-400 shrink-0">Populer:</span>
            {['Mood Check', 'Jadwal Les', 'Cek Obat', 'Anggaran Belanja', 'Emergency'].map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-2.5 py-1 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full border border-slate-200 dark:border-slate-700 whitespace-nowrap hover:border-indigo-400"
                >
                  {tag}
                </button>
              )
            )}
          </div>

          {/* Results List */}
          <div className="p-4 max-h-80 overflow-y-auto space-y-2">
            {filteredItems.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs font-semibold">
                Tidak ada hasil ditemukan untuk "{query}"
              </div>
            ) : (
              filteredItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectResult(item.route);
                      onClose();
                    }}
                    className="w-full p-3 rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 flex items-center justify-between text-left transition-all text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-100">{item.title}</p>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
