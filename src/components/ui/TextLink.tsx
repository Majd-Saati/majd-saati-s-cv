import { cx } from '../../lib/classNames';
import { AppLink, type AppLinkProps } from './AppLink';
import { Icon } from './Icon';
import type { IconName } from './icons';
import styles from './TextLink.module.css';

interface TextLinkProps extends AppLinkProps {
  icon?: IconName;
}

/** Compact inline link with an optional leading icon; external links get an arrow. */
export function TextLink({ icon, external, className, children, ...props }: TextLinkProps) {
  return (
    <AppLink className={cx(styles.link, className)} external={external} {...props}>
      {icon && <Icon name={icon} size={16} />}
      <span>{children}</span>
      {external && <Icon name="arrowUpRight" size={14} className={styles.arrow} />}
    </AppLink>
  );
}
