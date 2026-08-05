import { create } from 'zustand';
import {
  PlanModel,
  SubscriptionModel,
  InvoiceModel,
  PaymentTransactionModel,
  PaymentProviderType,
  PaymentMethodType,
  PlanId,
  BillingCycle,
  CouponModel,
  UsageModel,
  QuotaLimits,
} from '../types/subscription';
import { SubscriptionService } from '../services/saas/SubscriptionService';
import { PaymentFactory } from '../services/saas/PaymentFactory';
import { PaymentInstruction } from '../services/saas/PaymentProvider';

export interface MultiTenantWorkspace {
  id: string;
  name: string;
  type: string;
  role: 'Owner' | 'Admin' | 'Parent' | 'Child' | 'Guest';
  memberCount: number;
  icon: string;
  isCurrent: boolean;
}

interface SubscriptionStoreState {
  // Multi-Tenant Workspaces
  workspaces: MultiTenantWorkspace[];
  activeWorkspaceId: string;
  switchWorkspace: (workspaceId: string) => void;
  createWorkspace: (name: string, type: string) => void;
  inviteMember: (email: string, role: MultiTenantWorkspace['role']) => void;

  // Subscription & Plans
  plans: PlanModel[];
  activeSubscription: SubscriptionModel;
  usage: UsageModel;
  
  // Checkout & Payment State
  selectedPlan: PlanModel | null;
  selectedBillingCycle: BillingCycle;
  selectedProvider: PaymentProviderType;
  selectedPaymentMethod: PaymentMethodType;
  appliedCoupon: CouponModel | null;
  couponCodeInput: string;
  setCouponCodeInput: (code: string) => void;
  applyCoupon: () => boolean;
  removeCoupon: () => void;

  // Active Checkout Processing
  isCheckoutLoading: boolean;
  activeTransaction: PaymentTransactionModel | null;
  activeInstruction: PaymentInstruction | null;
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (open: boolean) => void;
  initiateCheckout: (plan: PlanModel, cycle?: BillingCycle) => Promise<void>;
  simulatePaymentSuccess: () => void;
  closePaymentModal: () => void;

  // Invoices & Billing
  invoices: InvoiceModel[];
  activeInvoiceDetail: InvoiceModel | null;
  setActiveInvoiceDetail: (invoice: InvoiceModel | null) => void;

  // License & Referral
  licenseKeyInput: string;
  setLicenseKeyInput: (key: string) => void;
  activateLicenseKey: () => boolean;

  referralCode: string;
  referralBonusBalance: number;
  referralHistory: Array<{ date: string; userEmail: string; amount: number }>;

  // Usage Quota Checks
  isQuotaExceeded: (metric: keyof QuotaLimits) => boolean;

  // System Init
  loadSubscriptionData: () => void;
}

