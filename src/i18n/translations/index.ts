import type { Language } from '../config';
import { ar } from './ar';
import { en, type Dictionary } from './en';

export type { Dictionary };

export const dictionaries: Record<Language, Dictionary> = { en, ar };
