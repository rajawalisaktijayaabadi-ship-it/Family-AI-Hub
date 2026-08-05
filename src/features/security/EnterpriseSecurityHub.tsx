import React, { useState } from 'react';
import { PrivacyConsentTab } from './PrivacyConsentTab';
import { SecurityHardeningTab } from './SecurityHardeningTab';
import { DevOpsMonitoringTab } from './DevOpsMonitoringTab';
import { TestingDevOpsTab } from './TestingDevOpsTab';
import { ShieldCheck, Lock, Activity, TestTube, X, Server } from 'lucide-react';

interface EnterpriseSecurityHubProps {
  onClose?: () => void;
}

export const EnterpriseSecurityHub: React.FC<EnterpriseSecurityHubProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'security' | 'devops' | 'testing'>('privacy');

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-950/50">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              Enterprise Security, PDP Privacy & DevOps Hub
              <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold rounded">
                PROD-READY
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              UU PDP No. 27/2022 Compliance • 8 Pillars Firestore Security Rules • DevOps Health • CI/CD
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-100 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Tab Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/80">
        <button
          onClick={() => setActiveTab('privacy')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition shrink-0 ${
            activeTab === 'privacy'
              ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 shadow-md shadow-emerald-950/20'
              : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Lock className="w-4 h-4" /> UU PDP & Privasi
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition shrink-0 ${
            activeTab === 'security'
              ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 shadow-md shadow-emerald-950/20'
              : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> Hardening Keamanan
        </button>

        <button
          onClick={() => setActiveTab('devops')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition shrink-0 ${
            activeTab === 'devops'
              ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 shadow-md shadow-emerald-950/20'
              : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Server className="w-4 h-4" /> DevOps & Monitoring
        </button>

        <button
          onClick={() => setActiveTab('testing')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition shrink-0 ${
            activeTab === 'testing'
              ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 shadow-md shadow-emerald-950/20'
              : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <TestTube className="w-4 h-4" /> Automated QA Testing
        </button>
      </div>

      {/* Tab Body View */}
      <div className="pt-2">
        {activeTab === 'privacy' && <PrivacyConsentTab />}
        {activeTab === 'security' && <SecurityHardeningTab />}
        {activeTab === 'devops' && <DevOpsMonitoringTab />}
        {activeTab === 'testing' && <TestingDevOpsTab />}
      </div>
    </div>
  );
};
