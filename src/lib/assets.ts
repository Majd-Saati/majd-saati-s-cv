import { courses, education } from '../data/education.ts';
import { personal } from '../data/personal.ts';
import { projects } from '../data/projects.ts';

/**
 * Site-relative file paths referenced from the data files (served from
 * `/public`). Checked at build time so a missing file (e.g. a certificate that
 * hasn't been added yet) is reported instead of shipping a broken link.
 */
export function getReferencedPublicFiles(): string[] {
  const candidates = [
    personal.cvUrl,
    personal.photo?.src,
    ...education.map((item) => item.certificateUrl),
    ...courses.map((course) => course.certificateUrl),
    ...projects.map((project) => project.image?.src),
  ];
  return candidates.filter((path): path is string => Boolean(path?.startsWith('/') && !path.startsWith('//')));
}
