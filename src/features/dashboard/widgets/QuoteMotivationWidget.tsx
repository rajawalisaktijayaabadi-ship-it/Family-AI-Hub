import React, { useState } from 'react';
import { Quote, Sparkles, RefreshCw, Share2 } from 'lucide-react';
import { useToastStore } from '../../../stores/useToastStore';

const MOTIVATION_QUOTES = [
  {
    text: 'Keharmonisan dalam keluarga adalah fondasi terkuat untuk melangkah meraih setiap impian.',
    author: 'Kutipan Motivasi Keluarga',
  },
  {
    text: 'Hal terpenting di dunia adalah keluarga dan kasih sayang.',
    author: 'John Wooden',
  },
  {
    text: 'Kebahagiaan keluarga adalah buah dari saling menghormati dan mendukung satu sama lain.',
    author: 'Refleksi Harian',
  },
  {
    text: 'Rumah bukan sekadar tempat, melainkan tempat di mana hati selalu ingin kembali.',
    author: 'Pepatah Bijak',
  },
];

export const QuoteMotivationWidget: React.FC = () => {
  const { addToast } = useToastStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextQuote = () => {
    setCurrentIndex((prev) => (prev + 1) % MOTIVATION_QUOTES.length);
  };

  const currentQuote = MOTIVATION_QUOTES[currentIndex];

  const handleShare = () => {
    navigator.clipboard?.writeText?.(`"${currentQuote.text}" - ${currentQuote.author}`);
    addToast('Kutipan motivasi berhasil disalin!', 'success');
  };

  return (
    <div className="p-4 rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 text-white shadow-lg relative overflow-hidden flex flex-col justify-between h-full min-h-[140px]">
      <div className="flex items-center justify-between text-xs relative z-10">
        <div className="flex items-center gap-1.5 font-bold text-amber-100">
          <Quote className="w-4 h-4 text-amber-200" />
          <span>Motivasi Harian</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleNextQuote}
            className="p-1.5 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            title="Ganti Kutipan"
          >
            <RefreshCw className="w-3.5 h-3.5 text-white" />
          </button>
          <button
            onClick={handleShare}
            className="p-1.5 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            title="Salin Kutipan"
          >
            <Share2 className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>

      <div className="my-2 relative z-10">
        <p className="text-xs font-semibold leading-relaxed italic text-amber-50">
          "{currentQuote.text}"
        </p>
        <span className="text-[10px] font-bold text-amber-200 mt-1 block">
          — {currentQuote.author}
        </span>
      </div>

      <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[10px] text-amber-100 relative z-10">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-200" /> Disarankan untuk Keluarga Anda
        </span>
        <span className="font-bold">#Inspirasi</span>
      </div>
    </div>
  );
};