export const useSubscriptionStore = create<SubscriptionStoreState>((set, get) => ({
  workspaces: [
    {
      id: 'fam_rahardjo',
      name: 'Keluarga Rahardjo Utama',
      type: 'Keluarga Inti',
      role: 'Owner',
      memberCount: 5,
      icon: '🏡',
      isCurrent: true,
    },
    {
      id: 'fam_besar_solo',
      name: 'Keluarga Besar Solo',
      type: 'Keluarga Besar',
      role: 'Admin',
      memberCount: 14,
      icon: '🌳',
      isCurrent: false,
    },
    {
      id: 'fam_kakek_nenek',
      name: 'Trajumas Kakek Nenek',
      type: 'Orang Tua',
      role: 'Parent',
      memberCount: 8,
      icon: '👴',
      isCurrent: false,
    },
  ],
  activeWorkspaceId: 'fam_rahardjo',

  plans: SubscriptionService.DEFAULT_PLANS,
  activeSubscription: SubscriptionService.getActiveSubscription('fam_rahardjo'),
  usage: SubscriptionService.getUsage('fam_rahardjo'),

  selectedPlan: null,
  selectedBillingCycle: 'monthly',
  selectedProvider: 'midtrans',
  selectedPaymentMethod: 'qris',
  appliedCoupon: null,
  couponCodeInput: '',

  isCheckoutLoading: false,
  activeTransaction: null,
  activeInstruction: null,
  isPaymentModalOpen: false,

  invoices: [
    {
      id: 'inv_109281',
      invoiceNumber: 'INV/2026/FAI/08/109281',
      workspaceId: 'fam_rahardjo',
      workspaceName: 'Keluarga Rahardjo Utama',
      planName: 'Family Premium Pro (Bulanan)',
      amount: 79000,
      taxAmount: 8690,
      totalAmount: 87690,
      status: 'paid',
      issueDate: '2026-07-20',
      dueDate: '2026-07-20',
      paidAt: '2026-07-20 14:22:10',
      paymentMethod: 'Midtrans QRIS',
    },
    {
      id: 'inv_104412',
      invoiceNumber: 'INV/2026/FAI/06/104412',
      workspaceId: 'fam_rahardjo',
      workspaceName: 'Keluarga Rahardjo Utama',
      planName: 'Family Starter (Bulanan)',
      amount: 29000,
      taxAmount: 3190,
      totalAmount: 32190,
      status: 'paid',
      issueDate: '2026-06-20',
      dueDate: '2026-06-20',
      paidAt: '2026-06-20 09:15:43',
      paymentMethod: 'BCA Virtual Account',
    },
  ],
  activeInvoiceDetail: null,

  licenseKeyInput: '',
  referralCode: 'RAHARDJO2026',
  referralBonusBalance: 75000,
  referralHistory: [
    { date: '2026-07-15', userEmail: 'budi.santoso@email.com', amount: 25000 },
    { date: '2026-07-28', userEmail: 'dewi.lestari@email.com', amount: 25000 },
    { date: '2026-08-01', userEmail: 'hendra.kurniawan@email.com', amount: 25000 },
  ],

  setCouponCodeInput: (code) => set({ couponCodeInput: code }),

  applyCoupon: () => {
    const { couponCodeInput } = get();
    const coupon = SubscriptionService.validateCoupon(couponCodeInput);
    if (coupon) {
      set({ appliedCoupon: coupon });
      return true;
    }
    return false;
  },

  removeCoupon: () => set({ appliedCoupon: null, couponCodeInput: '' }),

  switchWorkspace: (workspaceId) => {
    const { workspaces } = get();
    const updated = workspaces.map((w) => ({
      ...w,
      isCurrent: w.id === workspaceId,
    }));
    const sub = SubscriptionService.getActiveSubscription(workspaceId);
    const use = SubscriptionService.getUsage(workspaceId);

    set({
      workspaces: updated,
      activeWorkspaceId: workspaceId,
      activeSubscription: sub,
      usage: use,
    });
  },

  createWorkspace: (name, type) => {
    const newWs: MultiTenantWorkspace = {
      id: `ws_${Date.now()}`,
      name,
      type,
      role: 'Owner',
      memberCount: 1,
      icon: '🏠',
      isCurrent: true,
    };
    const { workspaces } = get();
    const updated = workspaces.map((w) => ({ ...w, isCurrent: false })).concat(newWs);
    set({
      workspaces: updated,
      activeWorkspaceId: newWs.id,
    });
  },

  inviteMember: (email, role) => {
    const { workspaces, activeWorkspaceId } = get();
    const updated = workspaces.map((w) =>
      w.id === activeWorkspaceId ? { ...w, memberCount: w.memberCount + 1 } : w
    );
    set({ workspaces: updated });
  },

  setIsPaymentModalOpen: (open) => set({ isPaymentModalOpen: open }),
  setActiveInvoiceDetail: (invoice) => set({ activeInvoiceDetail: invoice }),
  setLicenseKeyInput: (key) => set({ licenseKeyInput: key }),

  initiateCheckout: async (plan, cycle = 'monthly') => {
    set({ isCheckoutLoading: true, selectedPlan: plan, selectedBillingCycle: cycle });

    const { selectedProvider, selectedPaymentMethod, appliedCoupon, activeWorkspaceId } = get();
    let rawAmount = cycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;
    if (cycle === 'lifetime') rawAmount = plan.priceLifetime || 1999000;

    if (appliedCoupon) {
      if (appliedCoupon.discountPercentage) {
        rawAmount = rawAmount - (rawAmount * appliedCoupon.discountPercentage) / 100;
      } else if (appliedCoupon.discountAmount) {
        rawAmount = Math.max(0, rawAmount - appliedCoupon.discountAmount);
      }
    }

    const provider = PaymentFactory.getProvider(selectedProvider);
    const { transaction, instruction } = await provider.createTransaction({
      workspaceId: activeWorkspaceId,
      planId: plan.id,
      planName: plan.name,
      amount: rawAmount,
      billingCycle: cycle,
      paymentMethod: selectedPaymentMethod,
      customerEmail: 'keluarga.rahardjo@email.com',
      customerName: 'Keluarga Rahardjo',
    });

    set({
      isCheckoutLoading: false,
      activeTransaction: transaction,
      activeInstruction: instruction,
      isPaymentModalOpen: true,
    });
  },

  simulatePaymentSuccess: () => {
    const { activeTransaction, activeWorkspaceId, selectedPlan, selectedBillingCycle, invoices } = get();
    if (!activeTransaction || !selectedPlan) return;

    const newSub: SubscriptionModel = {
      id: `sub_${Date.now()}`,
      workspaceId: activeWorkspaceId,
      planId: selectedPlan.id,
      status: 'active',
      billingCycle: selectedBillingCycle,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      autoRenew: true,
      paymentMethod: `${activeTransaction.provider.toUpperCase()} (${activeTransaction.paymentMethod})`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    SubscriptionService.saveSubscription(newSub);

    // Create Invoice record
    const taxAmount = Math.round(activeTransaction.amount * 0.11);
    const newInvoice: InvoiceModel = {
      id: `inv_${Date.now()}`,
      invoiceNumber: `INV/2026/FAI/${String(new Date().getMonth() + 1).padStart(2, '0')}/${Math.floor(
        100000 + Math.random() * 900000
      )}`,
      workspaceId: activeWorkspaceId,
      workspaceName: 'Keluarga Rahardjo Utama',
      planName: `${selectedPlan.name} (${selectedBillingCycle === 'yearly' ? 'Tahunan' : 'Bulanan'})`,
      amount: activeTransaction.amount,
      taxAmount,
      totalAmount: activeTransaction.amount + taxAmount,
      status: 'paid',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date().toISOString().split('T')[0],
      paidAt: new Date().toISOString(),
      paymentMethod: newSub.paymentMethod,
    };

    set({
      activeSubscription: newSub,
      invoices: [newInvoice, ...invoices],
      isPaymentModalOpen: false,
      activeTransaction: null,
      activeInstruction: null,
      appliedCoupon: null,
    });
  },

  closePaymentModal: () => {
    set({ isPaymentModalOpen: false, activeTransaction: null, activeInstruction: null });
  },

  activateLicenseKey: () => {
    const { licenseKeyInput, activeWorkspaceId } = get();
    if (licenseKeyInput.trim().length < 8) return false;

    const newSub: SubscriptionModel = {
      id: `sub_license_${Date.now()}`,
      workspaceId: activeWorkspaceId,
      planId: 'family_plus',
      status: 'active',
      billingCycle: 'yearly',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      autoRenew: false,
      paymentMethod: 'Voucher License Key',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    SubscriptionService.saveSubscription(newSub);
    set({ activeSubscription: newSub, licenseKeyInput: '' });
    return true;
  },

  isQuotaExceeded: (metric) => {
    const { activeSubscription, plans, usage } = get();
    const currentPlan = plans.find((p) => p.id === activeSubscription.planId) || plans[0];
    const limit = currentPlan.quotaLimits[metric];

    if (metric === 'aiTokensPerDay') return usage.aiTokensUsedToday >= limit;
    if (metric === 'storageGB') return usage.storageUsedBytes >= limit * 1024 * 1024 * 1024;
    return false;
  },

  loadSubscriptionData: () => {
    const { activeWorkspaceId } = get();
    const sub = SubscriptionService.getActiveSubscription(activeWorkspaceId);
    const use = SubscriptionService.getUsage(activeWorkspaceId);
    set({ activeSubscription: sub, usage: use });
  },
}));
