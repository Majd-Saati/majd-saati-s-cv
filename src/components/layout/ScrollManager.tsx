import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useAnchorScroll } from '../../hooks/useAnchorScroll';
import { useRevealAnimations } from '../../hooks/useRevealAnimations';
import { useLanguage } from '../../i18n/useLanguage';
import { ScrollTrigger } from '../../lib/gsap';
import { scrollToSection } from '../../lib/scroll';

/**
 * Page-wide scroll behavior: animated anchor links, reveals, trigger upkeep,
 * and scrolling to `#section` targets after route navigation.
 */
export function ScrollManager() {
  const { language } = useLanguage();
  const { pathname, hash, key } = useLocation();

  useAnchorScroll();
  useRevealAnimations(pathname);

  // Web fonts and language/direction changes shift layout, which moves the
  // positions ScrollTrigger measured.
  useEffect(() => {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [language]);

  // After every navigation (including repeated clicks on the same link, which
  // create a new location key): once all of the page's triggers exist,
  // re-measure them in refreshPriority order, then glide to the hash target.
  useEffect(() => {
    ScrollTrigger.refresh();
    const id = decodeURIComponent(hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (target) requestAnimationFrame(() => scrollToSection(target));
  }, [pathname, hash, key]);

  return null;
}
