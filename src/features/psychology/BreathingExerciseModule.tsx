import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Wind, Play, Pause, RotateCcw, Volume2, Sparkles, Moon } from 'lucide-react';

type TechniqueType = '4-4-4' | '4-7-8' | 'relaxation';

export const BreathingExerciseModule: React.FC = () => {
  const [technique, setTechnique] = useState<TechniqueType>('4-4-4');
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [countdown, setCountdown] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);

  // Meditation timer state
  const [meditationDuration, setMeditationDuration] = useState<number>(3); // minutes
  const [meditationLeft, setMeditationLeft] = useState<number>(180);
  const [isMeditationActive, setIsMeditationActive] = useState(false);

  // Breathing technique configuration
  const getPhaseDurations = (tech: TechniqueType) => {
    if (tech === '4-4-4') return { inhale: 4, hold1: 4, exhale: 4, rest: 4 };
    if (tech === '4-7-8') return { inhale: 4, hold1: 7, exhale: 8, rest: 0 };
    return { inhale: 5, hold1: 2, exhale: 5, rest: 2 };
  };

  useEffect(() => {
    if (!isRunning) return;

    const durations = getPhaseDurations(technique);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) return prev - 1;

        // Transition phase
        if (phase === 'Inhale') {
          if (durations.hold1 > 0) {
            setPhase('Hold');
            return durations.hold1;
          } else {
            setPhase('Exhale');
            return durations.exhale;
          }
        } else if (phase === 'Hold') {
          setPhase('Exhale');
          return durations.exhale;
        } else if (phase === 'Exhale') {
          if (durations.rest > 0) {
            setPhase('Rest');
            return durations.rest;
          } else {
            setCycleCount((c) => c + 1);
            setPhase('Inhale');
            return durations.inhale;
          }
        } else {
          setCycleCount((c) => c + 1);
          setPhase('Inhale');
          return durations.inhale;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, phase, technique]);

  // Meditation timer effect
  useEffect(() => {
    if (!isMeditationActive) return;

    const timer = setInterval(() => {
      setMeditationLeft((prev) => {
        if (prev <= 1) {
          setIsMeditationActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isMeditationActive]);

  const handleStartBreathing = () => {
    setIsRunning(true);
    setPhase('Inhale');
    setCountdown(getPhaseDurations(technique).inhale);
  };

  const handleStopBreathing = () => {
    setIsRunning(false);
    setPhase('Inhale');
    setCountdown(4);
  };

  const handleSelectMeditationPreset = (min: number) => {
    setMeditationDuration(min);
    setMeditationLeft(min * 60);
    setIsMeditationActive(false);
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Technique Selector */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
        <button
          onClick={() => {
            setTechnique('4-4-4');
            handleStopBreathing();
          }}
          className={`py-2 rounded-xl transition ${
            technique === '4-4-4'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Box 4-4-4
        </button>
        <button
          onClick={() => {
            setTechnique('4-7-8');
            handleStopBreathing();
          }}
          className={`py-2 rounded-xl transition ${
            technique === '4-7-8'
              ? 'bg-purple-600 text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Relaksasi 4-7-8
        </button>
        <button
          onClick={() => {
            setTechnique('relaxation');
            handleStopBreathing();
          }}
          className={`py-2 rounded-xl transition ${
            technique === 'relaxation'
              ? 'bg-teal-600 text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Fokus 5-5
        </button>
      </div>

      {/* Interactive Breathing Ring */}
      <div className="p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl text-white shadow-xl flex flex-col items-center justify-center space-y-5 relative overflow-hidden">
        <div className="flex items-center gap-1.5 text-xs text-teal-300 font-extrabold uppercase tracking-wider">
          <Wind className="w-4 h-4 animate-pulse" /> Sesi Latihan Pernapasan ({technique})
        </div>

        {/* Animated Circle */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          <motion.div
            animate={{
              scale: phase === 'Inhale' ? 1.25 : phase === 'Exhale' ? 0.8 : 1.05,
              opacity: phase === 'Inhale' ? 0.9 : 0.6,
            }}
            transition={{ duration: countdown, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-blue-500 via-teal-400 to-indigo-500 rounded-full blur-md opacity-40"
          />

          <div className="relative z-10 w-32 h-32 rounded-full border-4 border-white/30 bg-white/10 backdrop-blur-md flex flex-col items-center justify-center text-center p-2 shadow-inner">
            <span className="text-2xl font-black font-mono leading-none">{countdown}</span>
            <span className="text-xs font-extrabold mt-1 uppercase tracking-wide text-teal-200">
              {phase === 'Inhale'
                ? 'Tarik Napas'
                : phase === 'Hold'
                ? 'Tahan Napas'
                : phase === 'Exhale'
                ? 'Hembuskan'
                : 'Istirahat'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isRunning ? (
            <button
              onClick={handleStartBreathing}
              className="px-6 py-2.5 bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-500 hover:to-emerald-600 text-slate-900 font-extrabold text-xs rounded-2xl shadow-md flex items-center gap-1.5"
            >
              <Play className="w-4 h-4 fill-slate-900" /> Mulai Pernapasan
            </button>
          ) : (
            <button
              onClick={handleStopBreathing}
              className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs rounded-2xl shadow-md flex items-center gap-1.5"
            >
              <Pause className="w-4 h-4 fill-white" /> Hentikan Latihan
            </button>
          )}

          <button
            onClick={() => {
              handleStopBreathing();
              setCycleCount(0);
            }}
            className="p-2.5 bg-white/10 hover:bg-white/20 rounded-2xl text-xs font-bold text-white"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <span className="text-[10px] text-slate-400 font-mono font-bold">
          Siklus Selesai: {cycleCount} putaran
        </span>
      </div>

      {/* Meditation Sound Placeholder */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading">
                Sesi Meditasi & Suara Alam
              </h4>
              <p className="text-[10px] text-slate-400">Audio Terapi Relaksasi Pikiran</p>
            </div>
          </div>

          <div className="flex gap-1">
            {[3, 5, 10].map((min) => (
              <button
                key={min}
                onClick={() => handleSelectMeditationPreset(min)}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                  meditationDuration === min
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {min}m
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-indigo-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Instrumen Alami Ketenangan Jiwa ({Math.floor(meditationLeft / 60)}:
              {String(meditationLeft % 60).padStart(2, '0')})
            </span>
          </div>

          <button
            onClick={() => setIsMeditationActive(!isMeditationActive)}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold text-white transition ${
              isMeditationActive ? 'bg-rose-500' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isMeditationActive ? 'Jeda' : 'Putar Audio'}
          </button>
        </div>
      </div>
    </div>
  );
};
