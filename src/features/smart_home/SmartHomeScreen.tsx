import React, { useEffect, useState } from 'react';
import { useSmartHomeStore } from '../../stores/useSmartHomeStore';
import { DevicesTab } from './DevicesTab';
import { RoomsTab } from './RoomsTab';
import { AutomationsTab } from './AutomationsTab';
import { EnergyTab } from './EnergyTab';
import { IoTGatewayTab } from './IoTGatewayTab';
import { AddDeviceModal } from './AddDeviceModal';
import { Home, Sliders, Zap, Cpu, Layers } from 'lucide-react';

type SmartHomeSubTab = 'devices' | 'rooms' | 'automations' | 'energy' | 'gateway';

export const SmartHomeScreen: React.FC = () => {
  const { initialize, isLoading } = useSmartHomeStore();
  const [activeTab, setActiveTab] = useState<SmartHomeSubTab>('devices');
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center space-y-3">
          <Home className="mx-auto h-10 w-10 text-teal-600 animate-bounce" />
          <p className="text-xs font-bold text-slate-700">Mempersiapkan Smart Home & Mesh IoT...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 pt-4 px-4 max-w-md mx-auto">
      {/* Module Title Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-1.5 text-teal-700">
            <Home className="h-5 w-5" />
            <span className="text-xs font-extrabold uppercase tracking-wider">Modul Rumah Pintar & IoT</span>
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Smart Home Center</h1>
        </div>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black text-emerald-800 border border-emerald-300">
          ● Mesh Connected
        </span>
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none border-b border-slate-200">
        {[
          { id: 'devices', label: 'Perangkat', icon: <Home className="h-3.5 w-3.5" /> },
          { id: 'rooms', label: 'Ruangan', icon: <Layers className="h-3.5 w-3.5" /> },
          { id: 'automations', label: 'Otomasi', icon: <Sliders className="h-3.5 w-3.5" /> },
          { id: 'energy', label: 'Energi (kWh)', icon: <Zap className="h-3.5 w-3.5" /> },
          { id: 'gateway', label: 'Gateway & CCTV', icon: <Cpu className="h-3.5 w-3.5" /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SmartHomeSubTab)}
              className={`flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold whitespace-nowrap transition ${
                isActive
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Render Active View */}
      {activeTab === 'devices' && <DevicesTab onOpenAddDevice={() => setIsAddDeviceOpen(true)} />}
      {activeTab === 'rooms' && <RoomsTab />}
      {activeTab === 'automations' && <AutomationsTab />}
      {activeTab === 'energy' && <EnergyTab />}
      {activeTab === 'gateway' && <IoTGatewayTab />}

      {/* Modal */}
      <AddDeviceModal isOpen={isAddDeviceOpen} onClose={() => setIsAddDeviceOpen(false)} />
    </div>
  );
};
