import { useRef } from 'react';
import { useLanguage } from '../../i18n/useLanguage';
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from '../../lib/gsap';
import { Icon } from '../ui/Icon';
import styles from './BackToTop.module.css';

const RING_RADIUS = 22;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/**
 * Floating "back to top" button that appears once the hero is scrolled past.
 * Its ring doubles as the page's reading-progress indicator.
 */
export function BackToTop() {
  const { t } = useLanguage();
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);

  useGSAP(() => {
    const button = buttonRef.current;
    if (!button) return;

    gsap.set(button, { autoAlpha: 0, y: 16 });

    // Hidden (and unfocusable, via autoAlpha) until the first screen is passed.
    ScrollTrigger.create({
      start: () => window.innerHeight * 0.8,
      end: 'max',
      onToggle: ({ isActive }) =>
        gsap.to(button, {
          autoAlpha: isActive ? 1 : 0,
          y: isActive ? 0 : 16,
          duration: prefersReducedMotion() ? 0 : 0.35,
          ease: 'power2.out',
          overwrite: true,
        }),
    });

    gsap.fromTo(
      ringRef.current,
      { strokeDashoffset: RING_CIRCUMFERENCE },
      { strokeDashoffset: 0, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } },
    );
  });

  return (
    <a ref={buttonRef} href="#main" className={styles.button} aria-label={t.a11y.backToTop} title={t.a11y.backToTop}>
      <svg className={styles.ring} viewBox="0 0 48 48" aria-hidden="true">
        <circle className={styles.track} cx="24" cy="24" r={RING_RADIUS} />
        <circle
          ref={ringRef}
          className={styles.progress}
          cx="24"
          cy="24"
          r={RING_RADIUS}
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={RING_CIRCUMFERENCE}
        />
      </svg>
      <Icon name="arrowUp" size={18} />
    </a>
  );
}
