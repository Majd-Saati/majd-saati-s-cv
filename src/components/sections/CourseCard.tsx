import { coursePath } from '../../data/routes';
import { useLanguage } from '../../i18n/useLanguage';
import type { Course } from '../../types/portfolio';
import { AppLink } from '../ui/AppLink';
import { Card } from '../ui/Card';
import { Icon } from '../ui/Icon';
import { ProviderBadge } from '../ui/ProviderBadge';
import { TextLink } from '../ui/TextLink';
import styles from './Courses.module.css';

export function CourseCard({ course }: { course: Course }) {
  const { t } = useLanguage();
  const detailsPath = coursePath(course.id);

  return (
    <Card as="li" interactive className={styles.card}>
      <div className={styles.header}>
        <span className={styles.icon}>
          <Icon name={course.certificateUrl ? 'certificate' : 'book'} size={22} weight="duotone" />
        </span>
        <ProviderBadge provider={course.provider} />
      </div>

      {/* Course titles and authors are English regardless of the UI language. */}
      <div className={styles.body}>
        <h3 className={styles.title} lang="en">
          <AppLink href={detailsPath} className={styles.titleLink}>
            {course.title}
          </AppLink>
        </h3>
        {course.author && (
          <p className={styles.author}>
            {t.courses.by} <span lang="en">{course.author}</span>
          </p>
        )}
      </div>

      <div className={styles.links}>
        <TextLink href={detailsPath} icon="arrowRight">
          {t.courses.viewDetails}
        </TextLink>
        {course.certificateUrl && (
          <TextLink href={course.certificateUrl} icon="certificate" external>
            {t.courses.viewCertificate}
          </TextLink>
        )}
      </div>
    </Card>
  );
}
