'use client';

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { UserTable } from '@/components/ui/UserTable';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { useI18n } from '@/i18n/I18nProvider';
import { fetchUsers } from '@/services/api';
import { User, ApiError } from '@/types';
import styles from './page.module.css';

export default function UsersPage() {
  const { t } = useI18n();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const loadUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <MainLayout>
      <div className={styles.usersPage}>
        <header className={styles.header}>
          <h1>{t('users.title')}</h1>
          <p className={styles.subtitle}>{t('users.subtitle')}</p>
        </header>

        {isLoading && <LoadingSpinner message={t('users.loading')} />}

        {error && <ErrorMessage message={error.message} onRetry={loadUsers} />}

        {!isLoading && !error && users.length > 0 && (
          <div className={styles.tableWrapper}>
            <UserTable users={users} />
          </div>
        )}

        {!isLoading && !error && users.length === 0 && (
          <div className={styles.emptyState}>
            <p>{t('users.empty')}</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
