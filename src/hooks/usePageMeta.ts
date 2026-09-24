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

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      const url = new URL(path, canonical.href).href;
      canonical.href = url;
      setAttribute('meta[property="og:url"]', 'content', url);
    }
  }, [title, description, path]);
}
