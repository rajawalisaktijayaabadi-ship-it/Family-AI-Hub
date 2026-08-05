import React, { useEffect, useState } from 'react';
import { useProtectionStore } from '../../stores/useProtectionStore';
import { InsuranceOverviewTab } from './InsuranceOverviewTab';
import { DocumentVaultTab } from './DocumentVaultTab';
import { EmergencyTab } from './EmergencyTab';
import { RenewalTrackerTab } from './RenewalTrackerTab';
import { ProtectionAnalyticsTab } from './ProtectionAnalyticsTab';
import {
  ShieldCheck,
  FolderLock,
  Siren,
  RefreshCw,
  BarChart3,
  X,
  Plus,
  Check,
} from 'lucide-react';
import {
  PolicyType,
  DocumentCategory,
  RenewalType,
} from '../../types/protection';

type SubTab = 'overview' | 'vault' | 'emergency' | 'renewals' | 'analytics';

export const ProtectionHomeScreen: React.FC = () => {
  const {
    initialize,
    isLoading,
    addPolicy,
    addClaim,
    addDocument,
    folders,
    addEmergencyContact,
    addRenewal,
  } = useProtectionStore();

  const [activeTab, setActiveTab] = useState<SubTab>('overview');

  // Modal States
  const [showAddPolicyModal, setShowAddPolicyModal] = useState(false);
  const [showAddClaimModal, setShowAddClaimModal] = useState(false);
  const [showAddDocModal, setShowAddDocModal] = useState(false);
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [showAddRenewalModal, setShowAddRenewalModal] = useState(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Policy Form State
  const [policyForm, setPolicyForm] = useState({
    policyNumber: '',
    policyName: '',
    category: 'Kesehatan' as PolicyType,
    companyName: '',
    policyHolder: 'Hendra Wijaya',
    insuredPerson: 'Hendra Wijaya',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '2028-12-31',
    status: 'Active' as const,
    amount: 1500000,
    sumAssured: 1000000000,
  });

  // Document Form State
  const [docForm, setDocForm] = useState({
    title: '',
    category: 'KTP' as DocumentCategory,
    ownerName: 'Hendra Wijaya',
    documentNumber: '',
    expiryDate: '',
    folderId: 'fld-1',
    tags: 'Penting, Utama',
  });

  // Emergency Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    relationship: '',
    phoneNumber: '',
    address: '',
    priority: 'Primary' as const,
  });

  // Renewal Form State
  const [renewalForm, setRenewalForm] = useState({
    title: '',
    type: 'Passport' as RenewalType,
    dueDate: new Date().toISOString().split('T')[0],
    reminderDaysBefore: 30,
    costEstimate: 500000,
  });

  const handleCreatePolicy = async (e: React.FormEvent) => {
    e.preventDefault();
    await addPolicy({
      policyNumber: policyForm.policyNumber || `POL-${Date.now().toString().slice(-6)}`,
      policyName: policyForm.policyName,
      category: policyForm.category,
      companyName: policyForm.companyName,
      policyHolder: policyForm.policyHolder,
      insuredPerson: policyForm.insuredPerson,
      startDate: policyForm.startDate,
      endDate: policyForm.endDate,
      status: policyForm.status,
      premium: {
        amount: Number(policyForm.amount),
        paymentMethod: 'Transfer Bank',
        frequency: 'Monthly',
        dueDate: '2026-09-01',
        isPaid: false,
        paymentHistory: [],
      },
      coverage: {
        sumAssured: Number(policyForm.sumAssured),
        benefits: ['Pengantian Biaya Rawat Inap & ICU Sesuai Tagihan'],
        exclusions: ['Penyakit Pre-existing'],
        waitingPeriodDays: 30,
      },
      beneficiaries: [
        { id: 'b1', name: 'Ratna Saraswati', relationship: 'Istri', percentage: 100, contact: '081299881122' },
      ],
    });
    setShowAddPolicyModal(false);
  };

  const handleCreateDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDocument({
      title: docForm.title,
      category: docForm.category,
      ownerName: docForm.ownerName,
      documentNumber: docForm.documentNumber,
      expiryDate: docForm.expiryDate || 'Seumur Hidup',
      folderId: docForm.folderId,
      tags: docForm.tags.split(',').map((s) => s.trim()),
      isFavorite: false,
      isArchived: false,
      fileSizeKb: 1200,
    });
    setShowAddDocModal(false);
  };

  const handleCreateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    await addEmergencyContact(contactForm);
    setShowAddContactModal(false);
  };

  const handleCreateRenewal = async (e: React.FormEvent) => {
    e.preventDefault();
    await addRenewal({
      title: renewalForm.title,
      type: renewalForm.type,
      dueDate: renewalForm.dueDate,
      reminderDaysBefore: Number(renewalForm.reminderDaysBefore),
      costEstimate: Number(renewalForm.costEstimate),
    });
    setShowAddRenewalModal(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center space-y-3">
          <ShieldCheck className="mx-auto h-10 w-10 text-teal-600 animate-bounce" />
          <p className="text-xs font-bold text-slate-700">Mempersiapkan Protection Vault & Health AI...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 pt-4 px-4 max-w-md mx-auto">
      {/* Module Title Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-1.5 text-teal-700">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-xs font-extrabold uppercase tracking-wider">Modul Perlindungan & Vault</span>
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Family Protection AI</h1>
        </div>
        <span className="rounded-full bg-slate-900 px-3 py-1 text-[10px] font-black text-emerald-400 border border-slate-800">
          Digital Vault PIN
        </span>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none border-b border-slate-200">
        {[
          { id: 'overview', label: 'Polis Asuransi', icon: <ShieldCheck className="h-3.5 w-3.5" /> },
          { id: 'vault', label: 'Vault Dokumen', icon: <FolderLock className="h-3.5 w-3.5" /> },
          { id: 'emergency', label: 'Darurat & SOS', icon: <Siren className="h-3.5 w-3.5" /> },
          { id: 'renewals', label: 'Jatuh Tempo', icon: <RefreshCw className="h-3.5 w-3.5" /> },
          { id: 'analytics', label: 'Analitik', icon: <BarChart3 className="h-3.5 w-3.5" /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SubTab)}
              className={`flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold whitespace-nowrap transition ${
                isActive
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Render Active View */}
      {activeTab === 'overview' && (
        <InsuranceOverviewTab
          onOpenAddPolicy={() => setShowAddPolicyModal(true)}
          onOpenAddClaim={() => setShowAddClaimModal(true)}
        />
      )}
      {activeTab === 'vault' && (
        <DocumentVaultTab onOpenAddDocument={() => setShowAddDocModal(true)} />
      )}
      {activeTab === 'emergency' && (
        <EmergencyTab onOpenAddContact={() => setShowAddContactModal(true)} />
      )}
      {activeTab === 'renewals' && (
        <RenewalTrackerTab onOpenAddRenewal={() => setShowAddRenewalModal(true)} />
      )}
      {activeTab === 'analytics' && <ProtectionAnalyticsTab />}

      {/* Add Policy Modal */}
      {showAddPolicyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Tambah Polis Asuransi Baru</h3>
              <button onClick={() => setShowAddPolicyModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePolicy} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Nama Polis</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Prudential Prime Healthcare"
                  value={policyForm.policyName}
                  onChange={(e) => setPolicyForm({ ...policyForm, policyName: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Kategori Asuransi</label>
                <select
                  value={policyForm.category}
                  onChange={(e) => setPolicyForm({ ...policyForm, category: e.target.value as PolicyType })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
                >
                  {['Kesehatan', 'Jiwa', 'Pendidikan', 'Kendaraan', 'Rumah', 'Perjalanan', 'Investasi'].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Perusahaan</label>
                  <input
                    type="text"
                    required
                    placeholder="Prudential / Allianz"
                    value={policyForm.companyName}
                    onChange={(e) => setPolicyForm({ ...policyForm, companyName: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">No. Polis</label>
                  <input
                    type="text"
                    placeholder="PRU-12345"
                    value={policyForm.policyNumber}
                    onChange={(e) => setPolicyForm({ ...policyForm, policyNumber: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Premi Bulanan (Rp)</label>
                  <input
                    type="number"
                    value={policyForm.amount}
                    onChange={(e) => setPolicyForm({ ...policyForm, amount: Number(e.target.value) })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Pertanggungan (Rp)</label>
                  <input
                    type="number"
                    value={policyForm.sumAssured}
                    onChange={(e) => setPolicyForm({ ...policyForm, sumAssured: Number(e.target.value) })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-teal-600 py-3 text-xs font-bold text-white shadow-md hover:bg-teal-700"
              >
                Simpan Polis
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Document Modal */}
      {showAddDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Unggah Dokumen ke Vault</h3>
              <button onClick={() => setShowAddDocModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDocument} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Judul Dokumen</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: KTP Ayah - Hendra Wijaya"
                  value={docForm.title}
                  onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Kategori</label>
                  <select
                    value={docForm.category}
                    onChange={(e) => setDocForm({ ...docForm, category: e.target.value as DocumentCategory })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
                  >
                    {[
                      'KTP',
                      'KK',
                      'Paspor',
                      'SIM',
                      'NPWP',
                      'BPJS',
                      'Polis',
                      'Akta',
                      'Ijazah',
                      'Sertifikat',
                      'Dokumen Medis',
                      'Surat Penting',
                    ].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Folder</label>
                  <select
                    value={docForm.folderId}
                    onChange={(e) => setDocForm({ ...docForm, folderId: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
                  >
                    {folders.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Pemilik Dokumen</label>
                <input
                  type="text"
                  required
                  value={docForm.ownerName}
                  onChange={(e) => setDocForm({ ...docForm, ownerName: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Nomor Dokumen (Opsional)</label>
                <input
                  type="text"
                  placeholder="317409..."
                  value={docForm.documentNumber}
                  onChange={(e) => setDocForm({ ...docForm, documentNumber: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-teal-600 py-3 text-xs font-bold text-white shadow-md hover:bg-teal-700"
              >
                Simpan & Enkripsi ke Vault
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Emergency Contact Modal */}
      {showAddContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Tambah Kontak Darurat</h3>
              <button onClick={() => setShowAddContactModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateContact} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Nama Kontak</label>
                <input
                  type="text"
                  required
                  placeholder="Nama kerabat / dokter"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Hubungan / Peran</label>
                <input
                  type="text"
                  required
                  placeholder="Paman / Dokter Anak"
                  value={contactForm.relationship}
                  onChange={(e) => setContactForm({ ...contactForm, relationship: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">No. Telepon / HP</label>
                <input
                  type="tel"
                  required
                  placeholder="0812..."
                  value={contactForm.phoneNumber}
                  onChange={(e) => setContactForm({ ...contactForm, phoneNumber: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-teal-600 py-3 text-xs font-bold text-white shadow-md hover:bg-teal-700"
              >
                Simpan Kontak Darurat
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Renewal Modal */}
      {showAddRenewalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Tambah Pengingat Perpanjangan</h3>
              <button onClick={() => setShowAddRenewalModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRenewal} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Judul Perpanjangan</label>
                <input
                  type="text"
                  required
                  placeholder="Perpanjangan STNK Honda CR-V"
                  value={renewalForm.title}
                  onChange={(e) => setRenewalForm({ ...renewalForm, title: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Tipe</label>
                  <select
                    value={renewalForm.type}
                    onChange={(e) => setRenewalForm({ ...renewalForm, type: e.target.value as RenewalType })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
                  >
                    {['Passport', 'SIM', 'STNK', 'Insurance', 'Custom'].map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Tanggal Jatuh Tempo</label>
                  <input
                    type="date"
                    required
                    value={renewalForm.dueDate}
                    onChange={(e) => setRenewalForm({ ...renewalForm, dueDate: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-teal-600 py-3 text-xs font-bold text-white shadow-md hover:bg-teal-700"
              >
                Simpan Pengingat
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
