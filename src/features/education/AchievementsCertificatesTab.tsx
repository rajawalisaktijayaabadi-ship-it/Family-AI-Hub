import React, { useState } from 'react';
import { useEducationStore } from '../../stores/useEducationStore';
import { Award, Trophy, Target, Plus, CheckCircle2, ShieldCheck } from 'lucide-react';

interface Props {
  onOpenAddGoal: () => void;
  onOpenAddCertificate: () => void;
}

export const AchievementsCertificatesTab: React.FC<Props> = ({ onOpenAddGoal, onOpenAddCertificate }) => {
  const { goals, certificates, achievements } = useEducationStore();
  const [activeSub, setActiveSub] = useState<'goal' | 'cert' | 'badge'>('goal');

  return (
    <div className="space-y-6 pb-20">
      {/* Sub tabs */}
      <div className="flex rounded-2xl bg-slate-100 p-1">
        <button
          onClick={() => setActiveSub('goal')}
          className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeSub === 'goal' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
          }`}
        >
          <Target className="h-4 w-4" />
          <span>Target Belajar ({goals.length})</span>
        </button>
        <button
          onClick={() => setActiveSub('cert')}
          className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeSub === 'cert' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
          }`}
        >
          <Award className="h-4 w-4" />
          <span>Sertifikat ({certificates.length})</span>
        </button>
        <button
          onClick={() => setActiveSub('badge')}
          className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeSub === 'badge' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
          }`}
        >
          <Trophy className="h-4 w-4" />
          <span>Prestasi ({achievements.length})</span>
        </button>
      </div>

      {activeSub === 'goal' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Target Belajar (Learning Goals)</h3>
            <button
              onClick={onOpenAddGoal}
              className="flex items-center gap-1 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Tambah Target</span>
            </button>
          </div>

          <div className="space-y-3">
            {goals.map((gl) => (
              <div key={gl.id} className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                    {gl.goalType} Goal
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Target: {gl.targetDate}</span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm">{gl.title}</h4>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-slate-600">
                    <span>Pencapaian Target</span>
                    <span className="text-indigo-600">{gl.progressPercent}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${gl.progressPercent}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSub === 'cert' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Digital Certificates Vault</h3>
            <button
              onClick={onOpenAddCertificate}
              className="flex items-center gap-1 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Upload Sertifikat</span>
            </button>
          </div>

          <div className="space-y-3">
            {certificates.map((crt) => (
              <div key={crt.id} className="rounded-3xl border border-indigo-100 bg-indigo-50/30 p-4 shadow-sm space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-[10px] font-extrabold text-indigo-800">
                    {crt.category}
                  </span>
                  <span className="text-[10px] text-slate-500">{crt.issueDate}</span>
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <div className="p-2.5 rounded-2xl bg-indigo-600 text-white shadow-md">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">{crt.title}</h4>
                    <p className="text-slate-600 text-[11px]">Penerbit: {crt.issuer}</p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 mt-1">
                      <ShieldCheck className="h-3 w-3" /> Digital Verified
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSub === 'badge' && (
        <div className="space-y-3">
          {achievements.map((ach) => (
            <div key={ach.id} className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm flex items-center gap-4 text-xs">
              <div className="h-12 w-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-inner">
                <Trophy className="h-6 w-6" />
              </div>

              <div>
                <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                  {ach.category} • {ach.dateReceived}
                </span>
                <h4 className="font-extrabold text-slate-900 text-sm mt-0.5">{ach.title}</h4>
                <p className="text-slate-600 text-[11px]">{ach.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
