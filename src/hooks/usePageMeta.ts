import { useEffect } from 'react';

function setAttribute(selector: string, attribute: string, value: string) {
  document.head.querySelector(selector)?.setAttribute(attribute, value);
}

/**
 * Keeps the document title, description, and URL metadata in sync with the
 * current page and language. Canonical/og:url are only updated when the build
 * emitted them (i.e. VITE_SITE_URL is configured).
 */
export function usePageMeta(title: string, description: string, path: string) {
  useEffect(() => {
    document.title = title;
    setAttribute('meta[name="description"]', 'content', description);
    setAttribute('meta[property="og:title"]', 'content', title);
    setAttribute('meta[property="og:description"]', 'content', description);

    const siteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/+$/, '');
    if (siteUrl) {
      // Site URL already includes any base path (e.g. /repo on GitHub Pages).
      const url = `${siteUrl}${path}`;
      setAttribute('link[rel="canonical"]', 'href', url);
      setAttribute('meta[property="og:url"]', 'content', url);
    }
  }, [title, description, path]);
}
