import React, { useState } from 'react';
import { useMemoryStore } from '../../stores/useMemoryStore';
import { GitFork, Plus, UserCheck, Calendar, Heart, Sparkles, UserPlus } from 'lucide-react';

export const FamilyTreeTab: React.FC = () => {
  const { familyTree, addFamilyMember } = useMemoryStore();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState<
    'Parent' | 'Child' | 'Grandparent' | 'Sibling' | 'Custom Relation'
  >('Child');
  const [birthDate, setBirthDate] = useState('2018-01-01');
  const [notes, setNotes] = useState('');

  // Group by Generation
  const gen1 = familyTree.filter((f) => f.generation === 1);
  const gen2 = familyTree.filter((f) => f.generation === 2);
  const gen3 = familyTree.filter((f) => f.generation === 3);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    let generation = 2;
    if (relation === 'Grandparent') generation = 1;
    if (relation === 'Child') generation = 3;

    addFamilyMember({
      name,
      relation,
      birthDate,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      notes,
      generation,
    });

    setName('');
    setNotes('');
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Header & Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <GitFork className="w-4 h-4 text-amber-600" />
            <span>Silsilah & Pohon Keluarga ({familyTree.length} Anggota)</span>
          </h3>
          <p className="text-[10px] text-slate-500">Garis keturunan & hubungan kekerabatan</p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold rounded-2xl shadow-sm transition flex items-center gap-1 active:scale-95"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Anggota</span>
        </button>
      </div>

      {/* Add Member Form */}
      {isAddOpen && (
        <form onSubmit={handleAddSubmit} className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-amber-200 dark:border-amber-900 shadow-md space-y-3">
          <h4 className="text-xs font-black text-amber-700 dark:text-amber-400">Tambah Anggota Pohon Keluarga</h4>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Nama Lengkap</label>
            <input
              type="text"
              placeholder="Contoh: Paman Budi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Hubungan Kekerabatan</label>
              <select
                value={relation}
                onChange={(e) => setRelation(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="Grandparent">Kakek / Nenek (Gen 1)</option>
                <option value="Parent">Orang Tua / Paman / Tante (Gen 2)</option>
                <option value="Child">Anak / Keponakan (Gen 3)</option>
                <option value="Sibling">Saudara Kandung</option>
                <option value="Custom Relation">Keluarga Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Tanggal Lahir</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Catatan / Peran Ringkas</label>
            <input
              type="text"
              placeholder="Keterangan singkat..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
              Simpan Ke Pohon
            </button>
          </div>
        </form>
      )}

      {/* Visual Tree Hierarchical Display */}
      <div className="space-y-6">
        {/* Generasi 1: Kakek & Nenek */}
        <div className="space-y-2">
          <span className="text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full font-black uppercase tracking-wider">
            Generasi 1 — Sesepuh / Kakek & Nenek
          </span>
          <div className="grid grid-cols-2 gap-3 pt-1">
            {gen1.map((m) => (
              <div
                key={m.id}
                className="p-3 bg-white dark:bg-slate-900 rounded-3xl border border-amber-200 dark:border-amber-900/50 shadow-sm flex items-center gap-3"
              >
                <img src={m.avatarUrl} alt={m.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-500" />
                <div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">{m.name}</h4>
                  <p className="text-[10px] text-amber-700 dark:text-amber-400 font-extrabold">{m.relation}</p>
                  <p className="text-[9px] text-slate-400">{m.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Generasi 2: Orang Tua */}
        <div className="space-y-2">
          <span className="text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full font-black uppercase tracking-wider">
            Generasi 2 — Orang Tua & Pasangan
          </span>
          <div className="grid grid-cols-2 gap-3 pt-1">
            {gen2.map((m) => (
              <div
                key={m.id}
                className="p-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3"
              >
                <img src={m.avatarUrl} alt={m.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500" />
                <div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">{m.name}</h4>
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-extrabold">{m.relation}</p>
                  <p className="text-[9px] text-slate-400">{m.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Generasi 3: Anak-Anak */}
        <div className="space-y-2">
          <span className="text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full font-black uppercase tracking-wider">
            Generasi 3 — Anak & Penerus
          </span>
          <div className="grid grid-cols-2 gap-3 pt-1">
            {gen3.map((m) => (
              <div
                key={m.id}
                className="p-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3"
              >
                <img src={m.avatarUrl} alt={m.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500" />
                <div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">{m.name}</h4>
                  <p className="text-[10px] text-blue-700 dark:text-blue-400 font-extrabold">{m.relation}</p>
                  <p className="text-[9px] text-slate-400">{m.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
