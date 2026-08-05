export type MainTab =
  | 'home'
  | 'analytics'
  | 'memories'
  | 'smart_home'
  | 'family_safety'
  | 'parenting'
  | 'health'
  | 'finance'
  | 'protection'
  | 'education'
  | 'calendar'
  | 'ai'
  | 'activity'
  | 'notification'
  | 'profile'
  | 'mood'
  | 'psychology';

export type AuthScreen = 'login' | 'register' | 'forgot_password';

export type AppPhase = 'splash' | 'onboarding' | 'auth' | 'main';
