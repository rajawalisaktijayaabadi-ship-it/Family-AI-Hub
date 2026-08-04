import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { useUIStore } from '../../stores/useUIStore';

export interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width = 'w-full',
  height = 'h-4',
  rounded = 'rounded-xl',
}) => {
  return <div className={`shimmer ${width} ${height} ${rounded} ${className}`} />;
};

export const CircularProgress: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
  };

  return <Loader2 className={`animate-spin text-blue-600 dark:text-blue-400 ${sizeMap[size]} ${className}`} />;
};

export const LinearProgress: React.FC<{ progress?: number; className?: string }> = ({
  progress,
  className = '',
}) => {
  return (
    <div className={`w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden ${className}`}>
      {typeof progress === 'number' ? (
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-teal-400 transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      ) : (
        <div className="h-full w-1/3 bg-gradient-to-r from-blue-600 to-teal-400 rounded-full animate-pulse" />
      )}
    </div>
  );
};

export const GlobalFullscreenLoader: React.FC = () => {
  const { isGlobalLoading, globalLoadingText } = useUIStore();

  if (!isGlobalLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-md text-white space-y-4 animate-fade-in font-sans">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center shadow-xl animate-bounce">
        <Sparkles className="w-8 h-8 text-white" />
      </div>
      <div className="text-center space-y-1">
        <h3 className="text-base font-bold font-heading">FamilyAI Hub Indonesia</h3>
        <p className="text-xs text-slate-300">
          {globalLoadingText || 'Memuat data & menyinkronkan AI...'}
        </p>
      </div>
      <CircularProgress size="lg" className="text-teal-400" />
    </div>
  );
};
