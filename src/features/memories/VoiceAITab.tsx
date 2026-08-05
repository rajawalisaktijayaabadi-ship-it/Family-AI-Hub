import React, { useState } from 'react';
import { useMemoryStore } from '../../stores/useMemoryStore';
import { Mic, Play, Pause, Square, Plus, Volume2, FileText, Sparkles, Heart } from 'lucide-react';
import { useToastStore } from '../../stores/useToastStore';

export const VoiceAITab: React.FC = () => {
  const { audios, addAudio } = useMemoryStore();

  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<
    'Voice Note' | 'Family Story' | 'Baby Sound' | 'Song / Lullaby' | 'Important Log'
  >('Voice Note');
  const [memberName, setMemberName] = useState('Nenek Maryam');

  // Simulated timer during recording
  React.useEffect(() => {
    let timer: any;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordSeconds((s) => s + 1);
      }, 1000);
    } else {
      setRecordSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
    useToastStore.getState().addToast('Perekaman Suara Dimulai (Mikrofon Aktif)', 'info');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    const duration = recordSeconds || 15;

    addAudio({
      title: title || `Rekaman Suara Baru (${new Date().toLocaleTimeString('id-ID')})`,
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      durationSeconds: duration,
      category,
      date: new Date().toISOString().slice(0, 10),
      memberId: 'usr_fai_me',
      memberName,
      transcript: 'Transkrip Otomatis Placeholder: Rekaman pesan suara keluarga telah berhasil diproses oleh Voice AI Foundation.',
      isFavorite: false,
    });

    setTitle('');
  };

  const togglePlayAudio = (id: string) => {
    if (activePlayingId === id) {
      setActivePlayingId(null);
    } else {
      setActivePlayingId(id);
    }
  };

  return (
    <div className="space-y-4">
      {/* Voice Recorder Control Banner */}
      <div className="bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 text-white p-5 rounded-3xl shadow-lg text-center space-y-4 relative overflow-hidden">
        <div className="space-y-1">
          <span className="text-[10px] bg-white/20 px-3 py-1 rounded-full font-black uppercase tracking-wider">
            Voice AI Foundation & Recorder
          </span>
          <h3 className="text-base font-black">Rekam Cerita & Pesan Suara Keluarga</h3>
          <p className="text-[11px] text-amber-100">
            Abadikan suara nenek, tawa anak, atau catatan penting dengan transkrip otomatis.
          </p>
        </div>

        {/* Live Audio Visualizer Animation when recording */}
        {isRecording && (
          <div className="flex items-center justify-center gap-1.5 h-10 my-2">
            {[40, 80, 50, 100, 70, 90, 60, 100, 40].map((h, i) => (
              <div
                key={i}
                className="w-1.5 bg-amber-200 rounded-full animate-bounce"
                style={{
                  height: `${h}%`,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Record Button */}
        <div className="flex items-center justify-center gap-3">
          {!isRecording ? (
            <button
              onClick={handleStartRecording}
              className="px-6 py-3 bg-white text-amber-700 font-extrabold text-xs rounded-2xl shadow-xl hover:bg-amber-50 active:scale-95 transition flex items-center gap-2"
            >
              <Mic className="w-5 h-5 text-amber-600" />
              <span>Mulai Perekaman</span>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold bg-black/40 px-3 py-1.5 rounded-full">
                00:{recordSeconds.toString().padStart(2, '0')}
              </span>
              <button
                onClick={handleStopRecording}
                className="px-6 py-3 bg-rose-600 text-white font-extrabold text-xs rounded-2xl shadow-xl hover:bg-rose-700 active:scale-95 transition flex items-center gap-2 animate-pulse"
              >
                <Square className="w-4 h-4 fill-white" />
                <span>Hentikan & Simpan</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Voice Library Header */}
      <div className="flex items-center justify-between px-1">
        <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-amber-600" />
          <span>Perpustakaan Audio Keluarga ({audios.length})</span>
        </h4>
      </div>

      {/* Voice Notes List */}
      <div className="space-y-3">
        {audios.map((aud) => {
          const isPlaying = activePlayingId === aud.id;

          return (
            <div
              key={aud.id}
              className="p-3.5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 hover:border-amber-300 transition"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => togglePlayAudio(aud.id)}
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition ${
                      isPlaying
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 hover:bg-amber-200'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>

                  <div>
                    <h5 className="text-xs font-black text-slate-900 dark:text-white">{aud.title}</h5>
                    <p className="text-[10px] text-slate-500">
                      {aud.memberName} • {aud.category} • {aud.date}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full">
                  {Math.floor(aud.durationSeconds / 60)}:
                  {(aud.durationSeconds % 60).toString().padStart(2, '0')}
                </span>
              </div>

              {/* Audio Waveform Simulation */}
              {isPlaying && (
                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl space-y-2 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-1 h-6">
                    {[20, 60, 40, 90, 70, 30, 80, 100, 50, 40, 80, 60, 90, 30, 70].map((h, idx) => (
                      <div
                        key={idx}
                        className="flex-1 bg-amber-500 rounded-full animate-pulse"
                        style={{
                          height: `${h}%`,
                          animationDelay: `${idx * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>

                  {aud.transcript && (
                    <div className="text-[11px] text-slate-600 dark:text-slate-300 italic flex items-start gap-1.5 pt-1 border-t border-slate-200 dark:border-slate-700">
                      <FileText className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>"{aud.transcript}"</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
