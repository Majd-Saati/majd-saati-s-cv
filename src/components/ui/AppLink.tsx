import type { ComponentProps } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../../i18n/useLanguage';
import { publicUrl } from '../../lib/paths';

export interface AppLinkProps extends ComponentProps<'a'> {
  href: string;
  /** Opens in a new tab with safe `rel` and an accessible hint. */
  external?: boolean;
}

/** Paths ending in a file name (e.g. `/certificates/degree.pdf`) are static files. */
const FILE_PATH = /\/[^/?#]+\.[a-z0-9]+(?:[?#]|$)/i;

/**
 * App pages (e.g. `/courses/typescript`, `/#contact`), handled by the
 * client-side router. Static files under `/public` are plain links.
 */
function isAppRoute(href: string, download: AppLinkProps['download']): boolean {
  return href.startsWith('/') && !href.startsWith('//') && download === undefined && !FILE_PATH.test(href);
}

/**
 * Base anchor used by every link in the app: routes to pages without a full
 * reload, keeps in-page `#hash` and file links as plain anchors, and opens
 * external links safely in a new tab.
 */
export function AppLink({ external = false, href, children, ...props }: AppLinkProps) {
  const { t } = useLanguage();
  // Routes get the base path from the router; site-relative files need it added.
  const fileHref = publicUrl(href);

  if (external) {
    return (
      <a href={fileHref} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
        <span className="visually-hidden"> {t.a11y.opensInNewTab}</span>
      </a>
    );
  }

  if (isAppRoute(href, props.download)) {
    return (
      <Link to={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={fileHref} {...props}>
      {children}
    </a>
  );
}
