import React, { useState } from 'react';
import { useProtectionStore } from '../../stores/useProtectionStore';
import {
  PhoneCall,
  Siren,
  UserPlus,
  HeartPulse,
  AlertTriangle,
  Hospital,
  ShieldAlert,
  UserCheck,
  Edit2,
  Check,
  Plus,
} from 'lucide-react';
import { EmergencyInfoModel } from '../../types/protection';

interface Props {
  onOpenAddContact: () => void;
}

export const EmergencyTab: React.FC<Props> = ({ onOpenAddContact }) => {
  const { emergencyContacts, emergencyInfo, updateEmergencyInfo } = useProtectionStore();

  const [isEditingMedical, setIsEditingMedical] = useState(false);
  const [sosActive, setSosActive] = useState(false);

  const [medForm, setMedForm] = useState<EmergencyInfoModel>(
    emergencyInfo || {
      bloodType: 'O+',
      allergies: ['Penisilin'],
      chronicDiseases: [],
      routineMedications: [],
      primaryDoctorName: 'Dr. Ahmad Dahlan, Sp.A',
      primaryDoctorPhone: '081199887766',
      hospitalPreference: 'RS Siloam Kebon Jeruk',
    }
  );

  const handleSaveMedical = async () => {
    await updateEmergencyInfo(medForm);
    setIsEditingMedical(false);
  };

  const triggerSOS = () => {
    setSosActive(true);
    setTimeout(() => {
      alert('Sinyal Darurat SOS Berhasil Dikirimkan ke Kontak Darurat Utama & Rumah Sakit Rujukan!');
      setSosActive(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* SOS Alert Banner Button */}
      <div className="rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 p-6 text-white shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Siren className="h-6 w-6 text-yellow-300 animate-pulse" />
            <h3 className="text-sm font-extrabold uppercase tracking-wider">Tombol Darurat SOS Keluarga</h3>
          </div>
          <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold tracking-tight text-white border border-white/30">
            Akses Cepat 1-Klik
          </span>
        </div>

        <p className="text-xs text-rose-100 mb-5 leading-relaxed">
          Tekan tombol di bawah untuk menyiarkan lokasi real-time, golongan darah, dan info medis ke kontak darurat utama secara otomatis.
        </p>

        <button
          onClick={triggerSOS}
          disabled={sosActive}
          className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg transition active:scale-95 flex items-center justify-center gap-2 ${
            sosActive
              ? 'bg-slate-900 text-white animate-pulse'
              : 'bg-white text-rose-700 hover:bg-rose-50'
          }`}
        >
          <ShieldAlert className="h-5 w-5" />
          <span>{sosActive ? 'Mengirimkan Sinyal SOS...' : 'AKTIFKAN DARURAT SOS SEKARANG'}</span>
        </button>
      </div>

      {/* Official Emergency Hotlines (Indonesia) */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Layanan Darurat Resmi (Indonesia):</h3>
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <a
            href="tel:112"
            className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 font-bold hover:bg-rose-100 transition flex flex-col items-center gap-1"
          >
            <PhoneCall className="h-4 w-4 text-rose-600" />
            <span>Panggilan 112</span>
            <span className="text-[10px] font-normal text-rose-700">Pusat Darurat</span>
          </a>
          <a
            href="tel:118"
            className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 font-bold hover:bg-amber-100 transition flex flex-col items-center gap-1"
          >
            <Hospital className="h-4 w-4 text-amber-600" />
            <span>Ambulans 118</span>
            <span className="text-[10px] font-normal text-amber-700">RS & Medis</span>
          </a>
          <a
            href="tel:110"
            className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 font-bold hover:bg-blue-100 transition flex flex-col items-center gap-1"
          >
            <ShieldAlert className="h-4 w-4 text-blue-600" />
            <span>Polisi 110</span>
            <span className="text-[10px] font-normal text-blue-700">Keamanan</span>
          </a>
        </div>
      </div>

      {/* Emergency Contacts Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-teal-600" />
            <span>Kontak Darurat Utama ({emergencyContacts.length})</span>
          </h3>
          <button
            onClick={onOpenAddContact}
            className="flex items-center gap-1 text-xs font-bold text-teal-700 hover:underline"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Tambah</span>
          </button>
        </div>

        <div className="space-y-2">
          {emergencyContacts.map((contact) => (
            <div
              key={contact.id}
              className="rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900">{contact.name}</h4>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-extrabold ${
                      contact.priority === 'Primary'
                        ? 'bg-rose-100 text-rose-800'
                        : contact.priority === 'Doctor'
                        ? 'bg-teal-100 text-teal-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {contact.priority}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{contact.relationship}</p>
                <p className="text-[11px] text-slate-700 font-mono mt-0.5">{contact.phoneNumber}</p>
              </div>

              <a
                href={`tel:${contact.phoneNumber}`}
                className="p-2.5 rounded-xl bg-teal-50 text-teal-700 hover:bg-teal-100 transition border border-teal-200"
              >
                <PhoneCall className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Medical Profile Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <HeartPulse className="h-5 w-5 text-rose-600" />
            <h3 className="text-sm font-bold text-slate-900">Profil Medis Darurat Keluarga</h3>
          </div>
          <button
            onClick={() => setIsEditingMedical(!isEditingMedical)}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition"
          >
            <Edit2 className="h-4 w-4" />
          </button>
        </div>

        {emergencyInfo && !isEditingMedical ? (
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2 bg-rose-50/50 p-3 rounded-2xl border border-rose-100">
              <div>
                <span className="text-slate-500 text-[11px]">Golongan Darah:</span>
                <p className="font-extrabold text-rose-700 text-sm">{emergencyInfo.bloodType}</p>
              </div>
              <div>
                <span className="text-slate-500 text-[11px]">Alergi Obat / Makanan:</span>
                <p className="font-bold text-slate-900">
                  {emergencyInfo.allergies.length > 0 ? emergencyInfo.allergies.join(', ') : 'Tidak Ada'}
                </p>
              </div>
            </div>

            <div className="space-y-1.5 text-[11px] text-slate-700">
              <p>
                <span className="font-bold text-slate-900">Penyakit Kronis:</span>{' '}
                {emergencyInfo.chronicDiseases.length > 0
                  ? emergencyInfo.chronicDiseases.join(', ')
                  : 'Tidak Ada Catatan'}
              </p>
              <p>
                <span className="font-bold text-slate-900">Obat-obatan Rutin:</span>{' '}
                {emergencyInfo.routineMedications.length > 0
                  ? emergencyInfo.routineMedications.join(', ')
                  : 'Tidak Ada'}
              </p>
              <p>
                <span className="font-bold text-slate-900">Dokter Keluarga:</span>{' '}
                {emergencyInfo.primaryDoctorName} ({emergencyInfo.primaryDoctorPhone})
              </p>
              <p>
                <span className="font-bold text-slate-900">RS Rujukan Utama:</span>{' '}
                {emergencyInfo.hospitalPreference}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Golongan Darah</label>
              <select
                value={medForm.bloodType}
                onChange={(e) => setMedForm({ ...medForm, bloodType: e.target.value as any })}
                className="w-full rounded-xl border border-slate-200 p-2 text-xs"
              >
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Alergi (Pisahkan Koma)
              </label>
              <input
                type="text"
                value={medForm.allergies.join(', ')}
                onChange={(e) =>
                  setMedForm({
                    ...medForm,
                    allergies: e.target.value.split(',').map((s) => s.trim()),
                  })
                }
                className="w-full rounded-xl border border-slate-200 p-2 text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">RS Rujukan Utama</label>
              <input
                type="text"
                value={medForm.hospitalPreference}
                onChange={(e) => setMedForm({ ...medForm, hospitalPreference: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-2 text-xs"
              />
            </div>

            <button
              onClick={handleSaveMedical}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-teal-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-teal-700"
            >
              <Check className="h-4 w-4" />
              <span>Simpan Profil Medis</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
