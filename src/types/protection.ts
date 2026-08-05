export type PolicyType =
  | 'Kesehatan'
  | 'Jiwa'
  | 'Pendidikan'
  | 'Kendaraan'
  | 'Rumah'
  | 'Perjalanan'
  | 'Bisnis'
  | 'Investasi'
  | 'Lainnya';

export type PolicyStatus = 'Active' | 'Pending Renewal' | 'Expired' | 'Lapsed';

export interface BeneficiaryModel {
  id: string;
  name: string;
  relationship: string;
  percentage: number;
  contact: string;
}

export interface CoverageModel {
  sumAssured: number; // Nilai pertanggungan
  benefits: string[];
  exclusions: string[];
  waitingPeriodDays: number;
  notes?: string;
}

export interface PremiumModel {
  amount: number;
  paymentMethod: 'Autodebet' | 'Transfer Bank' | 'E-Wallet' | 'Credit Card';
  frequency: 'Monthly' | 'Quarterly' | 'Yearly';
  dueDate: string;
  isPaid: boolean;
  paymentHistory: Array<{ date: string; amount: number; receiptNo: string }>;
}

export interface InsurancePolicyModel {
  id: string;
  policyNumber: string;
  policyName: string;
  category: PolicyType;
  companyName: string;
  policyHolder: string; // Pemegang Polis
  insuredPerson: string; // Tertanggung
  startDate: string;
  endDate: string;
  status: PolicyStatus;
  premium: PremiumModel;
  coverage: CoverageModel;
  beneficiaries: BeneficiaryModel[];
  attachmentUrl?: string;
}

export interface ClaimModel {
  id: string;
  policyId: string;
  claimNumber: string;
  claimDate: string;
  category: string;
  status: 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Paid Out';
  amountClaimed: number;
  attachmentUrl?: string;
  notes: string;
  timeline: Array<{ step: string; date: string; completed: boolean }>;
}

export type DocumentCategory =
  | 'KTP'
  | 'KK'
  | 'Paspor'
  | 'SIM'
  | 'NPWP'
  | 'BPJS'
  | 'Polis'
  | 'Akta'
  | 'Ijazah'
  | 'Sertifikat'
  | 'Dokumen Medis'
  | 'Surat Penting'
  | 'Lainnya';

export interface FolderModel {
  id: string;
  name: string;
  colorHex?: string;
}

export interface DocumentModel {
  id: string;
  title: string;
  category: DocumentCategory;
  ownerName: string;
  documentNumber?: string;
  expiryDate?: string;
  folderId?: string;
  tags: string[];
  isFavorite: boolean;
  isArchived: boolean;
  fileSizeKb: number;
  uploadedAt: string;
  fileUrl?: string;
}

export interface EmergencyContactModel {
  id: string;
  name: string;
  relationship: string;
  phoneNumber: string;
  address: string;
  priority: 'Primary' | 'Secondary' | 'Doctor';
}

export interface EmergencyInfoModel {
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  allergies: string[];
  chronicDiseases: string[];
  routineMedications: string[];
  primaryDoctorName: string;
  primaryDoctorPhone: string;
  hospitalPreference: string;
}

export type RenewalType = 'Insurance' | 'Passport' | 'SIM' | 'STNK' | 'Custom';

export interface RenewalModel {
  id: string;
  title: string;
  type: RenewalType;
  dueDate: string;
  reminderDaysBefore: number;
  isCompleted: boolean;
  costEstimate?: number;
}

export interface ProtectionScoreModel {
  totalScore: number; // 0-100
  policyCount: number;
  documentsCount: number;
  emergencyReadinessScore: number;
  coverageScore: number;
  lastEvaluatedAt: string;
}

export interface AIInsuranceInsight {
  protectionSummary: string;
  documentRecommendations: string[];
  policyAlerts: string[];
  protectionMotivation: string;
}
