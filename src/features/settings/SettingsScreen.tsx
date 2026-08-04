import React, { useState } from 'react';
import { useTheme } from '../../providers/ThemeProvider';
import { useLanguage } from '../../providers/LanguageProvider';
import {
  Moon,
  Sun,
  Globe,
  Bell,
  ShieldCheck,
  Lock,
  Eye,
  Camera,
  Mic,
  MapPin,
  Laptop,
  HelpCircle,
  ArrowLeft,
  Smartphone,
  Check,
  Sparkles,
  ChevronRight,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { useSettingsStore } from '../../stores/useSettingsStore';
import { useToastStore } from '../../stores/useToastStore';
import { DeviceManagementModal } from './DeviceManagementModal';
import { HelpCenterModal } from './HelpCenterModal';

interface SettingsScreenProps {
  onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const { theme, setTheme, isDark } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { settings, updateNotification, updatePrivacy, updateSecurity } = useSettingsStore();
  const { addToast } = useToastStore();

  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // PIN modal simulation
  const [pinInput, setPinInput] = useState('');
  const [showPinSetup, setShowPinSetup] = useState(false);

  const handleTogglePin = () => {
    if (settings.security.pinEnabled) {
      updateSecurity('pinEnabled', false);
      addToast('Keamanan Kode PIN dinonaktifkan', 'info');
    } else {
      setShowPinSetup(true);
    }
  };

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.length < 4) {
      addToast('Kode PIN minimal 4 digit angka', 'warning');
      return;
    }
    updateSecurity('pinEnabled', true);
    updateSecurity('pinCode', pinInput);
    addToast('Kode PIN Keamanan berhasil diaktifkan!', 'success');
    setShowPinSetup(false);
    setPinInput('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-28 pt-2 px-4 space-y-5 max-w-xl mx-auto font-sans">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition shadow-xs"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-extrabold text-slate-800 dark:text-slate-100">
            Pengaturan Mobile Hub
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Personalisasi tema, notifikasi, privasi, dan keamanan
          </p>
        </div>
      </div>

      {/* General Settings: Theme & Language */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          {isDark ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Tampilan & Bahasa (General)
          </h2>
        </div>

        {/* Theme Switcher */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
            Mode Tema Tampilan:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'light', label: 'Terang', icon: Sun },
              { id: 'dark', label: 'Gelap', icon: Moon },
              { id: 'system', label: 'Sistem', icon: Smartphone },
            ].map((mode) => {
              const Icon = mode.icon;
              const active = theme === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setTheme(mode.id as any)}
                  className={`p-2.5 rounded-2xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    active
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Language Switcher */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
            Bahasa Aplikasi (Language):
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
              { id: 'en', label: 'English (US)', flag: '🇺🇸' },
            ].map((lang) => {
              const active = language === lang.id;
              return (
                <button
                  key={lang.id}
                  onClick={() => setLanguage(lang.id as any)}
                  className={`p-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all ${
                    active
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span className="truncate">{lang.label}</span>
                  </span>
                  {active && <Check className="w-4 h-4 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Notification Matrix Section */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <Bell className="w-4 h-4 text-indigo-500" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Pengaturan Notifikasi (Notification Matrix)
          </h2>
        </div>

        <div className="space-y-2 text-xs">
          {[
            { key: 'push', title: 'Notifikasi Push Mobile', desc: 'Pemberitahuan langsung di layar HP' },
            { key: 'email', title: 'Notifikasi Ringkasan Email', desc: 'Ringkasan mingguan aktivitas keluarga' },
            { key: 'aiReminder', title: 'Pengingat Otomatis AI', desc: 'Rekomendasi asisten AI harian' },
            { key: 'calendar', title: 'Notifikasi Agenda Kalender', desc: 'Jadwal kumpul, les anak, dan ultah' },
            { key: 'health', title: 'Notifikasi Kesehatan', desc: 'Pengingat obat & cek kesehatan' },
            { key: 'finance', title: 'Notifikasi Keuangan', desc: 'Laporan anggaran & pengeluaran' },
            { key: 'education', title: 'Notifikasi Pendidikan', desc: 'Tugas sekolah & perkembangan anak' },
            { key: 'family', title: 'Notifikasi Aktivitas Keluarga', desc: 'Pemberitahuan dari anggota keluarga' },
          ].map((item) => {
            const isChecked = (settings.notification as any)[item.key];

            return (
              <div
                key={item.key}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800"
              >
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-100 block">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    {item.desc}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => updateNotification(item.key as any, e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Privacy Permissions Section */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <Eye className="w-4 h-4 text-purple-500" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Izin & Kontrol Privasi (Privacy Settings)
          </h2>
        </div>

        <div className="space-y-3 text-xs">
          {/* Profile Visibility */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700 dark:text-slate-300">
              Visibilitas Profil Pengguna:
            </label>
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) => updatePrivacy('profileVisibility', e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
            >
              <option value="public">Publik (Dapat dicari)</option>
              <option value="family">Khusus Anggota Workspace Keluarga</option>
              <option value="private">Pribadi (Terselubung)</option>
            </select>
          </div>

          {/* Device Hardware Permissions */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
              <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-500" />
                Izin Akses Lokasi (Safe Zone)
              </span>
              <input
                type="checkbox"
                checked={settings.privacy.locationPermission}
                onChange={(e) => updatePrivacy('locationPermission', e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
              <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Camera className="w-4 h-4 text-indigo-500" />
                Izin Akses Kamera (Unggah Foto / QR)
              </span>
              <input
                type="checkbox"
                checked={settings.privacy.cameraPermission}
                onChange={(e) => updatePrivacy('cameraPermission', e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
              <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Mic className="w-4 h-4 text-indigo-500" />
                Izin Akses Mikrofon (Perintah Suara AI)
              </span>
              <input
                type="checkbox"
                checked={settings.privacy.microphonePermission}
                onChange={(e) => updatePrivacy('microphonePermission', e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Security & PIN / Biometric Settings */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Keamanan Akun (Security Settings)
          </h2>
        </div>

        <div className="space-y-3 text-xs">
          {/* PIN Toggle */}
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-100 block">
                Kode PIN Keamanan Tambahan
              </span>
              <span className="text-[10px] text-slate-500">
                {settings.security.pinEnabled ? 'PIN Aktif' : 'Minta PIN saat membuka data sensitif'}
              </span>
            </div>
            <button
              onClick={handleTogglePin}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                settings.security.pinEnabled
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {settings.security.pinEnabled ? 'Aktif' : 'Atur PIN'}
            </button>
          </div>

          {/* PIN Setup Modal Form */}
          {showPinSetup && (
            <form onSubmit={handleSavePin} className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl space-y-2 border border-indigo-200 dark:border-indigo-800">
              <label className="font-bold text-slate-800 dark:text-slate-200">
                Ketik Kode PIN 4-6 Digit:
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  maxLength={6}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="••••"
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm tracking-widest font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl"
                >
                  Simpan
                </button>
              </div>
            </form>
          )}

          {/* Biometric Toggle */}
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-100 block">
                Autentikasi Biometrik (Fingerprint / Face ID)
              </span>
              <span className="text-[10px] text-slate-500">
                Akses cepat via sensor biometrik HP
              </span>
            </div>
            <input
              type="checkbox"
              checked={settings.security.biometricEnabled}
              onChange={(e) => updateSecurity('biometricEnabled', e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded"
            />
          </div>

          {/* Session Timeout */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              Batas Waktu Sesi (Session Timeout):
            </label>
            <select
              value={settings.security.sessionTimeoutMinutes}
              onChange={(e) => updateSecurity('sessionTimeoutMinutes', Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
            >
              <option value={15}>15 Menit</option>
              <option value={30}>30 Menit (Rekomendasi)</option>
              <option value={60}>1 Jam</option>
              <option value={0}>Tidak Pernah Timeout</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards for Devices & Help Center */}
      <div className="space-y-2">
        <button
          onClick={() => setIsDeviceModalOpen(true)}
          className="w-full p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-indigo-300 transition-all flex items-center justify-between text-xs"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <Laptop className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="font-bold text-slate-800 dark:text-slate-100 block">
                Kelola Perangkat Terhubung
              </span>
              <span className="text-[10px] text-slate-500">
                Lihat HP, Tablet, Laptop yang sedang login
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => setIsHelpModalOpen(true)}
          className="w-full p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-indigo-300 transition-all flex items-center justify-between text-xs"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-50 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-xl">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="font-bold text-slate-800 dark:text-slate-100 block">
                Pusat Bantuan & Lapor Bug
              </span>
              <span className="text-[10px] text-slate-500">
                FAQ, Hubungi CS, Laporan Kendala & Ulasan
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* About App Footnote */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 text-center space-y-1">
        <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-xs font-bold mx-auto">
          FAI
        </div>
        <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
          FamilyAI Hub Indonesia
        </p>
        <p className="text-[10px] text-slate-400">
          Mobile Web Edition v3.0.0 (Prompt 3 — User & Workspace Edition)
        </p>
      </div>

      {/* Modals */}
      <DeviceManagementModal
        isOpen={isDeviceModalOpen}
        onClose={() => setIsDeviceModalOpen(false)}
      />
      <HelpCenterModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </div>
  );
};
