import React, { useEffect, useState } from 'react';
import { useFamilySafetyStore } from '../../stores/useFamilySafetyStore';
import { useFamilyLocationStore } from '../../stores/useFamilyLocationStore';
import { SafetyOverviewTab } from './SafetyOverviewTab';
import { SafeZonesTab } from './SafeZonesTab';
import { CheckInSOSTab } from './CheckInSOSTab';
import { EmergencyPlansTab } from './EmergencyPlansTab';
import { TravelIncidentsTab } from './TravelIncidentsTab';
import { FamilyMapView } from './FamilyMapView';
import { FamilyInvitationTab } from './FamilyInvitationTab';
import { PrivacyConsentTab } from './PrivacyConsentTab';
import { LiveTrackingTab } from './LiveTrackingTab';
import { CheckInModal } from './CheckInModal';
import { SOSModal } from './SOSModal';
import {
  ShieldCheck,
  MapPin,
  AlertTriangle,
  BookOpen,
  Compass,
  Shield,
  Map,
  UserPlus,
  Lock,
  Radio,
} from 'lucide-react';

type SafetySubTab =
  | 'map'
  | 'tracking'
  | 'invite'
  | 'privacy'
  | 'overview'
  | 'safezones'
  | 'emergency'
  | 'travel';

export const FamilySafetyScreen: React.FC = () => {
  const { initialize: initSafety, isLoading: isLoadingSafety } = useFamilySafetyStore();
  const { initialize: initLocation } = useFamilyLocationStore();

  const [activeTab, setActiveTab] = useState<SafetySubTab>('map');
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isSOSOpen, setIsSOSOpen] = useState(false);

  useEffect(() => {
    initSafety();
    initLocation();
  }, [initSafety, initLocation]);

  if (isLoadingSafety) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center space-y-3">
          <ShieldCheck className="mx-auto h-10 w-10 text-emerald-600 animate-bounce" />
          <p className="text-xs font-bold text-slate-700">Mempersiapkan Family Safety & Location Tracking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 pt-4 px-4 max-w-md mx-auto">
      {/* Module Title Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-1.5 text-emerald-700">
            <Shield className="h-5 w-5" />
            <span className="text-xs font-extrabold uppercase tracking-wider">GPS & Location Sharing</span>
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Family Safety Center</h1>
        </div>
        <button
          onClick={() => setIsSOSOpen(true)}
          className="rounded-2xl bg-rose-600 px-3 py-1.5 text-xs font-extrabold text-white shadow-md hover:bg-rose-700 active:scale-95 transition flex items-center gap-1 animate-pulse"
        >
          <AlertTriangle className="h-3.5 w-3.5" />
          <span>SOS</span>
        </button>
      </div>

      {/* Sub-Tabs Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none border-b border-slate-200">
        {[
          { id: 'map', label: 'Peta Keluarga', icon: <Map className="h-3.5 w-3.5" /> },
          { id: 'tracking', label: 'Live GPS', icon: <Radio className="h-3.5 w-3.5" /> },
          { id: 'invite', label: 'Undangan HP', icon: <UserPlus className="h-3.5 w-3.5" /> },
          { id: 'privacy', label: 'Privasi & Consent', icon: <Lock className="h-3.5 w-3.5" /> },
          { id: 'overview', label: 'Ringkasan', icon: <ShieldCheck className="h-3.5 w-3.5" /> },
          { id: 'safezones', label: 'Safe Zones', icon: <MapPin className="h-3.5 w-3.5" /> },
          { id: 'emergency', label: 'Rencana Darurat', icon: <BookOpen className="h-3.5 w-3.5" /> },
          { id: 'travel', label: 'Perjalanan & Insiden', icon: <Compass className="h-3.5 w-3.5" /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SafetySubTab)}
              className={`flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold whitespace-nowrap transition ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Sub-Tab View */}
      {activeTab === 'map' && <FamilyMapView />}
      {activeTab === 'tracking' && <LiveTrackingTab />}
      {activeTab === 'invite' && <FamilyInvitationTab />}
      {activeTab === 'privacy' && <PrivacyConsentTab />}
      {activeTab === 'overview' && (
        <SafetyOverviewTab
          onOpenCheckIn={() => setIsCheckInOpen(true)}
          onOpenSOS={() => setIsSOSOpen(true)}
        />
      )}
      {activeTab === 'safezones' && <SafeZonesTab />}
      {activeTab === 'emergency' && <EmergencyPlansTab />}
      {activeTab === 'travel' && <TravelIncidentsTab />}

      {/* Modals */}
      <CheckInModal isOpen={isCheckInOpen} onClose={() => setIsCheckInOpen(false)} />
      <SOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />
    </div>
  );
};
