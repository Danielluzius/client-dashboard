'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { UserTable } from '@/components/ui/UserTable';
import { Pagination } from '@/components/ui/Pagination';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { useI18n } from '@/i18n/I18nProvider';
import { fetchUsers } from '@/services/api';
import { User, ApiError } from '@/types';
import styles from './page.module.css';

const USERS_PER_PAGE = 5;

export default function UsersPage() {
  const { t } = useI18n();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

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

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) {
      return users;
    }

    const query = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.company.name.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Paginate filtered users
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE + 1;
  const endIndex = Math.min(currentPage * USERS_PER_PAGE, filteredUsers.length);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <MainLayout>
      <div className={styles.usersPage}>
        <header className={styles.header}>
          <h1>{t('users.title')}</h1>
          <p className={styles.subtitle}>{t('users.subtitle')}</p>
        </header>

        {isLoading && <LoadingSpinner message={t('users.loading')} />}

        {error && <ErrorMessage message={error.message} onRetry={loadUsers} />}

        {!isLoading && !error && (
          <>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder={t('users.searchPlaceholder')}
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
            </div>

            {filteredUsers.length > 0 ? (
              <>
                <div className={styles.resultsInfo}>
                  {t('users.showingResults')
                    .replace('{{start}}', startIndex.toString())
                    .replace('{{end}}', endIndex.toString())
                    .replace('{{total}}', filteredUsers.length.toString())}
                </div>

                <div className={styles.tableWrapper}>
                  <UserTable users={paginatedUsers} />
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <div className={styles.emptyState}>
                <p>{searchQuery ? t('users.noResults') : t('users.empty')}</p>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}
