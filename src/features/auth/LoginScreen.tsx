import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { useLanguage } from '../../providers/LanguageProvider';
import { Mail, Lock, LogIn, Sparkles, Eye, EyeOff, UserCheck, Shield } from 'lucide-react';

interface LoginScreenProps {
  onGoToRegister: () => void;
  onOpenForgotPassword: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onGoToRegister,
  onOpenForgotPassword,
}) => {
  const { loginWithEmail, loginWithGoogle, loginAsGuest, loginWithApple, isLoading, setRememberMe, rememberMe } = useAuth();
  const { t } = useLanguage();

  const [email, setEmail] = useState('keluarga.pratama@familyai.id');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Harap isi alamat email dan kata sandi.');
      return;
    }
    setErrorMsg(null);
    try {
      await loginWithEmail(email, password, rememberMe);
    } catch {
      setErrorMsg('Gagal masuk. Periksa email atau kata sandi Anda.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between p-6 font-sans relative overflow-x-hidden">
      {/* Top Header */}
      <div className="pt-4 flex flex-col items-center text-center">
        <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-teal-400 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-3">
          <Sparkles className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
          FamilyAI Hub Indonesia
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Masuk ke Ekosistem Cerdas Keluarga Anda
        </p>
      </div>

      {/* Main Login Form Box */}
      <div className="my-auto py-6">
        <form onSubmit={handleSubmit} className="glass-card p-6 rounded-3xl space-y-4">
          <h2 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-2">
            {t('login')}
          </h2>

          {errorMsg && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs rounded-xl font-medium">
              {errorMsg}
            </div>
          )}

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
                className="w-full pl-10 pr-4 py-3 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {t('password')}
              </label>
              <button
                type="button"
                onClick={onOpenForgotPassword}
                className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                {t('forgotPassword')}
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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

          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
            <label htmlFor="rememberMe" className="text-xs text-slate-600 dark:text-slate-400 font-medium select-none">
              {t('rememberMe')} (Auto Login)
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-2xl shadow-lg shadow-blue-500/25 transition active-press flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? (
              <span className="animate-pulse">Memproses...</span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>{t('login')}</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-semibold">
              <span className="bg-white dark:bg-slate-900 px-2 text-slate-400">
                {t('orContinueWith')}
              </span>
            </div>
          </div>

          {/* Social Auth Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={loginWithGoogle}
              className="py-2.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-2xl border border-slate-200 dark:border-slate-700 transition active-press flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={loginWithApple}
              className="py-2.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-2xl border border-slate-200 dark:border-slate-700 transition active-press flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-slate-800 dark:text-slate-200" />
              <span>Apple</span>
            </button>
          </div>

          {/* Guest Login */}
          <button
            type="button"
            onClick={loginAsGuest}
            className="w-full py-2.5 px-3 bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30 font-semibold text-xs rounded-2xl transition active-press flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>{t('anonymousLogin')}</span>
          </button>
        </form>
      </div>

      {/* Footer Go to Register Link */}
      <div className="text-center pb-4">
        <p className="text-xs text-slate-600 dark:text-slate-400">
          {t('dontHaveAccount')}{' '}
          <button
            onClick={onGoToRegister}
            className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            {t('registerNow')}
          </button>
        </p>
      </div>
    </div>
  );
};
