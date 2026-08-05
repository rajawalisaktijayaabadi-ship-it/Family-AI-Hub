import React from 'react';
import { useEducationStore } from '../../stores/useEducationStore';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { TrendingUp, Award, Clock, BookOpen } from 'lucide-react';

export const EducationAnalyticsTab: React.FC = () => {
  const { report, subjects, homeworks } = useEducationStore();

  const studyTimeData = [
    { day: 'Sen', hours: 2.0 },
    { day: 'Sel', hours: 2.5 },
    { day: 'Rab', hours: 1.5 },
    { day: 'Kam', hours: 3.0 },
    { day: 'Jum', hours: 2.0 },
    { day: 'Sab', hours: 2.5 },
    { day: 'Min', hours: 1.0 },
  ];

  const subjectPerformanceData = subjects.map((s) => ({
    subject: s.subjectName.split(' ')[0],
    score: s.currentScorePlaceholder || 80,
    target: s.targetScore,
  }));

  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

  const homeworkStatusData = [
    { name: 'Selesai', value: homeworks.filter((h) => h.status === 'Selesai').length },
    { name: 'Dalam Proses', value: homeworks.filter((h) => h.status === 'Dalam Proses').length },
    { name: 'Belum Dikerjakan', value: homeworks.filter((h) => h.status === 'Belum Dikerjakan').length },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-3xl border border-indigo-100 bg-indigo-50/40 p-4 space-y-1">
          <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> Total Jam Belajar
          </span>
          <p className="text-2xl font-black text-indigo-900">{report?.totalStudyHoursThisWeek} Jam</p>
          <p className="text-[10px] text-slate-500 font-medium">Minggu Ini</p>
        </div>

        <div className="rounded-3xl border border-emerald-100 bg-emerald-50/40 p-4 space-y-1">
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5" /> Rata-Rata Kuis
          </span>
          <p className="text-2xl font-black text-emerald-900">{report?.averageQuizScore}</p>
          <p className="text-[10px] text-slate-500 font-medium">Nilai Kuis Praktis</p>
        </div>
      </div>

      {/* Daily Study Time Chart */}
      <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-slate-500">
          Waktu Belajar Harian (Jam)
        </h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={studyTimeData}>
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip />
              <Bar dataKey="hours" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Subject Target vs Current Score */}
      <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-slate-500">
          Nilai Mata Pelajaran vs Target
        </h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={subjectPerformanceData}>
              <XAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="score" name="Nilai Saat Ini" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" name="Target" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
