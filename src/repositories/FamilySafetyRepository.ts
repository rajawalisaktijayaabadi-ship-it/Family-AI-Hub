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
import { MockSafetyAIService } from '../services/MockSafetyAIService';

export class FamilySafetyRepository {
  public async getFamilyLocations(): Promise<FamilyMemberLocation[]> {
    return MockSafetyAIService.getFamilyLocations();
  }

  public async getSafeZones(): Promise<SafeZoneModel[]> {
    return MockSafetyAIService.getSafeZones();
  }

  public async getCheckIns(): Promise<FamilyCheckInModel[]> {
    return MockSafetyAIService.getCheckIns();
  }

  public async getSOSAlerts(): Promise<SOSAlertModel[]> {
    return MockSafetyAIService.getSOSAlerts();
  }

  public async getEmergencyPlans(): Promise<EmergencyPlanModel[]> {
    return MockSafetyAIService.getEmergencyPlans();
  }

  public async getIncidentReports(): Promise<IncidentReportModel[]> {
    return MockSafetyAIService.getIncidentReports();
  }

  public async getTravelPlans(): Promise<FamilyTravelModel[]> {
    return MockSafetyAIService.getTravelPlans();
  }

  public async getAISafetyRecommendations(): Promise<AISafetyRecommendation[]> {
    return MockSafetyAIService.getAISafetyRecommendations();
  }

  public async sendCheckIn(
    memberName: string,
    locationName: string,
    statusMessage: string
  ): Promise<FamilyCheckInModel> {
    return MockSafetyAIService.sendCheckIn(memberName, locationName, statusMessage);
  }

  public async triggerSOS(senderName: string, notes?: string): Promise<SOSAlertModel> {
    return MockSafetyAIService.triggerSOS(senderName, notes);
  }

  public async addIncidentReport(
    report: Omit<IncidentReportModel, 'id'>
  ): Promise<IncidentReportModel> {
    return MockSafetyAIService.addIncidentReport(report);
  }
}

export const familySafetyRepository = new FamilySafetyRepository();
