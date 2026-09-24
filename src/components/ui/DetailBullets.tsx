import { Icon } from './Icon';
import type { IconName } from './icons';
import styles from './DetailBullets.module.css';

interface DetailBulletsProps {
  /** Used to label the section for assistive tech. */
  id: string;
  title: string;
  items: readonly string[];
  icon?: IconName;
}

/** Titled bullet list for detail pages; renders nothing when empty. */
export function DetailBullets({ id, title, items, icon = 'check' }: DetailBulletsProps) {
  if (items.length === 0) return null;
  const titleId = `${id}-title`;

  return (
    <section className={styles.section} aria-labelledby={titleId} data-reveal>
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item}>
            <Icon name={icon} size={18} className={styles.icon} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
