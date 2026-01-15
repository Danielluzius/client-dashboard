'use client';

import React from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  const { t } = useI18n();
  const displayMessage = message || t('common.loading');
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p className={styles.message}>{displayMessage}</p>
    </div>
  );
};
