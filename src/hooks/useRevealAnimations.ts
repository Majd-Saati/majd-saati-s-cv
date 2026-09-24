import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from '../lib/gsap';

/**
 * Fades and lifts every `[data-reveal]` element the first time it scrolls into
 * view. Elements entering together are staggered as one batch. Only opacity is
 * hidden (never visibility), so unrevealed content stays keyboard-focusable.
 *
 * @param pageKey changes when a new page renders, so its elements get picked up
 */
export function useRevealAnimations(pageKey: string) {
  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(MOTION_OK, () => {
        const elements = gsap.utils.toArray<HTMLElement>('[data-reveal]');
        // CSS transitions on these elements would fight GSAP's per-frame updates.
        gsap.set(elements, { opacity: 0, y: 28, transition: 'none' });

        ScrollTrigger.batch(elements, {
          start: 'top 90%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              stagger: 0.08,
              overwrite: true,
              // Hand control back to CSS so hover effects keep working.
              clearProps: 'opacity,transform,transition',
            }),
        });
      });
    },
    { dependencies: [pageKey], revertOnUpdate: true },
  );
}
