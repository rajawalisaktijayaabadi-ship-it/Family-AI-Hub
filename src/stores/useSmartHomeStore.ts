import { create } from 'zustand';
import {
  SmartDeviceModel,
  SmartRoomModel,
  AutomationSceneModel,
  EnergyDataModel,
  IoTGatewayModel,
  AIHomeInsight,
} from '../types/smart_home';
import { smartHomeRepository } from '../repositories/SmartHomeRepository';

interface SmartHomeState {
  devices: SmartDeviceModel[];
  rooms: SmartRoomModel[];
  scenes: AutomationSceneModel[];
  energyData: EnergyDataModel | null;
  gateways: IoTGatewayModel[];
  insights: AIHomeInsight[];
  isLoading: boolean;
  selectedRoomFilter: string;

  // Actions
  initialize: () => Promise<void>;
  setSelectedRoomFilter: (room: string) => void;
  toggleDevice: (id: string) => Promise<void>;
  updateDeviceValue: (id: string, value: number) => Promise<void>;
  addDevice: (device: Omit<SmartDeviceModel, 'id'>) => Promise<void>;
  toggleScene: (id: string) => Promise<void>;
}

export const useSmartHomeStore = create<SmartHomeState>((set, get) => ({
  devices: [],
  rooms: [],
  scenes: [],
  energyData: null,
  gateways: [],
  insights: [],
  isLoading: false,
  selectedRoomFilter: 'All',

  initialize: async () => {
    set({ isLoading: true });
    try {
      const [devices, rooms, scenes, energyData, gateways, insights] = await Promise.all([
        smartHomeRepository.getDevices(),
        smartHomeRepository.getRooms(),
        smartHomeRepository.getScenes(),
        smartHomeRepository.getEnergyData(),
        smartHomeRepository.getGateways(),
        smartHomeRepository.getAIInsights(),
      ]);

      set({
        devices,
        rooms,
        scenes,
        energyData,
        gateways,
        insights,
        isLoading: false,
      });
    } catch (error) {
      console.error('Failed to initialize SmartHomeStore:', error);
      set({ isLoading: false });
    }
  },

  setSelectedRoomFilter: (room: string) => {
    set({ selectedRoomFilter: room });
  },

  toggleDevice: async (id: string) => {
    try {
      const updatedDevice = await smartHomeRepository.toggleDevice(id);
      set((state) => ({
        devices: state.devices.map((d) => (d.id === id ? updatedDevice : d)),
      }));
    } catch (error) {
      console.error('Failed to toggle device:', error);
    }
  },

  updateDeviceValue: async (id: string, value: number) => {
    try {
      const updatedDevice = await smartHomeRepository.updateDeviceValue(id, value);
      set((state) => ({
        devices: state.devices.map((d) => (d.id === id ? updatedDevice : d)),
      }));
    } catch (error) {
      console.error('Failed to update device value:', error);
    }
  },

  addDevice: async (device) => {
    try {
      const newDev = await smartHomeRepository.addDevice(device);
      set((state) => ({
        devices: [...state.devices, newDev],
      }));
    } catch (error) {
      console.error('Failed to add device:', error);
    }
  },

  toggleScene: async (id: string) => {
    try {
      const updatedScene = await smartHomeRepository.toggleScene(id);
      set((state) => ({
        scenes: state.scenes.map((s) => (s.id === id ? updatedScene : s)),
      }));
    } catch (error) {
      console.error('Failed to toggle scene:', error);
    }
  },
}));
