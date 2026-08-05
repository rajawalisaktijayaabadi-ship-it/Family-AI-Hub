import {
  SmartDeviceModel,
  SmartRoomModel,
  AutomationSceneModel,
  EnergyDataModel,
  IoTGatewayModel,
  AIHomeInsight,
} from '../types/smart_home';
import { MockIoTService } from '../services/MockIoTService';

export class SmartHomeRepository {
  public async getDevices(): Promise<SmartDeviceModel[]> {
    return MockIoTService.getDevices();
  }

  public async getRooms(): Promise<SmartRoomModel[]> {
    return MockIoTService.getRooms();
  }

  public async getScenes(): Promise<AutomationSceneModel[]> {
    return MockIoTService.getScenes();
  }

  public async getEnergyData(): Promise<EnergyDataModel> {
    return MockIoTService.getEnergyData();
  }

  public async getGateways(): Promise<IoTGatewayModel[]> {
    return MockIoTService.getGateways();
  }

  public async getAIInsights(): Promise<AIHomeInsight[]> {
    return MockIoTService.getAIInsights();
  }

  public async toggleDevice(id: string): Promise<SmartDeviceModel> {
    return MockIoTService.toggleDevice(id);
  }

  public async updateDeviceValue(id: string, value: number): Promise<SmartDeviceModel> {
    return MockIoTService.updateDeviceValue(id, value);
  }

  public async addDevice(device: Omit<SmartDeviceModel, 'id'>): Promise<SmartDeviceModel> {
    return MockIoTService.addDevice(device);
  }

  public async toggleScene(id: string): Promise<AutomationSceneModel> {
    return MockIoTService.toggleScene(id);
  }
}

export const smartHomeRepository = new SmartHomeRepository();
