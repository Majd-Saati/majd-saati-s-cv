import { LANGUAGES, LANGUAGE_CODES } from '../../i18n/config';
import { useLanguage } from '../../i18n/useLanguage';
import styles from './LanguageSwitcher.module.css';

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div role="group" aria-label={t.a11y.language} className={styles.switcher}>
      {LANGUAGE_CODES.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          className={styles.option}
          aria-pressed={language === code}
          aria-label={LANGUAGES[code].nativeName}
          onClick={() => setLanguage(code)}
        >
          {LANGUAGES[code].shortLabel}
        </button>
      ))}
    </div>
  );
}
