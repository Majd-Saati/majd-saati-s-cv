import { getTechLogo } from '../../data/techLogos';
import { useLanguage } from '../../i18n/useLanguage';
import { cx } from '../../lib/classNames';
import type { Project } from '../../types/portfolio';
import { Icon } from '../ui/Icon';
import { TechLogo } from '../ui/TechLogo';
import styles from './ProjectMedia.module.css';

const MAX_PLACEHOLDER_LOGOS = 4;

interface ProjectMediaProps {
  project: Project;
  /** Shown as "01", "02"… on the placeholder. */
  index: number;
  /** `hero` = larger, eagerly loaded version for the details page. */
  size?: 'card' | 'hero';
  className?: string;
}

/** Project screenshot, or a placeholder built from its technology logos. */
export function ProjectMedia({ project, index, size = 'card', className }: ProjectMediaProps) {
  const { text } = useLanguage();
  const isHero = size === 'hero';
  const stackLogos = project.technologies
    .flatMap((name) => {
      const logo = getTechLogo(name);
      return logo ? [{ name, logo }] : [];
    })
    .slice(0, MAX_PLACEHOLDER_LOGOS);

  return (
    <div className={cx(styles.media, isHero && styles.hero, className)}>
      {project.image ? (
        <img
          src={project.image.src}
          alt={text(project.image.alt)}
          width={project.image.width}
          height={project.image.height}
          loading={isHero ? 'eager' : 'lazy'}
          decoding="async"
        />
      ) : (
        <div className={styles.placeholder} aria-hidden="true">
          {stackLogos.length > 0 ? (
            <ul className={styles.logoStack}>
              {stackLogos.map(({ name, logo }) => (
                <li key={name} className={styles.logoTile}>
                  <TechLogo icon={logo} size={isHero ? 34 : 26} />
                </li>
              ))}
            </ul>
          ) : (
            <Icon name="layers" size={isHero ? 44 : 32} weight="duotone" />
          )}
          <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
        </div>
      )}
    </div>
  );
}
