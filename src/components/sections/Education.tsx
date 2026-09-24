import { education } from '../../data/education';
import { useLanguage } from '../../i18n/useLanguage';
import { formatPeriod } from '../../lib/date';
import { ButtonLink } from '../ui/ButtonLink';
import { Card } from '../ui/Card';
import { Icon } from '../ui/Icon';
import { Section } from '../ui/Section';
import styles from './Education.module.css';

export function Education() {
  const { t, text, formatMonth } = useLanguage();

  return (
    <Section id="education" title={t.education.title}>
      <ul className={styles.grid}>
        {education.map((item) => (
          <Card key={item.id} as="li" className={styles.card}>
            <span className={styles.icon}>
              <Icon name="graduation" size={22} weight="duotone" />
            </span>
            <div className={styles.body}>
              <h3 className={styles.title}>{text(item.degree)}</h3>
              <p className={styles.meta}>{text(item.institution)}</p>
              {item.period && (
                <p className={styles.date}>
                  <time dateTime={item.period.start}>
                    {formatPeriod(item.period, formatMonth, t.experience.present)}
                  </time>
                </p>
              )}
            </div>
            {item.certificateUrl && (
              // Opens in a new tab, whether it's a hosted page or a PDF in /public.
              <ButtonLink href={item.certificateUrl} variant="secondary" icon="certificate" external className={styles.action}>
                {t.education.viewCertificate}
              </ButtonLink>
            )}
          </Card>
        ))}
      </ul>
    </Section>
  );
}
