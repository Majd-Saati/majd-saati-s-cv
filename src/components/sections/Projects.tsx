import { useRef } from 'react';
import { projects } from '../../data/projects';
import { useLanguage } from '../../i18n/useLanguage';
import { gsap, MOTION_OK, useGSAP } from '../../lib/gsap';
import { Section } from '../ui/Section';
import { ProjectCard } from './ProjectCard';
import styles from './Projects.module.css';

/**
 * Horizontal gallery only where it helps: wide + tall enough screens with
 * motion allowed. Elsewhere the projects stay a regular responsive grid.
 */
const HORIZONTAL_QUERY = `${MOTION_OK} and (min-width: 64rem) and (min-height: 40rem)`;

const formatIndex = (value: number) => String(value).padStart(2, '0');

export function Projects() {
  const { t } = useLanguage();
  const galleryRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const gallery = galleryRef.current;
      const track = trackRef.current;
      if (!gallery || !track || projects.length < 2) return;

      const media = gsap.matchMedia();
      media.add(HORIZONTAL_QUERY, () => {
        // Switches the CSS from grid to a single horizontal row.
        gallery.dataset.horizontal = 'true';

        const cards = Array.from(track.children) as HTMLElement[];
        const lastIndex = cards.length - 1;
        const distance = () => Math.max(0, track.scrollWidth - gallery.clientWidth);
        // In RTL the row overflows to the left, so it travels the other way.
        // Read at measure time: a language switch triggers ScrollTrigger.refresh()
        // (ScrollManager), which re-evaluates this without rebuilding the pin.
        // Rebuilding a pin mid-page while other "once" triggers fire can break
        // ScrollTrigger's refresh loop, so this effect intentionally runs once.
        const travel = () => (document.documentElement.dir === 'rtl' ? 1 : -1) * distance();

        const tween = gsap.to(track, {
          x: travel,
          ease: 'none',
          scrollTrigger: {
            trigger: gallery,
            pin: true,
            start: 'center center',
            end: () => `+=${distance()}`,
            scrub: 0.8,
            snap: { snapTo: 1 / lastIndex, duration: { min: 0.2, max: 0.5 }, ease: 'power1.inOut' },
            invalidateOnRefresh: true,
            // The pin adds page height; measure it before triggers further down.
            refreshPriority: 1,
            onUpdate: ({ progress }) => {
              gsap.set(barRef.current, { scaleX: progress });
              if (counterRef.current) {
                counterRef.current.textContent = `${formatIndex(Math.round(progress * lastIndex) + 1)} / ${formatIndex(cards.length)}`;
              }
            },
          },
        });

        // Keyboard users: tabbing into an off-screen card scrolls the page to
        // the point in the pinned range where that card is in view.
        const handleFocus = (event: FocusEvent) => {
          const trigger = tween.scrollTrigger;
          const index = cards.findIndex((card) => card.contains(event.target as Node));          if (!trigger || index < 0) return;
          const target = trigger.start + (trigger.end - trigger.start) * (index / lastIndex);
          // Wait a frame so this runs after the browser's own focus scrolling,
          // and cancel any in-flight snap that would pull back to another card
          // (the target is itself a snap point, so snapping won't move it).
          requestAnimationFrame(() => {
            trigger.getTween(true)?.kill();
            window.scrollTo({ top: target });
          });
        };
        track.addEventListener('focusin', handleFocus);

        return () => {
          track.removeEventListener('focusin', handleFocus);
          delete gallery.dataset.horizontal;
        };
      });
    },
    { dependencies: [] },
  );

  return (
    <Section id="projects" title={t.projects.title} description={t.projects.description}>
      <div ref={galleryRef} className={styles.gallery}>
        <ul ref={trackRef} className={styles.track}>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </ul>

        {/* Only visible in horizontal mode (see CSS). */}
        <div className={styles.progress} aria-hidden="true">
          <span className={styles.progressTrack}>
            <span ref={barRef} className={styles.progressBar} />
          </span>
          <span ref={counterRef} className={styles.counter}>
            {`01 / ${formatIndex(projects.length)}`}
          </span>
        </div>
      </div>
    </Section>
  );
}
