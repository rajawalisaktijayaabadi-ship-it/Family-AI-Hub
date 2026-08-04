import React, { useState } from 'react';
import { useHealthStore } from '../../stores/useHealthStore';
import {
  User,
  HeartPulse,
  Activity,
  ShieldAlert,
  FileText,
  Syringe,
  Plus,
  Hospital,
  Stethoscope,
  Calendar,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const FamilyHealthProfileModule: React.FC = () => {
  const {
    profiles,
    selectedMemberId,
    medicalRecords,
    vaccinations,
    checkups,
    addMedicalRecord,
    addVaccination,
    addCheckup,
  } = useHealthStore();

  const activeProfile = profiles.find((p) => p.memberId === selectedMemberId) || profiles[0];

  // Modals state
  const [showAddMedRec, setShowAddMedRec] = useState(false);
  const [doctor, setDoctor] = useState('');
  const [hospital, setHospital] = useState('');
  const [complaints, setComplaints] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [prescriptions, setPrescriptions] = useState('');

  const [showAddVac, setShowAddVac] = useState(false);
  const [vaccineName, setVaccineName] = useState('');
  const [vacLocation, setVacLocation] = useState('');
  const [vacDate, setVacDate] = useState('2026-09-10');

  const [showAddCheckup, setShowAddCheckup] = useState(false);
  const [sys, setSys] = useState(120);
  const [dia, setDia] = useState(80);
  const [sugar, setSugar] = useState(95);
  const [chol, setChol] = useState(180);
  const [uric, setUric] = useState(5.2);
  const [spo2, setSpo2] = useState(98);

  const handleCreateMedRec = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctor || !activeProfile) return;

    await addMedicalRecord({
      memberId: activeProfile.memberId,
      date: new Date().toISOString().split('T')[0],
      doctorName: doctor,
      hospitalName: hospital || 'Klinik Medika',
      complaints,
      diagnosis,
      prescriptions: prescriptions ? prescriptions.split(',').map((s) => s.trim()) : [],
    });

    setShowAddMedRec(false);
    setDoctor('');
    setHospital('');
    setComplaints('');
    setDiagnosis('');
    setPrescriptions('');
  };

  const handleCreateVac = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vaccineName || !activeProfile) return;

    await addVaccination({
      memberId: activeProfile.memberId,
      vaccineName,
      date: vacDate,
      location: vacLocation || 'Puskesmas',
      status: 'Jadwal Datang',
    });

    setShowAddVac(false);
    setVaccineName('');
    setVacLocation('');
  };

  const handleCreateCheckup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProfile) return;

    await addCheckup({
      memberId: activeProfile.memberId,
      date: new Date().toISOString().split('T')[0],
      bloodPressureSystolic: Number(sys),
      bloodPressureDiastolic: Number(dia),
      bloodSugarMgDl: Number(sugar),
      cholesterolMgDl: Number(chol),
      uricAcidMgDl: Number(uric),
      oxygenSaturationPercent: Number(spo2),
    });

    setShowAddCheckup(false);
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Basic Profile Card */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-rose-100 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-600 dark:text-rose-400 font-black text-lg">
              {activeProfile?.bloodType || 'O+'}
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 font-heading">
                {activeProfile?.memberName}
              </h3>
              <span className="text-[10px] text-slate-400 font-bold block">
                Golongan Darah: {activeProfile?.bloodType} • BMI: {activeProfile?.bmi} ({activeProfile?.bmiCategory})
              </span>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
            {activeProfile?.bmiCategory}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-bold pt-1">
          <div className="p-2.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-0.5">
            <span className="text-[9px] text-slate-400 block font-normal">Tinggi Badan</span>
            <span className="font-mono text-slate-800 dark:text-slate-100 text-sm">{activeProfile?.heightCm} cm</span>
          </div>
          <div className="p-2.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-0.5">
            <span className="text-[9px] text-slate-400 block font-normal">Berat Badan</span>
            <span className="font-mono text-slate-800 dark:text-slate-100 text-sm">{activeProfile?.weightKg} kg</span>
          </div>
          <div className="p-2.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-0.5">
            <span className="text-[9px] text-slate-400 block font-normal">Riwayat Alergi</span>
            <span className="text-rose-600 dark:text-rose-400 truncate block text-[11px]">
              {activeProfile?.allergies?.join(', ') || 'Tidak ada'}
            </span>
          </div>
          <div className="p-2.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-0.5">
            <span className="text-[9px] text-slate-400 block font-normal">Riwayat Penyakit</span>
            <span className="text-amber-600 dark:text-amber-400 truncate block text-[11px]">
              {activeProfile?.medicalHistory?.join(', ') || 'Tidak ada'}
            </span>
          </div>
        </div>
      </div>

      {/* Health Checkup (Vital Signs) */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-blue-500" /> Hasil Pemeriksaan & Vital Signs
            </h4>
            <span className="text-[10px] text-slate-400 font-bold">
              Tekanan Darah, Gula Darah, Kolesterol, & SpO2
            </span>
          </div>

          <button
            onClick={() => setShowAddCheckup(true)}
            className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-[11px] font-bold shadow-2xs flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Catat Checkup
          </button>
        </div>

        <div className="space-y-2">
          {checkups.map((c) => (
            <div
              key={c.id}
              className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2"
            >
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono font-bold">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" /> {c.date}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400">Pemeriksaan Rutin</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono font-bold">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
                  <span className="text-[9px] text-slate-400 block font-sans">Tensi (TD)</span>
                  <span className="text-blue-600 dark:text-blue-400">{c.bloodPressureSystolic}/{c.bloodPressureDiastolic}</span>
                  <span className="text-[8px] text-slate-400 block font-sans">mmHg</span>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
                  <span className="text-[9px] text-slate-400 block font-sans">Gula Darah</span>
                  <span className="text-amber-600 dark:text-amber-400">{c.bloodSugarMgDl}</span>
                  <span className="text-[8px] text-slate-400 block font-sans">mg/dL</span>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
                  <span className="text-[9px] text-slate-400 block font-sans">Kolesterol</span>
                  <span className="text-purple-600 dark:text-purple-400">{c.cholesterolMgDl}</span>
                  <span className="text-[8px] text-slate-400 block font-sans">mg/dL</span>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
                  <span className="text-[9px] text-slate-400 block font-sans">Asam Urat</span>
                  <span className="text-emerald-600 dark:text-emerald-400">{c.uricAcidMgDl}</span>
                  <span className="text-[8px] text-slate-400 block font-sans">mg/dL</span>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 col-span-2">
                  <span className="text-[9px] text-slate-400 block font-sans">Saturasi Oksigen (SpO2)</span>
                  <span className="text-teal-600 dark:text-teal-400">{c.oxygenSaturationPercent}%</span>
                  <span className="text-[8px] text-slate-400 block font-sans">Sangat Baik</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Medical Record History */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-rose-500" /> Rekam Medis (Medical Records)
            </h4>
            <span className="text-[10px] text-slate-400 font-bold">
              Catatan kunjungan dokter, keluhan, & resep
            </span>
          </div>

          <button
            onClick={() => setShowAddMedRec(true)}
            className="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-[11px] font-bold shadow-2xs flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Rekam Medis
          </button>
        </div>

        <div className="space-y-2.5">
          {medicalRecords.map((m) => (
            <div
              key={m.id}
              className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading">
                    {m.diagnosis}
                  </h5>
                  <span className="text-[10px] text-slate-400 block font-bold">
                    {m.doctorName} • {m.hospitalName}
                  </span>
                </div>

                <span className="text-[10px] font-mono font-bold text-slate-400">{m.date}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">Keluhan: </span>
                  <span>{m.complaints}</span>
                </div>

                {m.prescriptions.length > 0 && (
                  <div>
                    <span className="font-bold text-rose-600 dark:text-rose-400">Resep Obat: </span>
                    <span>{m.prescriptions.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vaccination Tracker */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
              <Syringe className="w-4 h-4 text-purple-500" /> Riwayat & Jadwal Vaksinasi
            </h4>
            <span className="text-[10px] text-slate-400 font-bold">
              Imunisasi & vaksinasi rutin keluarga
            </span>
          </div>

          <button
            onClick={() => setShowAddVac(true)}
            className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-[11px] font-bold shadow-2xs flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Vaksin
          </button>
        </div>

        <div className="space-y-2">
          {vaccinations.map((v) => (
            <div
              key={v.id}
              className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between"
            >
              <div>
                <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">{v.vaccineName}</h5>
                <span className="text-[10px] text-slate-400 block font-bold">
                  {v.location} • Tanggal: {v.date}
                </span>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  v.status === 'Sudah Vaksin'
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                    : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                }`}
              >
                {v.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Add Medical Record */}
      {showAddMedRec && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-heading">
              Tambah Rekam Medis Dokter ({activeProfile?.memberName})
            </h3>

            <form onSubmit={handleCreateMedRec} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Nama Dokter
                </label>
                <input
                  type="text"
                  required
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  placeholder="dr. Andi Wijaya, Sp.PD"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Rumah Sakit / Klinik
                </label>
                <input
                  type="text"
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  placeholder="RS Siloam"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Diagnosis Dokter
                </label>
                <input
                  type="text"
                  required
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="Kelelahan & Otot Tegang"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Keluhan Pasien
                </label>
                <input
                  type="text"
                  value={complaints}
                  onChange={(e) => setComplaints(e.target.value)}
                  placeholder="Pusing, leher kaku"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Resep Obat (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={prescriptions}
                  onChange={(e) => setPrescriptions(e.target.value)}
                  placeholder="Paracetamol 500mg, Vitamin B"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddMedRec(false)}
                  className="px-4 py-2 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold bg-rose-600 text-white shadow-md"
                >
                  Simpan Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Vaccination */}
      {showAddVac && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-heading">
              Jadwal / Riwayat Vaksinasi ({activeProfile?.memberName})
            </h3>

            <form onSubmit={handleCreateVac} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Nama Vaksin
                </label>
                <input
                  type="text"
                  required
                  value={vaccineName}
                  onChange={(e) => setVaccineName(e.target.value)}
                  placeholder="Vaksin HPV Dose 2"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Lokasi Vaksin
                </label>
                <input
                  type="text"
                  value={vacLocation}
                  onChange={(e) => setVacLocation(e.target.value)}
                  placeholder="Klinik Utama"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Tanggal
                </label>
                <input
                  type="date"
                  value={vacDate}
                  onChange={(e) => setVacDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddVac(false)}
                  className="px-4 py-2 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold bg-purple-600 text-white shadow-md"
                >
                  Simpan Vaksin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Checkup */}
      {showAddCheckup && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-heading">
              Catat Vital Signs ({activeProfile?.memberName})
            </h3>

            <form onSubmit={handleCreateCheckup} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Sistolik (TD)
                  </label>
                  <input
                    type="number"
                    value={sys}
                    onChange={(e) => setSys(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Diastolik (TD)
                  </label>
                  <input
                    type="number"
                    value={dia}
                    onChange={(e) => setDia(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Gula Darah (mg/dL)
                  </label>
                  <input
                    type="number"
                    value={sugar}
                    onChange={(e) => setSugar(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Kolesterol (mg/dL)
                  </label>
                  <input
                    type="number"
                    value={chol}
                    onChange={(e) => setChol(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Asam Urat
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={uric}
                    onChange={(e) => setUric(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    SpO2 (%)
                  </label>
                  <input
                    type="number"
                    value={spo2}
                    onChange={(e) => setSpo2(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCheckup(false)}
                  className="px-4 py-2 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold bg-blue-600 text-white shadow-md"
                >
                  Simpan Checkup
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
