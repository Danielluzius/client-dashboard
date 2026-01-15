'use client';

import React from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import { LOCALES } from '@/i18n/i18n.config';
import styles from './LanguageSwitcher.module.css';

export const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useI18n();

  return (
    <>
      {LOCALES.map((lang) => (
        <button
          key={lang}
          onClick={() => setLocale(lang)}
          className={`${styles.langButton} ${locale === lang ? styles.active : ''}`}
          aria-label={`Switch to ${lang.toUpperCase()}`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </>
  );
};
