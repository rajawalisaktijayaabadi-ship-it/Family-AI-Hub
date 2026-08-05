import {
  SmartDeviceModel,
  SmartRoomModel,
  AutomationSceneModel,
  EnergyDataModel,
  IoTGatewayModel,
  AIHomeInsight,
} from '../types/smart_home';

export class MockIoTService {
  private static devices: SmartDeviceModel[] = [
    {
      id: 'dev-1',
      name: 'Lampu Tamu Utama',
      type: 'Light',
      room: 'Ruang Tamu',
      isOn: true,
      status: 'online',
      value: 80,
      unit: '%',
      powerWatt: 12,
      lastActive: 'Aktif sekarang',
      brand: 'Philips Hue',
    },
    {
      id: 'dev-2',
      name: 'AC Master Bedroom',
      type: 'AC',
      room: 'Kamar Utama',
      isOn: true,
      status: 'online',
      value: 23,
      unit: '°C',
      powerWatt: 650,
      lastActive: 'Aktif sekarang',
      brand: 'Daikin Inverter',
    },
    {
      id: 'dev-3',
      name: 'Smart Door Lock Depan',
      type: 'DoorLock',
      room: 'Pintu Utama',
      isOn: true,
      status: 'online',
      powerWatt: 2,
      lastActive: 'Terkunci (PIN/Fingerprint)',
      brand: 'Yale Smart',
    },
    {
      id: 'dev-4',
      name: 'CCTV Halaman Depan',
      type: 'Camera',
      room: 'Halaman Depan',
      isOn: true,
      status: 'online',
      powerWatt: 8,
      lastActive: 'Live 1080p AI Motion Detect',
      brand: 'Bardi Smart AI',
    },
    {
      id: 'dev-5',
      name: 'Air Purifier Anak',
      type: 'AirPurifier',
      room: 'Kamar Anak',
      isOn: false,
      status: 'online',
      value: 95,
      unit: 'AQI (Sangat Baik)',
      powerWatt: 30,
      lastActive: 'Nonaktif sejak 07:30',
      brand: 'Xiaomi Air 4',
    },
    {
      id: 'dev-6',
      name: 'Smart TV 65" OLED',
      type: 'TV',
      room: 'Ruang Tamu',
      isOn: false,
      status: 'online',
      powerWatt: 140,
      lastActive: 'Standby',
      brand: 'Samsung Neo QLED',
    },
  ];

  private static rooms: SmartRoomModel[] = [
    {
      id: 'room-1',
      name: 'Ruang Tamu',
      deviceCount: 3,
      temperature: 24.5,
      humidity: 55,
      isOccupied: true,
      bgGradient: 'from-blue-600 to-indigo-700',
    },
    {
      id: 'room-2',
      name: 'Kamar Utama',
      deviceCount: 4,
      temperature: 23.0,
      humidity: 50,
      isOccupied: true,
      bgGradient: 'from-purple-600 to-pink-600',
    },
    {
      id: 'room-3',
      name: 'Kamar Anak',
      deviceCount: 2,
      temperature: 25.0,
      humidity: 60,
      isOccupied: false,
      bgGradient: 'from-emerald-500 to-teal-700',
    },
    {
      id: 'room-4',
      name: 'Dapur & Ruang Makan',
      deviceCount: 3,
      temperature: 26.2,
      humidity: 62,
      isOccupied: false,
      bgGradient: 'from-amber-500 to-orange-600',
    },
    {
      id: 'room-5',
      name: 'Halaman & Keamanan',
      deviceCount: 2,
      temperature: 28.0,
      humidity: 70,
      isOccupied: false,
      bgGradient: 'from-slate-700 to-slate-900',
    },
  ];

  private static scenes: AutomationSceneModel[] = [
    {
      id: 'scene-1',
      title: 'Selamat Malam (Night Mode)',
      description: 'Kunci semua pintu, matikan lampu utama, nyalakan CCTV & alarm.',
      isActive: true,
      triggerType: 'Schedule',
      triggerTime: '22:00 WIB',
      actionsCount: 6,
      icon: 'Moon',
      color: 'bg-indigo-600',
    },
    {
      id: 'scene-2',
      title: 'Meninggalkan Rumah (Away)',
      description: 'Matikan semua AC & TV, aktifkan sensor gerak, set DoorLock.',
      isActive: false,
      triggerType: 'Geofence',
      triggerTime: 'Keluar Radius 100m',
      actionsCount: 8,
      icon: 'LogOut',
      color: 'bg-amber-600',
    },
    {
      id: 'scene-3',
      title: 'Tiba di Rumah (Welcome Home)',
      description: 'Nyalakan AC Kamar 24°C, lampu teras on, buka Smart Lock.',
      isActive: false,
      triggerType: 'Geofence',
      triggerTime: 'Masuk Radius 100m',
      actionsCount: 5,
      icon: 'Home',
      color: 'bg-emerald-600',
    },
    {
      id: 'scene-4',
      title: 'Mode Belajar Anak (Study Time)',
      description: 'Atur penerangan kamar anak ke 4000K Warm White 100%, matikan TV.',
      isActive: false,
      triggerType: 'Schedule',
      triggerTime: '19:00 WIB',
      actionsCount: 3,
      icon: 'BookOpen',
      color: 'bg-blue-600',
    },
  ];

