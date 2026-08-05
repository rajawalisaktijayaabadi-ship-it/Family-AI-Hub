import React, { useState } from 'react';
import { useSubscriptionStore } from '../../stores/useSubscriptionStore';
import { useToastStore } from '../../stores/useToastStore';
import { BillingCycle, PlanModel, PaymentProviderType, PaymentMethodType } from '../../types/subscription';
import {
  Sparkles,
  Check,
  Zap,
  CreditCard,
  QrCode,
  ShieldCheck,
  Tag,
  Key,
  Clock,
  Gift,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export const SubscriptionPlansTab: React.FC = () => {
  const {
    plans,
    activeSubscription,
    selectedBillingCycle,
    selectedPlan,
    initiateCheckout,
    appliedCoupon,
    couponCodeInput,
    setCouponCodeInput,
    applyCoupon,
    removeCoupon,
    licenseKeyInput,
    setLicenseKeyInput,
    activateLicenseKey,
    selectedProvider,
    selectedPaymentMethod,
    referralCode,
    referralBonusBalance,
  } = useSubscriptionStore();

  const { addToast } = useToastStore();

  const [cycle, setCycle] = useState<BillingCycle>('monthly');

  const handleSelectPlan = (plan: PlanModel) => {
    initiateCheckout(plan, cycle);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const success = applyCoupon();
    if (success) {
      addToast('Kupon promo diskon berhasil dipasang!', 'success');
    } else {
      addToast('Kode kupon tidak valid atau sudah kadaluarsa', 'error');
    }
  };

  const handleActivateLicense = (e: React.FormEvent) => {
    e.preventDefault();
    const success = activateLicenseKey();
    if (success) {
      addToast('Lisensi resmi berhasil diaktifkan! Paket beralih ke Family Plus', 'success');
    } else {
      addToast('Kode lisensi tidak valid (minimal 8 karakter)', 'warning');
    }
  };

  return (
    <div className="space-y-4 text-xs font-sans">
      {/* Current Active Plan Badge */}
      <div className="p-3.5 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-600 text-white rounded-xl">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold block">
              Paket Aktif Saat Ini:
            </span>
            <span className="font-extrabold text-xs text-slate-800 dark:text-slate-100 uppercase tracking-wide">
              {activeSubscription.planId.replace('_', ' ')} ({activeSubscription.billingCycle})
            </span>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-extrabold border border-emerald-300">
          Status: {activeSubscription.status.toUpperCase()}
        </span>
      </div>

      {/* Monthly vs Yearly Switcher */}
      <div className="flex items-center justify-center p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setCycle('monthly')}
          className={`flex-1 py-2 text-center text-xs font-extrabold rounded-xl transition ${
            cycle === 'monthly'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Tagihan Bulanan
        </button>
        <button
          onClick={() => setCycle('yearly')}
          className={`flex-1 py-2 text-center text-xs font-extrabold rounded-xl transition flex items-center justify-center gap-1 ${
            cycle === 'yearly'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <span>Tagihan Tahunan</span>
          <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[9px] font-black">
            Hemat 20%
          </span>
        </button>
      </div>

      {/* Plan Cards */}
      <div className="space-y-3">
        {plans.map((plan) => {
          const isCurrentPlan = activeSubscription.planId === plan.id;
          const price = cycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;

          return (
            <div
              key={plan.id}
              className={`p-4 rounded-3xl border transition relative overflow-hidden ${
                plan.isPopular
                  ? 'bg-gradient-to-b from-emerald-900/10 via-white to-white dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-emerald-600 text-white px-3 py-1 rounded-bl-2xl text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
                  <Sparkles className="w-3 h-3" /> Rekomendasi
                </div>
              )}

              <div className="space-y-2">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{plan.tagline}</p>
                </div>

                <div className="flex items-baseline gap-1 pt-1">
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                    Rp {price.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    / {cycle === 'yearly' ? 'tahun' : 'bulan'}
                  </span>
                </div>

                {/* Features checklist */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleSelectPlan(plan)}
                  disabled={isCurrentPlan}
                  className={`w-full mt-3 py-2.5 rounded-2xl font-extrabold text-xs transition shadow-xs flex items-center justify-center gap-1.5 ${
                    isCurrentPlan
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                      : plan.isPopular
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                      : 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{isCurrentPlan ? 'Paket Aktif Anda' : 'Pilih & Lanjutkan Pembayaran'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Coupon Promo Voucher Card */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
        <h4 className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <Tag className="w-4 h-4 text-emerald-600" />
          Kupon Promo Diskon Pembayaran
        </h4>

        {appliedCoupon ? (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-300 flex items-center justify-between text-emerald-900 dark:text-emerald-200">
            <div>
              <span className="font-extrabold text-xs block">
                Voucher Terpasang: {appliedCoupon.code}
              </span>
              <span className="text-[10px]">{appliedCoupon.description}</span>
            </div>
            <button
              onClick={removeCoupon}
              className="text-[10px] font-bold text-red-600 hover:underline"
            >
              Hapus
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <input
              type="text"
              placeholder="Masukkan kode voucher (e.g. FAMILYID2026)"
              value={couponCodeInput}
              onChange={(e) => setCouponCodeInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs uppercase"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white font-extrabold rounded-xl hover:bg-emerald-700 transition"
            >
              Pasang
            </button>
          </form>
        )}
      </div>

      {/* License Key Activation Section */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
        <h4 className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <Key className="w-4 h-4 text-amber-500" />
          Aktivasi Lisensi Resmi (License Key)
        </h4>
        <form onSubmit={handleActivateLicense} className="flex gap-2">
          <input
            type="text"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            value={licenseKeyInput}
            onChange={(e) => setLicenseKeyInput(e.target.value)}
            className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs uppercase"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-amber-500 text-slate-950 font-extrabold rounded-xl hover:bg-amber-400 transition"
          >
            Aktivasi
          </button>
        </form>
      </div>

      {/* Referral Program Card */}
      <div className="p-4 bg-gradient-to-r from-teal-500/10 to-indigo-500/10 border border-teal-500/20 rounded-3xl space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Gift className="w-4 h-4 text-teal-600" />
            Program Referral Keluarga
          </h4>
          <span className="text-xs font-black text-emerald-600">
            Bonus: Rp {referralBonusBalance.toLocaleString('id-ID')}
          </span>
        </div>
        <p className="text-[10px] text-slate-500">
          Bagikan kode referral Anda ke keluarga lain. Dapatkan bonus saldo Rp 25.000 setiap kali teman mendaftar paket langganan!
        </p>
        <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="font-mono font-extrabold text-emerald-600 text-xs">
            {referralCode}
          </span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(referralCode);
              addToast('Kode referral disalin!', 'info');
            }}
            className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px] rounded-lg"
          >
            Salin Kode
          </button>
        </div>
      </div>
    </div>
  );
};
