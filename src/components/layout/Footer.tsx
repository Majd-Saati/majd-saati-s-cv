import { personal } from '../../data/personal';
import { useLanguage } from '../../i18n/useLanguage';
import { cx } from '../../lib/classNames';
import { getContactChannels } from '../../lib/contact';
import { SocialLinks } from '../ui/SocialLinks';
import { TextLink } from '../ui/TextLink';
import styles from './Footer.module.css';

const channels = getContactChannels(personal.contact);
const year = new Date().getFullYear();

export function Footer() {
  const { t, text } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={cx('container', styles.inner)}>
        <p className={styles.copyright}>
          © {year} {text(personal.name)}. {t.footer.rights}
        </p>
        <SocialLinks channels={channels} />
        <TextLink href="#main" icon="arrowUp">
          {t.a11y.backToTop}
        </TextLink>
      </div>
    </footer>
  );
}
