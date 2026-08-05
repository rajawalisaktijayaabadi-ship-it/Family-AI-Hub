import React, { useState } from 'react';
import { WorkspaceManagerTab } from './WorkspaceManagerTab';
import { SubscriptionPlansTab } from './SubscriptionPlansTab';
import { BillingInvoiceTab } from './BillingInvoiceTab';
import { UsageStorageTab } from './UsageStorageTab';
import { AdminSaaSOverviewTab } from './AdminSaaSOverviewTab';
import { CheckoutModal } from './CheckoutModal';
import {
  Building2,
  Zap,
  FileText,
  HardDrive,
  BarChart3,
  ChevronLeft,
  ShieldCheck,
  Bot,
  CreditCard,
} from 'lucide-react';

interface SaaSPlatformHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export type SaaSTabType = 'workspaces' | 'plans' | 'billing' | 'usage' | 'admin';

export const SaaSPlatformHub: React.FC<SaaSPlatformHubProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<SaaSTabType>('plans');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 flex flex-col font-sans max-w-md mx-auto select-none overflow-hidden">
      {/* Top Header Navigation */}
      <div className="px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 shadow-xs z-30">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onClose}
            className="p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
            title="Tutup SaaS Platform"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center font-bold shadow-xs">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-extrabold font-heading text-slate-900 dark:text-white leading-tight">
                SaaS Enterprise & Billing Hub
              </h2>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                Multi-Tenant • Payment Indonesia Gateway
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Viewport Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 relative">
        {activeTab === 'workspaces' && <WorkspaceManagerTab />}
        {activeTab === 'plans' && <SubscriptionPlansTab />}
        {activeTab === 'billing' && <BillingInvoiceTab />}
        {activeTab === 'usage' && <UsageStorageTab />}
        {activeTab === 'admin' && <AdminSaaSOverviewTab />}
      </div>

      {/* Sub-navigation Bottom Bar inside Hub */}
      <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-3 py-2 flex items-center justify-around text-slate-500 dark:text-slate-400 font-bold shrink-0 z-30 text-[10px]">
        <button
          onClick={() => setActiveTab('workspaces')}
          className={`flex flex-col items-center gap-0.5 transition ${
            activeTab === 'workspaces' ? 'text-emerald-600 font-extrabold' : 'hover:text-slate-700'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Tenant</span>
        </button>

        <button
          onClick={() => setActiveTab('plans')}
          className={`flex flex-col items-center gap-0.5 transition ${
            activeTab === 'plans' ? 'text-emerald-600 font-extrabold' : 'hover:text-slate-700'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Paket</span>
        </button>

        <button
          onClick={() => setActiveTab('billing')}
          className={`flex flex-col items-center gap-0.5 transition ${
            activeTab === 'billing' ? 'text-emerald-600 font-extrabold' : 'hover:text-slate-700'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Invoice</span>
        </button>

        <button
          onClick={() => setActiveTab('usage')}
          className={`flex flex-col items-center gap-0.5 transition ${
            activeTab === 'usage' ? 'text-emerald-600 font-extrabold' : 'hover:text-slate-700'
          }`}
        >
          <HardDrive className="w-4 h-4" />
          <span>Kuota</span>
        </button>

        <button
          onClick={() => setActiveTab('admin')}
          className={`flex flex-col items-center gap-0.5 transition ${
            activeTab === 'admin' ? 'text-emerald-600 font-extrabold' : 'hover:text-slate-700'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Admin</span>
        </button>
      </div>

      {/* Checkout Payment Gateway Modal */}
      <CheckoutModal />
    </div>
  );
};
