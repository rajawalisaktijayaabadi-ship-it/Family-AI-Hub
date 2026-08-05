import {
  InsurancePolicyModel,
  ClaimModel,
  BeneficiaryModel,
} from '../types/protection';

const initialPolicies: InsurancePolicyModel[] = [
  {
    id: 'pol-1',
    policyNumber: 'PRU-8829102-ID',
    policyName: 'Prudential Prime Healthcare Plus',
    category: 'Kesehatan',
    companyName: 'Prudential Indonesia',
    policyHolder: 'Hendra Wijaya',
    insuredPerson: 'Hendra Wijaya & Keluarga',
    startDate: '2022-01-15',
    endDate: '2027-01-15',
    status: 'Active',
    premium: {
      amount: 1650000,
      paymentMethod: 'Autodebet',
      frequency: 'Monthly',
      dueDate: '2026-08-15',
      isPaid: false,
      paymentHistory: [
        { date: '2026-07-15', amount: 1650000, receiptNo: 'RC-99821' },
        { date: '2026-06-15', amount: 1650000, receiptNo: 'RC-98122' },
      ],
    },
    coverage: {
      sumAssured: 1000000000,
      benefits: [
        'Rawat Inap Kelas 1 VVIP VIP Private Room',
        'Operasi Bedah & ICU Tanpa Limit Sesuai Tagihan',
        'Pengobatan Kanker & Cuci Darah',
        'Ambulans & Unit Gawat Darurat',
      ],
      exclusions: ['Penyakit Bawaan Pre-existing', 'Bedah Estetika'],
      waitingPeriodDays: 30,
      notes: 'Kartu fisik tersimpan di dompet Ayah',
    },
    beneficiaries: [
      {
        id: 'ben-1',
        name: 'Ratna Saraswati',
        relationship: 'Istri',
        percentage: 60,
        contact: '081299881122',
      },
      {
        id: 'ben-2',
        name: 'Rayhan Wijaya',
        relationship: 'Anak Kandung',
        percentage: 40,
        contact: '081299881133',
      },
    ],
  },
  {
    id: 'pol-2',
    policyNumber: 'ALL-7788192-ALL',
    policyName: 'Allianz SmartLink Flexi Account',
    category: 'Jiwa',
    companyName: 'Allianz Indonesia',
    policyHolder: 'Hendra Wijaya',
    insuredPerson: 'Hendra Wijaya',
    startDate: '2021-03-10',
    endDate: '2041-03-10',
    status: 'Active',
    premium: {
      amount: 1200000,
      paymentMethod: 'Transfer Bank',
      frequency: 'Monthly',
      dueDate: '2026-08-28',
      isPaid: true,
      paymentHistory: [
        { date: '2026-07-28', amount: 1200000, receiptNo: 'RC-77211' },
      ],
    },
    coverage: {
      sumAssured: 1500000000,
      benefits: ['Uang Pertanggungan Meninggal Dunia', 'Santunan Cacat Tetap Total'],
      exclusions: ['Olahraga Ekstrem Berbahaya'],
      waitingPeriodDays: 90,
    },
    beneficiaries: [
      {
        id: 'ben-3',
        name: 'Ratna Saraswati',
        relationship: 'Istri',
        percentage: 100,
        contact: '081299881122',
      },
    ],
  },
  {
    id: 'pol-3',
    policyNumber: 'GDA-5511223-AUT',
    policyName: 'Garda Oto Comprehensive SUV',
    category: 'Kendaraan',
    companyName: 'Asuransi Astra Garda Oto',
    policyHolder: 'Hendra Wijaya',
    insuredPerson: 'Mobil Honda CR-V (B 1234 RAH)',
    startDate: '2025-09-01',
    endDate: '2026-09-01',
    status: 'Pending Renewal',
    premium: {
      amount: 4800000,
      paymentMethod: 'Credit Card',
      frequency: 'Yearly',
      dueDate: '2026-08-30',
      isPaid: false,
      paymentHistory: [
        { date: '2025-09-01', amount: 4800000, receiptNo: 'RC-112233' },
      ],
    },
    coverage: {
      sumAssured: 380000000,
      benefits: ['All Risk Kerusakan', 'Tanggung Jawab Hukum Pihak Ke-3', 'Bencana Alam & Banjir'],
      exclusions: ['Pengemudi Tanpa SIM Valid'],
      waitingPeriodDays: 0,
    },
    beneficiaries: [],
  },
];

const initialClaims: ClaimModel[] = [
  {
    id: 'clm-1',
    policyId: 'pol-1',
    claimNumber: 'CLM-2026-00321',
    claimDate: '2026-06-12',
    category: 'Rawat Inap Demam Berdarah',
    status: 'Paid Out',
    amountClaimed: 6850000,
    notes: 'Klaim RS Siloam Kebon Jeruk untuk pengobatan Rayhan',
    timeline: [
      { step: 'Pengajuan Dokumen Klaim', date: '2026-06-12', completed: true },
      { step: 'Verifikasi Medis & Asuransi', date: '2026-06-14', completed: true },
      { step: 'Persetujuan Klaim', date: '2026-06-15', completed: true },
      { step: 'Pencairan Dana ke Rekening', date: '2026-06-16', completed: true },
    ],
  },
];

export class InsuranceRepository {
  private policies: InsurancePolicyModel[] = [...initialPolicies];
  private claims: ClaimModel[] = [...initialClaims];

  async getPolicies(): Promise<InsurancePolicyModel[]> {
    return this.policies;
  }

  async addPolicy(policy: Omit<InsurancePolicyModel, 'id'>): Promise<InsurancePolicyModel> {
    const newPol: InsurancePolicyModel = {
      ...policy,
      id: `pol-${Date.now()}`,
    };
    this.policies.unshift(newPol);
    return newPol;
  }

  async updatePolicy(id: string, updates: Partial<InsurancePolicyModel>): Promise<InsurancePolicyModel | undefined> {
    const idx = this.policies.findIndex((p) => p.id === id);
    if (idx >= 0) {
      this.policies[idx] = { ...this.policies[idx], ...updates };
      return this.policies[idx];
    }
    return undefined;
  }

  async togglePremiumPaid(policyId: string): Promise<InsurancePolicyModel | undefined> {
    const pol = this.policies.find((p) => p.id === policyId);
    if (pol) {
      pol.premium.isPaid = !pol.premium.isPaid;
    }
    return pol;
  }

  async getClaims(): Promise<ClaimModel[]> {
    return this.claims;
  }

  async addClaim(claim: Omit<ClaimModel, 'id' | 'status' | 'timeline'>): Promise<ClaimModel> {
    const newClaim: ClaimModel = {
      ...claim,
      id: `clm-${Date.now()}`,
      status: 'Submitted',
      timeline: [
        { step: 'Pengajuan Dokumen Klaim', date: new Date().toISOString().split('T')[0], completed: true },
        { step: 'Verifikasi Medis & Administrasi', date: 'Estimasi 2 Hari', completed: false },
        { step: 'Persetujuan Klaim', date: 'Estimasi 3 Hari', completed: false },
        { step: 'Pencairan Dana', date: 'Estimasi 5 Hari', completed: false },
      ],
    };
    this.claims.unshift(newClaim);
    return newClaim;
  }
}
