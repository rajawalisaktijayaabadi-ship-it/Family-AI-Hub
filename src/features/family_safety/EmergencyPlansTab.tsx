import React from 'react';
import { useFamilySafetyStore } from '../../stores/useFamilySafetyStore';
import { ShieldCheck, Phone, CheckSquare, Flame, Activity, Waves } from 'lucide-react';

export const EmergencyPlansTab: React.FC = () => {
  const { emergencyPlans } = useFamilySafetyStore();

  const getPlanIcon = (cat: string) => {
    switch (cat) {
      case 'Kebakaran':
        return <Flame className="h-5 w-5 text-rose-500" />;
      case 'Gempa Bumi':
        return <Activity className="h-5 w-5 text-amber-500" />;
      case 'Banjir':
        return <Waves className="h-5 w-5 text-blue-500" />;
      default:
        return <ShieldCheck className="h-5 w-5 text-teal-600" />;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Panduan Standar Keselamatan & Evakuasi
        </h3>
        <span className="text-[10px] text-slate-500 font-semibold">{emergencyPlans.length} Rencana Skenario</span>
      </div>

      <div className="space-y-3">
        {emergencyPlans.map((plan) => (
          <div
            key={plan.id}
            className="rounded-3xl bg-white p-4 shadow-sm border border-slate-200 space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-slate-100">{getPlanIcon(plan.category)}</div>
              <div>
                <span className="text-[9px] font-black uppercase text-teal-700 tracking-wider">
                  Skenario: {plan.category}
                </span>
                <h4 className="text-sm font-extrabold text-slate-900">{plan.title}</h4>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <p className="text-[10px] font-bold text-slate-500 uppercase">Titik Kumpul Evakuasi</p>
              <p className="text-xs font-bold text-slate-800">{plan.meetingPoint}</p>
            </div>

            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-slate-500 uppercase">Langkah Evakuasi Mandiri</p>
              {plan.steps.map((step, idx) => (
                <p key={idx} className="text-xs text-slate-700 leading-relaxed pl-1">
                  {step}
                </p>
              ))}
            </div>

            {/* Emergency Contacts */}
            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              <p className="text-[10px] font-bold text-slate-500 uppercase">Kontak Darurat Terkait</p>
              {plan.contacts.map((c, i) => (
                <div key={i} className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-50">
                  <div>
                    <span className="font-bold text-slate-900">{c.role}</span>
                    <span className="text-slate-500 ml-1">({c.name})</span>
                  </div>
                  <a
                    href={`tel:${c.phone}`}
                    className="flex items-center gap-1 font-bold text-teal-600 hover:underline"
                  >
                    <Phone className="h-3 w-3" />
                    {c.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
