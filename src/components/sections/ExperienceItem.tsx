import { experiencePath } from '../../data/routes';
import { useLanguage } from '../../i18n/useLanguage';
import { formatDuration, formatPeriod } from '../../lib/date';
import type { Experience, Localized } from '../../types/portfolio';
import { AppLink } from '../ui/AppLink';
import { Card } from '../ui/Card';
import { TagList } from '../ui/TagList';
import { TextLink } from '../ui/TextLink';
import styles from './Experience.module.css';

/**
 * Timeline entry with the main facts only (role, company, dates, stack).
 * Responsibilities, achievements and projects live on the details page.
 */
export function ExperienceItem({ item }: { item: Experience }) {
  const { t, text, formatMonth, locale } = useLanguage();
  const meta = [item.company, item.location].filter((value): value is Localized => Boolean(value)).map(text);
  const detailsPath = experiencePath(item.id);

  return (
    <li className={styles.item}>
      <Card as="article" interactive className={styles.card}>
        <header className={styles.header}>
          <div className={styles.heading}>
            <h3 className={styles.role}>
              <AppLink href={detailsPath} className={styles.roleLink}>
                {text(item.role)}
              </AppLink>
            </h3>
            {meta.length > 0 && <p className={styles.meta}>{meta.join(' · ')}</p>}
          </div>
          {item.period && (
            <div className={styles.dates}>
              <p className={styles.period}>
                <time dateTime={item.period.start}>{formatPeriod(item.period, formatMonth, t.experience.present)}</time>
              </p>
              <p className={styles.duration}>{formatDuration(item.period, locale)}</p>
            </div>
          )}
        </header>

        <TagList items={item.technologies} variant="accent" />

        <div className={styles.links}>
          <TextLink href={detailsPath} icon="arrowRight">
            {t.experience.viewDetails}
          </TextLink>
          {item.companyUrl && (
            <TextLink href={item.companyUrl} icon="globe" external>
              {t.experience.companyWebsite}
            </TextLink>
          )}
        </div>
      </Card>
    </li>
  );
}
