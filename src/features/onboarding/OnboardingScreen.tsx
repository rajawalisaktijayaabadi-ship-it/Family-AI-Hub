import React, { useState } from 'react';
import { ONBOARDING_SLIDES } from '../../core/constants';
import { motion, AnimatePresence } from 'motion/react';
import { HeartHandshake, Users, Sparkles, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slide = ONBOARDING_SLIDES[currentSlideIndex];
  const isLastSlide = currentSlideIndex === ONBOARDING_SLIDES.length - 1;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-12 h-12 text-white" />;
      case 'Users':
        return <Users className="w-12 h-12 text-white" />;
      case 'Sparkles':
        return <Sparkles className="w-12 h-12 text-white" />;
      case 'ShieldCheck':
      default:
        return <ShieldCheck className="w-12 h-12 text-white" />;
    }
  };

  const handleNext = () => {
    if (isLastSlide) {
      onComplete();
    } else {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between p-6 select-none relative overflow-hidden font-sans">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="flex items-center justify-between z-10 pt-2">
        <span className="text-xs font-bold tracking-wider text-blue-400 font-heading">
          {currentSlideIndex + 1} / {ONBOARDING_SLIDES.length}
        </span>
        {!isLastSlide && (
          <button
            onClick={onComplete}
            className="text-xs font-medium text-slate-400 hover:text-white px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/50 transition active-press"
          >
            Lewati
          </button>
        )}
      </div>

      {/* Slide Content with AnimatePresence */}
      <div className="my-auto py-8 z-10 flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="flex flex-col items-center"
          >
            {/* Visual Icon Box */}
            <div
              className={`w-28 h-28 rounded-3xl bg-gradient-to-tr ${slide.gradient} p-0.5 shadow-2xl shadow-blue-500/20 flex items-center justify-center mb-8 relative`}
            >
              <div className="w-full h-full bg-slate-950/40 rounded-[22px] backdrop-blur-md flex items-center justify-center">
                {getIcon(slide.icon)}
              </div>
            </div>

            <h2 className="text-2xl font-bold font-heading text-white mb-2 leading-tight px-2">
              {slide.title}
            </h2>

            <p className="text-xs font-semibold text-teal-400 mb-4 px-4">
              {slide.subtitle}
            </p>

            <p className="text-xs text-slate-300 leading-relaxed px-4 max-w-xs">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Actions & Indicators */}
      <div className="z-10 flex flex-col items-center gap-6 pb-4">
        {/* Page Indicator Pills */}
        <div className="flex items-center gap-2">
          {ONBOARDING_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlideIndex === idx
                  ? 'w-8 bg-gradient-to-r from-blue-500 to-teal-400'
                  : 'w-2 bg-slate-700 hover:bg-slate-600'
              }`}
            />
          ))}
        </div>

        {/* Next / Finish CTA Button */}
        <button
          onClick={handleNext}
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-bold text-sm rounded-2xl shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 transition active-press"
        >
          {isLastSlide ? (
            <>
              <span>Mulai Sekarang</span>
              <CheckCircle2 className="w-5 h-5 text-teal-200" />
            </>
          ) : (
            <>
              <span>Lanjutkan</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
