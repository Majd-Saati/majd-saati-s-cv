import { useParams } from 'react-router';
import { PageHeader, type PageFact } from '../components/layout/PageHeader';
import { ProjectMedia } from '../components/sections/ProjectMedia';
import { AppLink } from '../components/ui/AppLink';
import { ButtonLink } from '../components/ui/ButtonLink';
import { DetailBullets } from '../components/ui/DetailBullets';
import { DetailNav } from '../components/ui/DetailNav';
import { SkillGrid } from '../components/ui/SkillGrid';
import { experience } from '../data/experience';
import { personal } from '../data/personal';
import { projects } from '../data/projects';
import { experiencePath, projectPath, sectionPath } from '../data/routes';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLanguage } from '../i18n/useLanguage';
import { formatDuration, formatPeriod } from '../lib/date';
import { findProjectRole, getNeighbors, getProjectContributions } from '../lib/portfolio';
import type { Project } from '../types/portfolio';
import { NotFoundPage } from './NotFoundPage';
import styles from './Page.module.css';

export function ProjectDetailsPage() {
  const { projectId } = useParams();
  const project = projects.find((item) => item.id === projectId);
  if (!project) return <NotFoundPage />;
  // Keyed so switching projects (prev/next) remounts cleanly, re-running entrances.
  return <ProjectDetails key={project.id} project={project} />;
}

function ProjectDetails({ project }: { project: Project }) {
  const { t, text, formatMonth, locale } = useLanguage();
  const page = t.pages.project;
  const index = projects.indexOf(project);
  const role = findProjectRole(experience, project.id);
  const contributions = getProjectContributions(role, project);
  const { previous, next } = getNeighbors(projects, project.id);

  usePageMeta(`${text(project.name)} — ${text(personal.name)}`, text(project.description), projectPath(project.id));

  const facts: PageFact[] = [
    // The role links to its work-experience details page.
    ...(role
      ? [
          {
            id: 'role',
            label: page.facts.role,
            value: (
              <AppLink href={experiencePath(role.id)} className={styles.factLink}>
                {text(role.role)}
              </AppLink>
            ),
          },
        ]
      : []),
    ...(role?.company ? [{ id: 'company', label: page.facts.company, value: text(role.company) }] : []),
    ...(role?.period
      ? [
          { id: 'period', label: page.facts.period, value: formatPeriod(role.period, formatMonth, t.experience.present) },
          { id: 'duration', label: page.facts.duration, value: formatDuration(role.period, locale) },
        ]
      : []),
  ];

  const hasLinks = Boolean(project.demoUrl || project.sourceUrl);

  return (
    <>
      <PageHeader
        back={{ href: sectionPath('projects'), label: page.backToProjects }}
        eyebrow={project.context ? text(project.context) : t.nav.projects}
        title={text(project.name)}
        description={text(project.description)}
        facts={facts}
      />

      <div className={`container ${styles.content}`}>
        <div data-reveal>
          <ProjectMedia project={project} index={index} size="hero" />
        </div>

        <div className={styles.detailGrid}>
          <div className={styles.detailMain}>
            <DetailBullets id="contributions" title={page.contributions} items={contributions.map(text)} />
          </div>

          <aside className={styles.detailAside}>
            {project.technologies.length > 0 && (
              <section className={styles.block} aria-labelledby="technologies-title" data-reveal>
                <h2 id="technologies-title" className={styles.blockTitle}>
                  {page.technologies}
                </h2>
                <SkillGrid items={project.technologies} />
              </section>
            )}

            {hasLinks && (
              <div className={styles.actions} data-reveal>
                {project.demoUrl && (
                  <ButtonLink href={project.demoUrl} icon="arrowUpRight" external magnetic>
                    {t.projects.viewDemo}
                  </ButtonLink>
                )}
                {project.sourceUrl && (
                  <ButtonLink href={project.sourceUrl} variant="secondary" icon="github" external>
                    {t.projects.viewSource}
                  </ButtonLink>
                )}
              </div>
            )}
          </aside>
        </div>

        <DetailNav
          label={t.nav.projects}
          previous={previous && { href: projectPath(previous.id), label: page.previous, title: text(previous.name) }}
          next={next && { href: projectPath(next.id), label: page.next, title: text(next.name) }}
        />
      </div>
    </>
  );
}
