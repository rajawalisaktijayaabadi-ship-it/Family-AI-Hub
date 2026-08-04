import React from 'react';
import { Sparkles, Bot, ChevronRight, MessageSquare, Mic } from 'lucide-react';

interface AIPlaceholderWidgetProps {
  onOpenAI: () => void;
}

export const AIPlaceholderWidget: React.FC<AIPlaceholderWidgetProps> = ({ onOpenAI }) => {
  return (
    <div
      onClick={onOpenAI}
      className="p-4 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 text-white shadow-xl relative overflow-hidden cursor-pointer group active:scale-98 transition-all"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform pointer-events-none" />

      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-white/20 rounded-2xl backdrop-blur-md">
            <Bot className="w-5 h-5 text-teal-200" />
          </div>
          <div>
            <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider bg-white/20 rounded-full text-teal-200 backdrop-blur-md">
              Gemini AI Orchestrator
            </span>
            <h3 className="text-sm font-extrabold mt-0.5">Rekomendasi Pintar AI Harian</h3>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
      </div>

      <p className="text-xs text-indigo-100 leading-relaxed mb-3 relative z-10">
        "Cuaca Jakarta hari ini cerah berawan. Disarankan aktivitas keluarga luar ruangan ringan sore ini dan konsumsi cukup air minum."
      </p>

      <div className="flex items-center gap-2 pt-2 border-t border-white/20 relative z-10 text-xs">
        <button className="flex-1 py-1.5 px-3 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl backdrop-blur-md transition-colors flex items-center justify-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5" />
          Tanyakan AI
        </button>
        <button className="py-1.5 px-3 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl backdrop-blur-md transition-colors flex items-center justify-center gap-1.5">
          <Mic className="w-3.5 h-3.5" />
          Suara
        </button>
      </div>
    </div>
  );
};
