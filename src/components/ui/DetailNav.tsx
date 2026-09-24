import { AppLink } from './AppLink';
import { Icon } from './Icon';
import styles from './DetailNav.module.css';

export interface DetailNavItem {
  href: string;
  /** e.g. "Next project" */
  label: string;
  title: string;
  titleLang?: string;
}

interface DetailNavProps {
  /** Accessible name for the navigation landmark, e.g. "Projects". */
  label: string;
  previous?: DetailNavItem;
  next?: DetailNavItem;
}

/** Previous / next links at the end of a details page. */
export function DetailNav({ label, previous, next }: DetailNavProps) {
  if (!previous && !next) return null;

  return (
    <nav className={styles.nav} aria-label={label} data-reveal>
      {previous && (
        <AppLink href={previous.href} className={styles.link} rel="prev">
          <span className={styles.label}>
            <Icon name="arrowLeft" size={16} />
            {previous.label}
          </span>
          <span className={styles.title} lang={previous.titleLang}>
            {previous.title}
          </span>
        </AppLink>
      )}
      {next && (
        <AppLink href={next.href} className={`${styles.link} ${styles.next}`} rel="next">
          <span className={styles.label}>
            {next.label}
            <Icon name="arrowRight" size={16} />
          </span>
          <span className={styles.title} lang={next.titleLang}>
            {next.title}
          </span>
        </AppLink>
      )}
    </nav>
  );
}
