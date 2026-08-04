import React, { useState } from 'react';
import { useHealthStore } from '../../stores/useHealthStore';
import { MedicationModel, ReminderModel } from '../../types/health';
import {
  Pill,
  Bell,
  Clock,
  Plus,
  CheckCircle2,
  Circle,
  Calendar,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

export const MedicationAndReminderModule: React.FC = () => {
  const {
    profiles,
    selectedMemberId,
    medications,
    reminders,
    addMedication,
    toggleReminder,
    addReminder,
  } = useHealthStore();

  const activeProfile = profiles.find((p) => p.memberId === selectedMemberId) || profiles[0];

  // Modals state
  const [showAddMed, setShowAddMed] = useState(false);
  const [medName, setMedName] = useState('');
  const [dosage, setDosage] = useState('1 Tablet');
  const [frequency, setFrequency] = useState('1x Sehari');
  const [timeStr, setTimeStr] = useState('07:00');

  const [showAddRem, setShowAddRem] = useState(false);
  const [remTitle, setRemTitle] = useState('');
  const [remType, setRemType] = useState<ReminderModel['type']>('Obat');
  const [remTime, setRemTime] = useState('08:00');

  const handleCreateMed = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medName || !activeProfile) return;

    await addMedication({
      memberId: activeProfile.memberId,
      name: medName,
      dosage,
      frequency,
      scheduleTimes: [timeStr],
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-08-30',
      isActive: true,
    });

    // Also auto-add a reminder for this medicine
    await addReminder({
      memberId: activeProfile.memberId,
      type: 'Obat',
      title: `Minum ${medName} (${dosage})`,
      time: timeStr,
    });

    setShowAddMed(false);
    setMedName('');
  };

  const handleCreateRem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!remTitle || !activeProfile) return;

    await addReminder({
      memberId: activeProfile.memberId,
      type: remType,
      title: remTitle,
      time: remTime,
    });

    setShowAddRem(false);
    setRemTitle('');
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Active Medications */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
              <Pill className="w-4 h-4 text-emerald-500" /> Manajemen Obat Aktif ({activeProfile?.memberName})
            </h4>
            <span className="text-[10px] text-slate-400 font-bold">
              Resep obat, dosis, frekuensi, & jadwal konsumsi
            </span>
          </div>

          <button
            onClick={() => setShowAddMed(true)}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-[11px] font-bold shadow-2xs flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Obat
          </button>
        </div>

        <div className="space-y-2">
          {medications.map((m) => (
            <div
              key={m.id}
              className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
                    <Pill className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">{m.name}</h5>
                    <span className="text-[10px] text-slate-400 font-bold block">
                      Dosis: {m.dosage} • {m.frequency}
                    </span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                  Aktif
                </span>
              </div>

              {m.notes && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-8">{m.notes}</p>
              )}

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800 pl-8">
                <span>Jadwal Minum: {m.scheduleTimes.join(', ')}</span>
                <span>Periode: s.d. {m.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Health Reminders Today */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-amber-500" /> Pengingat Kesehatan Hari Ini
            </h4>
            <span className="text-[10px] text-slate-400 font-bold">
              Minum obat, minum air, & kontrol kesehatan
            </span>
          </div>

          <button
            onClick={() => setShowAddRem(true)}
            className="px-3 py-1.5 rounded-xl bg-amber-600 text-white text-[11px] font-bold shadow-2xs flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Buat Pengingat
          </button>
        </div>

        <div className="space-y-2">
          {reminders.map((r) => (
            <div
              key={r.id}
              onClick={() => toggleReminder(r.id)}
              className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                r.isCompletedToday
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                {r.isCompletedToday ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 shrink-0" />
                )}

                <div>
                  <span
                    className={`text-xs font-bold block ${
                      r.isCompletedToday
                        ? 'line-through text-slate-400 dark:text-slate-500'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {r.title}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> {r.time}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[9px]">
                      {r.type}
                    </span>
                  </div>
                </div>
              </div>

              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  r.isCompletedToday
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                    : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                }`}
              >
                {r.isCompletedToday ? 'Sudah Dilakukan' : 'Pending'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Add Medication */}
      {showAddMed && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-heading">
              Tambah Resep Obat Baru ({activeProfile?.memberName})
            </h3>

            <form onSubmit={handleCreateMed} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Nama Obat
                </label>
                <input
                  type="text"
                  required
                  value={medName}
                  onChange={(e) => setMedName(e.target.value)}
                  placeholder="Contoh: Paracetamol 500mg"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Dosis
                  </label>
                  <input
                    type="text"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    placeholder="1 Tablet"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Frekuensi
                  </label>
                  <input
                    type="text"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    placeholder="2x Sehari"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Jam Minum Obat
                </label>
                <input
                  type="time"
                  value={timeStr}
                  onChange={(e) => setTimeStr(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddMed(false)}
                  className="px-4 py-2 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold bg-emerald-600 text-white shadow-md"
                >
                  Simpan Obat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Reminder */}
      {showAddRem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-heading">
              Buat Pengingat Kesehatan ({activeProfile?.memberName})
            </h3>

            <form onSubmit={handleCreateRem} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Judul Pengingat
                </label>
                <input
                  type="text"
                  required
                  value={remTitle}
                  onChange={(e) => setRemTitle(e.target.value)}
                  placeholder="Contoh: Jalan Pagi 20 Menit"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Jenis
                  </label>
                  <select
                    value={remType}
                    onChange={(e) => setRemType(e.target.value as ReminderModel['type'])}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  >
                    <option value="Obat">Minum Obat</option>
                    <option value="Kontrol Dokter">Kontrol Dokter</option>
                    <option value="Vaksin">Vaksinasi</option>
                    <option value="Minum Air">Minum Air</option>
                    <option value="Olahraga">Olahraga</option>
                    <option value="Tidur">Tidur Cukup</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Jam
                  </label>
                  <input
                    type="time"
                    value={remTime}
                    onChange={(e) => setRemTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddRem(false)}
                  className="px-4 py-2 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold bg-amber-600 text-white shadow-md"
                >
                  Simpan Pengingat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
