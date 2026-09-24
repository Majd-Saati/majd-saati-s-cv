/** Page sections in display order. Drives anchors, numbering, and scroll tracking. */
export const SECTION_IDS = [
  'home',
  'about',
  'skills',
  'explorer',
  'experience',
  'projects',
  'education',
  'courses',
  'contact',
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

/**
 * Sections without their own menu item: they highlight a related item
 * instead (the hero is reached via the logo; the skills explorer is an
 * alternative view of Skills).
 */
export const NAV_PARENT: Partial<Record<SectionId, SectionId>> = {
  explorer: 'skills',
};

/** Sections listed in the navigation menu. */
export const NAV_SECTION_IDS = SECTION_IDS.filter((id) => id !== 'home' && !(id in NAV_PARENT));

/** The menu item to highlight for a section. */
export function toNavSection(id: SectionId | undefined): SectionId | undefined {
  return id ? (NAV_PARENT[id] ?? id) : undefined;
}
