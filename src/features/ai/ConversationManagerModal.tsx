import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAIStore } from '../../stores/useAIStore';
import { useToastStore } from '../../stores/useToastStore';
import {
  MessageSquare,
  Search,
  Plus,
  Pin,
  Bookmark,
  Archive,
  Trash2,
  Edit2,
  X,
  ChevronRight,
  Sparkles,
  Check,
} from 'lucide-react';

interface ConversationManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: () => void;
}

export const ConversationManagerModal: React.FC<ConversationManagerModalProps> = ({
  isOpen,
  onClose,
  onOpenChat,
}) => {
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    createNewConversation,
    renameConversation,
    togglePinConversation,
    toggleFavoriteConversation,
    archiveConversation,
    deleteConversation,
  } = useAIStore();

  const { addToast } = useToastStore();

  const [search, setSearch] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'pinned' | 'favorite' | 'archived'>('all');
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [newTitleInput, setNewTitleInput] = useState('');

  if (!isOpen) return null;

  const filtered = conversations.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessageText.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (filterTab === 'pinned') return c.isPinned && !c.isArchived;
    if (filterTab === 'favorite') return c.isFavorite && !c.isArchived;
    if (filterTab === 'archived') return c.isArchived;
    return !c.isArchived;
  });

  const handleSelectConv = (id: string) => {
    setActiveConversationId(id);
    onOpenChat();
    onClose();
  };

  const handleCreateNew = () => {
    const id = createNewConversation('Obrolan Keluarga Baru', 'Umum');
    setActiveConversationId(id);
    onOpenChat();
    onClose();
    addToast('Obrolan baru berhasil dibuat', 'success');
  };

  const handleSaveRename = (id: string) => {
    if (!newTitleInput.trim()) return;
    renameConversation(id, newTitleInput.trim());
    setRenamingId(null);
    addToast('Judul obrolan diperbarui', 'success');
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
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 font-heading">
              Kelola Percakapan AI
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & New Button */}
        <div className="flex gap-2">
          <div className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center gap-2 border border-slate-200 dark:border-slate-700">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari judul atau isi obrolan..."
              className="w-full bg-transparent text-xs text-slate-900 dark:text-white focus:outline-none"
            />
          </div>
          <button
            onClick={handleCreateNew}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold flex items-center gap-1 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Baru
          </button>
        </div>

        {/* Tabs Filter */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-[11px] font-bold">
          <button
            onClick={() => setFilterTab('all')}
            className={`flex-1 py-1.5 rounded-xl transition ${
              filterTab === 'all'
                ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Semua ({conversations.filter((c) => !c.isArchived).length})
          </button>
          <button
            onClick={() => setFilterTab('pinned')}
            className={`flex-1 py-1.5 rounded-xl transition ${
              filterTab === 'pinned'
                ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Sematkan ({conversations.filter((c) => c.isPinned && !c.isArchived).length})
          </button>
          <button
            onClick={() => setFilterTab('favorite')}
            className={`flex-1 py-1.5 rounded-xl transition ${
              filterTab === 'favorite'
                ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Favorit ({conversations.filter((c) => c.isFavorite && !c.isArchived).length})
          </button>
          <button
            onClick={() => setFilterTab('archived')}
            className={`flex-1 py-1.5 rounded-xl transition ${
              filterTab === 'archived'
                ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Arsip ({conversations.filter((c) => c.isArchived).length})
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar pr-1">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              Tidak ada percakapan ditemukan.
            </div>
          ) : (
            filtered.map((conv) => (
              <div
                key={conv.id}
                className={`p-3 rounded-2xl border transition flex flex-col justify-between space-y-2 ${
                  activeConversationId === conv.id
                    ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div
                    onClick={() => handleSelectConv(conv.id)}
                    className="flex-1 cursor-pointer"
                  >
                    {renamingId === conv.id ? (
                      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="text"
                          value={newTitleInput}
                          onChange={(e) => setNewTitleInput(e.target.value)}
                          className="px-2 py-1 bg-white dark:bg-slate-900 border border-blue-500 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                        />
                        <button
                          onClick={() => handleSaveRename(conv.id)}
                          className="p-1 bg-blue-600 text-white rounded-lg"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                            {conv.category}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                            {conv.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-1">
                          {conv.lastMessageText}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => togglePinConversation(conv.id)}
                      className={`p-1.5 rounded-lg transition ${
                        conv.isPinned
                          ? 'text-blue-600 bg-blue-100 dark:bg-blue-900'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title="Sematkan"
                    >
                      <Pin className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => toggleFavoriteConversation(conv.id)}
                      className={`p-1.5 rounded-lg transition ${
                        conv.isFavorite ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title="Favorit"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        setRenamingId(conv.id);
                        setNewTitleInput(conv.title);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600"
                      title="Ubah Nama"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => archiveConversation(conv.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600"
                      title={conv.isArchived ? 'Buka Arsip' : 'Arsipkan'}
                    >
                      <Archive className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => deleteConversation(conv.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};
