import React, { useState, useRef } from 'react';
import { RefreshCw, Trash2, Archive, CheckCircle2 } from 'lucide-react';

export interface PullToRefreshProps {
  onRefresh: () => Promise<void> | void;
  children: React.ReactNode;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({ onRefresh, children }) => {
  const [pullY, setPullY] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current > 0 && window.scrollY === 0) {
      const currentY = e.touches[0].clientY;
      const diff = currentY - startY.current;
      if (diff > 0) {
        setPullY(Math.min(diff * 0.4, 70));
      }
    }
  };

  const handleTouchEnd = async () => {
    if (pullY >= 50 && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        setPullY(0);
        startY.current = 0;
      }
    } else {
      setPullY(0);
      startY.current = 0;
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full"
    >
      {/* Pull indicator */}
      {(pullY > 0 || isRefreshing) && (
        <div
          className="flex items-center justify-center py-2 transition-all duration-200"
          style={{ height: `${isRefreshing ? 50 : pullY}px` }}
        >
          <div className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-md text-blue-600 dark:text-blue-400 flex items-center gap-2 text-xs font-semibold">
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Memutakhirkan...' : pullY >= 50 ? 'Lepas untuk memperbarui' : 'Tarik ke bawah'}</span>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export interface SwipeCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  leftActionIcon?: React.ReactNode;
  rightActionIcon?: React.ReactNode;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  leftActionIcon = <Archive className="w-5 h-5 text-white" />,
  rightActionIcon = <Trash2 className="w-5 h-5 text-white" />,
}) => {
  const [offsetX, setOffsetX] = useState(0);
  const startX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const diff = e.touches[0].clientX - startX.current;
    if (Math.abs(diff) < 120) {
      setOffsetX(diff);
    }
  };

  const handleTouchEnd = () => {
    if (offsetX > 70 && onSwipeRight) {
      onSwipeRight();
    } else if (offsetX < -70 && onSwipeLeft) {
      onSwipeLeft();
    }
    setOffsetX(0);
    startX.current = 0;
  };

  return (
    <div className="relative overflow-hidden rounded-3xl touch-pan-y">
      {/* Background action colors */}
      <div className="absolute inset-0 flex items-center justify-between px-6 bg-slate-200 dark:bg-slate-800">
        <div className="flex items-center gap-2 font-bold text-xs text-blue-600 dark:text-blue-400">
          {leftActionIcon}
          <span>Arsip</span>
        </div>
        <div className="flex items-center gap-2 font-bold text-xs text-rose-600 dark:text-rose-400">
          <span>Hapus</span>
          {rightActionIcon}
        </div>
      </div>

      {/* Foreground swipable card */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-4 transition-transform duration-150 ease-out shadow-sm"
        style={{ transform: `translateX(${offsetX}px)` }}
      >
        {children}
      </div>
    </div>
  );
};
