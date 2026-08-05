import { create } from 'zustand';
import {
  FamilyMemberLocation,
  SafeZoneModel,
  FamilyCheckInModel,
  SOSAlertModel,
  EmergencyPlanModel,
  IncidentReportModel,
  FamilyTravelModel,
  AISafetyRecommendation,
} from '../types/family_safety';
import { familySafetyRepository } from '../repositories/FamilySafetyRepository';

interface FamilySafetyState {
  locations: FamilyMemberLocation[];
  safeZones: SafeZoneModel[];
  checkIns: FamilyCheckInModel[];
  sosAlerts: SOSAlertModel[];
  emergencyPlans: EmergencyPlanModel[];
  incidentReports: IncidentReportModel[];
  travelPlans: FamilyTravelModel[];
  recommendations: AISafetyRecommendation[];
  isLoading: boolean;

  // Actions
  initialize: () => Promise<void>;
  sendCheckIn: (memberName: string, locationName: string, statusMessage: string) => Promise<void>;
  triggerSOS: (senderName: string, notes?: string) => Promise<void>;
  addIncidentReport: (report: Omit<IncidentReportModel, 'id'>) => Promise<void>;
}

export const useFamilySafetyStore = create<FamilySafetyState>((set) => ({
  locations: [],
  safeZones: [],
  checkIns: [],
  sosAlerts: [],
  emergencyPlans: [],
  incidentReports: [],
  travelPlans: [],
  recommendations: [],
  isLoading: false,

  initialize: async () => {
    set({ isLoading: true });
    try {
      const [
        locations,
        safeZones,
        checkIns,
        sosAlerts,
        emergencyPlans,
        incidentReports,
        travelPlans,
        recommendations,
      ] = await Promise.all([
        familySafetyRepository.getFamilyLocations(),
        familySafetyRepository.getSafeZones(),
        familySafetyRepository.getCheckIns(),
        familySafetyRepository.getSOSAlerts(),
        familySafetyRepository.getEmergencyPlans(),
        familySafetyRepository.getIncidentReports(),
        familySafetyRepository.getTravelPlans(),
        familySafetyRepository.getAISafetyRecommendations(),
      ]);

      set({
        locations,
        safeZones,
        checkIns,
        sosAlerts,
        emergencyPlans,
        incidentReports,
        travelPlans,
        recommendations,
        isLoading: false,
      });
    } catch (error) {
      console.error('Failed to initialize FamilySafetyStore:', error);
      set({ isLoading: false });
    }
  },

  sendCheckIn: async (memberName, locationName, statusMessage) => {
    try {
      const newCheckIn = await familySafetyRepository.sendCheckIn(
        memberName,
        locationName,
        statusMessage
      );
      set((state) => ({
        checkIns: [newCheckIn, ...state.checkIns],
      }));
    } catch (error) {
      console.error('Failed to send check-in:', error);
    }
  },

  triggerSOS: async (senderName, notes) => {
    try {
      const newSOS = await familySafetyRepository.triggerSOS(senderName, notes);
      set((state) => ({
        sosAlerts: [newSOS, ...state.sosAlerts],
      }));
    } catch (error) {
      console.error('Failed to trigger SOS:', error);
    }
  },

  addIncidentReport: async (report) => {
    try {
      const newReport = await familySafetyRepository.addIncidentReport(report);
      set((state) => ({
        incidentReports: [newReport, ...state.incidentReports],
      }));
    } catch (error) {
      console.error('Failed to add incident report:', error);
    }
  },
}));
