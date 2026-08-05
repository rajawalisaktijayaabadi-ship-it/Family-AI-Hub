import { create } from 'zustand';
import {
  InsurancePolicyModel,
  ClaimModel,
  DocumentModel,
  FolderModel,
  EmergencyContactModel,
  EmergencyInfoModel,
  RenewalModel,
  ProtectionScoreModel,
  AIInsuranceInsight,
} from '../types/protection';
import { InsuranceService } from '../services/InsuranceService';
import { DocumentService } from '../services/DocumentService';
import { EmergencyService } from '../services/EmergencyService';
import { ProtectionService } from '../services/ProtectionService';
import { MockInsuranceAIService } from '../services/MockInsuranceAIService';

interface ProtectionState {
  policies: InsurancePolicyModel[];
  claims: ClaimModel[];
  documents: DocumentModel[];
  folders: FolderModel[];
  emergencyContacts: EmergencyContactModel[];
  emergencyInfo: EmergencyInfoModel | null;
  renewals: RenewalModel[];
  score: ProtectionScoreModel | null;
  aiInsight: AIInsuranceInsight | null;
  isLoading: boolean;
  searchQuery: string;

  // Actions
  initialize: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  addPolicy: (policy: Omit<InsurancePolicyModel, 'id'>) => Promise<void>;
  togglePremiumPaid: (policyId: string) => Promise<void>;
  addClaim: (claim: Omit<ClaimModel, 'id' | 'status' | 'timeline'>) => Promise<void>;
  addDocument: (doc: Omit<DocumentModel, 'id' | 'uploadedAt'>) => Promise<void>;
  toggleDocumentFavorite: (id: string) => Promise<void>;
  toggleDocumentArchive: (id: string) => Promise<void>;
  addEmergencyContact: (contact: Omit<EmergencyContactModel, 'id'>) => Promise<void>;
  updateEmergencyInfo: (info: EmergencyInfoModel) => Promise<void>;
  toggleRenewalCompleted: (id: string) => Promise<void>;
  addRenewal: (renewal: Omit<RenewalModel, 'id' | 'isCompleted'>) => Promise<void>;
}

const insuranceService = new InsuranceService();
const documentService = new DocumentService();
const emergencyService = new EmergencyService();
const protectionService = new ProtectionService();

export const useProtectionStore = create<ProtectionState>((set, get) => ({
  policies: [],
  claims: [],
  documents: [],
  folders: [],
  emergencyContacts: [],
  emergencyInfo: null,
  renewals: [],
  score: null,
  aiInsight: null,
  isLoading: false,
  searchQuery: '',

  initialize: async () => {
    set({ isLoading: true });
    try {
      const policies = await insuranceService.fetchPolicies();
      const claims = await insuranceService.fetchClaims();
      const documents = await documentService.fetchDocuments();
      const folders = await documentService.fetchFolders();
      const emergencyContacts = await emergencyService.fetchContacts();
      const emergencyInfo = await emergencyService.fetchEmergencyInfo();
      const renewals = await emergencyService.fetchRenewals();

      const { score, insight } = MockInsuranceAIService.evaluateProtection(
        policies,
        documents,
        emergencyContacts,
        emergencyInfo
      );

      set({
        policies,
        claims,
        documents,
        folders,
        emergencyContacts,
        emergencyInfo,
        renewals,
        score,
        aiInsight: insight,
        isLoading: false,
      });
    } catch (e) {
      console.error('Failed initializing protection store:', e);
      set({ isLoading: false });
    }
  },

  setSearchQuery: (searchQuery) => set({ searchQuery }),

  addPolicy: async (policy) => {
    const newPol = await insuranceService.addPolicy(policy);
    set((state) => {
      const updatedPolicies = [newPol, ...state.policies];
      const { score, insight } = MockInsuranceAIService.evaluateProtection(
        updatedPolicies,
        state.documents,
        state.emergencyContacts,
        state.emergencyInfo!
      );
      return { policies: updatedPolicies, score, aiInsight: insight };
    });
  },

  togglePremiumPaid: async (policyId) => {
    const updated = await insuranceService.togglePremiumPaid(policyId);
    if (updated) {
      set((state) => {
        const updatedPolicies = state.policies.map((p) => (p.id === policyId ? updated : p));
        const { score, insight } = MockInsuranceAIService.evaluateProtection(
          updatedPolicies,
          state.documents,
          state.emergencyContacts,
          state.emergencyInfo!
        );
        return { policies: updatedPolicies, score, aiInsight: insight };
      });
    }
  },

  addClaim: async (claim) => {
    const newClaim = await insuranceService.addClaim(claim);
    set((state) => ({ claims: [newClaim, ...state.claims] }));
  },

  addDocument: async (doc) => {
    const newDoc = await documentService.addDocument(doc);
    set((state) => {
      const updatedDocs = [newDoc, ...state.documents];
      const { score, insight } = MockInsuranceAIService.evaluateProtection(
        state.policies,
        updatedDocs,
        state.emergencyContacts,
        state.emergencyInfo!
      );
      return { documents: updatedDocs, score, aiInsight: insight };
    });
  },

  toggleDocumentFavorite: async (id) => {
    const updated = await documentService.toggleFavorite(id);
    if (updated) {
      set((state) => ({
        documents: state.documents.map((d) => (d.id === id ? updated : d)),
      }));
    }
  },

  toggleDocumentArchive: async (id) => {
    const updated = await documentService.toggleArchive(id);
    if (updated) {
      set((state) => ({
        documents: state.documents.map((d) => (d.id === id ? updated : d)),
      }));
    }
  },

  addEmergencyContact: async (contact) => {
    const newContact = await emergencyService.addContact(contact);
    set((state) => {
      const updatedContacts = [...state.emergencyContacts, newContact];
      const { score, insight } = MockInsuranceAIService.evaluateProtection(
        state.policies,
        state.documents,
        updatedContacts,
        state.emergencyInfo!
      );
      return { emergencyContacts: updatedContacts, score, aiInsight: insight };
    });
  },

  updateEmergencyInfo: async (info) => {
    const updated = await emergencyService.updateEmergencyInfo(info);
    set((state) => {
      const { score, insight } = MockInsuranceAIService.evaluateProtection(
        state.policies,
        state.documents,
        state.emergencyContacts,
        updated
      );
      return { emergencyInfo: updated, score, aiInsight: insight };
    });
  },

  toggleRenewalCompleted: async (id) => {
    const updated = await emergencyService.toggleRenewalCompleted(id);
    if (updated) {
      set((state) => ({
        renewals: state.renewals.map((r) => (r.id === id ? updated : r)),
      }));
    }
  },

  addRenewal: async (renewal) => {
    const newRnw = await emergencyService.addRenewal(renewal);
    set((state) => ({ renewals: [newRnw, ...state.renewals] }));
  },
}));
