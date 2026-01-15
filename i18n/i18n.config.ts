import de from './de.json';
import en from './en.json';

export type Locale = 'de' | 'en';

export const DEFAULT_LOCALE: Locale = 'de';

export const LOCALES: Locale[] = ['de', 'en'];

export const LOCALE_LABELS: Record<Locale, string> = {
  de: 'Deutsch',
  en: 'English',
};

export type TranslationKeys = typeof de;

export const translations: Record<Locale, TranslationKeys> = {
  de,
  en,
};
