import { AutomationModel } from '../../types/integration';
import { EventBus } from './EventBus';
import { NotificationService } from './NotificationAdapter';

export class AIAutomationEngine {
  private static instance: AIAutomationEngine;
  private automations: AutomationModel[] = [
    {
      id: 'auto_1',
      workspaceId: 'default_ws',
      name: 'Peringatan Hujan BMKG & Payung Keluarga',
      description: 'Kirim notifikasi ke HP keluarga jika cuaca terdeteksi hujan lebat di wilayah rumah.',
      isEnabled: true,
      trigger: { type: 'weather_rain', label: 'Cuaca Terdeteksi Hujan' },
      action: { type: 'send_push', label: 'Kirim Notifikasi Bawa Payung' },
      triggerCount: 14,
      lastTriggeredAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
    {
      id: 'auto_2',
      workspaceId: 'default_ws',
      name: 'Auto Safeguard Keluar Safe Zone',
      description: 'Kirim peringatan darurat jika anak keluar dari area geofence sekolah/rumah.',
      isEnabled: true,
      trigger: { type: 'geofence_exit', label: 'Anggota Keluar Zona Aman' },
      action: { type: 'send_push', label: 'Kirim Notifikasi Alert ke Orang Tua' },
      triggerCount: 3,
      lastTriggeredAt: new Date(Date.now() - 3600000 * 28).toISOString(),
    },
    {
      id: 'auto_3',
      workspaceId: 'default_ws',
      name: 'Peringatan Batas Anggaran Bulanan',
      description: 'Aktifkan penghematan kupon belanja jika budget pengeluaran rumah tangga > 85%.',
      isEnabled: true,
      trigger: { type: 'budget_exceeded', label: 'Pengeluaran > 85%' },
      action: { type: 'create_ai_reminder', label: 'Rekomendasikan Menu Hemat AI' },
      triggerCount: 2,
    },
  ];

  private constructor() {
    this.initEventListeners();
  }

  static getInstance(): AIAutomationEngine {
    if (!AIAutomationEngine.instance) {
      AIAutomationEngine.instance = new AIAutomationEngine();
    }
    return AIAutomationEngine.instance;
  }

  getAutomations(): AutomationModel[] {
    return [...this.automations];
  }

  toggleAutomation(id: string): void {
    const item = this.automations.find((a) => a.id === id);
    if (item) {
      item.isEnabled = !item.isEnabled;
      EventBus.getInstance().publish('AUTOMATION_UPDATED', item);
    }
  }

  addAutomation(automation: Omit<AutomationModel, 'id' | 'triggerCount'>): AutomationModel {
    const newItem: AutomationModel = {
      ...automation,
      id: `auto_${Date.now()}`,
      triggerCount: 0,
    };
    this.automations.push(newItem);
    EventBus.getInstance().publish('AUTOMATION_CREATED', newItem);
    return newItem;
  }

  triggerAutomation(id: string): void {
    const auto = this.automations.find((a) => a.id === id);
    if (!auto || !auto.isEnabled) return;

    auto.triggerCount += 1;
    auto.lastTriggeredAt = new Date().toISOString();

    NotificationService.getInstance().sendPushNotification({
      title: `⚡ Automation Triggered: ${auto.name}`,
      body: `Aksi otomatis '${auto.action.label}' berhasil dieksekusi oleh AI Engine.`,
      category: 'ai',
      workspaceId: auto.workspaceId,
    });

    EventBus.getInstance().publish('AUTOMATION_EXECUTED', auto);
  }

  private initEventListeners() {
    EventBus.getInstance().subscribe('WEATHER_RAIN_DETECTED', () => {
      const target = this.automations.find((a) => a.trigger.type === 'weather_rain');
      if (target) this.triggerAutomation(target.id);
    });
  }
}
