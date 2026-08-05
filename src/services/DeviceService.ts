import { DeviceModel } from '../types/family_location';
import { LocationRepository } from '../repositories/LocationRepository';

export class DeviceService {
  static getDevices(): DeviceModel[] {
    return LocationRepository.getRegisteredDevices();
  }

  static registerCurrentDevice(userId: string, memberName: string): DeviceModel {
    const devices = LocationRepository.getRegisteredDevices();
    
    // Auto detect user agent info
    const userAgent = navigator.userAgent;
    let brand = 'Unknown Brand';
    let model = 'Smartphone / Tablet';
    let os = 'Android OS';
    let browser = 'Chrome Mobile';

    if (userAgent.includes('iPhone')) {
      brand = 'Apple';
      model = 'iPhone';
      os = 'iOS 17';
      browser = 'Safari';
    } else if (userAgent.includes('iPad')) {
      brand = 'Apple';
      model = 'iPad';
      os = 'iPadOS 17';
      browser = 'Safari';
    } else if (userAgent.includes('Samsung')) {
      brand = 'Samsung';
      model = 'Galaxy Device';
      os = 'Android 14';
      browser = 'Samsung Internet';
    } else if (userAgent.includes('Android')) {
      brand = 'Android Device';
      model = 'Mobile Phone';
      os = 'Android 14';
      browser = 'Chrome Mobile';
    }

    const existingIndex = devices.findIndex((d) => d.userId === userId && d.brand === brand);

    if (existingIndex >= 0) {
      devices[existingIndex] = {
        ...devices[existingIndex],
        lastSyncAt: new Date().toISOString(),
        isOnline: true,
        networkStatus: navigator.onLine ? '4G/5G' : 'Offline',
      };
      LocationRepository.saveRegisteredDevices(devices);
      return devices[existingIndex];
    }

    const newDevice: DeviceModel = {
      id: `dev_${Date.now()}`,
      userId,
      memberName,
      deviceId: `dev_id_${Math.random().toString(36).substring(2, 9)}`,
      deviceName: `${brand} (${memberName})`,
      brand,
      model,
      operatingSystem: os,
      browser,
      pwaStatus: window.matchMedia('(display-mode: standalone)').matches ? 'Standalone' : 'Browser',
      pushToken: `fcm_push_${Math.floor(100000 + Math.random() * 900000)}`,
      batteryLevel: 90,
      networkStatus: navigator.onLine ? 'Wi-Fi' : 'Offline',
      isOnline: true,
      registeredAt: new Date().toISOString(),
      lastSyncAt: new Date().toISOString(),
    };

    const updated = [newDevice, ...devices];
    LocationRepository.saveRegisteredDevices(updated);
    return newDevice;
  }

  static updateDeviceBattery(deviceId: string, batteryLevel: number): DeviceModel[] {
    const devices = LocationRepository.getRegisteredDevices();
    const updated = devices.map((d) =>
      d.id === deviceId ? { ...d, batteryLevel, lastSyncAt: new Date().toISOString() } : d
    );
    LocationRepository.saveRegisteredDevices(updated);
    return updated;
  }

  static removeDevice(deviceId: string): DeviceModel[] {
    const devices = LocationRepository.getRegisteredDevices();
    const updated = devices.filter((d) => d.id !== deviceId);
    LocationRepository.saveRegisteredDevices(updated);
    return updated;
  }
}
