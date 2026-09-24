import { getTechLogo } from '../../data/techLogos';
import { TechLogo } from './TechLogo';
import styles from './SkillGrid.module.css';

interface SkillGridProps {
  items: readonly string[];
}

/** Tiles pairing each skill with its logo; skills without one get a marker. */
export function SkillGrid({ items }: SkillGridProps) {
  return (
    <ul className={styles.grid}>
      {items.map((item) => {
        const logo = getTechLogo(item);
        return (
          <li key={item} className={styles.tile} data-skill-tile>
            <span className={styles.logoBox}>
              {logo ? <TechLogo icon={logo} size={18} /> : <span className={styles.marker} />}
            </span>
            <span className={styles.name}>{item}</span>
          </li>
        );
      })}
    </ul>
  );
}
