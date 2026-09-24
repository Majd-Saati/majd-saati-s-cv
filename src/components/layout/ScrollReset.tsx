import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router';

/**
 * Jumps to the top when the page (pathname) changes.
 *
 * Rendered *before* the page outlet: React runs layout effects in tree order,
 * so this resets the scroll position before the new page's GSAP effects create
 * their ScrollTriggers. Building triggers (especially the projects pin) while
 * scrolled deep into the page can break ScrollTrigger's refresh loop.
 * Hash targets (e.g. `/#contact`) are scrolled to afterwards by ScrollManager.
 */
export function ScrollReset() {
  const { pathname } = useLocation();
  const previousPathname = useRef(pathname);

  useLayoutEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
