import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { useLanguage } from '../../providers/LanguageProvider';
import { User, Users, Mail, Lock, UserPlus, Sparkles, Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface RegisterScreenProps {
  onGoToLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onGoToLogin }) => {
  const { registerWithEmail, isLoading } = useAuth();
  const { t } = useLanguage();

  const [fullName, setFullName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !familyName || !email || !password || !confirmPassword) {
      setErrorMsg('Harap lengkapi semua data pendaftaran.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Kata sandi dan konfirmasi kata sandi tidak cocok.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Kata sandi minimal 6 karakter.');
      return;
    }

    setErrorMsg(null);
    try {
      await registerWithEmail(fullName, familyName, email, password);
    } catch {
      setErrorMsg('Gagal membuat akun. Silakan coba lagi.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between p-6 font-sans relative overflow-x-hidden">
      {/* Top Header */}
      <div className="pt-2 flex items-center justify-between">
        <button
          onClick={onGoToLogin}
          className="p-2 rounded-full bg-slate-200/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-xs font-bold font-heading text-blue-600 dark:text-blue-400 flex items-center gap-1">
          <Sparkles className="w-4 h-4" /> FamilyAI Hub
        </span>
      </div>

      {/* Main Register Form Box */}
      <div className="my-auto py-4">
        <form onSubmit={handleSubmit} className="glass-card p-6 rounded-3xl space-y-3">
          <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
            {t('register')} Akun Keluarga
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Daftarkan keluarga Anda untuk memulai pengalaman AI cerdas
          </p>

          {errorMsg && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs rounded-xl font-medium">
              {errorMsg}
            </div>
          )}

          {/* Full Name Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {t('fullName')}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Contoh: Budi Pratama"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Family Name Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {t('familyName')}
            </label>
            <div className="relative">
              <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                placeholder="Contoh: Keluarga Pratama"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {t('email')}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@keluarga.id"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {t('password')}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {t('confirmPassword')}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi kata sandi"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-bold text-xs rounded-2xl shadow-lg shadow-blue-500/25 transition active-press flex items-center justify-center gap-2 pt-3"
          >
            {isLoading ? (
              <span className="animate-pulse">Mendaftarkan Akun...</span>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Daftar Akun Keluarga</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer Back to Login */}
      <div className="text-center pb-2">
        <p className="text-xs text-slate-600 dark:text-slate-400">
          {t('alreadyHaveAccount')}{' '}
          <button
            onClick={onGoToLogin}
            className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            {t('loginNow')}
          </button>
        </p>
      </div>
    </div>
  );
};
