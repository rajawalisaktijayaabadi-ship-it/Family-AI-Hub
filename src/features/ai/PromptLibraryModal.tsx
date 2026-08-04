import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAIStore } from '../../stores/useAIStore';
import { useToastStore } from '../../stores/useToastStore';
import { AI_CATEGORIES } from '../../core/aiConstants';
import { PromptCategory, PromptModel } from '../../types/ai';
import { PromptService } from '../../services/PromptService';
import {
  Zap,
  Search,
  Bookmark,
  Pin,
  Plus,
  X,
  ChevronRight,
  Sparkles,
  Command,
  Send,
} from 'lucide-react';

interface PromptLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: () => void;
}

export const PromptLibraryModal: React.FC<PromptLibraryModalProps> = ({
  isOpen,
  onClose,
  onOpenChat,
}) => {
  const {
    prompts,
    toggleFavoritePrompt,
    togglePinPrompt,
    createNewConversation,
    setActiveConversationId,
    sendMessage,
  } = useAIStore();
  const { addToast } = useToastStore();

  const [selectedCategory, setSelectedCategory] = useState<PromptCategory | 'Semua'>('Semua');
  const [search, setSearch] = useState('');
  const [isAddCustomOpen, setIsAddCustomOpen] = useState(false);

  // Form states for custom prompt
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<PromptCategory>('Keluarga');
  const [newTemplate, setNewTemplate] = useState('');

  if (!isOpen) return null;

  const filteredPrompts = prompts.filter((p) => {
    const matchesCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.templateText.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleUsePrompt = async (p: PromptModel) => {
    const convId = createNewConversation(p.title, p.category);
    setActiveConversationId(convId);
    onOpenChat();
    onClose();
    await sendMessage(p.templateText, [], p.id);
  };

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTemplate.trim()) {
      addToast('Judul dan instruksi template wajib diisi!', 'error');
      return;
    }
    PromptService.createCustomPrompt(
      newTitle.trim(),
      newDesc.trim() || 'Prompt khusus keluarga',
      newCategory,
      newTemplate.trim(),
      ['custom', newCategory.toLowerCase()]
    );
    useAIStore.setState({ prompts: PromptService.getAllPrompts() });
    setIsAddCustomOpen(false);
    setNewTitle('');
    setNewDesc('');
    setNewTemplate('');
    addToast('Prompt khusus baru berhasil ditambahkan!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 font-heading">
                Pustaka Prompt AI Keluarga
              </h3>
              <p className="text-[10px] text-slate-400 font-medium">13 Kategori Terintegrasi</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Add Bar */}
        <div className="flex gap-2">
          <div className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center gap-2 border border-slate-200 dark:border-slate-700">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari prompt, topik, atau kata kunci..."
              className="w-full bg-transparent text-xs text-slate-900 dark:text-white focus:outline-none"
            />
          </div>
          <button
            onClick={() => setIsAddCustomOpen(!isAddCustomOpen)}
            className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold flex items-center gap-1 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Tambah
          </button>
        </div>

        {/* Custom Prompt Form Drawer */}
        <AnimatePresence>
          {isAddCustomOpen && (
            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              onSubmit={handleCreateCustom}
              className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 overflow-hidden shrink-0"
            >
              <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading">
                Buat Prompt Khusus Keluarga
              </h4>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Judul Prompt (cth: Resep Jus Buah Siang)"
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
              />
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as PromptCategory)}
                  className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
                >
                  {AI_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Deskripsi Singkat"
                  className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
              <textarea
                value={newTemplate}
                onChange={(e) => setNewTemplate(e.target.value)}
                placeholder="Tulis instruksi template untuk AI..."
                rows={2}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddCustomOpen(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 text-xs font-bold text-white shadow-sm"
                >
                  Simpan Prompt
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* 13 Category Horizontal Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 shrink-0">
          <button
            onClick={() => setSelectedCategory('Semua')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition ${
              selectedCategory === 'Semua'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            Semua ({prompts.length})
          </button>
          {AI_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Prompt List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 no-scrollbar pr-1">
          {filteredPrompts.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              Tidak ada prompt ditemukan di kategori ini.
            </div>
          ) : (
            filteredPrompts.map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 shadow-xs hover:border-indigo-500/50 transition flex flex-col justify-between space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                        {p.category}
                      </span>
                      {p.quickCommand && (
                        <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                          {p.quickCommand}
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white font-heading">
                      {p.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => togglePinPrompt(p.id)}
                      className={`p-1.5 rounded-lg transition ${
                        p.isPinned
                          ? 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title="Sematkan"
                    >
                      <Pin className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleFavoritePrompt(p.id)}
                      className={`p-1.5 rounded-lg transition ${
                        p.isFavorite ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title="Favorit"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="text-[10px] font-medium text-slate-400 line-clamp-1 italic max-w-[200px]">
                    "{p.templateText}"
                  </span>
                  <button
                    onClick={() => handleUsePrompt(p)}
                    className="px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold flex items-center gap-1 shadow-xs transition"
                  >
                    Gunakan <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};
