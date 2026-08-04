import React from 'react';
import { AlertCircle } from 'lucide-react';

export const MedicalDisclaimerBanner: React.FC = () => {
  return (
    <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-2xl border border-rose-200 dark:border-rose-800 text-[11px] text-rose-800 dark:text-rose-200 flex items-start gap-2 shadow-2xs font-sans">
      <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
      <div className="leading-relaxed">
        <span className="font-extrabold block text-rose-900 dark:text-rose-100">
          Disclaimer Medis & AI Health:
        </span>
        Seluruh informasi, pencatatan rekam medis, dan saran AI Health hanya bersifat informasi pendamping dan edukatif, bukan merupakan diagnosis medis formal. Selalu konsultasikan kondisi kesehatan keluarga Anda kepada dokter atau tenaga medis profesional.
      </div>
    </div>
  );
};
