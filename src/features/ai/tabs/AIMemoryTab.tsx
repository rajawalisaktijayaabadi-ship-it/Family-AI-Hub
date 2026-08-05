import React, { useState } from 'react';
import { useAIStore } from '../../../stores/useAIStore';
import {
  Brain,
  Pin,
  Trash2,
  Plus,
  Search,
  CheckCircle2,
  Lock,
  Sparkles,
  ShieldAlert,
  Calendar,
  Layers,
} from 'lucide-react';
import { PromptCategory } from '../../../types/ai';

export const AIMemoryTab: React.FC = () => {
  const { memories, addMemory, togglePinMemory, deleteMemory, clearAllMemories } = useAIStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('Semua');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newCat, setNewCat] = useState<PromptCategory>('Keluarga');

  const categories = ['Semua', 'Keluarga', 'Kesehatan', 'Keuangan', 'Parenting', 'General'];

  const filteredMemories = memories.filter((m) => {
    const matchesCat = selectedCat === 'Semua' || m.category === selectedCat;
    const matchesSearch =
      m.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.value.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCreateMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey.trim() || !newValue.trim()) return;
    addMemory(newKey.trim(), newValue.trim(), newCat);
    setNewKey('');
    setNewValue('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-5 text-white shadow-lg">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">AI Memory Engine</h2>
            <p className="text-xs text-emerald-100">
              Memori kontekstual aman & khusus untuk keluarga Anda
            </p>
          </div>
        </div>
        <p className="text-xs text-white/90 leading-relaxed mt-3 bg-white/10 p-2.5 rounded-xl backdrop-blur-sm border border-white/10">
          💡 AI secara otomatis mempelajari kebiasaan, preferensi, dan fakta penting keluarga untuk memberikan respon yang lebih relevan dan berempati.
        </p>
      </div>

      {/* Control Bar: Search & Add */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Cari kata kunci memori..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center space-x-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-emerald-700 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Memori</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
              selectedCat === cat
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Memory List */}
      <div className="space-y-3">
        {filteredMemories.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-200 p-6">
            <Brain className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-700">Belum ada memori tersimpan</p>
            <p className="text-xs text-slate-400 mt-1">
              Tambahkan memori baru atau ngobrol dengan AI untuk membangun ingatan kontekstual.
            </p>
          </div>
        ) : (
          filteredMemories.map((mem) => (
            <div
              key={mem.id}
              className={`bg-white rounded-2xl p-4 border transition ${
                mem.isPinned
                  ? 'border-emerald-300 shadow-sm bg-emerald-50/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                    {mem.category}
                  </span>
                  {mem.isPinned && (
                    <span className="flex items-center text-[10px] text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-full">
                      <Pin className="w-3 h-3 mr-1 fill-amber-500" /> Pinned
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400">
                    Skor AI: {Math.round(mem.confidenceScore * 100)}%
                  </span>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => togglePinMemory(mem.id)}
                    className={`p-1.5 rounded-lg transition ${
                      mem.isPinned
                        ? 'text-amber-600 bg-amber-50'
                        : 'text-slate-400 hover:bg-slate-100'
                    }`}
                    title="Pin Memori"
                  >
                    <Pin className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteMemory(mem.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                    title="Hapus Memori"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h4 className="font-semibold text-slate-800 text-sm mt-2">{mem.key}</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                "{mem.value}"
              </p>

              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>Dibuat: {new Date(mem.createdAt).toLocaleDateString('id-ID')}</span>
                </div>
                <div className="flex items-center space-x-1 text-emerald-600 font-medium">
                  <Lock className="w-3 h-3" />
                  <span>Tersimpan Terenkripsi</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Danger Zone: Clear Memories */}
      <div className="rounded-2xl bg-rose-50 p-4 border border-rose-200">
        <div className="flex items-center space-x-3">
          <ShieldAlert className="w-5 h-5 text-rose-600" />
          <div className="flex-1">
            <h4 className="text-xs font-semibold text-rose-900">Kontrol Privasi Memori</h4>
            <p className="text-[11px] text-rose-700">
              Anda dapat menghapus seluruh memori kontekstual AI kapan saja secara konfidensial.
            </p>
          </div>
          <button
            onClick={() => {
              if (window.confirm('Apakah Anda yakin ingin menghapus seluruh memori AI?')) {
                clearAllMemories();
              }
            }}
            className="text-xs font-semibold text-rose-700 hover:text-rose-900 bg-white px-3 py-1.5 rounded-lg border border-rose-200"
          >
            Hapus Semua
          </button>
        </div>
      </div>

      {/* Add Memory Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-800 text-base flex items-center space-x-2">
                <Brain className="w-5 h-5 text-emerald-600" />
                <span>Tambah Memori AI Baru</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateMemory} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Kategori Memori</label>
                <select
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value as PromptCategory)}
                  className="w-full p-2.5 border rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Keluarga">Keluarga</option>
                  <option value="Kesehatan">Kesehatan</option>
                  <option value="Keuangan">Keuangan</option>
                  <option value="Parenting">Parenting</option>
                  <option value="Makanan">Makanan</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Judul / Topik Memori</label>
                <input
                  type="text"
                  placeholder="Contoh: Alergi Makanan Anak"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  className="w-full p-2.5 border rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Isi Detail Memori</label>
                <textarea
                  placeholder="Contoh: Budi alergi kacang tanah dan produk olahannya."
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 border rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-xl text-slate-600 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700"
                >
                  Simpan Memori
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
