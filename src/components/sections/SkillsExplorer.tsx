import { useRef, useState, type KeyboardEvent } from 'react';
import { skillCategories } from '../../data/skills';
import { getTechLogo } from '../../data/techLogos';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useLanguage } from '../../i18n/useLanguage';
import { gsap, MOTION_OK, prefersReducedMotion, useGSAP } from '../../lib/gsap';
import type { LocalizedText } from '../../types/portfolio';
import { Icon } from '../ui/Icon';
import { Section } from '../ui/Section';
import { TechLogo } from '../ui/TechLogo';
import styles from './SkillsExplorer.module.css';

/** Matches the CSS breakpoint where the tab list becomes a vertical sidebar. */
const VERTICAL_QUERY = '(min-width: 64rem)';
const INDICATOR_SIZE = 3;
/** Space (px) kept around the active tab when scrolling the horizontal row. */
const TAB_SCROLL_MARGIN = 24;

const tabId = (id: string) => `explorer-tab-${id}`;
const panelId = (id: string) => `explorer-panel-${id}`;
const englishName = (skill: LocalizedText) => (typeof skill === 'string' ? skill : skill.en);

/**
 * Alternative view of the skills data: category tabs + an animated tile grid.
 * Implements the WAI-ARIA tabs pattern (arrow keys, Home/End, roving tabindex).
 */
export function SkillsExplorer() {
  const { t, text, direction } = useLanguage();
  const [activeId, setActiveId] = useState(skillCategories[0].id);
  const isVertical = useMediaQuery(VERTICAL_QUERY);
  const tabListRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const activeIndex = skillCategories.findIndex((category) => category.id === activeId);
  const active = skillCategories[activeIndex];

  const selectTab = (index: number, focus: boolean) => {
    const category = skillCategories[(index + skillCategories.length) % skillCategories.length];
    setActiveId(category.id);
    if (focus) tabListRef.current?.querySelector<HTMLButtonElement>(`#${tabId(category.id)}`)?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    // Left/Right follow the reading direction in RTL.
    const forward = direction === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
    const backward = direction === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    const keys: Record<string, number> = {
      [forward]: activeIndex + 1,
      [backward]: activeIndex - 1,
      ArrowDown: activeIndex + 1,
      ArrowUp: activeIndex - 1,
      Home: 0,
      End: skillCategories.length - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    selectTab(keys[event.key], true);
  };

  // Slide the indicator to the active tab: a bar on the start edge (vertical)
  // or an underline (horizontal). Positions are physical, so RTL puts the bar
  // on the right.
  useGSAP(
    () => {
      const list = tabListRef.current;
      const tab = list?.querySelector<HTMLElement>(`#${tabId(activeId)}`);
      const indicator = indicatorRef.current;
      if (!list || !tab || !indicator) return;

      const barX = direction === 'rtl' ? list.clientWidth - INDICATOR_SIZE : 0;
      const geometry = isVertical
        ? { x: barX, y: tab.offsetTop, width: INDICATOR_SIZE, height: tab.offsetHeight }
        : { x: tab.offsetLeft, y: tab.offsetTop + tab.offsetHeight - INDICATOR_SIZE, width: tab.offsetWidth, height: INDICATOR_SIZE };
      gsap.to(indicator, { ...geometry, duration: prefersReducedMotion() ? 0 : 0.45, ease: 'power3.out', overwrite: true });

      // Horizontal row: bring the active tab into view by scrolling the row
      // only (scrollIntoView could also scroll the page).
      if (!isVertical) {
        const tabRect = tab.getBoundingClientRect();
        const listRect = list.getBoundingClientRect();
        const overflowStart = tabRect.left - listRect.left - TAB_SCROLL_MARGIN;
        const overflowEnd = tabRect.right - listRect.right + TAB_SCROLL_MARGIN;
        const delta = overflowStart < 0 ? overflowStart : overflowEnd > 0 ? overflowEnd : 0;
        if (delta !== 0) list.scrollBy({ left: delta, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      }
    },
    { dependencies: [activeId, isVertical, direction] },
  );

  // New category: tiles cascade in.
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(MOTION_OK, () => {
        gsap.from('[data-explorer-tile]', { opacity: 0, y: 16, scale: 0.96, duration: 0.45, ease: 'power2.out', stagger: 0.035 });
      });
    },
    { scope: panelRef, dependencies: [activeId], revertOnUpdate: true },
  );

  return (
    <Section id="explorer" title={t.explorer.title} description={t.explorer.description}>
      <div className={styles.layout} data-reveal>
        <div
          ref={tabListRef}
          role="tablist"
          aria-label={t.explorer.categoriesLabel}
          aria-orientation={isVertical ? 'vertical' : 'horizontal'}
          className={styles.tabList}
          onKeyDown={handleKeyDown}
        >
          <span ref={indicatorRef} className={styles.indicator} aria-hidden="true" />
          {skillCategories.map((category, index) => {
            const isActive = category.id === activeId;
            return (
              <button
                key={category.id}
                id={tabId(category.id)}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId(category.id)}
                tabIndex={isActive ? 0 : -1}
                className={styles.tab}
                onClick={() => selectTab(index, false)}
              >
                <span className={styles.tabIcon}>
                  <Icon name={category.icon} size={18} />
                </span>
                <span className={styles.tabLabel}>{text(category.title)}</span>
                <span className={styles.tabCount} aria-hidden="true">
                  {category.skills.length}
                </span>
              </button>
            );
          })}
        </div>

        <div
          ref={panelRef}
          id={panelId(active.id)}
          role="tabpanel"
          aria-labelledby={tabId(active.id)}
          tabIndex={0}
          className={styles.panel}
        >
          <div className={styles.panelHeader}>
            <span className={styles.panelIcon}>
              <Icon name={active.icon} size={26} weight="duotone" />
            </span>
            <div>
              <h3 className={styles.panelTitle}>{text(active.title)}</h3>
              <p className={styles.panelCount}>{t.explorer.skillCount.replace('{count}', String(active.skills.length))}</p>
            </div>
          </div>

          <ul className={styles.tiles}>
            {active.skills.map((skill) => {
              const logo = getTechLogo(englishName(skill));
              return (
                <li key={englishName(skill)} className={styles.tile} data-explorer-tile>
                  <span className={styles.tileLogo}>
                    {logo ? <TechLogo icon={logo} size={30} /> : <Icon name={active.icon} size={26} weight="duotone" />}
                  </span>
                  <span className={styles.tileName}>{text(skill)}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
