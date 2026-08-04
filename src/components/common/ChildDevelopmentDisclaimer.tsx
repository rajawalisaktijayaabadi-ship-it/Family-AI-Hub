import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const ChildDevelopmentDisclaimer: React.FC = () => {
  return (
    <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-200 flex items-start gap-2 shadow-2xs">
      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
      <div className="leading-relaxed">
        <span className="font-extrabold block text-amber-900 dark:text-amber-100">
          Disclaimer Pemantauan Tumbuh Kembang:
        </span>
        Data perkembangan anak hanya untuk pencatatan dan pemantauan mandiri keluarga. Fitur ini tidak memberikan penilaian medis atau diagnosis psikologis formal. Selalu konsultasikan tumbuh kembang anak dengan dokter spesialis anak atau psikolog terpercaya.
      </div>
    </div>
  );
};
