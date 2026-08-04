import React, { useState, useEffect } from 'react';
import { Download, RefreshCw, WifiOff, X, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export const PWAInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      alert('Untuk menginstal FamilyAI Hub: Buka menu browser Anda dan pilih "Tambah ke Layar Utama" / "Add to Home Screen".');
    }
  };

  if (isDismissed) return null;

  return (
    <div className="mx-4 my-2 p-3.5 glass-card rounded-2xl border border-teal-500/30 flex items-center justify-between gap-3 shadow-lg animate-slide-up">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold font-heading text-slate-900 dark:text-white">
            Pasang Aplikasi FamilyAI Hub
          </h4>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">
            Akses lebih cepat & dapat digunakan secara luring (PWA).
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <Button
          size="sm"
          variant="gradient"
          leftIcon={<Download className="w-3.5 h-3.5" />}
          onClick={handleInstall}
          className="text-xs px-3 py-1.5 min-h-[36px]"
        >
          Pasang
        </Button>
        <button
          onClick={() => setIsDismissed(true)}
          className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const PWAUpdateBanner: React.FC<{ onUpdate?: () => void }> = ({ onUpdate }) => {
  const [showUpdate, setShowUpdate] = useState(false);

  return showUpdate ? (
    <div className="mx-4 my-2 p-3 bg-blue-600 text-white rounded-2xl flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2 text-xs font-semibold">
        <RefreshCw className="w-4 h-4 animate-spin" />
        <span>Versi baru FamilyAI Hub tersedia!</span>
      </div>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => {
          if (onUpdate) onUpdate();
          window.location.reload();
        }}
        className="text-xs py-1 px-3 min-h-[32px]"
      >
        Perbarui
      </Button>
    </div>
  ) : null;
};

export const PWAOfflineBanner: React.FC = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="bg-amber-500 text-slate-950 font-semibold px-4 py-1.5 text-center text-[11px] flex items-center justify-center gap-2 shadow-sm animate-fade-in">
      <WifiOff className="w-3.5 h-3.5" />
      <span>Mode Luring Aktif — Menggunakan data lokal (IndexedDB / LocalStorage)</span>
    </div>
  );
};
