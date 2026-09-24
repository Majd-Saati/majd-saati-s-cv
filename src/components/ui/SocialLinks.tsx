import { useLanguage } from '../../i18n/useLanguage';
import { cx } from '../../lib/classNames';
import type { ContactChannel } from '../../lib/contact';
import { AppLink } from './AppLink';
import { Icon } from './Icon';
import styles from './SocialLinks.module.css';

interface SocialLinksProps {
  channels: readonly ContactChannel[];
  className?: string;
}

/** Row of icon-only contact links. */
export function SocialLinks({ channels, className }: SocialLinksProps) {
  const { t } = useLanguage();
  if (channels.length === 0) return null;

  return (
    <ul className={cx(styles.list, className)}>
      {channels.map((channel) => (
        <li key={channel.id}>
          <AppLink
            href={channel.href}
            external={channel.external}
            className={styles.link}
            aria-label={t.contact.channels[channel.id]}
            title={t.contact.channels[channel.id]}
          >
            <Icon name={channel.icon} size={20} />
          </AppLink>
        </li>
      ))}
    </ul>
  );
}
