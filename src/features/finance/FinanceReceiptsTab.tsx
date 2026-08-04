import React, { useState } from 'react';
import { useFinanceStore } from '../../stores/useFinanceStore';
import { ReportService } from '../../services/ReportService';
import { FinancialReportModel } from '../../types/finance';
import { Camera, FileSpreadsheet, CheckCircle, UploadCloud, RefreshCw, BarChart2, ShieldCheck } from 'lucide-react';

const reportService = new ReportService();

export const FinanceReceiptsTab: React.FC = () => {
  const { receipts, addReceipt, cashFlow, expenses } = useFinanceStore();

  const [isScanning, setIsScanning] = useState(false);
  const [report, setReport] = useState<FinancialReportModel | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'Daily' | 'Weekly' | 'Monthly' | 'Yearly'>('Monthly');

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(async () => {
      const merchants = ['Supermarket Hero', 'Apotek Kimia Farma', 'SPBU Pertamina 31.101', 'Resto Sederhana'];
      const categories: any = ['Food', 'Health', 'Utilities', 'Food'];
      const randomIdx = Math.floor(Math.random() * merchants.length);
      const randomAmt = Math.floor(Math.random() * 300000) + 45000;

      await addReceipt({
        merchant: merchants[randomIdx],
        amount: randomAmt,
        date: new Date().toISOString().split('T')[0],
        category: categories[randomIdx],
      });

      setIsScanning(false);
    }, 1500);
  };

  const handleGenerateReport = async () => {
    const rpt = await reportService.generateReport(selectedPeriod, cashFlow, expenses);
    setReport(rpt);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Receipt Scanner OCR Simulation */}
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-600 text-white">
              <Camera className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Pemindai Struk Belanja (OCR Simulation)</h3>
              <p className="text-xs text-slate-500">Ekstraksi otomatis nama toko, nominal & tanggal</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleSimulateScan}
          disabled={isScanning}
          className="w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-emerald-400 bg-white p-6 text-emerald-700 hover:bg-emerald-50/50 transition active:scale-[0.99]"
        >
          {isScanning ? (
            <>
              <RefreshCw className="h-5 w-5 animate-spin text-emerald-600" />
              <span className="text-xs font-bold">Menganalisis Struk dengan OCR AI...</span>
            </>
          ) : (
            <>
              <UploadCloud className="h-6 w-6 text-emerald-600" />
              <span className="text-xs font-bold">Ambil Foto / Upload Struk Belanja</span>
            </>
          )}
        </button>

        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-800">Daftar Struk Terverifikasi</h4>
          {receipts.map((rcp) => (
            <div key={rcp.id} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <div>
                  <p className="text-xs font-bold text-slate-900">{rcp.merchant}</p>
                  <p className="text-[11px] text-slate-500">{rcp.date} • {rcp.category}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-900">{formatIDR(rcp.amount)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Analytics & Report Generator */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-emerald-600" />
              <span>Laporan & Analisis Keuangan</span>
            </h3>
            <p className="text-xs text-slate-500">Generate rangkuman kesehatan finansial keluarga</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
          {(['Daily', 'Weekly', 'Monthly', 'Yearly'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition ${
                selectedPeriod === period ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600'
              }`}
            >
              {period === 'Daily' ? 'Harian' : period === 'Weekly' ? 'Mingguan' : period === 'Monthly' ? 'Bulanan' : 'Tahunan'}
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerateReport}
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-slate-900 p-3.5 text-xs font-bold text-white shadow-md hover:bg-slate-800 transition"
        >
          <FileSpreadsheet className="h-4 w-4 text-emerald-400" />
          <span>Buat Laporan Keuangan ({selectedPeriod})</span>
        </button>

        {report && (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Laporan Keuangan {report.period}</h4>
                <p className="text-[11px] text-slate-500">Dibuat pada: {new Date(report.generatedAt).toLocaleDateString('id-ID')}</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                Skor: {report.financialHealthScore}/100
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-slate-50 p-3">
                <span className="text-slate-500">Total Pemasukan:</span>
                <p className="font-bold text-emerald-700 text-sm mt-0.5">{formatIDR(report.totalIncome)}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <span className="text-slate-500">Total Pengeluaran:</span>
                <p className="font-bold text-rose-600 text-sm mt-0.5">{formatIDR(report.totalExpense)}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <span className="text-slate-500">Net Tabungan:</span>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{formatIDR(report.netSavings)}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <span className="text-slate-500">Pengeluaran Terbesar:</span>
                <p className="font-bold text-indigo-700 text-sm mt-0.5">{report.topExpenseCategory}</p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 font-medium italic">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Laporan ini dibuat otomatis menggunakan Mock AI Engine.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
