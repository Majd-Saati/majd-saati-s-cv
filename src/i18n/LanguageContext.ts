import { createContext } from 'react';
import type { MonthFormatter } from '../lib/date';
import type { LocalizedText } from '../types/portfolio';
import type { Direction, Language } from './config';
import type { Dictionary } from './translations';

export interface LanguageContextValue {
  language: Language;
  direction: Direction;
  /** BCP 47 locale for Intl formatting in the active language. */
  locale: string;
  /** UI strings for the active language. */
  t: Dictionary;
  setLanguage: (language: Language) => void;
  /** Resolves data-layer text (plain or localized) to the active language. */
  text: (value: LocalizedText) => string;
  formatMonth: MonthFormatter;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);
