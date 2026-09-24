import { Fragment } from 'react';
import styles from './AnimatedText.module.css';

interface AnimatedTextProps {
  text: string;
}

/**
 * Renders text as masked words (`[data-word]`) that a parent GSAP timeline can
 * slide up. Words are split in React rather than by a DOM-rewriting plugin, so
 * React stays in control of the markup when the language changes. Splitting
 * by word (never by letter) keeps Arabic glyphs joined. Assistive tech reads
 * the unsplit text.
 */
export function AnimatedText({ text }: AnimatedTextProps) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          // Keyed by content so a new language mounts fresh, un-animated spans.
          <Fragment key={`${index}-${word}`}>
            <span className={styles.mask}>
              <span className={styles.word} data-word>
                {word}
              </span>
            </span>
            {index < words.length - 1 && ' '}
          </Fragment>
        ))}
      </span>
    </>
  );
}
