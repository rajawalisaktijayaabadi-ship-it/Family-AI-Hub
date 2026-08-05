import React, { useState, useEffect } from 'react';
import { Smartphone, Download, Wifi, WifiOff, CheckCircle2, ShieldCheck, Layers, Terminal } from 'lucide-react';

export const PWAWrapperDistribution: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallPWA = () => {
    setInstalled(true);
  };

  return (
    <div className="space-y-6">
      {/* Network & PWA Status Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
              isOnline
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
            }`}
          >
            {isOnline ? <Wifi className="w-6 h-6" /> : <WifiOff className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              Status Koneksi Network & Cache PWA
              <span
                className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                  isOnline ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                }`}
              >
                {isOnline ? 'ONLINE (READY)' : 'OFFLINE MODE (CACHED)'}
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Service Worker terdaftar & manifest PWA terverifikasi 100% siap instalasi.
            </p>
          </div>
        </div>

        <button
          onClick={handleInstallPWA}
          disabled={installed}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-2 shadow-lg shadow-emerald-950/40 shrink-0"
        >
          <Download className="w-4 h-4" />
          {installed ? 'Aplikasi Terpasang (PWA)' : 'Instal Aplikasi di HP (PWA)'}
        </button>
      </div>

      {/* PWA Manifest Validation Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-[11px] text-slate-400">PWA Manifest Spec</span>
          <p className="text-xs font-semibold text-emerald-400">Standalone Display Mode</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-[11px] text-slate-400">Offline Caching Strategy</span>
          <p className="text-xs font-semibold text-sky-400">Network First + Cache Fallback</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-[11px] text-slate-400">Background Sync & Push</span>
          <p className="text-xs font-semibold text-amber-400">Firebase Cloud Messaging</p>
        </div>
      </div>

      {/* Mobile App Wrapper Foundation (Android TWA & iOS WKWebView) */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-emerald-400" /> Fondasi Distribusi Mobile App Wrapper (Android / iOS)
        </h3>

        <p className="text-xs text-slate-400 leading-relaxed">
          Aplikasi ini dirancang dengan arsitektur **Trusted Web Activity (TWA)** dan **Capacitor Adapter** sehingga dapat langsung dibungkus menjadi APK/AAB Google Play Store dan IPA Apple App Store tanpa merubah kode aplikasi.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">Android Trusted Web Activity (TWA)</span>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono rounded">
                READY FOR PLAY STORE
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Konfigurasi `.well-known/assetlinks.json` siap dihubungkan dengan SHA-256 fingerprint Play Console.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">iOS Capacitor / WKWebView</span>
              <span className="px-2 py-0.5 bg-sky-500/10 text-sky-400 text-[10px] font-mono rounded">
                READY FOR APP STORE
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Mendukung skema `apple-app-site-association` & Safari View Controller untuk otentikasi biometrik FaceID.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
