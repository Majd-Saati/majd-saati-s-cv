import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { createMonthFormatter } from '../lib/date';
import { STORAGE_KEYS, writeStorage } from '../lib/storage';
import type { LocalizedText } from '../types/portfolio';
import { DEFAULT_LANGUAGE, LANGUAGES, isLanguage, type Language } from './config';
import { LanguageContext, type LanguageContextValue } from './LanguageContext';
import { dictionaries } from './translations';

/** The inline preference script in <head> has already resolved the language. */
function getInitialLanguage(): Language {
  const current = document.documentElement.lang;
  return isLanguage(current) ? current : DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = useCallback((next: Language) => {
    // Flip `lang`/`dir` before React re-renders, so components that measure
    // layout during the update (e.g. the nav indicator) see the new direction.
    // The initial values are set by the inline preference script. Page titles
    // are handled per page (see hooks/usePageMeta.ts).
    const root = document.documentElement;
    root.lang = next;
    root.dir = LANGUAGES[next].dir;
    writeStorage(STORAGE_KEYS.language, next);
    setLanguageState(next);
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      direction: LANGUAGES[language].dir,
      locale: LANGUAGES[language].locale,
      t: dictionaries[language],
      setLanguage,
      text: (value: LocalizedText) => (typeof value === 'string' ? value : value[language]),
      formatMonth: createMonthFormatter(LANGUAGES[language].locale),
    }),
    [language, setLanguage],
  );

  return <LanguageContext value={value}>{children}</LanguageContext>;
}
