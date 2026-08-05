import React from 'react';
import { useFamilySafetyStore } from '../../stores/useFamilySafetyStore';
import { Plane, AlertCircle, Plus, Calendar, MapPin, ShieldAlert } from 'lucide-react';

interface TravelIncidentsTabProps {
  onOpenReportIncident: () => void;
}

export const TravelIncidentsTab: React.FC<TravelIncidentsTabProps> = ({ onOpenReportIncident }) => {
  const { travelPlans, incidentReports } = useFamilySafetyStore();

  return (
    <div className="space-y-4">
      {/* Travel Safety Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Perjalanan & Keamanan Perjalanan
        </h3>
        <button
          onClick={onOpenReportIncident}
          className="flex items-center gap-1 rounded-2xl bg-rose-600 px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-rose-700"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Laporkan Insiden</span>
        </button>
      </div>

      {/* Travel Plans */}
      <div className="space-y-3">
        {travelPlans.map((trip) => (
          <div
            key={trip.id}
            className="rounded-3xl bg-gradient-to-r from-blue-900 via-slate-900 to-teal-950 p-4 text-white shadow-lg space-y-2 border border-blue-500/20"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-[10px] font-black uppercase text-teal-400">
                <Plane className="h-3.5 w-3.5" /> Plan Perjalanan Keluarga
              </span>
              <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[10px] font-bold text-blue-300 border border-blue-500/30">
                {trip.status}
              </span>
            </div>
            <h4 className="text-sm font-extrabold">{trip.tripName}</h4>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-teal-400" /> {trip.destination}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-teal-400" /> {trip.startDate} - {trip.endDate}
              </span>
            </div>
            <p className="text-xs text-slate-300 pt-2 border-t border-slate-800">
              Catatan Keselamatan: {trip.safetyNotes}
            </p>
          </div>
        ))}
      </div>

      {/* Incident Reports Feed */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Laporan Insiden Keamanan Sekitar
        </h4>
        <div className="space-y-2.5">
          {incidentReports.map((inc) => (
            <div
              key={inc.id}
              className="rounded-2xl bg-white p-3.5 shadow-sm border border-slate-200 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900">
                  <ShieldAlert className="h-4 w-4 text-amber-500" />
                  {inc.title}
                </span>
                <span
                  className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                    inc.severity === 'High'
                      ? 'bg-rose-100 text-rose-700'
                      : inc.severity === 'Medium'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  Tingkat: {inc.severity}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{inc.description}</p>
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100">
                <span>
                  Lokasi: {inc.location} ({inc.reporterName})
                </span>
                <span>{inc.dateTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
