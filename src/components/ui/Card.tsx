import { useRef, type ReactNode } from 'react';
import { useSpotlight } from '../../hooks/useSpotlight';
import { cx } from '../../lib/classNames';
import styles from './Card.module.css';

interface CardProps {
  as?: 'article' | 'div' | 'li';
  /** Hover lift + pointer spotlight; use for cards that contain actions. */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
}

/** Surface container. Revealed on scroll via `data-reveal` (see useRevealAnimations). */
export function Card({ as: Tag = 'div', interactive = false, className, children }: CardProps) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  useSpotlight(ref, interactive);

  return (
    <Tag
      ref={ref}
      data-reveal
      className={cx('surface', styles.card, interactive && styles.interactive, className)}
    >
      {children}
    </Tag>
  );
}
