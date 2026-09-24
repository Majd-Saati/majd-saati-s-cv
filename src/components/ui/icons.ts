/**
 * Semantic icon names used across the app and in data files (e.g. skill
 * category icons). `Icon.tsx` maps each name to a Phosphor icon, so swapping
 * an icon never touches callers.
 *
 * Kept free of React/Phosphor imports: data files (loaded by vite.config.ts)
 * reference `IconName`.
 */
export type IconName =
  | 'arrowLeft'
  | 'arrowRight'
  | 'arrowUp'
  | 'arrowUpRight'
  | 'download'
  | 'mail'
  | 'phone'
  | 'whatsapp'
  | 'mapPin'
  | 'github'
  | 'linkedin'
  | 'globe'
  | 'sun'
  | 'moon'
  | 'menu'
  | 'close'
  | 'code'
  | 'server'
  | 'database'
  | 'cloud'
  | 'wrench'
  | 'gauge'
  | 'users'
  | 'graduation'
  | 'book'
  | 'certificate'
  | 'trophy'
  | 'layers'
  | 'check';

/** Icons that point in the reading direction and must mirror in RTL. */
export const DIRECTIONAL_ICONS: ReadonlySet<IconName> = new Set<IconName>(['arrowLeft', 'arrowRight', 'arrowUpRight']);
