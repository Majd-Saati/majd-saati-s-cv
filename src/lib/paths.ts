/**
 * The app can be served from a sub-path (e.g. GitHub Pages project sites at
 * `/<repo>/`), configured at build time via `VITE_BASE_PATH` (see
 * vite.config.ts). These helpers keep data files free of that concern: they
 * keep using root-relative paths like `/cv/file.pdf`.
 */

/** Router basename: the base path without a trailing slash ('' at the root). */
export const ROUTER_BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefixes a site-relative file path (from `/public`) with the base path. */
export function publicUrl(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  return `${import.meta.env.BASE_URL}${path.slice(1)}`;
}
