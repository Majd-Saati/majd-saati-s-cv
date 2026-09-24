import { useRef } from 'react';
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from '../../lib/gsap';
import type { Experience } from '../../types/portfolio';
import { ExperienceItem } from './ExperienceItem';
import styles from './Experience.module.css';

/** Viewport line (from the top) where the rail "pen" sits while scrolling. */
const DRAW_LINE = '60%';

interface ExperienceTimelineProps {
  items: readonly Experience[];
}

/** Vertical timeline whose rail draws itself and lights up nodes on scroll. */
export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const timeline = timelineRef.current;
      if (!timeline) return;

      const media = gsap.matchMedia();
      media.add(MOTION_OK, () => {
        // Draw the rail as the timeline scrolls through the viewport.
        gsap.fromTo(
          fillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: timeline, start: `top ${DRAW_LINE}`, end: `bottom ${DRAW_LINE}`, scrub: 0.4 },
          },
        );

        // Light up each node when the drawn rail reaches it.
        const nodes = Array.from(timeline.querySelectorAll<HTMLElement>(`.${styles.item}`));
        for (const node of nodes) {
          node.dataset.reached = 'false';
          ScrollTrigger.create({
            trigger: node,
            start: `top+=32 ${DRAW_LINE}`,
            onEnter: () => (node.dataset.reached = 'true'),
            onLeaveBack: () => (node.dataset.reached = 'false'),
          });
        }
        return () => nodes.forEach((node) => delete node.dataset.reached);
      });
    },
    { scope: timelineRef },
  );

  return (
    <div ref={timelineRef} className={styles.timeline}>
      <span className={styles.rail} aria-hidden="true">
        <span ref={fillRef} className={styles.railFill} />
      </span>
      <ol className={styles.list}>
        {items.map((item) => (
          <ExperienceItem key={item.id} item={item} />
        ))}
      </ol>
    </div>
  );
}
