import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Plus,
  Check,
  Building2,
  Trash2,
  ShieldCheck,
  Edit2,
  Sparkles,
} from 'lucide-react';
import { WorkspaceType } from '../../types/userWorkspace';
import { useWorkspaceStore } from '../../stores/useWorkspaceStore';
import { useToastStore } from '../../stores/useToastStore';

interface WorkspaceManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WorkspaceManagerModal: React.FC<WorkspaceManagerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    workspaces,
    activeWorkspaceId,
    setActiveWorkspace,
    createWorkspace,
    updateWorkspace,
    deleteWorkspace,
  } = useWorkspaceStore();
  const { addToast } = useToastStore();

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // New Form State
  const [name, setName] = useState('');
  const [type, setType] = useState<WorkspaceType>('Keluarga Inti');
  const [icon, setIcon] = useState('🏠');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    createWorkspace(name.trim(), type, icon, description.trim());
    addToast(`Workspace "${name}" berhasil dibuat!`, 'success');
    setName('');
    setDescription('');
    setIsCreating(false);
  };

  const handleUpdate = (id: string, newName: string) => {
    if (!newName.trim()) return;
    updateWorkspace(id, { name: newName.trim() });
    addToast('Nama workspace diperbarui!', 'success');
    setEditingId(null);
  };

  const handleDelete = (id: string, wsName: string) => {
    if (workspaces.length <= 1) {
      addToast('Minimal harus ada 1 workspace!', 'warning');
      return;
    }
    deleteWorkspace(id);
    addToast(`Workspace "${wsName}" telah dihapus`, 'info');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col my-auto max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                <Building2 className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Kelola Family Workspace
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-5">
            {/* List of Workspaces */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Daftar Workspace ({workspaces.length})
                </span>
                {!isCreating && (
                  <button
                    onClick={() => setIsCreating(true)}
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Tambah Workspace
                  </button>
                )}
              </div>

              {workspaces.map((ws) => {
                const isActive = ws.id === activeWorkspaceId;
                const isEditingThis = editingId === ws.id;

                return (
                  <motion.div
                    key={ws.id}
                    layout
                    className={`p-4 rounded-2xl border transition-all ${
                      isActive
                        ? 'bg-indigo-50/60 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800 ring-2 ring-indigo-500/20'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="text-2xl p-2 bg-white dark:bg-slate-700 rounded-xl shadow-xs border border-slate-100 dark:border-slate-600">
                          {ws.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          {isEditingThis ? (
                            <input
                              type="text"
                              defaultValue={ws.name}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleUpdate(ws.id, e.currentTarget.value);
                                }
                              }}
                              onBlur={(e) => handleUpdate(ws.id, e.target.value)}
                              autoFocus
                              className="w-full px-2 py-1 text-sm rounded-lg border border-indigo-400 bg-white dark:bg-slate-900"
                            />
                          ) : (
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                                {ws.name}
                              </h3>
                              {isActive && (
                                <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-600 text-white rounded-full flex items-center gap-1 shrink-0">
                                  <Check className="w-3 h-3" />
                                  Aktif
                                </span>
                              )}
                            </div>
                          )}
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {ws.type} • {ws.memberCount} Anggota
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {!isActive && (
                          <button
                            onClick={() => {
                              setActiveWorkspace(ws.id);
                              addToast(`Beralih ke workspace "${ws.name}"`, 'info');
                            }}
                            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition-colors"
                          >
                            Pilih
                          </button>
                        )}
                        <button
                          onClick={() => setEditingId(isEditingThis ? null : ws.id)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {workspaces.length > 1 && (
                          <button
                            onClick={() => handleDelete(ws.id, ws.name)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Create Workspace Form */}
            {isCreating && (
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleCreate}
                className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-indigo-200 dark:border-indigo-800/40 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Buat Workspace Baru
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="text-slate-400 hover:text-slate-600 text-xs"
                  >
                    Batal
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                    Nama Workspace
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Keluarga Sastrowardoyo"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                      Jenis Workspace
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as WorkspaceType)}
                      className="w-full px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    >
                      <option value="Keluarga Inti">Keluarga Inti</option>
                      <option value="Keluarga Besar">Keluarga Besar</option>
                      <option value="Orang Tua">Orang Tua</option>
                      <option value="Custom Workspace">Custom Workspace</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                      Ikon
                    </label>
                    <select
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    >
                      <option value="🏠">🏠 Rumah</option>
                      <option value="🌳">🌳 Pohon Keluarga</option>
                      <option value="❤️">❤️ Kasih Sayang</option>
                      <option value="👑">👑 Utama</option>
                      <option value="⭐">⭐ Bintang</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                    Deskripsi Singkat
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Deskripsi tujuan workspace ini..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  Simpan Workspace Baru
                </button>
              </motion.form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
