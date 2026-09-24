import { courses } from '../../data/education';
import { useLanguage } from '../../i18n/useLanguage';
import { Section } from '../ui/Section';
import { CourseCard } from './CourseCard';
import styles from './Courses.module.css';

export function Courses() {
  const { t } = useLanguage();

  return (
    <Section id="courses" title={t.courses.title} description={t.courses.description}>
      <ul className={styles.grid}>
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </ul>
    </Section>
  );
}
