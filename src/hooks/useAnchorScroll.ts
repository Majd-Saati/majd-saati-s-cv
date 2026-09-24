import { useEffect } from 'react';
import { scrollToSection } from '../lib/scroll';

/**
 * Replaces the browser's jump for every in-page link (`href="#..."`) with an
 * animated scroll. A single delegated listener covers links added later too.
 */
export function useAnchorScroll() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const isModified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
      if (event.defaultPrevented || event.button !== 0 || isModified) return;

      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const id = link ? decodeURIComponent(link.hash.slice(1)) : '';
      const target = id ? document.getElementById(id) : null;
      if (!target) return;

      event.preventDefault();
      // Wait a frame so layout changes from the click (e.g. closing the mobile
      // menu) settle before measuring the header offset.
      requestAnimationFrame(() => scrollToSection(target));
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}
