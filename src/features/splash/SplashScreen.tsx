import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { HeartHandshake, Sparkles, ShieldCheck } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col items-center justify-between p-8 select-none font-sans overflow-hidden">
      {/* Background Animated Glowing Spheres */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"
      />

      <div className="w-full flex justify-end">
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-semibold text-teal-300 border border-white/15">
          <ShieldCheck className="w-3 h-3 text-teal-400" /> Phase 1 Mobile Edition
        </span>
      </div>

      {/* Main Logo & Title Center */}
      <div className="flex flex-col items-center text-center max-w-xs relative z-10 my-auto">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
          className="relative mb-6"
        >
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-400 rounded-3xl p-0.5 shadow-2xl shadow-blue-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950/80 rounded-[22px] backdrop-blur-md flex items-center justify-center relative overflow-hidden">
              <HeartHandshake className="w-12 h-12 text-teal-300" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border border-dashed border-teal-400/30 rounded-full"
              />
            </div>
          </div>
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1 p-1.5 bg-teal-400 text-slate-950 rounded-full shadow-lg"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-2xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-teal-200 tracking-tight mb-1"
        >
          FamilyAI Hub
        </motion.h1>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xs font-medium text-teal-400 tracking-widest uppercase mb-4"
        >
          INDONESIA MOBILE EDITION
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-xs text-slate-300 italic leading-relaxed px-2"
        >
          "Mempererat keharmonisan keluarga Indonesia dengan sentuhan kecerdasan buatan."
        </motion.p>
      </div>

      {/* Loading Bar Footer */}
      <div className="w-full max-w-xs flex flex-col items-center gap-3 relative z-10 pb-4">
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.6, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-teal-400 rounded-full"
          />
        </div>
        <span className="text-[10px] text-slate-400 font-medium">
          Menyiapkan Ekosistem Cerdas...
        </span>
      </div>
    </div>
  );
};
