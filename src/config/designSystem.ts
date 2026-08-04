/**
 * FamilyAI Hub Indonesia - Enterprise Design System Tokens
 */

export const colors = {
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    DEFAULT: '#2563EB',
  },
  secondary: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    800: '#1E293B',
    900: '#0F172A',
    DEFAULT: '#0F172A',
  },
  accent: {
    50: '#F0FDFA',
    500: '#14B8A6',
    600: '#0D9488',
    DEFAULT: '#14B8A6',
  },
  success: {
    light: '#10B981',
    bgLight: '#ECFDF5',
    dark: '#059669',
    bgDark: 'rgba(16, 185, 129, 0.15)',
  },
  warning: {
    light: '#F59E0B',
    bgLight: '#FFFBEB',
    dark: '#D97706',
    bgDark: 'rgba(245, 158, 11, 0.15)',
  },
  error: {
    light: '#EF4444',
    bgLight: '#FEF2F2',
    dark: '#DC2626',
    bgDark: 'rgba(239, 68, 68, 0.15)',
  },
  info: {
    light: '#06B6D4',
    bgLight: '#ECFEFF',
    dark: '#0891B2',
    bgDark: 'rgba(6, 182, 212, 0.15)',
  },
};

export const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem',  // 8px
  md: '1rem',    // 16px
  lg: '1.5rem',  // 24px
  xl: '2rem',    // 32px
  '2xl': '3rem', // 48px
};

export const radius = {
  none: '0px',
  sm: '0.5rem',   // 8px
  md: '0.75rem',  // 12px
  lg: '1rem',     // 16px
  xl: '1.5rem',   // 24px
  full: '9999px',
};

export const elevation = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  glass: 'shadow-[0_8px_30px_rgb(0,0,0,0.06)]',
};

export const gradients = {
  primary: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500',
  ai: 'bg-gradient-to-r from-teal-400 via-emerald-500 to-cyan-500',
  premium: 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500',
  subtle: 'bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950',
};

export const typography = {
  headingXL: 'text-2xl font-extrabold tracking-tight font-heading',
  headingL: 'text-xl font-bold tracking-tight font-heading',
  headingM: 'text-lg font-bold font-heading',
  headingS: 'text-base font-semibold font-heading',
  bodyL: 'text-base font-normal leading-relaxed font-sans',
  bodyM: 'text-sm font-normal leading-relaxed font-sans',
  bodyS: 'text-xs font-normal leading-normal font-sans',
  caption: 'text-[11px] font-medium leading-tight font-sans',
  label: 'text-xs font-semibold tracking-wide uppercase font-sans',
  button: 'text-sm font-semibold tracking-wide font-sans',
};
