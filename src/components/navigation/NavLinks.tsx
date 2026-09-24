import { useRef } from 'react';
import { Link } from 'react-router';
import { ROUTES } from '../../data/routes';
import { NAV_SECTION_IDS, type SectionId } from '../../data/sections';
import { useLanguage } from '../../i18n/useLanguage';
import { cx } from '../../lib/classNames';
import { gsap, prefersReducedMotion, useGSAP } from '../../lib/gsap';
import styles from './NavLinks.module.css';

interface NavLinksProps {
  activeId?: SectionId;
  orientation?: 'horizontal' | 'vertical';
  onNavigate?: () => void;
}

/** Inset (px) between a link's edges and the indicator pill. */
const INDICATOR_INSET = 4;

export function NavLinks({ activeId, orientation = 'horizontal', onNavigate }: NavLinksProps) {
  const { t, language } = useLanguage();
  const listRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const isHorizontal = orientation === 'horizontal';

  // One pill glides between links as the active section changes. Re-measured on
  // language change and resize because label widths and positions change.
  useGSAP(
    () => {
      const list = listRef.current;
      const indicator = indicatorRef.current;
      if (!isHorizontal || !list || !indicator) return;

      const moveIndicator = (animate: boolean) => {
        const link = activeId ? list.querySelector<HTMLElement>(`[data-section="${activeId}"]`) : null;
        const duration = animate && !prefersReducedMotion() ? 0.45 : 0;
        if (!link) {
          gsap.to(indicator, { opacity: 0, duration });
          return;
        }
        gsap.to(indicator, {
          x: link.offsetLeft + INDICATOR_INSET,
          width: link.offsetWidth - INDICATOR_INSET * 2,
          opacity: 1,
          duration,
          ease: 'power3.out',
          overwrite: true,
        });
      };

      moveIndicator(true);
      const observer = new ResizeObserver(() => moveIndicator(false));
      observer.observe(list);
      return () => observer.disconnect();
    },
    { dependencies: [activeId, language, isHorizontal] },
  );

  return (
    <div className={styles.wrapper}>
      {isHorizontal && <span ref={indicatorRef} className={styles.indicator} aria-hidden="true" />}
      <ul ref={listRef} className={cx(styles.list, styles[orientation])}>
        {NAV_SECTION_IDS.map((id) => (
          <li key={id}>
            {/* Router links so sections are reachable from every page (see ScrollManager). */}
            <Link
              to={{ pathname: ROUTES.home, hash: `#${id}` }}
              data-section={id}
              className={styles.link}
              aria-current={activeId === id ? 'true' : undefined}
              onClick={onNavigate}
            >
              {t.nav[id]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
