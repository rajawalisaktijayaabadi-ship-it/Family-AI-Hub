import React, { useState } from 'react';
import { useMemoryStore } from '../../stores/useMemoryStore';
import { Lock, Unlock, Shield, FileText, FolderKey, Plus, Key, Eye, EyeOff, Trash2 } from 'lucide-react';

export const DigitalVaultTab: React.FC = () => {
  const { vaultItems, isVaultUnlocked, unlockVault, lockVault, addVaultItem, deleteVaultItem } =
    useMemoryStore();

  const [inputPin, setInputPin] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<
    'Important Media' | 'Private Album' | 'Secure Folder' | 'Document'
  >('Secure Folder');
  const [fileUrl, setFileUrl] = useState(
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80'
  );
  const [lockPinCode, setLockPinCode] = useState('1234');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    unlockVault(inputPin);
    setInputPin('');
  };

  const handleAddVaultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    addVaultItem(
      {
        title,
        category,
        fileUrl,
        sizeMb: 4.2,
      },
      lockPinCode
    );

    setTitle('');
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Vault Status Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 rounded-3xl border border-indigo-900/50 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Digital Vault Keluarga</h3>
              <p className="text-[11px] text-slate-300">Penyimpanan Terenkripsi & Berkas Rahasia</p>
            </div>
          </div>

          {isVaultUnlocked ? (
            <button
              onClick={lockVault}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-xs font-black shadow-sm flex items-center gap-1 active:scale-95 transition"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Kunci Vault</span>
            </button>
          ) : (
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full font-bold border border-amber-500/30 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Terkunci</span>
            </span>
          )}
        </div>
      </div>

      {/* Lock Screen if Not Unlocked */}
      {!isVaultUnlocked ? (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-4 max-w-sm mx-auto">
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center">
            <FolderKey className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-black text-slate-900 dark:text-white">Masukkan PIN Keamanan Vault</h4>
            <p className="text-xs text-slate-500">PIN Default Pengujian: <code className="font-bold text-amber-600">1234</code> atau <code className="font-bold text-amber-600">0000</code></p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-3">
            <input
              type="password"
              maxLength={4}
              placeholder="• • • •"
              value={inputPin}
              onChange={(e) => setInputPin(e.target.value)}
              required
              className="w-full text-center tracking-widest text-lg font-black px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-2xl shadow-md transition active:scale-95"
            >
              Buka Digital Vault
            </button>
          </form>
        </div>
      ) : (
        /* Unlocked Vault Content */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
              Berkas Rahasia Tersimpan ({vaultItems.length})
            </h4>

            <button
              onClick={() => setIsAddOpen(true)}
              className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold rounded-2xl shadow-sm transition flex items-center gap-1 active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Berkas</span>
            </button>
          </div>

          {/* Add Vault Item Modal */}
          {isAddOpen && (
            <form onSubmit={handleAddVaultSubmit} className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-amber-200 dark:border-amber-900 shadow-md space-y-3">
              <h4 className="text-xs font-black text-amber-700 dark:text-amber-400">Simpan Berkas Baru Ke Vault</h4>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Judul Dokumen / Media</label>
                <input
                  type="text"
                  placeholder="Contoh: Polis Asuransi Jiwa Utama"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Kategori</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="Secure Folder">Folder Aman</option>
                  <option value="Important Media">Media Penting</option>
                  <option value="Private Album">Album Privat Rahasia</option>
                  <option value="Document">Dokumen Legal</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">URL Lampiran Berkas</label>
                <input
                  type="text"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-amber-600 text-white text-xs font-black rounded-xl shadow-sm hover:bg-amber-700"
                >
                  Enkripsi & Simpan
                </button>
              </div>
            </form>
          )}

          {/* Vault Items List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {vaultItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-100 dark:bg-slate-800">
                  <img src={item.fileUrl} alt={item.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-amber-400 text-[9px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    <span>AES-256 Mock</span>
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h5 className="text-xs font-black text-slate-900 dark:text-white line-clamp-1">{item.title}</h5>
                    <p className="text-[10px] text-slate-500">{item.category} • {item.sizeMb} MB</p>
                  </div>

                  <button
                    onClick={() => deleteVaultItem(item.id)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
