import React from 'react';
import { useMoodStore } from '../../stores/useMoodStore';
import { Users, Heart, MessageCircle, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export const RelationshipModule: React.FC = () => {
  const { relationship } = useMoodStore();

  return (
    <div className="space-y-4 font-sans">
      {/* Overview Cards */}
      <div className="p-4 bg-gradient-to-br from-indigo-600 via-blue-600 to-teal-500 rounded-3xl text-white shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-white/20 backdrop-blur-md">
              <Users className="w-5 h-5 text-teal-200" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-100">
                AI Relationship & Family Bond
              </span>
              <h3 className="text-sm font-extrabold font-heading">Kualitas Hubungan Keluarga</h3>
            </div>
          </div>
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-mono font-black">
            Harmoni Baik
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md space-y-1">
            <span className="text-[9px] text-blue-100 font-bold block flex items-center justify-center gap-1">
              <MessageCircle className="w-3 h-3 text-teal-200" /> Komunikasi
            </span>
            <span className="text-base font-black font-mono">{relationship.communicationScore}%</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md space-y-1">
            <span className="text-[9px] text-blue-100 font-bold block flex items-center justify-center gap-1">
              <Heart className="w-3 h-3 text-pink-200" /> Family Bond
            </span>
            <span className="text-base font-black font-mono">{relationship.familyBondScore}%</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md space-y-1">
            <span className="text-[9px] text-blue-100 font-bold block flex items-center justify-center gap-1">
              <Clock className="w-3 h-3 text-amber-200" /> Quality Time
            </span>
            <span className="text-base font-black font-mono">{relationship.qualityTimeHours} jam/mg</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md space-y-1">
            <span className="text-[9px] text-blue-100 font-bold block flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-200" /> Trust Score
            </span>
            <span className="text-base font-black font-mono">{relationship.trustScore}%</span>
          </div>
        </div>
      </div>

      {/* Breakdown Checklist */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
        <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-teal-500" /> Evaluasi Kehangatan Rumah
        </h4>

        <div className="space-y-2 text-xs">
          {[
            {
              title: 'Komunikasi Terbuka Pasangan & Anak',
              score: '88/100',
              status: 'Sangat Baik',
              desc: 'Pesan antar anggota keluarga tersampaikan dengan empati tanpa intimidasi.',
            },
            {
              title: 'Waktu Bersama Tanpa Layar Gadget',
              score: '14.5 Jam',
              status: 'Optimal',
              desc: 'Konsistensi makan malam bersama dan olahraga pagi akhir pekan terjaga.',
            },
            {
              title: 'Indeks Kepercayaan & Rasa Aman',
              score: '95/100',
              status: 'Sangat Tinggi',
              desc: 'Anak merasa aman menceritakan masalah sekolah tanpa rasa takut dimarahi.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1"
            >
              <div className="flex justify-between items-center font-bold">
                <span className="text-slate-800 dark:text-slate-200">{item.title}</span>
                <span className="px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-[10px]">
                  {item.status} ({item.score})
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
