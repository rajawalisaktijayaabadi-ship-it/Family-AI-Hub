import React from 'react';
import { useProtectionStore } from '../../stores/useProtectionStore';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { ShieldCheck, PieChart, BarChart2, CheckCircle2 } from 'lucide-react';

export const ProtectionAnalyticsTab: React.FC = () => {
  const { policies, score, documents } = useProtectionStore();

  const categoryData = [
    { name: 'Kesehatan', value: policies.filter((p) => p.category === 'Kesehatan').length, color: '#0d9488' },
    { name: 'Jiwa', value: policies.filter((p) => p.category === 'Jiwa').length, color: '#0284c7' },
    { name: 'Kendaraan', value: policies.filter((p) => p.category === 'Kendaraan').length, color: '#8b5cf6' },
    { name: 'Rumah / Asset', value: policies.filter((p) => p.category === 'Rumah').length, color: '#f59e0b' },
  ].filter((d) => d.value > 0);

  const scoreBreakdown = [
    { name: 'Asuransi Kesehatan', score: 85 },
    { name: 'Asuransi Jiwa', score: 90 },
    { name: 'Dokumen Identitas Vault', score: 95 },
    { name: 'Kesiapan Kontak Darurat', score: score?.emergencyReadinessScore || 80 },
  ];

  return (
    <div className="space-y-6 pb-20">
      <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <PieChart className="h-5 w-5 text-teal-600" />
          <h3 className="text-sm font-bold text-slate-900">Distribusi Kategori Polis Asuransi</h3>
        </div>

        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={4}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {categoryData.map((cat) => (
            <div key={cat.name} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
              <span className="text-slate-700">{cat.name}:</span>
              <span className="font-bold text-slate-900">{cat.value} Polis</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <BarChart2 className="h-5 w-5 text-teal-600" />
          <h3 className="text-sm font-bold text-slate-900">Analisis Kesiapan & Cakupan Perlindungan</h3>
        </div>

        <div className="h-48 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scoreBreakdown} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="score" fill="#0d9488" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
