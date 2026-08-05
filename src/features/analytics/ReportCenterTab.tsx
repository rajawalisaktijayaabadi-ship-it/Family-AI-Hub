import React, { useState } from 'react';
import { useAnalyticsStore } from '../../stores/useAnalyticsStore';
import {
  FileText,
  Download,
  Plus,
  Calendar,
  Filter,
  CheckCircle2,
  FileSpreadsheet,
  Code2,
  FileType,
} from 'lucide-react';
import { useToastStore } from '../../stores/useToastStore';

export const ReportCenterTab: React.FC = () => {
  const { reports, generateReport } = useAnalyticsStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);

  const [newCategory, setNewCategory] = useState('Family');
  const [newTimeframe, setNewTimeframe] = useState('Weekly Report');

  const categories = [
    'All',
    'Family',
    'Mood',
    'Health',
    'Finance',
    'Education',
    'Meal',
    'Calendar',
    'Safety',
  ];

  const filteredReports = reports.filter(
    (r) => selectedCategory === 'All' || r.category === selectedCategory
  );

  const handleExport = (reportTitle: string, format: string) => {
    useToastStore
      .getState()
      .addToast(`Mengeksport ${reportTitle} ke format ${format}`, 'success');
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateReport(newCategory, newTimeframe);
    setIsGenerateOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Header & Generate Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-amber-600" />
            <span>Pusat Laporan & Rekapitulasi ({reports.length})</span>
          </h3>
          <p className="text-[10px] text-slate-500">Laporan terstruktur harian, mingguan & bulanan</p>
        </div>

        <button
          onClick={() => setIsGenerateOpen(true)}
          className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold rounded-2xl shadow-sm transition flex items-center gap-1 active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Buat Laporan</span>
        </button>
      </div>

      {/* Generate Report Form */}
      {isGenerateOpen && (
        <form
          onSubmit={handleCreateSubmit}
          className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-amber-200 dark:border-amber-900 shadow-md space-y-3"
        >
          <h4 className="text-xs font-black text-amber-700 dark:text-amber-400">
            Generate Laporan Baru
          </h4>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Kategori Laporan
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="Family">Family</option>
                <option value="Health">Health</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
                <option value="Meal">Meal</option>
                <option value="Safety">Safety</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Periode / Timeframe
              </label>
              <select
                value={newTimeframe}
                onChange={(e) => setNewTimeframe(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="Daily Report">Daily Report</option>
                <option value="Weekly Report">Weekly Report</option>
                <option value="Monthly Report">Monthly Report</option>
                <option value="Quarterly Report">Quarterly Report</option>
                <option value="Yearly Report">Yearly Report</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsGenerateOpen(false)}
              className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-amber-600 text-white text-xs font-black rounded-xl shadow-sm hover:bg-amber-700"
            >
              Generate Sekarang
            </button>
          </div>
        </form>
      )}

      {/* Category Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-2xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
              selectedCategory === cat
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {filteredReports.map((rep) => (
          <div
            key={rep.id}
            className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[9px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider">
                  {rep.category} • {rep.timeframe}
                </span>
                <h4 className="text-xs font-black text-slate-900 dark:text-white pt-1">
                  {rep.title}
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Periode: {rep.dateRange} • Dibuat: {rep.generatedAt}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {rep.summary}
            </p>

            {/* Metrics Chips */}
            <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
              {Object.entries(rep.keyMetrics).map(([k, v]) => (
                <span
                  key={k}
                  className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-xl text-slate-700 dark:text-slate-300 font-bold"
                >
                  {k}: <strong className="text-amber-600">{v}</strong>
                </span>
              ))}
            </div>

            {/* Export Actions Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400">Format Ekspor:</span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleExport(rep.title, 'PDF')}
                  className="px-2.5 py-1 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-[10px] font-extrabold rounded-xl hover:bg-rose-100 flex items-center gap-1"
                >
                  <FileType className="w-3 h-3" /> PDF
                </button>
                <button
                  onClick={() => handleExport(rep.title, 'Excel')}
                  className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-extrabold rounded-xl hover:bg-emerald-100 flex items-center gap-1"
                >
                  <FileSpreadsheet className="w-3 h-3" /> Excel
                </button>
                <button
                  onClick={() => handleExport(rep.title, 'CSV')}
                  className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px] font-extrabold rounded-xl hover:bg-blue-100 flex items-center gap-1"
                >
                  <FileText className="w-3 h-3" /> CSV
                </button>
                <button
                  onClick={() => handleExport(rep.title, 'JSON')}
                  className="px-2.5 py-1 bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-[10px] font-extrabold rounded-xl hover:bg-purple-100 flex items-center gap-1"
                >
                  <Code2 className="w-3 h-3" /> JSON
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
