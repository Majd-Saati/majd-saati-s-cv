import { useParams } from 'react-router';
import { PageHeader, type PageFact } from '../components/layout/PageHeader';
import { ButtonLink } from '../components/ui/ButtonLink';
import { DetailNav } from '../components/ui/DetailNav';
import { Icon } from '../components/ui/Icon';
import { ProviderBadge } from '../components/ui/ProviderBadge';
import { TagList } from '../components/ui/TagList';
import { TechLogo } from '../components/ui/TechLogo';
import { courses } from '../data/education';
import { personal } from '../data/personal';
import { coursePath, sectionPath } from '../data/routes';
import { findTechLogoInText } from '../data/techLogos';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLanguage } from '../i18n/useLanguage';
import { getNeighbors } from '../lib/portfolio';
import type { Course } from '../types/portfolio';
import { NotFoundPage } from './NotFoundPage';
import styles from './Page.module.css';

export function CourseDetailsPage() {
  const { courseId } = useParams();
  const course = courses.find((item) => item.id === courseId);
  if (!course) return <NotFoundPage />;
  // Keyed so switching courses (prev/next) remounts cleanly, re-running entrances.
  return <CourseDetails key={course.id} course={course} />;
}

function CourseDetails({ course }: { course: Course }) {
  const { t, text } = useLanguage();
  const page = t.pages.course;
  const { previous, next } = getNeighbors(courses, course.id);
  // Visual only: the main technology named in the title, e.g. Node.js.
  const topicLogo = findTechLogoInText(course.title);
  const description = course.description ? text(course.description) : undefined;

  usePageMeta(`${course.title} — ${text(personal.name)}`, description ?? `${course.title} · ${course.provider}`, coursePath(course.id));

  const facts: PageFact[] = [
    { id: 'platform', label: page.facts.platform, value: <ProviderBadge provider={course.provider} /> },
    ...(course.author ? [{ id: 'author', label: page.facts.author, value: <span lang="en">{course.author}</span> }] : []),
    ...(course.certificateUrl ? [{ id: 'credential', label: page.facts.credential, value: page.certified }] : []),
  ];

  const hasLinks = Boolean(course.certificateUrl || course.courseUrl);

  return (
    <>
      <PageHeader
        back={{ href: sectionPath('courses'), label: page.backToCourses }}
        eyebrow={page.eyebrow}
        title={course.title}
        titleLang="en"
        description={description}
        facts={facts}
      />

      <div className={`container ${styles.content}`}>
        <div className={styles.courseHero} data-reveal>
          <span className={styles.courseLogo} aria-hidden="true">
            {topicLogo ? (
              <TechLogo icon={topicLogo} size={56} />
            ) : (
              <Icon name={course.certificateUrl ? 'certificate' : 'book'} size={56} weight="duotone" />
            )}
          </span>
          <div className={styles.courseHeroText}>
            <p className={styles.courseHeroTitle} lang="en">
              {course.title}
            </p>
            {course.author && (
              <p className={styles.courseHeroMeta}>
                {t.courses.by} <span lang="en">{course.author}</span> · {course.provider}
              </p>
            )}
          </div>
          {hasLinks && (
            <div className={styles.actions}>
              {course.certificateUrl && (
                <ButtonLink href={course.certificateUrl} icon="certificate" external magnetic>
                  {t.courses.viewCertificate}
                </ButtonLink>
              )}
              {course.courseUrl && (
                <ButtonLink href={course.courseUrl} variant="secondary" icon="arrowUpRight" external>
                  {t.courses.viewCourse}
                </ButtonLink>
              )}
            </div>
          )}
        </div>

        {course.topics && course.topics.length > 0 && (
          <section className={styles.block} aria-labelledby="topics-title" data-reveal>
            <h2 id="topics-title" className={styles.blockTitle}>
              {page.topics}
            </h2>
            <TagList items={course.topics} variant="accent" />
          </section>
        )}

        <DetailNav
          label={t.nav.courses}
          previous={previous && { href: coursePath(previous.id), label: page.previous, title: previous.title, titleLang: 'en' }}
          next={next && { href: coursePath(next.id), label: page.next, title: next.title, titleLang: 'en' }}
        />
      </div>
    </>
  );
}
