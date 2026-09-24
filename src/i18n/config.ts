export type Direction = 'ltr' | 'rtl';

interface LanguageConfig {
  /** Name of the language written in that language, used by the switcher. */
  nativeName: string;
  /** Compact label for tight UI such as the header switcher. */
  shortLabel: string;
  dir: Direction;
  /** BCP 47 locale used for Intl formatting (dates, numbers). */
  locale: string;
  /** Open Graph locale, e.g. `en_US`. */
  ogLocale: string;
}

/**
 * Supported languages. Adding a language here makes TypeScript require a
 * translation for it in every dictionary and every `Localized` data field.
 */
export const LANGUAGES = {
  en: { nativeName: 'English', shortLabel: 'EN', dir: 'ltr', locale: 'en-US', ogLocale: 'en_US' },
  ar: { nativeName: 'العربية', shortLabel: 'عربي', dir: 'rtl', locale: 'ar-u-nu-latn', ogLocale: 'ar_SY' },
} as const satisfies Record<string, LanguageConfig>;

export type Language = keyof typeof LANGUAGES;

export const DEFAULT_LANGUAGE: Language = 'en';

export const LANGUAGE_CODES = Object.keys(LANGUAGES) as Language[];

export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && value in LANGUAGES;
}
