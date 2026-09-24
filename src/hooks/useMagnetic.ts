import type { RefObject } from 'react';
import { FINE_POINTER_MOTION_OK, gsap, useGSAP } from '../lib/gsap';

/**
 * Pulls an element slightly toward the pointer while hovered and springs it
 * back on leave. Mouse/trackpad only; disabled with reduced motion.
 */
export function useMagnetic(ref: RefObject<HTMLElement | null>, enabled = true, strength = 0.25) {
  useGSAP(
    () => {
      const element = ref.current;
      if (!enabled || !element) return;

      const media = gsap.matchMedia();
      media.add(FINE_POINTER_MOTION_OK, () => {
        const xTo = gsap.quickTo(element, 'x', { duration: 0.5, ease: 'power3.out' });
        const yTo = gsap.quickTo(element, 'y', { duration: 0.5, ease: 'power3.out' });

        const handleMove = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          xTo((event.clientX - (rect.left + rect.width / 2)) * strength);
          yTo((event.clientY - (rect.top + rect.height / 2)) * strength);
        };
        const handleLeave = () => {
          xTo(0);
          yTo(0);
        };

        element.addEventListener('pointermove', handleMove);
        element.addEventListener('pointerleave', handleLeave);
        return () => {
          element.removeEventListener('pointermove', handleMove);
          element.removeEventListener('pointerleave', handleLeave);
        };
      });
    },
    { dependencies: [enabled, strength] },
  );
}
