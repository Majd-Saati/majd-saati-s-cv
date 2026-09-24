import { gsap, prefersReducedMotion } from './gsap';

/** Moves focus to the target (for keyboard and screen reader users) without jumping. */
function focusSection(target: HTMLElement) {
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
}

/**
 * Eased scroll to an in-page section, offset by the sticky header. Longer
 * distances take slightly longer, and manual scrolling cancels it.
 */
export function scrollToSection(target: HTMLElement) {
  const headerHeight = document.querySelector('header')?.offsetHeight ?? 0;
  const distance = Math.abs(target.getBoundingClientRect().top - headerHeight);

  gsap.to(window, {
    duration: prefersReducedMotion() ? 0 : gsap.utils.clamp(0.6, 1.4, distance / 2500),
    ease: 'power3.inOut',
    overwrite: true,
    scrollTo: { y: target, offsetY: headerHeight, autoKill: true },
    onComplete: () => {
      // Keep the router's history state intact; only the hash changes.
      history.replaceState(history.state, '', `#${target.id}`);
      focusSection(target);
    },
  });
}
