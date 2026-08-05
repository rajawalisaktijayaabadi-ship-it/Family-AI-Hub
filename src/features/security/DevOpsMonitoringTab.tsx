import React from 'react';
import { useSecurityDevOpsStore } from '../../stores/useSecurityDevOpsStore';
import { Cpu, HardDrive, Database, Wifi, DatabaseBackup, ToggleLeft, ToggleRight, Server, Rocket, Clock } from 'lucide-react';

export const DevOpsMonitoringTab: React.FC = () => {
  const {
    health,
    backups,
    deployments,
    isMaintenanceMode,
    featureToggles,
    toggleMaintenanceMode,
    toggleFeature,
    runManualBackup,
  } = useSecurityDevOpsStore();

  return (
    <div className="space-y-6">
      {/* System Health Overview Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs">CPU Usage</span>
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-slate-100">{health.cpuUsagePct}%</div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${health.cpuUsagePct}%` }} />
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs">RAM Memory</span>
            <HardDrive className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-xl font-bold text-slate-100">{health.memoryUsageMB} MB</div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-sky-500 h-full" style={{ width: '32%' }} />
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs">API Latency</span>
            <Wifi className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-slate-100">{health.apiLatencyMs} ms</div>
          <span className="text-[10px] text-emerald-400">Super Fast Response</span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs">Firestore Quota</span>
            <Database className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl font-bold text-slate-100">{health.firestoreReadsToday} R</div>
          <span className="text-[10px] text-slate-400">{health.firestoreWritesToday} Writes Hari Ini</span>
        </div>
      </div>

      {/* Control Panel: Maintenance Mode & Manual Backup */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Disaster Recovery & Backup Center */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <DatabaseBackup className="w-4 h-4 text-emerald-400" /> Automated Disaster Recovery & Backup
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed">
            Backup Firestore & Storage dilakukan otomatis setiap hari pada 02.00 WIB dan disimpan dalam Cloud Storage Bucket terenkripsi.
          </p>

          <button
            onClick={runManualBackup}
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40"
          >
            <DatabaseBackup className="w-4 h-4" /> Buat Snapshot Backup Sekarang
          </button>

          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-semibold text-slate-400">Riwayat Snapshot Terbaru:</span>
            <div className="space-y-1.5">
              {backups.map((bk) => (
                <div key={bk.id} className="p-2.5 bg-slate-950/70 rounded-lg border border-slate-800/80 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-mono text-slate-200">{bk.id}</span>
                    <span className="text-[10px] text-slate-400 block">{new Date(bk.timestamp).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-emerald-400">{bk.sizeMB} MB</span>
                    <span className="text-[10px] text-slate-500 block capitalize">{bk.type.replace('_', ' ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Maintenance Mode & Feature Flags */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-400" /> Ops Controls & Feature Toggles
          </h3>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-200 block">System Maintenance Mode</span>
              <span className="text-[11px] text-slate-400">Batasi akses hanya untuk Super Admin</span>
            </div>
            <button
              onClick={toggleMaintenanceMode}
              className="text-slate-300 hover:text-white transition"
            >
              {isMaintenanceMode ? (
                <ToggleRight className="w-8 h-8 text-amber-500" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-slate-600" />
              )}
            </button>
          </div>

          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-semibold text-slate-400">Feature Flags (Dynamic Remote Config):</span>
            <div className="space-y-2">
              {Object.entries(featureToggles).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/60">
                  <span className="font-mono text-slate-300">{key}</span>
                  <button onClick={() => toggleFeature(key)}>
                    {val ? (
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-semibold border border-emerald-500/30">
                        ENABLED
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-slate-800 text-slate-500 rounded text-[10px] font-semibold">
                        DISABLED
                      </span>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Deployments History */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <Rocket className="w-4 h-4 text-emerald-400" /> Production & Staging Deployments
        </h3>

        <div className="space-y-2">
          {deployments.map((dep) => (
            <div key={dep.id} className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-100">{dep.version}</span>
                  <span className="px-2 py-0.5 bg-sky-500/10 text-sky-400 rounded text-[10px] font-mono border border-sky-500/20">
                    {dep.environment}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Commit: <span className="font-mono text-slate-300">{dep.commitHash}</span> • Triggered by {dep.author}
                </p>
              </div>

              <div className="flex items-center gap-3 text-right">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {new Date(dep.deployedAt).toLocaleTimeString('id-ID')}
                </span>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] rounded font-medium">
                  {dep.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
