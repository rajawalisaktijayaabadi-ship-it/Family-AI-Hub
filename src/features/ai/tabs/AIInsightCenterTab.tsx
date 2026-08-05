import React, { useState } from 'react';
import { Sparkles, Activity, Wallet, GraduationCap, Heart, ShieldAlert, CheckCircle2, TrendingUp, Info } from 'lucide-react';
import { GeminiService } from '../../../services/ai/GeminiService';

export const AIInsightCenterTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'harian' | 'kesehatan' | 'keuangan' | 'pendidikan' | 'harmoni'>('harian');
  const [loading, setLoading] = useState(false);
  const [insightResult, setInsightResult] = useState<{
    summary: string;
    recommendations: string[];
    score: number;
    disclaimer?: string;
  } | null>(null);

  const fetchInsight = async (type: string) => {
    setLoading(true);
    try {
      const result = await GeminiService.analyzeModule(type, {
        family: 'Keluarga Rahardjo',
        date: new Date().toISOString(),
      });
      setInsightResult(result);
    } catch (e) {
      console.error('Error fetching AI insight:', e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchInsight(activeTab);
  }, [activeTab]);

  return (
    <div className="space-y-5 pb-12">
      {/* Insight Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-teal-700 via-emerald-700 to-green-700 p-5 text-white shadow-lg">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl">
            <Sparkles className="w-6 h-6 text-emerald-200" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">AI Intelligence & Insight Center</h2>
            <p className="text-xs text-emerald-100">Analisis prediktif terpadu didukung Google Gemini 3.6 Flash</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'harian', label: 'Ringkasan Harian', icon: Sparkles },
          { id: 'kesehatan', label: 'Kesehatan', icon: Activity },
          { id: 'keuangan', label: 'Keuangan', icon: Wallet },
          { id: 'pendidikan', label: 'Pendidikan', icon: GraduationCap },
          { id: 'harmoni', label: 'Harmoni & Mood', icon: Heart },
        ].map((t) => {
          const IconComponent = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                activeTab === t.id
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Insight Result Card */}
      {loading ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 space-y-3">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-medium text-slate-600">Menganalisis data keluarga dengan Gemini AI...</p>
        </div>
      ) : insightResult ? (
        <div className="space-y-4">
          {/* Health Score Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Skor AI Indeks {activeTab}
              </span>
              <h3 className="text-3xl font-black text-slate-900 mt-1">
                {insightResult.score} <span className="text-xs font-semibold text-emerald-600">/ 100</span>
              </h3>
            </div>
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center space-x-1 text-emerald-700 font-bold text-xs">
              <TrendingUp className="w-4 h-4" />
              <span>Sangat Baik</span>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-emerald-700">
              Analisis Eksekutif Gemini
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed font-normal bg-slate-50 p-3 rounded-xl border border-slate-100">
              {insightResult.summary}
            </p>
          </div>

          {/* Actionable Recommendations */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
              Rekomendasi Aksi Nyata
            </h4>
            <div className="space-y-2">
              {insightResult.recommendations.map((rec, i) => (
                <div key={i} className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span className="text-xs text-slate-700 font-medium">{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer badge if applicable */}
          {(activeTab === 'kesehatan' || activeTab === 'keuangan') && (
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 flex items-start space-x-2">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-800 leading-relaxed">
                <strong>Sanggahan Resmi:</strong> Informasi analisis ini bersifat pendukung umum dan edukatif. Konsultasikan dengan tenaga medis terverifikasi atau perencana keuangan profesional untuk keputusan hukum/medis spesifik.
              </p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
