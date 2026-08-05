import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Sparkles, UserCheck, Play, Pause, RefreshCw, Radio } from 'lucide-react';

export const AIVoiceAvatarSection: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<'budi' | 'siti' | 'asisten'>('asisten');
  const [emotion, setEmotion] = useState<'ramah' | 'senang' | 'serius' | 'empati'>('ramah');
  const [voiceSpeed, setVoiceSpeed] = useState<number>(1.0);

  const toggleListen = () => {
    setIsListening((prev) => !prev);
  };

  const playDemoSpeech = () => {
    setIsPlayingVoice(true);
    setTimeout(() => {
      setIsPlayingVoice(false);
    }, 3000);
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-5 shadow-sm">
      <div className="flex items-center justify-between border-b pb-3 border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">AI Voice & Avatar Foundation</h3>
            <p className="text-[11px] text-slate-500">
              Pengenalan suara (STT) & sintetis vokal interaktif (TTS)
            </p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
          Active Gemini Voice
        </span>
      </div>

      {/* Interactive Avatar Card */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 p-5 text-white flex flex-col items-center justify-center space-y-3 relative overflow-hidden">
        {/* Animated Ripple ring when playing speech */}
        {isPlayingVoice && (
          <div className="absolute inset-0 bg-indigo-500/10 animate-ping rounded-2xl pointer-events-none" />
        )}

        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 p-1 flex items-center justify-center shadow-lg">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden">
              <span className="text-3xl">🤖</span>
            </div>
          </div>
          <span className="absolute bottom-0 right-0 bg-emerald-500 w-4 h-4 rounded-full border-2 border-slate-900" />
        </div>

        <div className="text-center">
          <h4 className="font-bold text-sm text-white">FamilyAI Avatar Agent</h4>
          <p className="text-[11px] text-indigo-200 mt-0.5">
            Ekspresi: <span className="capitalize font-semibold text-cyan-300">{emotion}</span> | Kecepatan Vokal: {voiceSpeed}x
          </p>
        </div>

        {/* Emotion Pills */}
        <div className="flex space-x-1.5 pt-1">
          {(['ramah', 'senang', 'serius', 'empati'] as const).map((emo) => (
            <button
              key={emo}
              onClick={() => setEmotion(emo)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize transition ${
                emotion === emo
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {emo}
            </button>
          ))}
        </div>
      </div>

      {/* Voice Controls Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Speech to Text Toggle */}
        <button
          onClick={toggleListen}
          className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium text-xs transition border ${
            isListening
              ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
              : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
          }`}
        >
          {isListening ? (
            <>
              <MicOff className="w-4 h-4" />
              <span>Mendengarkan...</span>
            </>
          ) : (
            <>
              <Mic className="w-4 h-4" />
              <span>Aktifkan Mic (STT)</span>
            </>
          )}
        </button>

        {/* Text to Speech Test */}
        <button
          onClick={playDemoSpeech}
          disabled={isPlayingVoice}
          className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition shadow-sm disabled:opacity-50"
        >
          {isPlayingVoice ? (
            <>
              <Volume2 className="w-4 h-4 animate-bounce" />
              <span>Memutar Suara...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Uji Vokal AI (TTS)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
