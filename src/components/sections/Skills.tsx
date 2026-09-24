import { useRef } from 'react';
import { skillCategories } from '../../data/skills';
import { getTechLogo } from '../../data/techLogos';
import { useLanguage } from '../../i18n/useLanguage';
import { cx } from '../../lib/classNames';
import { gsap, MOTION_OK, useGSAP } from '../../lib/gsap';
import { Card } from '../ui/Card';
import { Icon } from '../ui/Icon';
import { Section } from '../ui/Section';
import { SkillGrid } from '../ui/SkillGrid';
import { TagList } from '../ui/TagList';
import styles from './Skills.module.css';

/** Categories with this many skills span two columns on wide screens. */
const WIDE_CATEGORY_MIN_SKILLS = 6;

export function Skills() {
  const { t, text } = useLanguage();
  const gridRef = useRef<HTMLUListElement>(null);

  // Within each category card, skill tiles cascade in just after the card appears.
  useGSAP(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const media = gsap.matchMedia();
    media.add(MOTION_OK, () => {
      for (const card of Array.from(grid.children)) {
        const tiles = card.querySelectorAll('[data-skill-tile]');
        if (tiles.length === 0) continue;
        gsap.from(tiles, {
          opacity: 0,
          y: 12,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.035,
          scrollTrigger: { trigger: card, start: 'top 85%', once: true },
        });
      }
    });
  });

  return (
    <Section id="skills" title={t.skills.title} description={t.skills.description}>
      <ul ref={gridRef} className={styles.grid}>
        {skillCategories.map((category) => {
          const skills = category.skills.map(text);
          const hasLogos = category.skills.some((skill) => getTechLogo(typeof skill === 'string' ? skill : skill.en));

          return (
            <Card
              key={category.id}
              as="li"
              className={cx(styles.card, skills.length >= WIDE_CATEGORY_MIN_SKILLS && styles.wide)}
            >
              <h3 className={styles.title}>
                <span className={styles.icon}>
                  <Icon name={category.icon} size={20} weight="duotone" />
                </span>
                {text(category.title)}
                <span className={styles.count} aria-hidden="true">{skills.length}</span>
              </h3>
              {hasLogos ? <SkillGrid items={skills} /> : <TagList items={skills} />}
            </Card>
          );
        })}
      </ul>
    </Section>
  );
}
