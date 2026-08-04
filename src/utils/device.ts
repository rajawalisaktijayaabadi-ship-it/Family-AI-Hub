/**
 * Device detection utility for Mobile Web Edition
 */

export function isMobileOrTabletDevice(): boolean {
  if (typeof window === 'undefined') return true;

  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i;

  const isMobileUA = mobileRegex.test(userAgent);
  const isSmallScreen = window.innerWidth <= 1024;
  const isTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  return isMobileUA || (isSmallScreen && isTouchScreen) || isSmallScreen;
}

export function getDeviceCategory(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'mobile';
  const width = window.innerWidth;
  if (width < 600) return 'mobile';
  if (width <= 1024) return 'tablet';
  return 'desktop';
}
