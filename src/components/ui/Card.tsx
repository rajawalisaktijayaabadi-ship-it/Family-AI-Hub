import React from 'react';
import { Sparkles, Crown, TrendingUp, User } from 'lucide-react';

export interface BaseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<BaseCardProps> = ({ children, className = '', ...props }) => (
  <div
    className={`bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-4 shadow-sm transition hover:shadow-md ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const GlassCard: React.FC<BaseCardProps> = ({ children, className = '', ...props }) => (
  <div className={`glass-card rounded-3xl p-4 ${className}`} {...props}>
    {children}
  </div>
);

export interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: { value: string; isPositive: boolean };
  badgeText?: string;
  onClick?: () => void;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  badgeText,
  onClick,
}) => (
  <GlassCard
    onClick={onClick}
    className={`space-y-3 cursor-pointer active-press transition ${onClick ? 'hover:border-blue-500/50' : ''}`}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
          {icon}
        </div>
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{title}</span>
      </div>
      {badgeText && (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
          {badgeText}
        </span>
      )}
    </div>

    <div>
      <div className="text-xl font-bold font-heading text-slate-900 dark:text-white">{value}</div>
      {subtitle && <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">{subtitle}</p>}
    </div>

    {trend && (
      <div className="flex items-center gap-1.5 text-xs font-semibold pt-1 border-t border-slate-100 dark:border-slate-800">
        <TrendingUp className={`w-3.5 h-3.5 ${trend.isPositive ? 'text-emerald-500' : 'text-rose-500 rotate-180'}`} />
        <span className={trend.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
          {trend.value}
        </span>
        <span className="text-[10px] font-normal text-slate-400">vs bulan lalu</span>
      </div>
    )}
  </GlassCard>
);

export interface AnalyticsCardProps {
  title: string;
  metric: string;
  description: string;
  progressPercentage?: number;
  color?: 'blue' | 'teal' | 'emerald' | 'amber' | 'rose';
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  metric,
  description,
  progressPercentage = 75,
  color = 'blue',
}) => {
  const colorMap = {
    blue: 'from-blue-600 to-indigo-600 bg-blue-500',
    teal: 'from-teal-500 to-emerald-600 bg-teal-500',
    emerald: 'from-emerald-500 to-teal-600 bg-emerald-500',
    amber: 'from-amber-500 to-orange-600 bg-amber-500',
    rose: 'from-rose-500 to-red-600 bg-rose-500',
  };

  return (
    <GlassCard className="space-y-3">
      <div className="flex justify-between items-start">
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{title}</span>
        <span className="text-sm font-extrabold font-heading text-slate-900 dark:text-white">{metric}</span>
      </div>
      <p className="text-[11px] text-slate-500 dark:text-slate-400">{description}</p>
      {typeof progressPercentage === 'number' && (
        <div className="space-y-1">
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${colorMap[color]} transition-all duration-500`}
              style={{ width: `${Math.min(100, Math.max(0, progressPercentage))}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 font-medium">
            <span>Progres</span>
            <span>{progressPercentage}%</span>
          </div>
        </div>
      )}
    </GlassCard>
  );
};

export interface ProfileCardProps {
  name: string;
  role: string;
  avatarUrl?: string;
  familyRole?: string;
  onEdit?: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  role,
  avatarUrl,
  familyRole = 'Kepala Keluarga',
  onEdit,
}) => (
  <GlassCard className="flex items-center justify-between p-4">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center text-white font-bold text-lg shadow-md overflow-hidden">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <User className="w-6 h-6" />
        )}
      </div>
      <div>
        <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white">{name}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">{role}</p>
        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 mt-1">
          {familyRole}
        </span>
      </div>
    </div>
    {onEdit && (
      <button
        onClick={onEdit}
        className="px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 rounded-xl hover:bg-blue-100 transition active-press"
      >
        Edit
      </button>
    )}
  </GlassCard>
);

export interface AICardProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const AICard: React.FC<AICardProps> = ({
  title,
  description,
  actionText = 'Tanya AI',
  onAction,
}) => (
  <div className="relative overflow-hidden rounded-3xl p-4 bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white shadow-xl">
    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />
    <div className="flex items-start justify-between gap-2 relative z-10">
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-teal-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>FamilyAI Assistant</span>
        </div>
        <h3 className="text-base font-bold font-heading leading-snug">{title}</h3>
        <p className="text-xs text-slate-300 leading-relaxed">{description}</p>
      </div>
    </div>
    {onAction && (
      <button
        onClick={onAction}
        className="mt-3 w-full py-2.5 px-4 rounded-xl bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 hover:bg-teal-300 transition active-press"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>{actionText}</span>
      </button>
    )}
  </div>
);

export interface PremiumCardProps {
  title?: string;
  description?: string;
  onUpgrade?: () => void;
}

export const PremiumCard: React.FC<PremiumCardProps> = ({
  title = 'FamilyAI Pro Family Plan',
  description = 'Akses AI tak terbatas, fitur GPS Safe Zone & analisis nutrisi harian anak.',
  onUpgrade,
}) => (
  <div className="rounded-3xl p-4 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-lg space-y-2">
    <div className="flex items-center gap-2">
      <Crown className="w-5 h-5 text-amber-200" />
      <span className="text-xs font-bold uppercase tracking-wider text-amber-100">Solusi Premium</span>
    </div>
    <h3 className="text-sm font-extrabold font-heading">{title}</h3>
    <p className="text-xs text-white/90 leading-relaxed">{description}</p>
    {onUpgrade && (
      <button
        onClick={onUpgrade}
        className="mt-2 w-full py-2 px-4 rounded-xl bg-white text-orange-600 font-bold text-xs hover:bg-orange-50 transition active-press shadow-md"
      >
        Tingkatkan Sekarang
      </button>
    )}
  </div>
);
