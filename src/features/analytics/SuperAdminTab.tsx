import React, { useState } from 'react';
import { useAnalyticsStore } from '../../stores/useAnalyticsStore';
import {
  ShieldAlert,
  Users,
  Building2,
  CreditCard,
  Activity,
  ToggleLeft,
  ToggleRight,
  HardDrive,
  CheckCircle,
  AlertCircle,
  FileText,
  Search,
} from 'lucide-react';

export const SuperAdminTab: React.FC = () => {
  const {
    adminStats,
    systemStatus,
    auditLogs,
    featureFlags,
    toggleFeatureFlag,
  } = useAnalyticsStore();

  const [activeSubSection, setActiveSubSection] = useState<
    'overview' | 'audit' | 'flags' | 'monitoring'
  >('overview');

  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = auditLogs.filter(
    (l) =>
      l.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.module.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Super Admin Top Sub-Nav */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'overview', label: 'Admin Overview' },
          { id: 'monitoring', label: 'System Health' },
          { id: 'audit', label: 'Audit Log' },
          { id: 'flags', label: 'Feature Flags' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubSection(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold transition shrink-0 ${
              activeSubSection === tab.id
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeSubSection === 'overview' && (
        <div className="space-y-4">
          {/* Admin Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3.5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-indigo-600">
                <Users className="w-5 h-5" />
                <span className="text-[9px] font-black bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-full">
                  Users
                </span>
              </div>
              <p className="text-lg font-black text-slate-900 dark:text-white">
                {adminStats.totalUsers.toLocaleString('id-ID')}
              </p>
              <p className="text-[10px] text-slate-400">Total Pengguna Terdaftar</p>
            </div>

            <div className="p-3.5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-amber-600">
                <Building2 className="w-5 h-5" />
                <span className="text-[9px] font-black bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-full">
                  Workspace
                </span>
              </div>
              <p className="text-lg font-black text-slate-900 dark:text-white">
                {adminStats.totalWorkspaces.toLocaleString('id-ID')}
              </p>
              <p className="text-[10px] text-slate-400">Ruang Keluarga Aktif</p>
            </div>

            <div className="p-3.5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-emerald-600">
                <CreditCard className="w-5 h-5" />
                <span className="text-[9px] font-black bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                  SaaS Subs
                </span>
              </div>
              <p className="text-lg font-black text-slate-900 dark:text-white">
                {adminStats.activeSubscriptions}
              </p>
              <p className="text-[10px] text-slate-400">Pelanggan Berlangganan</p>
            </div>

            <div className="p-3.5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-rose-600">
                <Activity className="w-5 h-5" />
                <span className="text-[9px] font-black bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded-full">
                  MRR Est
                </span>
              </div>
              <p className="text-sm font-black text-slate-900 dark:text-white">
                Rp {(adminStats.mrrEstimate / 1000000).toFixed(1)} Jt
              </p>
              <p className="text-[10px] text-slate-400">Monthly Recurring Revenue</p>
            </div>
          </div>

          {/* SaaS Workspace Management Simulation */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
              Manajemen Workspace Keluarga
            </h4>

            <div className="space-y-2">
              {[
                { name: 'Keluarga Budi Santoso', users: 5, plan: 'Pro Family', status: 'Aktif' },
                { name: 'Keluarga Ahmad Dahlan', users: 4, plan: 'Enterprise', status: 'Aktif' },
                { name: 'Keluarga Pratama', users: 3, plan: 'Free Tier', status: 'Trial' },
              ].map((ws, i) => (
                <div
                  key={i}
                  className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
                >
                  <div>
                    <h5 className="font-black text-slate-900 dark:text-white">{ws.name}</h5>
                    <p className="text-[10px] text-slate-400">
                      {ws.users} Anggota • Paket {ws.plan}
                    </p>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
                    {ws.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSubSection === 'monitoring' && (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>Status Layanan & Monitoring System</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-1">
              <span className="text-[10px] text-slate-400 font-bold block">Status Gateway API</span>
              <div className="flex items-center gap-2 font-black text-emerald-600">
                <CheckCircle className="w-4 h-4" />
                <span>{systemStatus.apiStatus} (Latency 24ms)</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-1">
              <span className="text-[10px] text-slate-400 font-bold block">Database Firestore</span>
              <div className="flex items-center gap-2 font-black text-emerald-600">
                <CheckCircle className="w-4 h-4" />
                <span>{systemStatus.databaseStatus} (Sync 100%)</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-1">
              <span className="text-[10px] text-slate-400 font-bold block">Penyimpanan Storage</span>
              <div className="flex items-center gap-2 font-black text-amber-600">
                <HardDrive className="w-4 h-4" />
                <span>{systemStatus.storageUsageMb} MB Digunakan</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-1">
              <span className="text-[10px] text-slate-400 font-bold block">Sesi Pengguna Aktif</span>
              <div className="flex items-center gap-2 font-black text-indigo-600">
                <Users className="w-4 h-4" />
                <span>{systemStatus.activeUsersCount} Sesi Terhubung</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubSection === 'audit' && (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-600" />
              <span>Audit Log Keamanan & Aktivitas ({auditLogs.length})</span>
            </h4>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari log audit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-slate-900 dark:text-white">
                    {log.actor} • <strong className="text-amber-600">{log.action}</strong>
                  </span>
                  <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">{log.details}</p>
                <p className="text-[9px] text-slate-400">
                  Modul: {log.module} • IP: {log.ipAddress}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubSection === 'flags' && (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
            Feature Flags Configurator
          </h4>

          <div className="space-y-3">
            {featureFlags.map((ff) => (
              <div
                key={ff.id}
                className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3"
              >
                <div>
                  <h5 className="text-xs font-black text-slate-900 dark:text-white">{ff.name}</h5>
                  <p className="text-[10px] text-slate-500">{ff.description}</p>
                  <code className="text-[9px] text-amber-600 font-bold">{ff.key}</code>
                </div>

                <button
                  onClick={() => toggleFeatureFlag(ff.id)}
                  className={`text-2xl transition ${
                    ff.isEnabled ? 'text-emerald-500' : 'text-slate-400'
                  }`}
                >
                  {ff.isEnabled ? (
                    <ToggleRight className="w-8 h-8" />
                  ) : (
                    <ToggleLeft className="w-8 h-8" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
