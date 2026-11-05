import { useState, useEffect } from 'react';

/**
 * useMediaQuery hook
 * Returns current breakpoint: 'desktop' | 'tablet' | 'mobile'
 * Breakpoints:
 *   desktop: min-width 1025px
 *   tablet:  min-width 768px and max-width 1024px
 *   mobile:  max-width 767px
 */
export const useMediaQuery = () => {
  const getBreakpoint = () => {
    if (typeof window === 'undefined') return 'desktop';
    if (window.innerWidth >= 1025) return 'desktop';
    if (window.innerWidth >= 768) return 'tablet';
    return 'mobile';
  };

  const [breakpoint, setBreakpoint] = useState(getBreakpoint());

  useEffect(() => {
    const handler = () => setBreakpoint(getBreakpoint());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return breakpoint;
};
