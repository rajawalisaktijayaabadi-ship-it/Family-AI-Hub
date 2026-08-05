import { create } from 'zustand';
import {
  ProviderModel,
  NotificationModel,
  AutomationModel,
  QueueJobModel,
  WeatherModel,
  HolidayModel,
  LocationModel,
  LogMetricModel,
} from '../types/integration';
import { IndonesiaHolidayService } from '../services/integration/IndonesiaHolidayService';
import { AIAutomationEngine } from '../services/integration/AIAutomationEngine';
import { JobQueue } from '../services/integration/JobQueue';
import { BMKGWeatherAdapter } from '../services/integration/WeatherAdapter';

interface IntegrationStore {
  providers: ProviderModel[];
  notifications: NotificationModel[];
  automations: AutomationModel[];
  jobs: QueueJobModel[];
  weather: WeatherModel | null;
  holidays: HolidayModel[];
  familyLocations: LocationModel[];
  logs: LogMetricModel[];
  selectedMapProvider: 'google_maps' | 'openstreetmap';

  fetchWeather: (city: string) => Promise<void>;
  toggleAutomation: (id: string) => void;
  triggerAutomationNow: (id: string) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  addQueueJob: (type: QueueJobModel['type'], payload: Record<string, any>) => void;
  setMapProvider: (provider: 'google_maps' | 'openstreetmap') => void;
  addLog: (level: LogMetricModel['level'], service: string, message: string) => void;
}

export const useIntegrationStore = create<IntegrationStore>((set, get) => ({
  providers: [
    {
      id: 'p_bmkg',
      name: 'BMKG Indonesia Weather API',
      type: 'weather',
      status: 'active',
      isDefault: true,
      apiKeyConfigured: true,
      endpoint: 'https://data.bmkg.go.id/DataMKG/TEWS/',
    },
    {
      id: 'p_osm',
      name: 'OpenStreetMap Carto Tile API',
      type: 'maps',
      status: 'active',
      isDefault: true,
      apiKeyConfigured: true,
      endpoint: 'https://tile.openstreetmap.org/',
    },
    {
      id: 'p_gmaps',
      name: 'Google Maps JavaScript API',
      type: 'maps',
      status: 'mock',
      isDefault: false,
      apiKeyConfigured: false,
      endpoint: 'https://maps.googleapis.com/maps/api/',
    },
    {
      id: 'p_fcm',
      name: 'Firebase Cloud Messaging (FCM)',
      type: 'notification',
      status: 'active',
      isDefault: true,
      apiKeyConfigured: true,
      endpoint: 'https://fcm.googleapis.com/fcm/send',
    },
    {
      id: 'p_wa',
      name: 'WhatsApp Business API (Qontak Adapter)',
      type: 'whatsapp',
      status: 'mock',
      isDefault: true,
      apiKeyConfigured: false,
      endpoint: 'https://api.qontak.com/api/v3.1/',
    },
    {
      id: 'p_ocr',
      name: 'Indonesia KTP/Struk Document OCR',
      type: 'ocr',
      status: 'mock',
      isDefault: true,
      apiKeyConfigured: false,
      endpoint: 'https://api.vision.cloud.google.com/v1/images:annotate',
    },
  ],

  notifications: [
    {
      id: 'notif_1',
      workspaceId: 'default_ws',
      title: '🌧️ Peringatan Hujan Deras BMKG',
      body: 'Terdeteksi cuaca hujan lebat di wilayah Jakarta Selatan. Jangan lupa amankan jemuran & siapkan payung.',
      category: 'family',
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
    {
      id: 'notif_2',
      workspaceId: 'default_ws',
      title: '💡 AI Budget Alert',
      body: 'Pengeluaran mingguan telah mencapai 82% dari batas anggaran. Rekomendasi belanja hemat telah disiapkan.',
      category: 'finance',
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    },
    {
      id: 'notif_3',
      workspaceId: 'default_ws',
      title: '📍 Member Arrived Safely',
      body: 'Adik Budi telah sampai di Safe Zone Sekolah (SMP Negeri 1 Jakarta).',
      category: 'health',
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    },
  ],

  automations: AIAutomationEngine.getInstance().getAutomations(),
  jobs: JobQueue.getInstance().getJobs(),
  weather: null,
  holidays: IndonesiaHolidayService.getHolidays(),
  selectedMapProvider: 'openstreetmap',

  familyLocations: [
    {
      id: 'loc_1',
      memberName: 'Ayah Rudi',
      role: 'Kepala Keluarga',
      latitude: -6.2088,
      longitude: 106.8456,
      address: 'Kantor SCBD, Jakarta Selatan',
      batteryLevel: 88,
      lastUpdated: '2 menit yang lalu',
      isSafeZone: true,
    },
    {
      id: 'loc_2',
      memberName: 'Ibu Siti',
      role: 'Ibu',
      latitude: -6.2297,
      longitude: 106.8091,
      address: 'Rumah Utama, Kebayoran Baru',
      batteryLevel: 95,
      lastUpdated: '1 menit yang lalu',
      isSafeZone: true,
    },
    {
      id: 'loc_3',
      memberName: 'Anak Budi',
      role: 'Anak (14 thn)',
      latitude: -6.215,
      longitude: 106.82,
      address: 'SMPN 1 Jakarta (Safe Zone)',
      batteryLevel: 64,
      lastUpdated: '5 menit yang lalu',
      isSafeZone: true,
    },
  ],

  logs: [
    {
      id: 'log_1',
      timestamp: new Date().toLocaleTimeString(),
      level: 'info',
      service: 'IntegrationGateway',
      message: 'Provider adapters initialized: BMKG, FCM, OpenStreetMap, Qontak WA.',
      executionTimeMs: 14,
    },
    {
      id: 'log_2',
      timestamp: new Date().toLocaleTimeString(),
      level: 'info',
      service: 'AIAutomationEngine',
      message: 'EventBus listener active. Rule #auto_1 listening to weather_rain_detected.',
      executionTimeMs: 8,
    },
  ],

  fetchWeather: async (city: string) => {
    const adapter = new BMKGWeatherAdapter();
    const data = await adapter.getWeatherForCity(city);
    set({ weather: data });
  },

  toggleAutomation: (id: string) => {
    AIAutomationEngine.getInstance().toggleAutomation(id);
    set({ automations: AIAutomationEngine.getInstance().getAutomations() });
  },

  triggerAutomationNow: (id: string) => {
    AIAutomationEngine.getInstance().triggerAutomation(id);
    set({ automations: AIAutomationEngine.getInstance().getAutomations() });
  },

  markNotificationRead: (id: string) => {
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    }));
  },

  clearAllNotifications: () => {
    set({ notifications: [] });
  },

  addQueueJob: (type, payload) => {
    JobQueue.getInstance().addJob(type, payload);
    set({ jobs: JobQueue.getInstance().getJobs() });
  },

  setMapProvider: (provider) => {
    set({ selectedMapProvider: provider });
  },

  addLog: (level, service, message) => {
    const newLog: LogMetricModel = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      level,
      service,
      message,
      executionTimeMs: Math.floor(Math.random() * 20) + 5,
    };
    set((state) => ({ logs: [newLog, ...state.logs].slice(0, 50) }));
  },
}));
