import React from 'react';
import { useSmartHomeStore } from '../../stores/useSmartHomeStore';
import { Moon, LogOut, Home, BookOpen, Clock, Zap, ToggleLeft, ToggleRight, Play } from 'lucide-react';

export const AutomationsTab: React.FC = () => {
  const { scenes, toggleScene } = useSmartHomeStore();

  const getSceneIcon = (iconName: string) => {
    switch (iconName) {
      case 'Moon':
        return <Moon className="h-5 w-5 text-indigo-400" />;
      case 'LogOut':
        return <LogOut className="h-5 w-5 text-amber-400" />;
      case 'Home':
        return <Home className="h-5 w-5 text-emerald-400" />;
      case 'BookOpen':
        return <BookOpen className="h-5 w-5 text-blue-400" />;
      default:
        return <Zap className="h-5 w-5 text-teal-400" />;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Otomasi & Skenario Pintar (AI Scenes)
        </h3>
        <span className="text-[10px] text-slate-500 font-semibold">{scenes.length} Skenario</span>
      </div>

      <div className="space-y-3">
        {scenes.map((scene) => (
          <div
            key={scene.id}
            className={`rounded-3xl p-4 shadow-sm border transition-all ${
              scene.isActive
                ? 'bg-slate-900 text-white border-slate-800'
                : 'bg-white text-slate-900 border-slate-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-2xl ${
                    scene.isActive ? 'bg-slate-800' : 'bg-slate-100'
                  }`}
                >
                  {getSceneIcon(scene.icon)}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold">{scene.title}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1 font-bold text-teal-400">
                      <Clock className="h-3 w-3" />
                      {scene.triggerTime}
                    </span>
                    <span>•</span>
                    <span>{scene.actionsCount} Aksi Perangkat</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleScene(scene.id)}
                className="text-slate-400 hover:text-teal-400 transition"
              >
                {scene.isActive ? (
                  <ToggleRight className="h-8 w-8 text-emerald-400" />
                ) : (
                  <ToggleLeft className="h-8 w-8 text-slate-300" />
                )}
              </button>
            </div>

            <p className={`text-xs mt-3 leading-relaxed ${scene.isActive ? 'text-slate-300' : 'text-slate-600'}`}>
              {scene.description}
            </p>

            <div className="mt-3 pt-3 border-t border-slate-200/20 flex items-center justify-between">
              <span className={`text-[10px] font-bold ${scene.isActive ? 'text-emerald-400' : 'text-slate-400'}`}>
                Status: {scene.isActive ? 'Otomasi Aktif' : 'Otomasi Mati'}
              </span>
              <button
                onClick={() => toggleScene(scene.id)}
                className="flex items-center gap-1 text-[11px] font-bold text-teal-400 hover:underline"
              >
                <Play className="h-3 w-3" />
                Jalankan Sekarang
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
