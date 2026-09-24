import { getTechLogo } from '../../data/techLogos';
import { cx } from '../../lib/classNames';
import { TechLogo } from './TechLogo';
import styles from './TagList.module.css';

interface TagListProps {
  items: readonly string[];
  /** Accessible name for the list, e.g. "Technologies". */
  label?: string;
  variant?: 'default' | 'accent';
  className?: string;
}

/** Renders a list of chips (with brand logos when known); nothing when empty. */
export function TagList({ items, label, variant = 'default', className }: TagListProps) {
  if (items.length === 0) return null;

  return (
    <ul className={cx(styles.list, className)} aria-label={label}>
      {items.map((item) => {
        const logo = getTechLogo(item);
        return (
          <li key={item} className={cx(styles.tag, styles[variant])}>
            {logo && <TechLogo icon={logo} size={13} />}
            {item}
          </li>
        );
      })}
    </ul>
  );
}
