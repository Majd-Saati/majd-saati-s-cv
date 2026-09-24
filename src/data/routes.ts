import type { SectionId } from './sections.ts';

/** Route patterns for the router. */
export const ROUTES = {
  home: '/',
  experience: '/experience/:experienceId',
  project: '/projects/:projectId',
  course: '/courses/:courseId',
} as const;

export const experiencePath = (id: string) => `/experience/${id}`;
export const projectPath = (id: string) => `/projects/${id}`;
export const coursePath = (id: string) => `/courses/${id}`;

/** Link to a home section from any page (scrolled to by ScrollManager). */
export const sectionPath = (id: SectionId) => `${ROUTES.home}#${id}`;

/** Home section highlighted in the nav while viewing one of its detail pages. */
export function getNavSectionForPath(pathname: string): SectionId | undefined {
  if (pathname.startsWith('/experience/')) return 'experience';
  if (pathname.startsWith('/projects/')) return 'projects';
  if (pathname.startsWith('/courses/')) return 'courses';
  return undefined;
}
