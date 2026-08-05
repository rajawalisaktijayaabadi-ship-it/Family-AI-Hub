import React, { useState } from 'react';
import { useProtectionStore } from '../../stores/useProtectionStore';
import {
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Plus,
  CreditCard,
  FileCheck,
  UserCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  FileText,
} from 'lucide-react';

interface Props {
  onOpenAddPolicy: () => void;
  onOpenAddClaim: () => void;
}

export const InsuranceOverviewTab: React.FC<Props> = ({ onOpenAddPolicy, onOpenAddClaim }) => {
  const { score, aiInsight, policies, claims, togglePremiumPaid } = useProtectionStore();

  const [selectedPolicyId, setSelectedPolicyId] = useState<string | null>(null);

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const selectedPolicy = policies.find((p) => p.id === selectedPolicyId);

  return (
    <div className="space-y-6 pb-20">
      {/* Protection Score Card */}
      {score && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-slate-900 via-teal-950 to-emerald-900 p-6 text-white shadow-xl border border-emerald-500/20">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-teal-500/10 blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-emerald-300">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-xs font-semibold tracking-wider uppercase">Family Protection Score</span>
            </div>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-300 border border-emerald-500/30">
              Evaluasi AI Real-time
            </span>
          </div>

          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight text-white">{score.totalScore}</span>
                <span className="text-sm font-bold text-emerald-400">/ 100</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {score.totalScore >= 80 ? 'Perlindungan Keluarga Sangat Optimal' : 'Perlu Tambahan Polis / Dokumen'}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-300">{score.policyCount} Polis Aktif</p>
              <p className="text-xs text-slate-300">{score.documentsCount} Dokumen Vault</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs">
            <div>
              <p className="text-slate-300">Cakupan Manfaat:</p>
              <p className="font-bold text-emerald-300">{score.coverageScore}% Terlindungi</p>
            </div>
            <div>
              <p className="text-slate-300">Kesiapan Darurat:</p>
              <p className="font-bold text-teal-300">{score.emergencyReadinessScore}% Siap</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onOpenAddPolicy}
          className="flex items-center justify-center gap-2 rounded-2xl bg-teal-600 p-3.5 text-xs font-bold text-white shadow-md hover:bg-teal-700 transition active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Polis Asuransi</span>
        </button>
        <button
          onClick={onOpenAddClaim}
          className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 p-3.5 text-xs font-bold text-white shadow-md hover:bg-slate-800 transition active:scale-[0.98]"
        >
          <FileCheck className="h-4 w-4 text-emerald-400" />
          <span>Ajukan Klaim Baru</span>
        </button>
      </div>

      {/* AI Insurance Insight */}
      {aiInsight && (
        <div className="rounded-3xl border border-teal-200 bg-teal-50/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-teal-700 text-white shadow-sm">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">AI Protection Insight</h3>
                <p className="text-xs text-teal-800 font-medium">Saran Cerdas Perlindungan</p>
              </div>
            </div>
            <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-semibold text-teal-800">
              Mock AI
            </span>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed mb-4">{aiInsight.protectionSummary}</p>

          <div className="space-y-2 mb-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Status & Peringatan:</h4>
            {aiInsight.policyAlerts.map((alert, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{alert}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-teal-200/60 flex items-center gap-2 text-xs text-teal-900 font-medium italic">
            <Shield className="h-4 w-4 text-teal-700 shrink-0" />
            <span>"{aiInsight.protectionMotivation}"</span>
          </div>
        </div>
      )}

      {/* Active Policies List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Shield className="h-4 w-4 text-teal-600" />
            <span>Polis Asuransi Keluarga ({policies.length})</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">Terverifikasi</span>
        </div>

        <div className="space-y-3">
          {policies.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold text-teal-700 border border-teal-200">
                    {p.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 mt-1">{p.policyName}</h4>
                  <p className="text-[11px] text-slate-500">
                    No: {p.policyNumber} • {p.companyName}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    p.status === 'Active'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl text-slate-600">
                <div>
                  <span>Nilai Pertanggungan:</span>
                  <p className="font-bold text-slate-900">{formatIDR(p.coverage.sumAssured)}</p>
                </div>
                <div>
                  <span>Premi {p.premium.frequency}:</span>
                  <p className="font-bold text-teal-700">{formatIDR(p.premium.amount)}</p>
                </div>
              </div>

              {/* Premium Payment Status */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span className="text-[11px] text-slate-500">Jatuh Tempo: {p.premium.dueDate}</span>
                </div>

                <button
                  onClick={() => togglePremiumPaid(p.id)}
                  className={`flex items-center gap-1 rounded-xl px-2.5 py-1 text-[11px] font-bold transition ${
                    p.premium.isPaid
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>{p.premium.isPaid ? 'Premi Lunas' : 'Bayar Premi'}</span>
                </button>
              </div>

              <button
                onClick={() => setSelectedPolicyId(selectedPolicyId === p.id ? null : p.id)}
                className="w-full text-center text-[11px] font-bold text-teal-600 hover:underline pt-1"
              >
                {selectedPolicyId === p.id ? 'Sembunyikan Detail Rincian' : 'Lihat Manfaat & Penerima Manfaat'}
              </button>

              {selectedPolicyId === p.id && (
                <div className="mt-3 p-3 rounded-xl bg-slate-50 text-xs space-y-2 text-slate-700 animate-fade-in">
                  <div>
                    <h5 className="font-bold text-slate-900 mb-1">Manfaat Utama:</h5>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                      {p.coverage.benefits.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-900 mb-1">Penerima Manfaat (Beneficiaries):</h5>
                    {p.beneficiaries.map((b) => (
                      <div key={b.id} className="flex justify-between text-[11px]">
                        <span>
                          {b.name} ({b.relationship})
                        </span>
                        <span className="font-bold">{b.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Claims Timeline Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FileText className="h-4 w-4 text-teal-600" />
            <span>Riwayat & Timeline Klaim ({claims.length})</span>
          </h3>
        </div>

        <div className="space-y-3">
          {claims.map((clm) => (
            <div key={clm.id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{clm.category}</h4>
                  <p className="text-[11px] text-slate-500">No. Klaim: {clm.claimNumber}</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                  {clm.status}
                </span>
              </div>

              <p className="text-xs text-slate-600">{clm.notes}</p>
              <p className="text-xs font-bold text-teal-700">Nominal Dicairkan: {formatIDR(clm.amountClaimed)}</p>

              {/* Timeline Display */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <p className="text-[11px] font-bold text-slate-800">Timeline Proses Klaim:</p>
                <div className="space-y-1.5">
                  {clm.timeline.map((t, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px]">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          t.completed ? 'bg-emerald-500' : 'bg-slate-300'
                        }`}
                      />
                      <span className={t.completed ? 'font-semibold text-slate-900' : 'text-slate-500'}>
                        {t.step}
                      </span>
                      <span className="ml-auto text-[10px] text-slate-400">{t.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
