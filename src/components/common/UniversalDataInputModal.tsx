import React, { useState, useEffect } from 'react';
import { useUIStore } from '../../stores/useUIStore';
import { useToastStore } from '../../stores/useToastStore';
import { useActivityStore } from '../../stores/useActivityStore';
import { useFinanceStore } from '../../stores/useFinanceStore';
import { useCalendarStore } from '../../stores/useCalendarStore';
import { useHealthStore } from '../../stores/useHealthStore';
import { useMemoryStore } from '../../stores/useMemoryStore';
import { useWorkspaceStore } from '../../stores/useWorkspaceStore';
import { useMoodStore } from '../../stores/useMoodStore';
import { useSmartHomeStore } from '../../stores/useSmartHomeStore';
import { useEducationStore } from '../../stores/useEducationStore';

import {
  X,
  PlusCircle,
  DollarSign,
  Calendar as CalendarIcon,
  HeartPulse,
  Brain,
  Users,
  Zap,
  Smile,
  GraduationCap,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const UniversalDataInputModal: React.FC = () => {
  const { isQuickInputOpen, quickInputCategory, closeQuickInput } = useUIStore();
  const { addToast } = useToastStore();
  const { addActivity } = useActivityStore();

  // Active Category State
  const [activeTab, setActiveTab] = useState<string>('finance');

  useEffect(() => {
    if (quickInputCategory) {
      setActiveTab(quickInputCategory);
    }
  }, [quickInputCategory]);

  // Form States - Finance
  const [financeType, setFinanceType] = useState<'expense' | 'income'>('expense');
  const [financeTitle, setFinanceTitle] = useState('');
  const [financeAmount, setFinanceAmount] = useState('');
  const [financeCategory, setFinanceCategory] = useState('Kebutuhan Rumah');

  // Form States - Calendar
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState(new Date().toISOString().split('T')[0]);
  const [eventTime, setEventTime] = useState('09:00');
  const [eventCategory, setEventCategory] = useState('Keluarga');

  // Form States - Health
  const [healthTitle, setHealthTitle] = useState('');
  const [healthType, setHealthType] = useState<'medication' | 'record'>('medication');
  const [healthNotes, setHealthNotes] = useState('');

  // Form States - Memory
  const [memoryTitle, setMemoryTitle] = useState('');
  const [memoryContent, setMemoryContent] = useState('');
  const [memoryTag, setMemoryTag] = useState('Catatan Penting');

  // Form States - Family Member
  const [memberName, setMemberName] = useState('');
  const [memberRole, setMemberRole] = useState<'Admin' | 'Member' | 'Child'>('Member');
  const [memberEmail, setMemberEmail] = useState('');

  // Form States - Smart Home
  const [deviceName, setDeviceName] = useState('');
  const [deviceRoom, setDeviceRoom] = useState('Ruang Tamu');

  // Form States - Mood
  const [moodRating, setMoodRating] = useState<'happy' | 'calm' | 'neutral' | 'anxious' | 'tired'>('happy');
  const [moodNote, setMoodNote] = useState('');

  // Form States - Education
  const [eduTitle, setEduTitle] = useState('');
  const [eduSubject, setEduSubject] = useState('Matematika');
  const [eduDueDate, setEduDueDate] = useState(new Date().toISOString().split('T')[0]);

  if (!isQuickInputOpen) return null;

  // Handle Submissions
  const handleSubmitFinance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!financeTitle.trim() || !financeAmount) return;

    const amountNum = parseFloat(financeAmount) || 0;
    const financeStore = useFinanceStore.getState();

    if (financeType === 'expense') {
      financeStore.addExpense({
        memberId: 'mem_01',
        memberName: 'Pengguna',
        amount: amountNum,
        category: financeCategory as any,
        date: new Date().toISOString().split('T')[0],
        notes: financeTitle,
        merchant: 'Toko/Merchant',
        paymentMethod: 'Cash',
      });
    } else {
      financeStore.addIncome({
        memberId: 'mem_01',
        memberName: 'Pengguna',
        amount: amountNum,
        category: financeCategory as any,
        date: new Date().toISOString().split('T')[0],
        source: financeTitle,
        notes: 'Pencatatan Pemasukan Kas',
      });
    }

    addActivity({
      author: 'Pengguna',
      role: 'Anggota',
      title: `Input ${financeType === 'expense' ? 'Pengeluaran' : 'Pemasukan'}: ${financeTitle}`,
      desc: `Jumlah: Rp ${amountNum.toLocaleString('id-ID')} (${financeCategory})`,
      tag: 'Keuangan',
      color: 'text-blue-500',
      modulePath: 'finance',
    });

    addToast({
      title: 'Data Keuangan Ditambahkan!',
      message: `${financeTitle} (Rp ${amountNum.toLocaleString('id-ID')}) tercatat real-time.`,
      type: 'success',
    });

    setFinanceTitle('');
    setFinanceAmount('');
    closeQuickInput();
  };

  const handleSubmitCalendar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    const calendarStore = useCalendarStore.getState();
    calendarStore.addEvent({
      title: eventTitle,
      date: eventDate,
      time: eventTime,
      category: eventCategory as any,
      description: `Agenda dibuat dari Universal Quick Input.`,
      location: 'Rumah',
      isCompleted: false,
      participants: ['Keluarga'],
      reminderFrequency: 'One Time',
    });

    addActivity({
      author: 'Pengguna',
      role: 'Anggota',
      title: `Jadwal Baru: ${eventTitle}`,
      desc: `Tanggal: ${eventDate} @ ${eventTime} (${eventCategory})`,
      tag: 'Kalender',
      color: 'text-indigo-500',
      modulePath: 'calendar',
    });

    addToast({
      title: 'Agenda Baru Terdaftar!',
      message: `${eventTitle} pada ${eventDate} telah tersinkron.`,
      type: 'success',
    });

    setEventTitle('');
    closeQuickInput();
  };

  const handleSubmitHealth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!healthTitle.trim()) return;

    const healthStore = useHealthStore.getState();
    if (healthType === 'medication') {
      healthStore.addMedication({
        memberId: healthStore.selectedMemberId || 'mem_01',
        name: healthTitle,
        dosage: '1 Tablet / Sesuai Aturan',
        frequency: '1x Sehari',
        scheduleTimes: ['08:00'],
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
        isActive: true,
        notes: healthNotes || 'Diminum setelah makan',
      });
    } else {
      healthStore.addMedicalRecord({
        memberId: healthStore.selectedMemberId || 'mem_01',
        doctorName: 'Dokter Keluarga',
        hospitalName: 'Klinik Sehat',
        date: new Date().toISOString().split('T')[0],
        complaints: healthTitle,
        diagnosis: healthTitle,
        prescriptions: [healthNotes || 'Resep standar'],
        notes: healthNotes || 'Pencatatan medis rutin',
      });
    }

    addActivity({
      author: 'Pengguna',
      role: 'Anggota',
      title: `Catatan Kesehatan: ${healthTitle}`,
      desc: healthNotes || 'Berhasil memperbarui rekam medis keluarga.',
      tag: 'Kesehatan',
      color: 'text-emerald-500',
      modulePath: 'health',
    });

    addToast({
      title: 'Kesehatan Diperbarui!',
      message: `${healthTitle} tersimpan di Rekam Medis.`,
      type: 'success',
    });

    setHealthTitle('');
    setHealthNotes('');
    closeQuickInput();
  };

  const handleSubmitMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memoryTitle.trim()) return;

    const memoryStore = useMemoryStore.getState();
    memoryStore.addMemory({
      title: memoryTitle,
      description: memoryContent || memoryTitle,
      category: 'Daily Life',
      date: new Date().toISOString(),
      tags: [memoryTag],
      isFavorite: false,
      isArchived: false,
      familyMemberId: 'mem_01',
      familyMemberName: 'Pengguna',
      mediaType: 'photo',
    });

    addActivity({
      author: 'Pengguna',
      role: 'Anggota',
      title: `Memori Baru: ${memoryTitle}`,
      desc: memoryContent || 'Catatan memori AI telah dienkripsi & tersimpan.',
      tag: 'Memori',
      color: 'text-amber-500',
      modulePath: 'memories',
    });

    addToast({
      title: 'Memori Tersimpan!',
      message: `${memoryTitle} telah ditambahkan ke AI Vault & Galeri.`,
      type: 'success',
    });

    setMemoryTitle('');
    setMemoryContent('');
    closeQuickInput();
  };

  const handleSubmitMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim()) return;

    const workspaceStore = useWorkspaceStore.getState();
    workspaceStore.addMember({
      name: memberName,
      email: memberEmail || `${memberName.toLowerCase().replace(/\s+/g, '')}@familyai.id`,
      roleId: memberRole === 'Admin' ? 'role_admin' : 'role_member',
      roleName: memberRole === 'Admin' ? 'Admin Keluarga' : 'Orang Tua',
      workspaceId: workspaceStore.activeWorkspaceId,
      relationship: memberRole === 'Child' ? 'Anak' : 'Istri',
      status: 'Aktif',
    });

    addActivity({
      author: 'Owner',
      role: 'Owner',
      title: `Anggota Baru: ${memberName}`,
      desc: `Peran: ${memberRole} | Email: ${memberEmail || 'Tersambung'}`,
      tag: 'Umum',
      color: 'text-purple-500',
      modulePath: 'activity',
    });

    addToast({
      title: 'Anggota Ditambahkan!',
      message: `${memberName} resmi bergabung dalam Family Workspace.`,
      type: 'success',
    });

    setMemberName('');
    setMemberEmail('');
    closeQuickInput();
  };

  const handleSubmitSmartHome = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deviceName.trim()) return;

    const smartStore = useSmartHomeStore.getState();
    smartStore.addDevice({
      name: deviceName,
      room: deviceRoom,
      type: 'Light',
      isOn: true,
      status: 'online',
      powerWatt: 12,
      lastActive: 'Baru saja',
    });

    addActivity({
      author: 'Pengguna',
      role: 'Anggota',
      title: `Perangkat IoT Baru: ${deviceName}`,
      desc: `Lokasi: ${deviceRoom}`,
      tag: 'Smart Home',
      color: 'text-teal-500',
      modulePath: 'smart_home',
    });

    addToast({
      title: 'Smart Home IoT Terhubung!',
      message: `${deviceName} (${deviceRoom}) siap dikontrol AI.`,
      type: 'success',
    });

    setDeviceName('');
    closeQuickInput();
  };

  const handleSubmitMood = (e: React.FormEvent) => {
    e.preventDefault();

    const moodStore = useMoodStore.getState();
    moodStore.addMoodCheckIn(
      'Pengguna',
      'Ibu',
      moodRating,
      8,
      '#f43f5e',
      moodNote || 'Jurnal emosi harian',
      ['Harian'],
      ['Keluarga']
    );

    addActivity({
      author: 'Pengguna',
      role: 'Anggota',
      title: `Jurnal Emosi: Perasaan ${moodRating.toUpperCase()}`,
      desc: moodNote || 'Perasaan harian terekam di AI Psychology Hub.',
      tag: 'Mood',
      color: 'text-rose-500',
      modulePath: 'mood',
    });

    addToast({
      title: 'Mood Terekam!',
      message: `Refleksi emosi harian tersimpan aman.`,
      type: 'success',
    });

    setMoodNote('');
    closeQuickInput();
  };

  const handleSubmitEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduTitle.trim()) return;

    const eduStore = useEducationStore.getState();
    eduStore.addHomework({
      studentId: 'stud_01',
      subjectId: 'subj_01',
      subjectName: eduSubject,
      title: eduTitle,
      description: 'Tugas sekolah',
      deadlineDate: eduDueDate,
      status: 'Belum Dikerjakan',
      priority: 'High',
      isOfflineAvailable: true,
    });

    addActivity({
      author: 'Ahmad Rizky',
      role: 'Anak',
      title: `Target / PR Baru: ${eduTitle}`,
      desc: `Mata Pelajaran: ${eduSubject} | Tenggat: ${eduDueDate}`,
      tag: 'Pendidikan',
      color: 'text-indigo-500',
      modulePath: 'education',
    });

    addToast({
      title: 'Tugas Edukasi Didaftarkan!',
      message: `${eduTitle} (${eduSubject}) telah dijadwalkan.`,
      type: 'success',
    });

    setEduTitle('');
    closeQuickInput();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-3 md:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-5 md:p-6 space-y-5 shadow-2xl relative my-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                Pusat Input Data Multi-Modul Real-Time
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </h3>
              <p className="text-[11px] text-slate-400">
                Pilih modul di bawah untuk memasukkan data baru yang langsung tersinkron secara terpadu.
              </p>
            </div>
          </div>
          <button
            onClick={closeQuickInput}
            className="p-1.5 text-slate-400 hover:text-slate-100 bg-slate-800/60 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('finance')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shrink-0 ${
              activeTab === 'finance'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" /> Keuangan
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shrink-0 ${
              activeTab === 'calendar'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" /> Agenda Kalender
          </button>

          <button
            onClick={() => setActiveTab('health')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shrink-0 ${
              activeTab === 'health'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5" /> Kesehatan
          </button>

          <button
            onClick={() => setActiveTab('memory')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shrink-0 ${
              activeTab === 'memory'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Brain className="w-3.5 h-3.5" /> Memori AI
          </button>

          <button
            onClick={() => setActiveTab('member')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shrink-0 ${
              activeTab === 'member'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Anggota
          </button>

          <button
            onClick={() => setActiveTab('smarthome')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shrink-0 ${
              activeTab === 'smarthome'
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" /> Smart Home
          </button>

          <button
            onClick={() => setActiveTab('mood')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shrink-0 ${
              activeTab === 'mood'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smile className="w-3.5 h-3.5" /> Mood
          </button>

          <button
            onClick={() => setActiveTab('education')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shrink-0 ${
              activeTab === 'education'
                ? 'bg-sky-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" /> Edukasi
          </button>
        </div>

        {/* Tab Forms */}
        {activeTab === 'finance' && (
          <form onSubmit={handleSubmitFinance} className="space-y-3 pt-2">
            <div className="flex gap-2 p-1 bg-slate-950 border border-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => setFinanceType('expense')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                  financeType === 'expense' ? 'bg-rose-600 text-white' : 'text-slate-400'
                }`}
              >
                Pengeluaran
              </button>
              <button
                type="button"
                onClick={() => setFinanceType('income')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                  financeType === 'income' ? 'bg-emerald-600 text-white' : 'text-slate-400'
                }`}
              >
                Pemasukan
              </button>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-semibold">
                Judul Transaksi
              </label>
              <input
                type="text"
                required
                value={financeTitle}
                onChange={(e) => setFinanceTitle(e.target.value)}
                placeholder="Misal: Belanja Sayur / Gaji Bulanan / Tagihan Listrik"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-semibold">
                  Nominal (Rp)
                </label>
                <input
                  type="number"
                  required
                  value={financeAmount}
                  onChange={(e) => setFinanceAmount(e.target.value)}
                  placeholder="50000"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-semibold">
                  Kategori
                </label>
                <select
                  value={financeCategory}
                  onChange={(e) => setFinanceCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                >
                  <option value="Kebutuhan Rumah">Kebutuhan Rumah</option>
                  <option value="Makanan & Minuman">Makanan & Minuman</option>
                  <option value="Pendidikan Anak">Pendidikan Anak</option>
                  <option value="Kesehatan">Kesehatan</option>
                  <option value="Hiburan & Transport">Hiburan & Transport</option>
                  <option value="Gaji & Bonus">Gaji & Bonus</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
            >
              Simpan Transaksi Keuangan <CheckCircle2 className="w-4 h-4" />
            </button>
          </form>
        )}

        {activeTab === 'calendar' && (
          <form onSubmit={handleSubmitCalendar} className="space-y-3 pt-2">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-semibold">
                Judul Agenda / Acara
              </label>
              <input
                type="text"
                required
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="Misal: Arisan Keluarga / Les Renang Anak / Pendaftaran Sekolah"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-semibold">
                  Tanggal
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-semibold">Jam</label>
                <input
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
            >
              Tambah Agenda Kalender <CheckCircle2 className="w-4 h-4" />
            </button>
          </form>
        )}

        {activeTab === 'health' && (
          <form onSubmit={handleSubmitHealth} className="space-y-3 pt-2">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-semibold">
                Nama Obat / Rekam Medis
              </label>
              <input
                type="text"
                required
                value={healthTitle}
                onChange={(e) => setHealthTitle(e.target.value)}
                placeholder="Misal: Vitamin C 500mg / Check-Up Tensi Darah"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-semibold">
                Catatan / Dosis
              </label>
              <textarea
                rows={2}
                value={healthNotes}
                onChange={(e) => setHealthNotes(e.target.value)}
                placeholder="Catatan aturan pakai atau hasil konsultasi..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
            >
              Simpan Data Kesehatan <CheckCircle2 className="w-4 h-4" />
            </button>
          </form>
        )}

        {activeTab === 'memory' && (
          <form onSubmit={handleSubmitMemory} className="space-y-3 pt-2">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-semibold">
                Judul Catatan / Memori
              </label>
              <input
                type="text"
                required
                value={memoryTitle}
                onChange={(e) => setMemoryTitle(e.target.value)}
                placeholder="Misal: Makanan favorit Ayah / Nomor seri garansi TV / Alamat Nenek"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-semibold">
                Isi Informasi Rincian
              </label>
              <textarea
                rows={2}
                value={memoryContent}
                onChange={(e) => setMemoryContent(e.target.value)}
                placeholder="Tuliskan catatan penting agar AI Gemini selalu ingat..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
            >
              Simpan ke AI Vault Memori <CheckCircle2 className="w-4 h-4" />
            </button>
          </form>
        )}

        {activeTab === 'member' && (
          <form onSubmit={handleSubmitMember} className="space-y-3 pt-2">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-semibold">
                Nama Anggota Keluarga
              </label>
              <input
                type="text"
                required
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                placeholder="Misal: Kakak Annisa / Paman Rudi"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-semibold">Peran</label>
                <select
                  value={memberRole}
                  onChange={(e) => setMemberRole(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                >
                  <option value="Admin">Admin Keluarga</option>
                  <option value="Member">Anggota Biasa</option>
                  <option value="Child">Anak</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-semibold">
                  Email (Opsional)
                </label>
                <input
                  type="email"
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                  placeholder="annisa@gmail.com"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
            >
              Tambah Anggota Keluarga <CheckCircle2 className="w-4 h-4" />
            </button>
          </form>
        )}

        {activeTab === 'smarthome' && (
          <form onSubmit={handleSubmitSmartHome} className="space-y-3 pt-2">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-semibold">
                Nama Perangkat Smart Home
              </label>
              <input
                type="text"
                required
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                placeholder="Misal: Lampu Teras / CCTV Halaman / AC Kamar Utama"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-semibold">
                Ruangan
              </label>
              <input
                type="text"
                value={deviceRoom}
                onChange={(e) => setDeviceRoom(e.target.value)}
                placeholder="Ruang Tamu"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
            >
              Hubungkan Perangkat Smart Home <CheckCircle2 className="w-4 h-4" />
            </button>
          </form>
        )}

        {activeTab === 'mood' && (
          <form onSubmit={handleSubmitMood} className="space-y-3 pt-2">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-semibold">
                Perasaan Hari Ini
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { id: 'happy', label: '😊 Bahagia' },
                  { id: 'calm', label: '😌 Tenang' },
                  { id: 'neutral', label: '😐 Biasa' },
                  { id: 'anxious', label: '😰 Cemas' },
                  { id: 'tired', label: '😫 Lelah' },
                ].map((m) => (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setMoodRating(m.id as any)}
                    className={`py-2 px-1 text-[11px] font-bold rounded-xl border text-center transition ${
                      moodRating === m.id
                        ? 'bg-rose-600 border-rose-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-semibold">
                Catatan Jurnal Emosi
              </label>
              <textarea
                rows={2}
                value={moodNote}
                onChange={(e) => setMoodNote(e.target.value)}
                placeholder="Ceritakan singkat apa yang Anda rasakan..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
            >
              Simpan Refleksi Mood <CheckCircle2 className="w-4 h-4" />
            </button>
          </form>
        )}

        {activeTab === 'education' && (
          <form onSubmit={handleSubmitEducation} className="space-y-3 pt-2">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-semibold">
                Judul Tugas / PR / Target Belajar
              </label>
              <input
                type="text"
                required
                value={eduTitle}
                onChange={(e) => setEduTitle(e.target.value)}
                placeholder="Misal: Latihan Soal Matematika Bab 3 / Presentasi IPA"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-semibold">
                  Mata Pelajaran
                </label>
                <input
                  type="text"
                  value={eduSubject}
                  onChange={(e) => setEduSubject(e.target.value)}
                  placeholder="Matematika"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-semibold">
                  Tenggat Selesai
                </label>
                <input
                  type="date"
                  value={eduDueDate}
                  onChange={(e) => setEduDueDate(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
            >
              Tambah Target Edukasi Anak <CheckCircle2 className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
