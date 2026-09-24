import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Single place where GSAP plugins are registered; import GSAP from here. */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

/** Media query for `gsap.matchMedia()`: animations run only when motion is OK. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

/** Motion allowed AND a precise hovering pointer (mouse/trackpad, not touch). */
export const FINE_POINTER_MOTION_OK = `${MOTION_OK} and (hover: hover) and (pointer: fine)`;

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export { gsap, ScrollTrigger, useGSAP };
