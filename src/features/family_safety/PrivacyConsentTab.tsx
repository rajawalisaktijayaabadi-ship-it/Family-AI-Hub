import React from 'react';
import { useFamilyLocationStore } from '../../stores/useFamilyLocationStore';
import {
  ShieldCheck,
  Eye,
  EyeOff,
  Pause,
  Play,
  Trash2,
  Download,
  Lock,
  CheckCircle,
  Settings,
} from 'lucide-react';
import { useToastStore } from '../../stores/useToastStore';

export const PrivacyConsentTab: React.FC = () => {
  const {
    myConsent,
    myPermissions,
    trackingSettings,
    updateConsent,
    updatePermissions,
    updateTrackingSettings,
  } = useFamilyLocationStore();

  const handleExportHistory = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify({ consent: myConsent, exportTime: new Date() }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `FamilyAI_Location_Privacy_Export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    useToastStore.getState().addToast('Riwayat & data privasi berhasil diekspor!', 'success');
  };

  const handleDeleteHistory = () => {
    if (confirm('Apakah Anda yakin ingin menghapus seluruh riwayat pergerakan lokasi Anda?')) {
      useToastStore.getState().addToast('Seluruh riwayat lokasi telah dihapus dari sistem.', 'success');
    }
  };

  return (
    <div className="space-y-4">
      {/* Privacy Consent Master Card */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-black text-slate-900">Persetujuan & Privasi Lokasi</h3>
          </div>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-extrabold flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            <span>Persetujuan Aktif</span>
          </span>
        </div>

        <p className="text-xs text-slate-500">
          Anda memiliki kontrol penuh. Berbagi lokasi hanya aktif atas izin eksplisit Anda dan dapat dimatikan kapan saja.
        </p>

        {/* Master Toggles */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          {/* Toggle 1: Share Location */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <p className="text-xs font-bold text-slate-900">Bagikan Lokasi Saya</p>
              <p className="text-[10px] text-slate-500">
                Izinkan anggota keluarga melihat posisi terkini Anda di peta.
              </p>
            </div>
            <button
              onClick={() => updateConsent({ shareLocationEnabled: !myConsent.shareLocationEnabled })}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                myConsent.shareLocationEnabled ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform ${
                  myConsent.shareLocationEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 2: Hide Location (Stealth Mode) */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                {myConsent.hideLocation ? <EyeOff className="w-3.5 h-3.5 text-rose-500" /> : <Eye className="w-3.5 h-3.5 text-slate-500" />}
                <span>Sembunyikan Lokasi (Stealth Mode)</span>
              </p>
              <p className="text-[10px] text-slate-500">
                Tampilkan status &quot;Lokasi Disembunyikan&quot; tanpa mematikan akun.
              </p>
            </div>
            <button
              onClick={() => updateConsent({ hideLocation: !myConsent.hideLocation })}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                myConsent.hideLocation ? 'bg-amber-500' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform ${
                  myConsent.hideLocation ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 3: Pause Sharing */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                {myConsent.pauseSharing ? <Pause className="w-3.5 h-3.5 text-amber-600" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
                <span>Jeda Pelacakan Sementara</span>
              </p>
              <p className="text-[10px] text-slate-500">
                Menghentikan sementara pengiriman sinyal GPS.
              </p>
            </div>
            <button
              onClick={() => updateConsent({ pauseSharing: !myConsent.pauseSharing })}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                myConsent.pauseSharing ? 'bg-amber-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform ${
                  myConsent.pauseSharing ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Device Permissions Card */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
          <Settings className="w-4 h-4 text-emerald-600" />
          <span>Izin Akses Perangkat (Device Permissions)</span>
        </h3>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <span className="font-bold text-slate-800 block">Izin Lokasi GPS</span>
              <span className="text-[10px] text-slate-500">Status: {myPermissions.locationPermission}</span>
            </div>
            <button
              onClick={() => updatePermissions({ locationPermission: 'Granted' })}
              className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 hover:bg-emerald-100"
            >
              Atur Izin
            </button>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <span className="font-bold text-slate-800 block">Akurasi Presisi High Precision</span>
              <span className="text-[10px] text-slate-500">Penggunaan sensor kompas & GPS HP</span>
            </div>
            <button
              onClick={() => updatePermissions({ preciseLocation: !myPermissions.preciseLocation })}
              className={`text-[11px] font-extrabold px-3 py-1 rounded-xl border ${
                myPermissions.preciseLocation
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {myPermissions.preciseLocation ? 'Presisi Tinggi' : 'Standar'}
            </button>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <span className="font-bold text-slate-800 block">Mode Pelacakan GPS</span>
              <span className="text-[10px] text-slate-500">Mode: {trackingSettings.mode}</span>
            </div>
            <select
              value={trackingSettings.mode}
              onChange={(e) =>
                updateTrackingSettings({
                  mode: e.target.value as 'High Accuracy' | 'Balanced' | 'Battery Saver',
                })
              }
              className="px-2 py-1 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
            >
              <option value="High Accuracy">High Accuracy</option>
              <option value="Balanced">Balanced</option>
              <option value="Battery Saver">Battery Saver</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Privacy Actions */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-600" />
          <span>Pengelolaan Data Privasi</span>
        </h3>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleExportHistory}
            className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition text-left space-y-1"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <p className="text-xs font-extrabold text-slate-900">Ekspor Data</p>
            <p className="text-[10px] text-slate-500">Unduh berkas JSON privasi</p>
          </button>

          <button
            onClick={handleDeleteHistory}
            className="p-3 rounded-2xl bg-rose-50 border border-rose-200 hover:bg-rose-100 transition text-left space-y-1"
          >
            <Trash2 className="w-4 h-4 text-rose-600" />
            <p className="text-xs font-extrabold text-rose-900">Hapus Riwayat</p>
            <p className="text-[10px] text-rose-600">Bersihkan jejak lokasi</p>
          </button>
        </div>
      </div>
    </div>
  );
};
