import React, { useState } from 'react';
import { useCommercialStore } from '../../stores/useCommercialStore';
import { TrendingUp, Users, DollarSign, Activity, Gift, Megaphone, Sliders, Play, CheckCircle2, Ticket } from 'lucide-react';

export const BusinessIntelligenceDashboard: React.FC = () => {
  const { metrics, campaigns, loyaltyBadges, userLoyaltyPoints, claimCampaignVoucher } = useCommercialStore();
  const [voucherInput, setVoucherInput] = useState('');
  const [claimMsg, setClaimMsg] = useState<string | null>(null);

  const handleClaimVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherInput.trim()) return;

    const success = claimCampaignVoucher(voucherInput);
    if (success) {
      setClaimMsg('Voucher berhasil diklaim! +150 Poin Loyaltas ditambahkan.');
      setVoucherInput('');
    } else {
      setClaimMsg('Kode voucher tidak valid atau sudah kedaluwarsa.');
    }
    setTimeout(() => setClaimMsg(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* SaaS BI Revenue & Growth Overview Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-emerald-400" /> Active Users (DAU / MAU)
          </span>
          <div className="text-xl font-bold text-slate-100">{metrics.dau} / {metrics.mau}</div>
          <span className="text-[10px] text-emerald-400">7-Day Retention: {metrics.retention7DayPct}%</span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-sky-400" /> Monthly Recurring Revenue
          </span>
          <div className="text-xl font-bold text-sky-400">Rp {(metrics.mrrRp / 1000000).toFixed(0)} Jt</div>
          <span className="text-[10px] text-slate-400">ARR: Rp {(metrics.arrRp / 1000000000).toFixed(2)} Milyar</span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-purple-400" /> Conversion Rate
          </span>
          <div className="text-xl font-bold text-purple-400">{metrics.conversionRatePct}%</div>
          <span className="text-[10px] text-slate-400">Free to Pro Family Upgrade</span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-rose-400" /> Subscription Churn Rate
          </span>
          <div className="text-xl font-bold text-slate-100">{metrics.churnRatePct}%</div>
          <span className="text-[10px] text-emerald-400">Rendah (Sangat Sehat)</span>
        </div>
      </div>

      {/* Marketing Campaigns & Voucher Redemptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Active Promos & Vouchers */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-emerald-400" /> Kampanye Marketing & Voucher Diskon
          </h3>

          <form onSubmit={handleClaimVoucher} className="flex gap-2">
            <input
              type="text"
              value={voucherInput}
              onChange={(e) => setVoucherInput(e.target.value)}
              placeholder="Masukkan kode voucher (e.g. FAMILYINDONESIA2026)..."
              className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 uppercase font-mono focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg transition shrink-0"
            >
              Klaim
            </button>
          </form>

          {claimMsg && (
            <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-emerald-300">
              {claimMsg}
            </div>
          )}

          <div className="space-y-2 pt-1">
            {campaigns.map((cmp) => (
              <div key={cmp.id} className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs font-bold text-emerald-400">{cmp.code}</span>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-300 rounded text-[10px] font-semibold">
                    Diskon {cmp.discountPct}%
                  </span>
                </div>
                <h5 className="text-xs font-semibold text-slate-200">{cmp.title}</h5>
                <p className="text-[11px] text-slate-400">{cmp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Loyalty & Gamification Rewards */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Gift className="w-4 h-4 text-amber-400" /> Program Loyaltas & Pencapaian Keluarga
            </h3>
            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold rounded-full">
              {userLoyaltyPoints} Poin
            </span>
          </div>

          <div className="space-y-2">
            {loyaltyBadges.map((bdg) => (
              <div
                key={bdg.id}
                className={`p-3 rounded-lg border flex items-center justify-between text-xs ${
                  bdg.isUnlocked
                    ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
                    : 'bg-slate-950 border-slate-800 opacity-60'
                }`}
              >
                <div>
                  <h5 className="font-bold text-slate-200">{bdg.title}</h5>
                  <p className="text-[11px] text-slate-400">{bdg.description}</p>
                </div>
                {bdg.isUnlocked ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <span className="text-[10px] text-slate-500">Terkunci</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* A/B Testing & Remote Configuration */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-emerald-400" /> A/B Testing & Dynamic Remote Config Engine
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 block font-mono">EXP_HERO_CTA_V2</span>
            <p className="text-xs font-semibold text-slate-200">A/B Test Tombol Langganan</p>
            <span className="text-[10px] text-emerald-400">Variant B (50% Rollout)</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 block font-mono">CONFIG_GEMINI_MODEL</span>
            <p className="text-xs font-semibold text-slate-200">Model Default AI</p>
            <span className="text-[10px] text-sky-400">gemini-2.5-flash (Remote)</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 block font-mono">PROMO_BANNER_GLOBAL</span>
            <p className="text-xs font-semibold text-slate-200">Spanduk Promo Hari Merdeka</p>
            <span className="text-[10px] text-amber-400">Aktif (Target: All User)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
