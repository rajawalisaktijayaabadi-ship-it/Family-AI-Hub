import React, { useState } from 'react';
import { useSubscriptionStore } from '../../stores/useSubscriptionStore';
import { useToastStore } from '../../stores/useToastStore';
import { PaymentProviderType, PaymentMethodType } from '../../types/subscription';
import {
  CreditCard,
  QrCode,
  Building2,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Clock,
  ExternalLink,
  ChevronLeft,
  X,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isPaymentModalOpen,
    closePaymentModal,
    selectedPlan,
    selectedBillingCycle,
    activeTransaction,
    activeInstruction,
    appliedCoupon,
    simulatePaymentSuccess,
  } = useSubscriptionStore();

  const { addToast } = useToastStore();

  const [provider, setProvider] = useState<PaymentProviderType>('midtrans');
  const [method, setMethod] = useState<PaymentMethodType>('qris');

  if (!isPaymentModalOpen || !selectedPlan || !activeTransaction) return null;

  const rawAmount =
    selectedBillingCycle === 'yearly'
      ? selectedPlan.priceYearly
      : selectedPlan.priceLifetime || selectedPlan.priceMonthly;

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercentage) {
      discount = (rawAmount * appliedCoupon.discountPercentage) / 100;
    } else if (appliedCoupon.discountAmount) {
      discount = appliedCoupon.discountAmount;
    }
  }

  const netAmount = Math.max(0, rawAmount - discount);
  const tax = Math.round(netAmount * 0.11);
  const totalPay = netAmount + tax;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    addToast(`${label} disalin!`, 'info');
  };

  const handleSimulatePay = () => {
    simulatePaymentSuccess();
    addToast(`Pembayaran Rp ${totalPay.toLocaleString('id-ID')} Berhasil! Lisensi Paket Aktif`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden shadow-2xl font-sans text-xs">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-white/20 backdrop-blur-md">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm leading-tight">
                Pembayaran Indonesia Gateway
              </h3>
              <p className="text-[10px] text-teal-100 font-semibold">
                Snap Midtrans • Xendit • QRIS Instant Settlement
              </p>
            </div>
          </div>
          <button
            onClick={closePaymentModal}
            className="p-1.5 rounded-xl bg-white/20 text-white hover:bg-white/30"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {/* Order Summary Box */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-2">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-2">
              <div>
                <span className="font-black text-sm text-slate-900 dark:text-white block">
                  {selectedPlan.name}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase">
                  Siklus: {selectedBillingCycle}
                </span>
              </div>
              <span className="font-extrabold text-xs text-emerald-600">
                Rp {rawAmount.toLocaleString('id-ID')}
              </span>
            </div>

            {appliedCoupon && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Diskon Kupon ({appliedCoupon.code})</span>
                <span>- Rp {discount.toLocaleString('id-ID')}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-500 font-medium">
              <span>PPN 11% (Pajak Pertambahan Nilai)</span>
              <span>+ Rp {tax.toLocaleString('id-ID')}</span>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-sm font-black text-slate-900 dark:text-white">
              <span>Total Tagihan Pembayaran:</span>
              <span className="text-emerald-600 dark:text-emerald-400 text-base">
                Rp {totalPay.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Payment Method Details / Instructions */}
          {activeInstruction && (
            <div className="p-4 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-3xl border border-emerald-300 dark:border-emerald-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Instruksi Pembayaran Gateway
                </span>
                <span className="text-[10px] text-slate-500 font-mono font-bold">
                  Batas: 24 Jam
                </span>
              </div>

              {/* QRIS Image Display */}
              {activeInstruction.qrCodeUrl && (
                <div className="bg-white p-3 rounded-2xl border border-slate-200 text-center space-y-2 max-w-[200px] mx-auto shadow-sm">
                  <img
                    src={activeInstruction.qrCodeUrl}
                    alt="QRIS Payment Code"
                    className="w-40 h-40 mx-auto"
                  />
                  <span className="text-[10px] font-bold text-slate-700 block">
                    Scan dengan GoPay, OVO, ShopeePay, DANA, BCA / Mandiri Mobile
                  </span>
                </div>
              )}

              {/* Virtual Account Number */}
              {activeInstruction.vaNumber && (
                <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold block">
                    Nomor Virtual Account (VA):
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-black text-emerald-600 tracking-wider">
                      {activeInstruction.vaNumber}
                    </span>
                    <button
                      onClick={() => handleCopy(activeInstruction.vaNumber!, 'Nomor VA')}
                      className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-xl font-bold text-[10px] flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" /> Salin
                    </button>
                  </div>
                </div>
              )}

              {/* Steps List */}
              <div className="space-y-1.5 pt-1">
                <span className="font-bold text-[11px] text-slate-800 dark:text-slate-200">
                  Langkah-Langkah Penyelesaian:
                </span>
                {activeInstruction.instructions.map((step, idx) => (
                  <div key={idx} className="flex gap-2 text-[10px] text-slate-700 dark:text-slate-300">
                    <span className="font-bold text-emerald-600 shrink-0">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Test Action for Immediate Simulation */}
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-300 text-amber-900 dark:text-amber-200 space-y-2">
            <div className="flex items-center gap-1.5 font-bold">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Mode Uji Coba Sandbox Gateway Indonesia</span>
            </div>
            <p className="text-[10px]">
              Klik tombol di bawah untuk menyimulasikan konfirmasi otomatis dari Webhook Midtrans/Xendit secara real-time.
            </p>
            <button
              onClick={handleSimulatePay}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simulasikan Pembayaran Berhasil</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
