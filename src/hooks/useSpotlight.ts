import type { RefObject } from 'react';
import { FINE_POINTER_MOTION_OK, gsap, useGSAP } from '../lib/gsap';

/**
 * Drives the `--spot-x`, `--spot-y` (unitless px) and `--spot-opacity` CSS
 * variables so a soft glow trails the pointer across the element. The visual
 * itself lives in CSS (see Card.module.css).
 */
export function useSpotlight(ref: RefObject<HTMLElement | null>, enabled = true) {
  useGSAP(
    () => {
      const element = ref.current;
      if (!enabled || !element) return;

      const media = gsap.matchMedia();
      media.add(FINE_POINTER_MOTION_OK, () => {
        const xTo = gsap.quickTo(element, '--spot-x', { duration: 0.35, ease: 'power3.out' });
        const yTo = gsap.quickTo(element, '--spot-y', { duration: 0.35, ease: 'power3.out' });

        const position = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          return { x: event.clientX - rect.left, y: event.clientY - rect.top };
        };
        const handleEnter = (event: PointerEvent) => {
          const { x, y } = position(event);
          // Start from the entry point instead of sliding in from a corner.
          gsap.set(element, { '--spot-x': x, '--spot-y': y });
          gsap.to(element, { '--spot-opacity': 1, duration: 0.3, overwrite: 'auto' });
        };
        const handleMove = (event: PointerEvent) => {
          const { x, y } = position(event);
          xTo(x);
          yTo(y);
        };
        const handleLeave = () => gsap.to(element, { '--spot-opacity': 0, duration: 0.4, overwrite: 'auto' });

        element.addEventListener('pointerenter', handleEnter);
        element.addEventListener('pointermove', handleMove);
        element.addEventListener('pointerleave', handleLeave);
        return () => {
          element.removeEventListener('pointerenter', handleEnter);
          element.removeEventListener('pointermove', handleMove);
          element.removeEventListener('pointerleave', handleLeave);
        };
      });
    },
    { dependencies: [enabled] },
  );
}
