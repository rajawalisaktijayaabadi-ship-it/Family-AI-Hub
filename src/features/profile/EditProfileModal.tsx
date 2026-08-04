import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Camera,
  Crop,
  Lock,
  CheckCircle2,
  Calendar,
  Globe,
  UploadCloud,
  Check,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useUserStore } from '../../stores/useUserStore';
import { useToastStore } from '../../stores/useToastStore';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'biodata' | 'contact' | 'photos' | 'security';

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, updateBiodata, updateContactAndLocation, updatePhotos } = useUserStore();
  const { addToast } = useToastStore();

  const [activeTab, setActiveTab] = useState<TabType>('biodata');

  // Biodata State
  const [fullName, setFullName] = useState(user.fullName);
  const [nickname, setNickname] = useState(user.nickname);
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);
  const [gender, setGender] = useState<'pria' | 'wanita'>(user.gender);
  const [bio, setBio] = useState(user.bio);

  // Contact State
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [address, setAddress] = useState(user.address);
  const [province, setProvince] = useState(user.province);
  const [city, setCity] = useState(user.city);
  const [timezone, setTimezone] = useState(user.timezone);

  // Photos State
  const [avatarPreview, setAvatarPreview] = useState(user.photoURL);
  const [coverPreview, setCoverPreview] = useState(user.coverURL);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isCropping, setIsCropping] = useState(false);

  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  if (!isOpen) return null;

  const handleSaveBiodata = (e: React.FormEvent) => {
    e.preventDefault();
    updateBiodata({ fullName, nickname, dateOfBirth, gender, bio });
    addToast('Biodata berhasil diperbarui!', 'success');
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactAndLocation({ email, phoneNumber, address, province, city, timezone });
    addToast('Kontak & lokasi berhasil disimpan!', 'success');
  };

  const handleSimulateAvatarUpload = () => {
    setIsCompressing(true);
    setTimeout(() => {
      setIsCompressing(false);
      setIsCropping(true);
      setTimeout(() => {
        setIsCropping(false);
        const randomAvatars = [
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
        ];
        const newUrl = randomAvatars[Math.floor(Math.random() * randomAvatars.length)];
        setAvatarPreview(newUrl);
        updatePhotos(newUrl, undefined);
        addToast('Foto profil berhasil diproses, dicrop & diunggah!', 'success');
      }, 800);
    }, 600);
  };

  const handleSimulateCoverUpload = () => {
    setIsCompressing(true);
    setTimeout(() => {
      setIsCompressing(false);
      const randomCovers = [
        'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&auto=format&fit=crop&q=80',
      ];
      const newUrl = randomCovers[Math.floor(Math.random() * randomCovers.length)];
      setCoverPreview(newUrl);
      updatePhotos(undefined, newUrl);
      addToast('Sampul profil berhasil diperbarui!', 'success');
    }, 800);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      addToast('Masukkan kata sandi saat ini', 'error');
      return;
    }
    if (newPassword.length < 6) {
      addToast('Kata sandi baru minimal 6 karakter', 'warning');
      return;
    }
    if (newPassword !== confirmPassword) {
      addToast('Konfirmasi kata sandi tidak cocok', 'error');
      return;
    }
    addToast('Kata sandi berhasil diubah secara aman!', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col my-auto max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                <User className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Edit Profil Pengguna
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 px-4 pt-2 overflow-x-auto gap-2 scrollbar-none">
            {[
              { id: 'biodata', label: 'Biodata', icon: User },
              { id: 'contact', label: 'Kontak & Lokasi', icon: Mail },
              { id: 'photos', label: 'Foto & Sampul', icon: Camera },
              { id: 'security', label: 'Kata Sandi', icon: Lock },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-3 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 whitespace-nowrap ${
                    isActive
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 shadow-xs'
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Contents */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {/* Tab 1: Biodata */}
            {activeTab === 'biodata' && (
              <form onSubmit={handleSaveBiodata} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Nama Panggilan
                    </label>
                    <input
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Jenis Kelamin
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as 'pria' | 'wanita')}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    >
                      <option value="pria">Pria</option>
                      <option value="wanita">Wanita</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Bio Singkat
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden resize-none"
                    placeholder="Tulis sedikit tentang peran Anda dalam keluarga..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Simpan Perubahan Biodata
                </button>
              </form>
            )}

            {/* Tab 2: Contact & Location */}
            {activeTab === 'contact' && (
              <form onSubmit={handleSaveContact} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-indigo-500" />
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-indigo-500" />
                    Nomor Handphone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                    Alamat Rumah Lengkap
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Provinsi
                    </label>
                    <input
                      type="text"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Kota / Kabupaten
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-indigo-500" />
                    Zona Waktu
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  >
                    <option value="Asia/Jakarta (WIB)">Asia/Jakarta (WIB - UTC+7)</option>
                    <option value="Asia/Makassar (WITA)">Asia/Makassar (WITA - UTC+8)</option>
                    <option value="Asia/Jayapura (WIT)">Asia/Jayapura (WIT - UTC+9)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Simpan Kontak & Lokasi
                </button>
              </form>
            )}

            {/* Tab 3: Photos & Cover */}
            {activeTab === 'photos' && (
              <div className="space-y-6">
                {/* Cover Photo Update */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Foto Sampul Profil
                  </label>
                  <div className="relative h-32 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <img
                      src={coverPreview}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                      <button
                        onClick={handleSimulateCoverUpload}
                        disabled={isCompressing}
                        className="px-4 py-2 bg-white/90 dark:bg-slate-900/90 hover:bg-white text-slate-800 dark:text-slate-100 font-semibold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 backdrop-blur-md"
                      >
                        <UploadCloud className="w-4 h-4 text-indigo-600" />
                        Ganti Sampul
                      </button>
                    </div>
                  </div>
                </div>

                {/* Avatar Update */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Foto Avatar Utama
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-indigo-500 shadow-md">
                      <img
                        src={avatarPreview}
                        alt="Avatar Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <button
                        onClick={handleSimulateAvatarUpload}
                        disabled={isCompressing || isCropping}
                        className="w-full py-2.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 border border-indigo-200 dark:border-indigo-800"
                      >
                        <Camera className="w-4 h-4" />
                        Ambil Kamera / Unggah Galeri
                      </button>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                        <Crop className="w-3.5 h-3.5 text-indigo-500" />
                        Auto-crop & kompresi otomatis AI
                      </div>
                    </div>
                  </div>
                </div>

                {(isCompressing || isCropping) && (
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800/40 flex items-center gap-2 text-xs text-indigo-700 dark:text-indigo-300">
                    <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    {isCompressing
                      ? 'Mengompres gambar...'
                      : 'Memotong foto secara presisi...'}
                  </div>
                )}
              </div>
            )}

            {/* Tab 4: Security (Password Change) */}
            {activeTab === 'security' && (
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800/40 flex items-start gap-2.5">
                  <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                    Ubah kata sandi Anda secara berkala untuk perlindungan maksimal seluruh data keluarga.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Kata Sandi Saat Ini
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPass ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPass(!showCurrentPass)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Kata Sandi Baru
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimal 6 karakter"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Konfirmasi Kata Sandi Baru
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ketik ulang kata sandi baru"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Perbarui Kata Sandi
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
