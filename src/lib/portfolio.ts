import type { Experience, Localized, Project, ProjectId } from '../types/portfolio';

/** Resolves project ids to projects, preserving order and skipping unknown ids. */
export function findProjects(projects: readonly Project[], ids: readonly ProjectId[] = []): Project[] {
  return ids.flatMap((id) => projects.find((project) => project.id === id) ?? []);
}

/** The role in which a project was delivered (via `Experience.projectIds`). */
export function findProjectRole(experience: readonly Experience[], projectId: ProjectId): Experience | undefined {
  return experience.find((item) => item.projectIds?.includes(projectId));
}

/**
 * CV bullet points describing work on a project, derived from its role so the
 * text isn't duplicated in the data: every bullet when the role covers only
 * this project, otherwise the bullets that mention the project by name.
 */
export function getProjectContributions(role: Experience | undefined, project: Project): Localized[] {
  if (!role) return [];
  const bullets = [...role.responsibilities, ...role.achievements];
  if ((role.projectIds?.length ?? 0) <= 1) return bullets;
  return bullets.filter((bullet) => bullet.en.includes(project.name.en));
}

/** Previous and next items (wrapping around) for detail-page navigation. */
export function getNeighbors<T extends { id: string }>(items: readonly T[], id: string): { previous?: T; next?: T } {
  const index = items.findIndex((item) => item.id === id);
  if (index < 0 || items.length < 2) return {};
  return {
    previous: items[(index - 1 + items.length) % items.length],
    next: items[(index + 1) % items.length],
  };
}
