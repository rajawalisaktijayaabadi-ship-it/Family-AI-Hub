import React from 'react';
import { useIntegrationStore } from '../../stores/useIntegrationStore';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Server,
  Layers,
  Terminal,
  PlayCircle,
  RefreshCw,
} from 'lucide-react';

export const ObservabilityLogsTab: React.FC = () => {
  const { providers, jobs, logs, addQueueJob } = useIntegrationStore();

  return (
    <div className="space-y-4 text-xs font-sans">
      {/* External Service Provider Registry Status */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
        <h4 className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <Server className="w-4 h-4 text-indigo-600" />
          External Service Registry & Adapter Health
        </h4>

        <div className="grid grid-cols-2 gap-2">
          {providers.map((p) => (
            <div
              key={p.id}
              className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900 dark:text-white text-[11px] truncate pr-1">
                  {p.name}
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[8px] font-extrabold ${
                    p.status === 'active'
                      ? 'bg-emerald-500/10 text-emerald-600'
                      : 'bg-amber-500/10 text-amber-600'
                  }`}
                >
                  {p.status.toUpperCase()}
                </span>
              </div>
              <span className="text-[8px] text-slate-400 font-mono truncate block">
                {p.endpoint}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Background Queue Monitor */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-600" />
            Background Job Queue System ({jobs.length} Jobs)
          </h4>

          <button
            onClick={() => addQueueJob('email', { recipient: 'user@familyai.id', subject: 'Laporan Mingguan' })}
            className="px-2 py-1 bg-emerald-600 text-white font-extrabold text-[9px] rounded-xl flex items-center gap-1 hover:bg-emerald-700 transition"
          >
            <PlayCircle className="w-3 h-3" /> Tambah Job
          </button>
        </div>

        <div className="space-y-1.5">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex justify-between items-center text-[10px]"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-indigo-600 uppercase">[{job.type}]</span>
                <span className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-[150px]">
                  {JSON.stringify(job.payload)}
                </span>
              </div>

              <span
                className={`px-2 py-0.5 rounded-full text-[8px] font-extrabold ${
                  job.status === 'completed'
                    ? 'bg-emerald-500/10 text-emerald-600'
                    : 'bg-amber-500/10 text-amber-600 animate-pulse'
                }`}
              >
                {job.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* System Audit Logs */}
      <div className="p-4 bg-slate-950 text-slate-200 rounded-3xl border border-slate-800 space-y-2 font-mono text-[10px]">
        <div className="flex justify-between items-center text-slate-400 font-extrabold pb-1 border-b border-slate-800">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Terminal className="w-3.5 h-3.5" /> Live Observability Audit Logs
          </span>
          <span>50 Logs Max</span>
        </div>

        <div className="space-y-1 max-h-40 overflow-y-auto no-scrollbar">
          {logs.map((log) => (
            <div key={log.id} className="flex gap-2">
              <span className="text-slate-500 shrink-0">{log.timestamp}</span>
              <span className="text-indigo-400 shrink-0">[{log.service}]</span>
              <span className="text-slate-300">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
