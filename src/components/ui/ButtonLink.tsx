import { useRef } from 'react';
import { useMagnetic } from '../../hooks/useMagnetic';
import { cx } from '../../lib/classNames';
import { AppLink, type AppLinkProps } from './AppLink';
import { Icon } from './Icon';
import type { IconName } from './icons';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonLinkProps extends Omit<AppLinkProps, 'ref'> {
  variant?: ButtonVariant;
  icon?: IconName;
  /** Leans toward the pointer on hover; reserve for key calls to action. */
  magnetic?: boolean;
}

/** A link styled as a button (navigation and downloads are links, not buttons). */
export function ButtonLink({ variant = 'primary', icon, magnetic = false, className, children, ...props }: ButtonLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref, magnetic);

  return (
    <AppLink ref={ref} className={cx(styles.button, styles[variant], className)} {...props}>
      {children}
      {icon && <Icon name={icon} size={17} />}
    </AppLink>
  );
}
