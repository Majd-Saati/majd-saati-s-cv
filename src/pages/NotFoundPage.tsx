import { useLocation } from 'react-router';
import { ButtonLink } from '../components/ui/ButtonLink';
import { personal } from '../data/personal';
import { ROUTES } from '../data/routes';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLanguage } from '../i18n/useLanguage';
import styles from './Page.module.css';

export function NotFoundPage() {
  const { t, text } = useLanguage();
  const { pathname } = useLocation();
  const page = t.pages.notFound;
  usePageMeta(`${page.title} — ${text(personal.name)}`, page.description, pathname);

  return (
    <section className={`container ${styles.notFound}`} aria-labelledby="not-found-title">
      <p className={styles.notFoundCode} aria-hidden="true">
        404
      </p>
      <h1 id="not-found-title" className={styles.notFoundTitle}>
        {page.title}
      </h1>
      <p className={styles.notFoundDescription}>{page.description}</p>
      <ButtonLink href={ROUTES.home} icon="arrowLeft">
        {t.pages.backToHome}
      </ButtonLink>
    </section>
  );
}
