import React, { useState } from 'react';
import { useSecurityDevOpsStore } from '../../stores/useSecurityDevOpsStore';
import { SecurityService } from '../../services/security/SecurityService';
import { ShieldCheck, Download, Trash2, CheckCircle2, AlertTriangle, FileText, Lock, Eye, EyeOff } from 'lucide-react';

export const PrivacyConsentTab: React.FC = () => {
  const { consent, updateConsent, addAuditLog } = useSecurityDevOpsStore();
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showKtp, setShowKtp] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteDone, setDeleteDone] = useState(false);

  const securityService = SecurityService.getInstance();
  const dummyKtp = '3174051208920001';
  const dummyPhone = '081298765432';

  const handleExportData = () => {
    const jsonStr = securityService.generatePDPDataExport('usr_owner_01', {
      workspaceName: 'Keluarga Utama Budi Santoso',
      plan: 'Enterprise Family Pro',
      registeredMembers: 4,
    });

    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FamilyAI_PDP_Data_Export_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
    addAuditLog('EXPORT_PDP_DATA', 'PrivacyConsentTab', 'success', 'Pengguna mengunduh data portabilitas UU PDP No. 27/2022.');
  };

  const handleDeleteAccountData = () => {
    setDeleteDone(true);
    setShowConfirmDelete(false);
    addAuditLog('RIGHT_TO_BE_FORGOTTEN_REQ', 'PrivacyConsentTab', 'warning', 'Permintaan pengapusan permanen data pengguna (UU PDP Pasal 8) telah diajukan.');
  };

  return (
    <div className="space-y-6">
      {/* PDP Law Compliance Banner */}
      <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-start gap-3">
        <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-emerald-300">Kepatuhan UU Pelindungan Data Pribadi (UU PDP No. 27/2022)</h4>
          <p className="text-xs text-emerald-200/80 mt-1">
            FamilyAI Hub Indonesia menjamin hak akses, pembetulan, pengakhiran pemrosesan, dan portabilitas data keluarga Anda sesuai regulasi Republik Indonesia.
          </p>
        </div>
      </div>

      {/* Consent Switchboard */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-400" /> Pengaturan Izin & Persetujuan Data (Consent Control)
        </h3>

        <div className="divide-y divide-slate-800/60">
          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-200">AI Context & Memory Sharing</p>
              <p className="text-[11px] text-slate-400">Izinkan AI mempelajari preferensi & riwayat keluarga untuk rekomendasi presisi</p>
            </div>
            <input
              type="checkbox"
              checked={consent.aiDataSharingConsent}
              onChange={(e) => updateConsent('aiDataSharingConsent', e.target.checked)}
              className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
            />
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-200">Layanan Lokasi & Maps Integrasi</p>
              <p className="text-[11px] text-slate-400">Diperlukan untuk fitur peta BMKG, cuaca darurat, dan peringatan bencana lokal</p>
            </div>
            <input
              type="checkbox"
              checked={consent.locationTrackingConsent}
              onChange={(e) => updateConsent('locationTrackingConsent', e.target.checked)}
              className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
            />
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-200">Telemetri & Analistik Penggunaan</p>
              <p className="text-[11px] text-slate-400">Membantu peningkatan performa sistem secara anonim</p>
            </div>
            <input
              type="checkbox"
              checked={consent.analyticsConsent}
              onChange={(e) => updateConsent('analyticsConsent', e.target.checked)}
              className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
            />
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-200">Komunikasi Marketing & Info Promo</p>
              <p className="text-[11px] text-slate-400">Info fitur terbaru & diskon langganan via WhatsApp / Email</p>
            </div>
            <input
              type="checkbox"
              checked={consent.marketingConsent}
              onChange={(e) => updateConsent('marketingConsent', e.target.checked)}
              className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
            />
          </div>
        </div>

        <div className="pt-2 text-[11px] text-slate-500 flex justify-between">
          <span>IP Akses Terakhir: {consent.ipAddress}</span>
          <span>Pembaruan: {new Date(consent.lastUpdated).toLocaleDateString('id-ID')}</span>
        </div>
      </div>

      {/* Field Level Masking & Encryption Inspector */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <Eye className="w-4 h-4 text-emerald-400" /> Penyamaran & Enkripsi Data Sensitif (Field-Level Encryption)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400">NIK KTP Kepala Keluarga</span>
            <div className="flex items-center justify-between text-xs text-slate-200 font-mono">
              <span>{showKtp ? dummyKtp : securityService.maskSensitiveData(dummyKtp, 'ktp')}</span>
              <button
                onClick={() => setShowKtp(!showKtp)}
                className="text-slate-400 hover:text-slate-200 p-1 rounded"
              >
                {showKtp ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400">Nomor Kontak WhatsApp Utama</span>
            <div className="text-xs text-slate-200 font-mono">
              {securityService.maskSensitiveData(dummyPhone, 'phone')}
            </div>
          </div>
        </div>
      </div>

      {/* PDP User Rights Actions */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-400" /> Hak Subjek Data (Pasal 8 & 11 UU PDP)
        </h3>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleExportData}
            className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-medium text-slate-200 flex items-center justify-center gap-2 transition"
          >
            <Download className="w-4 h-4 text-emerald-400" /> Unduh Portabilitas Data (JSON)
          </button>

          <button
            onClick={() => setShowConfirmDelete(true)}
            className="flex-1 py-2.5 px-4 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-xl text-xs font-medium text-rose-300 flex items-center justify-center gap-2 transition"
          >
            <Trash2 className="w-4 h-4 text-rose-400" /> Minta Penghapusan Data (Right to be Forgotten)
          </button>
        </div>

        {downloadSuccess && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" /> Berkas arsip portabilitas data UU PDP berhasil dibuat & diunduh.
          </div>
        )}

        {deleteDone && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" /> Permohonan hapus data dicatat. Tim DPO (Data Protection Officer) akan memproses dalam 3x24 jam.
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-base font-semibold text-slate-100 text-center">Konfirmasi Penghapusan Data Permanen</h3>
            <p className="text-xs text-slate-400 text-center leading-relaxed">
              Sesuai Pasal 8 UU PDP, Anda berhak meminta pengakhiran pemrosesan & penghapusan data akun Anda. Seluruh riwayat AI, memori keluarga, dan data transaksi akan dihapus secara permanen.
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl transition"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteAccountData}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition shadow-lg shadow-rose-950/50"
              >
                Ya, Hapus Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
