import { z } from 'zod';

export type DeviceType =
  | 'Light'
  | 'AC'
  | 'DoorLock'
  | 'Camera'
  | 'TV'
  | 'Speaker'
  | 'AirPurifier'
  | 'Curtain'
  | 'Sensor'
  | 'Plug';

export type DeviceStatus = 'online' | 'offline' | 'warning';

export type TriggerType = 'Schedule' | 'Sensor' | 'Manual' | 'Geofence';

export interface SmartDeviceModel {
  id: string;
  name: string;
  type: DeviceType;
  room: string;
  isOn: boolean;
  status: DeviceStatus;
  value?: number; // e.g., brightness 0-100, temp 16-30
  unit?: string;
  powerWatt: number;
  lastActive: string;
  brand?: string;
}

export interface SmartRoomModel {
  id: string;
  name: string;
  deviceCount: number;
  temperature?: number;
  humidity?: number;
  isOccupied?: boolean;
  bgGradient: string;
}

export interface AutomationSceneModel {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  triggerType: TriggerType;
  triggerTime?: string;
  actionsCount: number;
  icon: string;
  color: string;
}

export interface EnergyDataModel {
  totalKwhToday: number;
  totalCostEstimate: number;
  weeklyUsage: { day: string; kwh: number }[];
  deviceBreakdown: { name: string; percentage: number; kwh: number }[];
  aiEfficiencyScore: number;
}

export interface IoTGatewayModel {
  id: string;
  gatewayName: string;
  protocol: 'Zigbee 3.0' | 'Matter / Thread' | 'Wi-Fi Mesh' | 'BLE Mesh';
  connectedDevicesCount: number;
  signalStrength: number;
  firmwareVersion: string;
  status: 'Optimal' | 'Update Available' | 'Offline';
}

export interface AIHomeInsight {
  id: string;
  category: 'Energy' | 'Security' | 'Automation' | 'Maintenance';
  title: string;
  description: string;
  actionLabel: string;
  priority: 'High' | 'Medium' | 'Low';
}

// Zod Schemas
export const SmartDeviceSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Nama perangkat minimal 2 karakter'),
  type: z.enum([
    'Light',
    'AC',
    'DoorLock',
    'Camera',
    'TV',
    'Speaker',
    'AirPurifier',
    'Curtain',
    'Sensor',
    'Plug',
  ]),
  room: z.string(),
  isOn: z.boolean(),
  status: z.enum(['online', 'offline', 'warning']),
  value: z.number().optional(),
  unit: z.string().optional(),
  powerWatt: z.number().nonnegative(),
  lastActive: z.string(),
  brand: z.string().optional(),
});

export const SmartRoomSchema = z.object({
  id: z.string(),
  name: z.string(),
  deviceCount: z.number(),
  temperature: z.number().optional(),
  humidity: z.number().optional(),
  isOccupied: z.boolean().optional(),
  bgGradient: z.string(),
});
