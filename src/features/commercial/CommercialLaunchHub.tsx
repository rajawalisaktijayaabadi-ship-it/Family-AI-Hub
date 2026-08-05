import React, { useState } from 'react';
import { CustomerSupportCenter } from './CustomerSupportCenter';
import { BusinessIntelligenceDashboard } from './BusinessIntelligenceDashboard';
import { PWAWrapperDistribution } from './PWAWrapperDistribution';
import { OnboardingWizardModal } from './OnboardingWizardModal';
import { Rocket, LifeBuoy, BarChart3, Smartphone, Sparkles, X } from 'lucide-react';

interface CommercialLaunchHubProps {
  onClose?: () => void;
}

export const CommercialLaunchHub: React.FC<CommercialLaunchHubProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'support' | 'bi' | 'pwa'>('support');
  const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-950/50">
            <Rocket className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              Commercial Launch & Business Operation Hub
              <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold rounded">
                COMMERCIAL RELEASE
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Support Center • Business Intelligence • Analytics • PWA & Mobile Store Distribution
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowOnboarding(true)}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-emerald-400 text-xs font-semibold rounded-xl transition flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" /> Pratinjau Onboarding
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-100 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Tab Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/80">
        <button
          onClick={() => setActiveTab('support')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition shrink-0 ${
            activeTab === 'support'
              ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 shadow-md shadow-emerald-950/20'
              : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <LifeBuoy className="w-4 h-4" /> Customer Support & Help Center
        </button>

        <button
          onClick={() => setActiveTab('bi')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition shrink-0 ${
            activeTab === 'bi'
              ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 shadow-md shadow-emerald-950/20'
              : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Business Intelligence & Analytics
        </button>

        <button
          onClick={() => setActiveTab('pwa')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition shrink-0 ${
            activeTab === 'pwa'
              ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 shadow-md shadow-emerald-950/20'
              : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Smartphone className="w-4 h-4" /> PWA & Mobile App Store Prep
        </button>
      </div>

      {/* Tab Body View */}
      <div className="pt-2">
        {activeTab === 'support' && <CustomerSupportCenter />}
        {activeTab === 'bi' && <BusinessIntelligenceDashboard />}
        {activeTab === 'pwa' && <PWAWrapperDistribution />}
      </div>

      {/* Onboarding Wizard Modal */}
      {showOnboarding && <OnboardingWizardModal onClose={() => setShowOnboarding(false)} />}
    </div>
  );
};
