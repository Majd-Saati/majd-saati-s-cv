import { useRef, type ReactNode } from 'react';
import { gsap, MOTION_OK, useGSAP } from '../../lib/gsap';
import { AnimatedText } from '../ui/AnimatedText';
import { AppLink } from '../ui/AppLink';
import { Icon } from '../ui/Icon';
import styles from './PageHeader.module.css';

export interface PageFact {
  id: string;
  label: string;
  value: ReactNode;
}

interface PageHeaderProps {
  back: { href: string; label: string };
  eyebrow: ReactNode;
  title: string;
  /** Set when the title's language differs from the UI (e.g. English course titles). */
  titleLang?: string;
  description?: string;
  facts?: PageFact[];
}

/** Intro block for detail pages: back link, title, summary, and key facts. */
export function PageHeader({ back, eyebrow, title, titleLang, description, facts = [] }: PageHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);

  // Entrance on load; re-runs when the title changes (new page or language).
  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;
      const media = gsap.matchMedia();
      media.add(MOTION_OK, () => {
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from(header.querySelectorAll('[data-fade]'), { opacity: 0, y: 12, duration: 0.6, stagger: 0.08 })
          .from(header.querySelectorAll('[data-word]'), { yPercent: 110, duration: 0.8, stagger: 0.06 }, 0.1)
          .from(header.querySelectorAll('[data-fact]'), { opacity: 0, y: 16, duration: 0.6, stagger: 0.08 }, 0.35);
      });
    },
    { scope: headerRef, dependencies: [title], revertOnUpdate: true },
  );

  return (
    <header ref={headerRef} className={styles.header}>
      <div className="container">
        <AppLink href={back.href} className={styles.back} data-fade>
          <Icon name="arrowLeft" size={16} />
          {back.label}
        </AppLink>

        <div className={styles.eyebrow} data-fade>
          {eyebrow}
        </div>
        <h1 className={styles.title} lang={titleLang}>
          <AnimatedText text={title} />
        </h1>
        {description && (
          <p className={styles.description} data-fade>
            {description}
          </p>
        )}

        {facts.length > 0 && (
          <dl className={styles.facts}>
            {facts.map((fact) => (
              <div key={fact.id} className={styles.fact} data-fact>
                <dt className={styles.factLabel}>{fact.label}</dt>
                <dd className={styles.factValue}>{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </header>
  );
}
