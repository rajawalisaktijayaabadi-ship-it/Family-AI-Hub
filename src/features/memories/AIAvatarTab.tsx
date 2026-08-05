import React, { useState } from 'react';
import { useMemoryStore } from '../../stores/useMemoryStore';
import { UserCheck, Sparkles, MessageSquare, Volume2, Edit3, Palette, Plus } from 'lucide-react';
import { AvatarStyle, AvatarTheme, AvatarCategory } from '../../types/memories';
import { MockAvatarService } from '../../services/MockAvatarService';

export const AIAvatarTab: React.FC = () => {
  const { avatars, updateAvatar } = useMemoryStore();

  const [selectedAvatarId, setSelectedAvatarId] = useState<string>(avatars[0]?.id || 'av_1');
  const [activeGreeting, setActiveGreeting] = useState<string | null>(null);

  const selectedAvatar = avatars.find((a) => a.id === selectedAvatarId) || avatars[0];

  const handleStyleChange = (style: AvatarStyle) => {
    if (!selectedAvatar) return;
    const newPreviewUrl = MockAvatarService.generateAvatarPreview(
      selectedAvatar.memberName,
      style,
      selectedAvatar.theme
    );
    updateAvatar(selectedAvatar.id, { style, avatarUrl: newPreviewUrl });
  };

  const handleThemeChange = (theme: AvatarTheme) => {
    if (!selectedAvatar) return;
    updateAvatar(selectedAvatar.id, { theme });
  };

  const handleSpeakGreeting = () => {
    if (!selectedAvatar) return;
    const msg = MockAvatarService.generateAvatarGreeting(
      selectedAvatar.memberName,
      selectedAvatar
    );
    setActiveGreeting(msg);
  };

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-4 rounded-3xl border border-indigo-800/50 shadow-xl space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white">AI Avatar Companion Foundation</h3>
            <p className="text-[11px] text-purple-200/80">Karakter AI Anggota Keluarga & Kepribadian Digital</p>
          </div>
        </div>
      </div>

      {/* Avatar Selector Cards */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {avatars.map((av) => (
          <button
            key={av.id}
            onClick={() => {
              setSelectedAvatarId(av.id);
              setActiveGreeting(null);
            }}
            className={`p-2.5 rounded-2xl border transition text-left flex items-center gap-2.5 shrink-0 ${
              selectedAvatarId === av.id
                ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
            }`}
          >
            <img src={av.avatarUrl} alt={av.memberName} className="w-9 h-9 rounded-full object-cover ring-2 ring-white/50" />
            <div>
              <p className="text-xs font-black leading-tight">{av.memberName}</p>
              <p className="text-[10px] opacity-80">{av.style}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Avatar Studio Panel */}
      {selectedAvatar && (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative group">
              <img
                src={selectedAvatar.avatarUrl}
                alt={selectedAvatar.memberName}
                className="w-28 h-28 rounded-3xl object-cover shadow-lg border-2 border-amber-500"
              />
              <span className="absolute bottom-1 right-1 bg-amber-600 text-white text-[9px] px-2 py-0.5 rounded-full font-bold">
                {selectedAvatar.style}
              </span>
            </div>

            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <h4 className="text-sm font-black text-slate-900 dark:text-white">
                {selectedAvatar.memberName}
              </h4>
              <p className="text-xs text-amber-600 dark:text-amber-400 font-extrabold">
                Kategori: {selectedAvatar.avatarCategory} • Tema: {selectedAvatar.theme}
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                Kepribadian: "{selectedAvatar.personality}"
              </p>
              <p className="text-[10px] text-slate-400">
                Suara: {selectedAvatar.voiceType}
              </p>

              <button
                onClick={handleSpeakGreeting}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl text-xs font-extrabold shadow-sm transition flex items-center gap-1.5 mx-auto sm:mx-0 active:scale-95 mt-1"
              >
                <Volume2 className="w-4 h-4" />
                <span>Simulasi Sapaan AI Avatar</span>
              </button>
            </div>
          </div>

          {/* Greeting Box */}
          {activeGreeting && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-2xl text-xs text-amber-950 dark:text-amber-200 space-y-1 animate-fadeIn">
              <div className="flex items-center gap-1 font-black text-amber-800 dark:text-amber-300">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Suara Sapaan Avatar ({selectedAvatar.memberName}):</span>
              </div>
              <p className="italic leading-relaxed">"{activeGreeting}"</p>
            </div>
          )}

          {/* Style Selector */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-amber-600" />
              <span>Gaya Visual Avatar:</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {(['3D Pixar', 'Anime', 'Realism', 'Cartoon', 'Cyberpunk'] as AvatarStyle[]).map(
                (st) => (
                  <button
                    key={st}
                    onClick={() => handleStyleChange(st)}
                    className={`py-2 px-2 rounded-2xl text-[11px] font-bold transition text-center ${
                      selectedAvatar.style === st
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Theme Selector */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
              Tema Warna & Suasana:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {(['Warm', 'Neon', 'Pastel', 'Classic'] as AvatarTheme[]).map((tm) => (
                <button
                  key={tm}
                  onClick={() => handleThemeChange(tm)}
                  className={`py-1.5 px-3 rounded-2xl text-[11px] font-bold transition ${
                    selectedAvatar.theme === tm
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {tm}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
