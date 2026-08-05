import React, { useState } from 'react';
import { useSubscriptionStore } from '../../stores/useSubscriptionStore';
import { useToastStore } from '../../stores/useToastStore';
import { InvoiceModel } from '../../types/subscription';
import {
  FileText,
  Download,
  Printer,
  CheckCircle2,
  Clock,
  Building2,
  ShieldCheck,
  ChevronRight,
  Eye,
} from 'lucide-react';

export const BillingInvoiceTab: React.FC = () => {
  const { invoices, activeInvoiceDetail, setActiveInvoiceDetail } = useSubscriptionStore();
  const { addToast } = useToastStore();

  const [npwp, setNpwp] = useState('01.234.567.8-012.000');
  const [billingEmail, setBillingEmail] = useState('keluarga.rahardjo@email.com');

  const handleDownloadPdf = (inv: InvoiceModel) => {
    addToast(`Mengunduh Invoice ${inv.invoiceNumber} (PDF format)...`, 'success');
  };

  const handlePrint = (inv: InvoiceModel) => {
    window.print();
  };

  return (
    <div className="space-y-4 text-xs font-sans">
      {/* NPWP & Billing Email Config Card */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
        <h4 className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <Building2 className="w-4 h-4 text-emerald-600" />
          Informasi Tagihan & Faktur Pajak (NPWP)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] font-bold text-slate-500">Email Penerima Invoice:</label>
            <input
              type="email"
              value={billingEmail}
              onChange={(e) => setBillingEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500">Nomor NPWP / NIK Pajak:</label>
            <input
              type="text"
              value={npwp}
              onChange={(e) => setNpwp(e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono"
            />
          </div>
        </div>
      </div>

      {/* Invoices History Table List */}
      <div className="space-y-2">
        <h4 className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-emerald-600" />
          Riwayat Transaksi & Invoice Pembayaran ({invoices.length})
        </h4>

        <div className="space-y-2">
          {invoices.map((inv) => (
            <div
              key={inv.id}
              className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono font-extrabold text-xs text-slate-900 dark:text-white block">
                    {inv.invoiceNumber}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {inv.planName} • {inv.issueDate}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-[9px] border border-emerald-300">
                  {inv.status.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[10px] text-slate-500">
                  Total: <span className="font-bold text-slate-800 dark:text-slate-100">Rp {inv.totalAmount.toLocaleString('id-ID')}</span> (Metode: {inv.paymentMethod})
                </div>

                <div className="flex gap-1.5">
                  <button
                    onClick={() => setActiveInvoiceDetail(inv)}
                    className="p-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-bold text-[10px] hover:bg-slate-200 flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" /> Detail
                  </button>
                  <button
                    onClick={() => handleDownloadPdf(inv)}
                    className="p-1.5 bg-emerald-600 text-white rounded-lg font-bold text-[10px] hover:bg-emerald-700 flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" /> PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Invoice Drawer Modal */}
      {activeInvoiceDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 w-full max-w-sm space-y-4 shadow-xl font-sans text-xs">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Invoice Resmi FamilyAI
                </h3>
                <span className="font-mono text-[10px] text-slate-500">
                  {activeInvoiceDetail.invoiceNumber}
                </span>
              </div>
              <button
                onClick={() => setActiveInvoiceDetail(null)}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Workspace:</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">
                  {activeInvoiceDetail.workspaceName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Paket Langganan:</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">
                  {activeInvoiceDetail.planName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tanggal Bayar:</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">
                  {activeInvoiceDetail.paidAt || activeInvoiceDetail.issueDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Metode Pembayaran:</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">
                  {activeInvoiceDetail.paymentMethod}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal Dasar:</span>
                  <span>Rp {activeInvoiceDetail.amount.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>PPN (11%):</span>
                  <span>Rp {activeInvoiceDetail.taxAmount.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between font-extrabold text-sm text-emerald-600 pt-1 border-t">
                  <span>Total Dibayar:</span>
                  <span>Rp {activeInvoiceDetail.totalAmount.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => handlePrint(activeInvoiceDetail)}
                className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl flex items-center justify-center gap-1"
              >
                <Printer className="w-3.5 h-3.5" /> Cetak
              </button>
              <button
                onClick={() => handleDownloadPdf(activeInvoiceDetail)}
                className="flex-1 py-2 bg-emerald-600 text-white font-extrabold rounded-xl flex items-center justify-center gap-1 hover:bg-emerald-700"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
