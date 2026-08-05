import React, { useState } from 'react';
import { useProtectionStore } from '../../stores/useProtectionStore';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
  RefreshCw,
  Bell,
  Check,
} from 'lucide-react';

interface Props {
  onOpenAddRenewal: () => void;
}

export const RenewalTrackerTab: React.FC<Props> = ({ onOpenAddRenewal }) => {
  const { renewals, toggleRenewalCompleted } = useProtectionStore();

  const formatIDR = (val?: number) => {
    if (!val) return 'TBD';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header Info */}
      <div className="rounded-3xl border border-teal-100 bg-teal-50/50 p-5 backdrop-blur-sm flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-teal-600" />
            <span>Pengingat Perpanjangan Dokumen & Polis</span>
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Pantau jatuh tempo Paspor, SIM, STNK, dan Polis agar terhindar dari denda atau keterlambatan.
          </p>
        </div>
        <button
          onClick={onOpenAddRenewal}
          className="flex items-center gap-1.5 rounded-2xl bg-teal-600 px-3.5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-teal-700 shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah</span>
        </button>
      </div>

      {/* Renewal Items List */}
      <div className="space-y-3">
        {renewals.map((rnw) => {
          const isOverdue = new Date(rnw.dueDate) < new Date() && !rnw.isCompleted;

          return (
            <div
              key={rnw.id}
              className={`rounded-2xl border p-4 shadow-sm transition space-y-3 ${
                rnw.isCompleted
                  ? 'bg-slate-50 border-slate-200 opacity-75'
                  : isOverdue
                  ? 'bg-rose-50/60 border-rose-200'
                  : 'bg-white border-slate-100'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-extrabold text-teal-800">
                      {rnw.type}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Pengingat {rnw.reminderDaysBefore} Hari Sebelum
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-1">{rnw.title}</h4>
                </div>

                <button
                  onClick={() => toggleRenewalCompleted(rnw.id)}
                  className={`flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-bold transition ${
                    rnw.isCompleted
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>{rnw.isCompleted ? 'Selesai' : 'Tandai Selesai'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-teal-600" />
                  <span>Jatuh Tempo: <strong className="text-slate-900">{rnw.dueDate}</strong></span>
                </div>
                <div>
                  <span>Estimasi Biaya: <strong className="text-teal-700">{formatIDR(rnw.costEstimate)}</strong></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
