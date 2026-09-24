import { personal } from '../../data/personal';
import { useLanguage } from '../../i18n/useLanguage';
import { Card } from '../ui/Card';
import { CountUp } from '../ui/CountUp';
import { Icon } from '../ui/Icon';
import { Section } from '../ui/Section';
import { TagList } from '../ui/TagList';
import styles from './About.module.css';

export function About() {
  const { t, text } = useLanguage();

  return (
    <Section id="about" title={t.about.title}>
      <div className={styles.grid}>
        <div data-reveal className={styles.story}>
          <p className={styles.lead}>{text(personal.summary)}</p>
          <div className={styles.block}>
            <h3 className={styles.heading}>{t.about.background}</h3>
            <p>{text(personal.background)}</p>
          </div>
          <div className={styles.block}>
            <h3 className={styles.heading}>{t.about.languages}</h3>
            <TagList items={personal.spokenLanguages.map(text)} />
          </div>
        </div>

        <div className={styles.aside}>
          {personal.highlights.length > 0 && (
            <dl className={styles.highlights}>
              {personal.highlights.map((highlight) => (
                <Card key={highlight.id} className={styles.highlight}>
                  <dt className={styles.highlightLabel}>{text(highlight.label)}</dt>
                  <dd className={styles.highlightValue}>
                    <CountUp value={highlight.value} />
                  </dd>
                </Card>
              ))}
            </dl>
          )}

          <Card>
            <h3 className={styles.heading}>{t.about.careerFocus}</h3>
            <ul className={styles.focusList}>
              {personal.careerFocus.map((focus) => (
                <li key={focus.en}>
                  <Icon name="check" size={16} className={styles.check} />
                  {text(focus)}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </Section>
  );
}
