import { getTechLogo } from '../../data/techLogos';
import { TechLogo } from './TechLogo';
import styles from './ProviderBadge.module.css';

/** Learning platform pill (e.g. Udemy, Coursera) with its logo when known. */
export function ProviderBadge({ provider }: { provider: string }) {
  const logo = getTechLogo(provider);
  return (
    <span className={styles.badge}>
      {logo && <TechLogo icon={logo} size={14} />}
      {provider}
    </span>
  );
}
