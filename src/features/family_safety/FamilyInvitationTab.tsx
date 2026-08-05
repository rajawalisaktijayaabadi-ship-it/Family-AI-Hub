import React, { useState } from 'react';
import { useFamilyLocationStore } from '../../stores/useFamilyLocationStore';
import { FamilyRole } from '../../types/family_location';
import {
  QrCode,
  Copy,
  Check,
  UserPlus,
  Smartphone,
  Shield,
  Trash2,
  Plus,
  Share2,
  ChevronRight,
  Wifi,
  BatteryCharging,
} from 'lucide-react';
import { useToastStore } from '../../stores/useToastStore';

export const FamilyInvitationTab: React.FC = () => {
  const {
    invitations,
    createInvitation,
    revokeInvitation,
    acceptInvitationByCode,
    registeredDevices,
    registerCurrentDevice,
  } = useFamilyLocationStore();

  const [activeSubTab, setActiveSubTab] = useState<'invite' | 'join' | 'devices'>('invite');
  const [selectedRole, setSelectedRole] = useState<FamilyRole>('Child');
  const [inviteeEmail, setInviteeEmail] = useState('');
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [joinNameInput, setJoinNameInput] = useState('');
  const [joinRoleInput, setJoinRoleInput] = useState<FamilyRole>('Child');
  const [consentCheck, setConsentCheck] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    useToastStore.getState().addToast('Teks berhasil disalin ke clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateInvite = (e: React.FormEvent) => {
    e.preventDefault();
    createInvitation(selectedRole, inviteeEmail);
    setInviteeEmail('');
  };

  const handleJoinFamily = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentCheck) {
      useToastStore
        .getState()
        .addToast('Harap beri centang pada persetujuan berbagi lokasi', 'warning');
      return;
    }
    if (!joinCodeInput || !joinNameInput) {
      useToastStore.getState().addToast('Harap isi kode undangan dan nama Anda', 'warning');
      return;
    }

    const success = acceptInvitationByCode(joinCodeInput, joinNameInput, joinRoleInput);
    if (success) {
      setJoinCodeInput('');
      setJoinNameInput('');
      setConsentCheck(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Navigation Sub-Tabs */}
      <div className="grid grid-cols-3 gap-1 bg-slate-200/80 p-1 rounded-2xl">
        <button
          onClick={() => setActiveSubTab('invite')}
          className={`py-2 text-xs font-extrabold rounded-xl transition flex items-center justify-center gap-1.5 ${
            activeSubTab === 'invite'
              ? 'bg-white text-emerald-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Undang</span>
        </button>

        <button
          onClick={() => setActiveSubTab('join')}
          className={`py-2 text-xs font-extrabold rounded-xl transition flex items-center justify-center gap-1.5 ${
            activeSubTab === 'join'
              ? 'bg-white text-emerald-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>Gabung</span>
        </button>

        <button
          onClick={() => setActiveSubTab('devices')}
          className={`py-2 text-xs font-extrabold rounded-xl transition flex items-center justify-center gap-1.5 ${
            activeSubTab === 'devices'
              ? 'bg-white text-emerald-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>HP Terdaftar</span>
        </button>
      </div>

      {/* SUB TAB 1: CREATE INVITATIONS */}
      {activeSubTab === 'invite' && (
        <div className="space-y-4">
          {/* Create Invite Form */}
          <form onSubmit={handleCreateInvite} className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-emerald-600" />
              <span>Buat Undangan Anggota Keluarga</span>
            </h3>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Peran Anggota Keluarga (Role)
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as FamilyRole)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Father">Ayah / Kepala Keluarga</option>
                <option value="Mother">Ibu / Pengelola Keluarga</option>
                <option value="Child">Anak / Pelajar</option>
                <option value="Grandparent">Kakek / Nenek</option>
                <option value="Guardian">Wali / Pengasuh</option>
                <option value="Guest">Tamu Sementara</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Email Penerima (Opsional)
              </label>
              <input
                type="email"
                placeholder="anak@keluarga.com"
                value={inviteeEmail}
                onChange={(e) => setInviteeEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-700 text-white text-xs font-extrabold rounded-2xl shadow-md hover:bg-emerald-800 active:scale-98 transition flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Generate Kode & QR Undangan</span>
            </button>
          </form>

          {/* Active Invitations List */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider px-1">
              Daftar Undangan Aktif ({invitations.length})
            </h4>

            {invitations.length === 0 ? (
              <div className="text-center py-6 bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
                Belum ada kode undangan aktif.
              </div>
            ) : (
              invitations.map((inv) => (
                <div key={inv.id} className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-extrabold">
                        Role: {inv.role}
                      </span>
                      <h4 className="text-sm font-black text-slate-900 mt-1 font-mono tracking-wider">
                        {inv.code}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopy(inv.code, inv.id)}
                        className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                        title="Salin Kode"
                      >
                        {copiedId === inv.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => revokeInvitation(inv.id)}
                        className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                        title="Batalkan Undangan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* QR Code & Link Card */}
                  <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-200">
                        <QrCode className="w-7 h-7 text-slate-800" />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Tautan Gabung</p>
                        <p className="text-xs text-slate-700 font-mono font-bold truncate max-w-[180px]">
                          {inv.link}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopy(inv.link, `${inv.id}_link`)}
                      className="text-xs font-bold text-emerald-700 flex items-center gap-1 hover:underline"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Bagi</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* SUB TAB 2: JOIN FAMILY WORKSPACE */}
      {activeSubTab === 'join' && (
        <form onSubmit={handleJoinFamily} className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="text-center space-y-1">
            <div className="mx-auto w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-900">Bergabung dengan HP Anda</h3>
            <p className="text-xs text-slate-500">
              Masukkan kode 6-digit atau scan QR Code yang dibagikan oleh Kepala Keluarga.
            </p>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Kode Undangan</label>
            <input
              type="text"
              placeholder="Contoh: FAI-9921-CHI"
              value={joinCodeInput}
              onChange={(e) => setJoinCodeInput(e.target.value.toUpperCase())}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono font-black text-slate-900 uppercase tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Nama Lengkap</label>
              <input
                type="text"
                placeholder="Rizky Hendra"
                value={joinNameInput}
                onChange={(e) => setJoinNameInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Peran Saya</label>
              <select
                value={joinRoleInput}
                onChange={(e) => setJoinRoleInput(e.target.value as FamilyRole)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Child">Anak / Pelajar</option>
                <option value="Father">Ayah</option>
                <option value="Mother">Ibu</option>
                <option value="Grandparent">Kakek / Nenek</option>
                <option value="Guardian">Wali</option>
              </select>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-900 font-medium">
                <strong>Persetujuan Lokasi (Consent):</strong> Lokasi Anda hanya dibagikan secara terbuka kepada anggota keluarga dalam grup ini. Anda dapat menghentikan berbagi lokasi kapan saja di pengaturan privasi.
              </p>
            </div>

            <label className="flex items-center gap-2 pt-1 border-t border-amber-200/60 cursor-pointer">
              <input
                type="checkbox"
                checked={consentCheck}
                onChange={(e) => setConsentCheck(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
              <span className="text-xs font-bold text-amber-950">
                Saya mengerti & menyetujui berbagi lokasi
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-700 text-white text-xs font-black rounded-2xl shadow-md hover:bg-emerald-800 active:scale-98 transition flex items-center justify-center gap-2"
          >
            <span>Proses & Bergabung</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* SUB TAB 3: REGISTERED DEVICES */}
      {activeSubTab === 'devices' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider px-1">
              Perangkat HP Terdaftar ({registeredDevices.length})
            </h4>

            <button
              onClick={() => registerCurrentDevice('usr_fai_me', 'Bapak Hendra')}
              className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1 hover:bg-emerald-100 transition"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Daftarkan HP Ini</span>
            </button>
          </div>

          {registeredDevices.map((dev) => (
            <div key={dev.id} className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-slate-100 text-slate-800 font-bold">
                    <Smartphone className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">{dev.deviceName}</h4>
                    <p className="text-[10px] text-slate-500">
                      Milik: <strong>{dev.memberName}</strong> • {dev.operatingSystem}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-extrabold">
                  {dev.pwaStatus}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center text-[10px]">
                <div className="bg-slate-50 p-1.5 rounded-xl">
                  <span className="text-slate-400 block font-bold">Baterai</span>
                  <span className="font-extrabold text-slate-800 flex items-center justify-center gap-1">
                    <BatteryCharging className="w-3 h-3 text-emerald-600" />
                    {dev.batteryLevel}%
                  </span>
                </div>

                <div className="bg-slate-50 p-1.5 rounded-xl">
                  <span className="text-slate-400 block font-bold">Koneksi</span>
                  <span className="font-extrabold text-slate-800 flex items-center justify-center gap-1">
                    <Wifi className="w-3 h-3 text-blue-600" />
                    {dev.networkStatus}
                  </span>
                </div>

                <div className="bg-slate-50 p-1.5 rounded-xl">
                  <span className="text-slate-400 block font-bold">Push FCM</span>
                  <span className="font-extrabold text-emerald-700 truncate block">
                    Aktif
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
