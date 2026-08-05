import React from 'react';
import { useSmartHomeStore } from '../../stores/useSmartHomeStore';
import { Cpu, Wifi, ShieldCheck, CheckCircle2, Lock, Eye, AlertTriangle } from 'lucide-react';

export const IoTGatewayTab: React.FC = () => {
  const { gateways, devices } = useSmartHomeStore();

  const cameraDevices = devices.filter((d) => d.type === 'Camera');
  const lockDevices = devices.filter((d) => d.type === 'DoorLock');

  return (
    <div className="space-y-4">
      {/* IoT Gateways Status */}
      <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Cpu className="h-4 w-4 text-indigo-600" /> IoT Gateway & Protocol Status
          </h4>
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-700">
            Online (2 Mesh Hubs)
          </span>
        </div>

        <div className="space-y-2.5">
          {gateways.map((gw) => (
            <div key={gw.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-slate-900">{gw.gatewayName}</h5>
                  <p className="text-[10px] text-slate-500 font-medium">
                    Protokol: {gw.protocol} • Firmware: {gw.firmwareVersion}
                  </p>
                </div>
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-xl">
                  {gw.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-600 pt-1 border-t border-slate-200/60">
                <span className="flex items-center gap-1">
                  <Wifi className="h-3 w-3 text-blue-500" /> Sinyal Mesh: {gw.signalStrength}%
                </span>
                <span>{gw.connectedDevicesCount} Perangkat Terhubung</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Center Simulation */}
      <div className="rounded-3xl bg-slate-900 p-4 text-white shadow-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" /> Security Center & Smart Locks
          </h4>
          <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-wider">
            Sistem Terproteksi Enkripsi
          </span>
        </div>

        {/* Locks */}
        <div className="space-y-2">
          {lockDevices.map((lock) => (
            <div key={lock.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
              <div className="flex items-center gap-2.5">
                <Lock className="h-4 w-4 text-emerald-400" />
                <div>
                  <p className="text-xs font-bold text-white">{lock.name}</p>
                  <p className="text-[10px] text-slate-400">{lock.lastActive}</p>
                </div>
              </div>
              <span className="rounded-xl bg-emerald-500/20 px-2.5 py-1 text-[10px] font-black text-emerald-400 border border-emerald-500/30">
                LOCKED
              </span>
            </div>
          ))}
        </div>

        {/* Cameras */}
        <div className="space-y-2 pt-2">
          <p className="text-[11px] font-bold text-slate-300">CCTV & AI Motion Stream Status</p>
          {cameraDevices.map((cam) => (
            <div key={cam.id} className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-rose-400" />
                  <span className="text-xs font-bold text-white">{cam.name}</span>
                </div>
                <span className="flex items-center gap-1 text-[9px] font-extrabold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded-full">
                  ● LIVE 1080P
                </span>
              </div>
              <p className="text-[10px] text-slate-400">{cam.lastActive}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
