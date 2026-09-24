import { useParams } from 'react-router';
import { PageHeader, type PageFact } from '../components/layout/PageHeader';
import { ProjectCard } from '../components/sections/ProjectCard';
import { ButtonLink } from '../components/ui/ButtonLink';
import { DetailBullets } from '../components/ui/DetailBullets';
import { DetailNav } from '../components/ui/DetailNav';
import { SkillGrid } from '../components/ui/SkillGrid';
import { experience } from '../data/experience';
import { personal } from '../data/personal';
import { projects } from '../data/projects';
import { experiencePath, sectionPath } from '../data/routes';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLanguage } from '../i18n/useLanguage';
import { formatDuration, formatPeriod } from '../lib/date';
import { findProjects, getNeighbors } from '../lib/portfolio';
import type { Experience } from '../types/portfolio';
import { NotFoundPage } from './NotFoundPage';
import styles from './Page.module.css';

export function ExperienceDetailsPage() {
  const { experienceId } = useParams();
  const item = experience.find((entry) => entry.id === experienceId);
  if (!item) return <NotFoundPage />;
  // Keyed so switching roles (prev/next) remounts cleanly, re-running entrances.
  return <ExperienceDetails key={item.id} item={item} />;
}

function ExperienceDetails({ item }: { item: Experience }) {
  const { t, text, formatMonth, locale } = useLanguage();
  const page = t.pages.experience;
  const related = findProjects(projects, item.projectIds);
  const { previous, next } = getNeighbors(experience, item.id);
  const role = text(item.role);
  const company = item.company ? text(item.company) : undefined;

  usePageMeta(
    `${company ? `${role} · ${company}` : role} — ${text(personal.name)}`,
    item.responsibilities[0] ? text(item.responsibilities[0]) : t.experience.description,
    experiencePath(item.id),
  );

  const facts: PageFact[] = [
    ...(company ? [{ id: 'company', label: page.facts.company, value: company }] : []),
    ...(item.location ? [{ id: 'location', label: page.facts.location, value: text(item.location) }] : []),
    ...(item.period
      ? [
          { id: 'period', label: page.facts.period, value: formatPeriod(item.period, formatMonth, t.experience.present) },
          { id: 'duration', label: page.facts.duration, value: formatDuration(item.period, locale) },
        ]
      : []),
  ];

  const navItem = (entry: Experience, label: string) => ({
    href: experiencePath(entry.id),
    label,
    title: entry.company ? `${text(entry.role)} · ${text(entry.company)}` : text(entry.role),
  });

  return (
    <>
      <PageHeader
        back={{ href: sectionPath('experience'), label: page.backToExperience }}
        eyebrow={company ?? t.nav.experience}
        title={role}
        facts={facts}
      />

      <div className={`container ${styles.content}`}>
        <div className={styles.detailGrid}>
          <div className={styles.detailMain}>
            <DetailBullets
              id="responsibilities"
              title={t.experience.responsibilities}
              items={item.responsibilities.map(text)}
              icon="arrowRight"
            />
            <DetailBullets id="achievements" title={t.experience.achievements} items={item.achievements.map(text)} icon="trophy" />
          </div>

          <aside className={styles.detailAside}>
            {item.technologies.length > 0 && (
              <section className={styles.block} aria-labelledby="technologies-title" data-reveal>
                <h2 id="technologies-title" className={styles.blockTitle}>
                  {page.technologies}
                </h2>
                <SkillGrid items={item.technologies} />
              </section>
            )}
            {item.companyUrl && (
              <div className={styles.actions} data-reveal>
                <ButtonLink href={item.companyUrl} variant="secondary" icon="arrowUpRight" external>
                  {page.visitCompany}
                </ButtonLink>
              </div>
            )}
          </aside>
        </div>

        {related.length > 0 && (
          <section className={styles.block} aria-labelledby="role-projects-title">
            <h2 id="role-projects-title" className={styles.blockTitle} data-reveal>
              {page.projects}
            </h2>
            <ul className={styles.cardGrid}>
              {related.map((project) => (
                <ProjectCard key={project.id} project={project} index={projects.indexOf(project)} />
              ))}
            </ul>
          </section>
        )}

        <DetailNav
          label={t.nav.experience}
          previous={previous && navItem(previous, page.previous)}
          next={next && navItem(next, page.next)}
        />
      </div>
    </>
  );
}
