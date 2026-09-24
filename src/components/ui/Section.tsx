import { useRef, type ReactNode } from 'react';
import { SECTION_IDS, type SectionId } from '../../data/sections';
import { useLanguage } from '../../i18n/useLanguage';
import { cx } from '../../lib/classNames';
import { gsap, MOTION_OK, useGSAP } from '../../lib/gsap';
import { AnimatedText } from './AnimatedText';
import styles from './Section.module.css';

interface SectionProps {
  id: SectionId;
  title: string;
  description?: string;
  className?: string;
  /** Optional call to action below the content, e.g. a link to a full page. */
  action?: ReactNode;
  children: ReactNode;
}

/** Page section with a numbered eyebrow, heading, and optional intro. */
export function Section({ id, title, description, className, action, children }: SectionProps) {
  const { t } = useLanguage();
  const headerRef = useRef<HTMLElement>(null);
  const titleId = `${id}-title`;
  const number = String(SECTION_IDS.indexOf(id)).padStart(2, '0');

  // Heading entrance: eyebrow, then title word by word, then the intro.
  // Re-runs when the title changes (language switch) so new words animate too.
  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;

      const media = gsap.matchMedia();
      media.add(MOTION_OK, () => {
        const timeline = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: header, start: 'top 85%', once: true },
        });
        timeline
          .from(header.querySelectorAll('[data-eyebrow] > *'), { opacity: 0, y: 8, duration: 0.5, stagger: 0.1 })
          .from(header.querySelectorAll('[data-word]'), { yPercent: 110, duration: 0.75, stagger: 0.05 }, '-=0.3');

        const intro = header.querySelector('[data-intro]');
        if (intro) timeline.from(intro, { opacity: 0, y: 12, duration: 0.6 }, '-=0.45');
      });
    },
    { scope: headerRef, dependencies: [title, description], revertOnUpdate: true },
  );

  return (
    <section id={id} aria-labelledby={titleId} className={cx(styles.section, className)}>
      <div className="container">
        <header ref={headerRef} className={styles.header}>
          <p className={styles.eyebrow} data-eyebrow>
            <span className={styles.number}>{number}</span>
            <span>{t.nav[id]}</span>
          </p>
          <h2 id={titleId} className={styles.title}>
            <AnimatedText text={title} />
          </h2>
          {description && (
            <p className={styles.description} data-intro>
              {description}
            </p>
          )}
        </header>
        {children}
        {action && <div className={styles.action}>{action}</div>}
      </div>
    </section>
  );
}
