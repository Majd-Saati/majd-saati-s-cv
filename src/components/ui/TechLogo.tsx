import type { CSSProperties } from 'react';
import type { SimpleIcon } from 'simple-icons';
import { cx } from '../../lib/classNames';
import { relativeLuminance } from '../../lib/color';
import styles from './TechLogo.module.css';

interface TechLogoProps {
  icon: SimpleIcon;
  size?: number;
  className?: string;
}

/**
 * Brand logo in its brand color. Near-black brands (e.g. Next.js) use the
 * current text color instead so they stay visible in dark mode.
 */
export function TechLogo({ icon, size = 18, className }: TechLogoProps) {
  const brandColor = relativeLuminance(icon.hex) < 0.04 ? undefined : `#${icon.hex}`;

  return (
    <svg
      className={cx(styles.logo, className)}
      style={brandColor ? ({ '--logo-color': brandColor } as CSSProperties) : undefined}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={icon.path} />
    </svg>
  );
}
