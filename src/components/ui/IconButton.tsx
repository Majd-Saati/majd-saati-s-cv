import type { ComponentProps } from 'react';
import { cx } from '../../lib/classNames';
import { Icon } from './Icon';
import type { IconName } from './icons';
import styles from './Button.module.css';

interface IconButtonProps extends Omit<ComponentProps<'button'>, 'aria-label' | 'children'> {
  icon: IconName;
  /** Accessible name — required because the button has no visible text. */
  label: string;
}

export function IconButton({ icon, label, className, type = 'button', ...props }: IconButtonProps) {
  return (
    <button type={type} className={cx(styles.iconButton, className)} aria-label={label} title={label} {...props}>
      <Icon name={icon} size={20} />
    </button>
  );
}