  private static energyData: EnergyDataModel = {
    totalKwhToday: 14.8,
    totalCostEstimate: 21460, // Rp 1,444/kWh
    weeklyUsage: [
      { day: 'Senin', kwh: 16.2 },
      { day: 'Selasa', kwh: 15.1 },
      { day: 'Rabu', kwh: 14.8 },
      { day: 'Kamis', kwh: 17.0 },
      { day: 'Jumat', kwh: 18.2 },
      { day: 'Sabtu', kwh: 21.5 },
      { day: 'Minggu', kwh: 20.1 },
    ],
    deviceBreakdown: [
      { name: 'AC Kamar Utama & Anak', percentage: 58, kwh: 8.5 },
      { name: 'Kulkas & Dapur', percentage: 22, kwh: 3.2 },
      { name: 'Smart TV & Audio', percentage: 11, kwh: 1.6 },
      { name: 'Pencahayaan & Lainnya', percentage: 9, kwh: 1.5 },
    ],
    aiEfficiencyScore: 88,
  };

  private static gateways: IoTGatewayModel[] = [
    {
      id: 'gw-1',
      gatewayName: 'Hub Utama Ruang Tamu',
      protocol: 'Matter / Thread',
      connectedDevicesCount: 12,
      signalStrength: 96,
      firmwareVersion: 'v2.4.1-stable',
      status: 'Optimal',
    },
    {
      id: 'gw-2',
      gatewayName: 'Bridge Zigbee Lantai 2',
      protocol: 'Zigbee 3.0',
      connectedDevicesCount: 6,
      signalStrength: 88,
      firmwareVersion: 'v1.12.0',
      status: 'Optimal',
    },
  ];

  public static async getDevices(): Promise<SmartDeviceModel[]> {
    return [...this.devices];
  }

  public static async getRooms(): Promise<SmartRoomModel[]> {
    return [...this.rooms];
  }

  public static async getScenes(): Promise<AutomationSceneModel[]> {
    return [...this.scenes];
  }

  public static async getEnergyData(): Promise<EnergyDataModel> {
    return { ...this.energyData };
  }

  public static async getGateways(): Promise<IoTGatewayModel[]> {
    return [...this.gateways];
  }

  public static async getAIInsights(): Promise<AIHomeInsight[]> {
    return [
      {
        id: 'ins-1',
        category: 'Energy',
        title: 'Penghematan Suhu AC Otomatis',
        description:
          'AC Kamar Utama dapat dinaikkan dari 22°C ke 24°C pukul 03:00 pagi tanpa mengurangi kenyamanan. Menghemat Rp 120.000/bulan.',
        actionLabel: 'Terapkan Otomasi AC',
        priority: 'High',
      },
      {
        id: 'ins-2',
        category: 'Security',
        title: 'Kamera Halaman Depan Deteksi Gerak Malam Hari',
        description:
          'AI mendeteksi aktivitas teratur di area pagar pukul 02:15 WIB. Disarankan mengaktifkan Mode Lampu Sorot Otomatis saat gerakan terdeteksi.',
        actionLabel: 'Aktifkan Lampu Sorot',
        priority: 'Medium',
      },
      {
        id: 'ins-3',
        category: 'Maintenance',
        title: 'Filter Air Purifier Anak Perlu Dibersihkan',
        description: 'Masa pakai filter sisa 12%. Bersihkan atau ganti filter HEPA minggu ini.',
        actionLabel: 'Pesan Filter Baru',
        priority: 'Low',
      },
    ];
  }

  public static async toggleDevice(id: string): Promise<SmartDeviceModel> {
    const dev = this.devices.find((d) => d.id === id);
    if (dev) {
      dev.isOn = !dev.isOn;
      dev.lastActive = dev.isOn ? 'Diaktifkan baru saja' : 'Dinonaktifkan baru saja';
      return { ...dev };
    }
    throw new Error('Perangkat tidak ditemukan');
  }

  public static async updateDeviceValue(id: string, newValue: number): Promise<SmartDeviceModel> {
    const dev = this.devices.find((d) => d.id === id);
    if (dev) {
      dev.value = newValue;
      return { ...dev };
    }
    throw new Error('Perangkat tidak ditemukan');
  }

  public static async addDevice(device: Omit<SmartDeviceModel, 'id'>): Promise<SmartDeviceModel> {
    const newDev: SmartDeviceModel = {
      ...device,
      id: `dev-${Date.now()}`,
    };
    this.devices.push(newDev);
    return newDev;
  }

  public static async toggleScene(id: string): Promise<AutomationSceneModel> {
    const scene = this.scenes.find((s) => s.id === id);
    if (scene) {
      scene.isActive = !scene.isActive;
      return { ...scene };
    }
    throw new Error('Skenario tidak ditemukan');
  }
}
