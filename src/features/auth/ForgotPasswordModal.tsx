import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { Mail, CheckCircle2, X } from 'lucide-react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await resetPassword(email);
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-sm shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
              Reset Kata Sandi
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Masukkan alamat email terdaftar untuk menerima tautan pemulihan kata sandi.
            </p>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Alamat Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@keluarga.id"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs rounded-2xl shadow-lg shadow-blue-500/20 active-press transition"
            >
              {loading ? 'Sending...' : 'Kirim Link Reset'}
            </button>
          </form>
        ) : (
          <div className="text-center py-4 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-teal-500 mx-auto animate-bounce" />
            <h4 className="text-sm font-bold font-heading text-slate-900 dark:text-white">
              Link Terkirim!
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Periksa kotak masuk email <span className="font-semibold text-slate-700 dark:text-slate-200">{email}</span> untuk instruksi selanjutnya.
            </p>
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-2xl"
            >
              Kembali ke Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
