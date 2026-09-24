import { useRef } from 'react';
import { gsap, MOTION_OK, useGSAP } from '../../lib/gsap';

interface CountUpProps {
  /** Display value such as "20+"; the leading number is animated. */
  value: string;
}

/**
 * Counts a leading number up from zero the first time it scrolls into view.
 * Screen readers get the final value only; values without a leading number
 * render as-is.
 */
export function CountUp({ value }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = /^(\d+)(.*)$/.exec(value);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || !match) return;
      const target = Number(match[1]);
      const suffix = match[2];

      const media = gsap.matchMedia();
      media.add(MOTION_OK, () => {
        const counter = { value: 0 };
        const render = () => (element.textContent = `${Math.round(counter.value)}${suffix}`);
        render();
        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: render,
          scrollTrigger: { trigger: element, start: 'top 90%', once: true },
        });
        return () => (element.textContent = value);
      });
    },
    { dependencies: [value] },
  );

  return (
    <>
      <span className="visually-hidden">{value}</span>
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
    </>
  );
}
