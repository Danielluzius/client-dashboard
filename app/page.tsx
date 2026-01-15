'use client';

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/ui/StatCard';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { useI18n } from '@/i18n/I18nProvider';
import { fetchUsers, fetchAllPosts } from '@/services/api';
import { DashboardStats, ApiError } from '@/types';
import { formatDate } from '@/lib/utils';
import styles from './page.module.css';

export default function DashboardPage() {
  const { t } = useI18n();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const loadDashboardData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [users, posts] = await Promise.all([fetchUsers(), fetchAllPosts()]);

      setStats({
        totalUsers: users.length,
        totalPosts: posts.length,
        lastUpdate: formatDate(new Date()),
      });
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <MainLayout>
      <div className={styles.dashboard}>
        <header className={styles.header}>
          <h1>{t('dashboard.title')}</h1>
          <p className={styles.subtitle}>{t('dashboard.subtitle')}</p>
        </header>

        {isLoading && <LoadingSpinner message={t('dashboard.loading')} />}

        {error && <ErrorMessage message={error.message} onRetry={loadDashboardData} />}

        {stats && !isLoading && !error && (
          <>
            <div className={styles.statsGrid}>
              <StatCard title={t('dashboard.stats.users')} value={stats.totalUsers} icon="👥" />
              <StatCard title={t('dashboard.stats.posts')} value={stats.totalPosts} icon="📝" />
              <StatCard
                title={t('dashboard.stats.lastUpdate')}
                value={stats.lastUpdate}
                icon="🕐"
              />
            </div>

            <Card className={styles.infoCard}>
              <h2>{t('dashboard.about.title')}</h2>
              <p>{t('dashboard.about.description')}</p>
              <ul className={styles.featureList}>
                <li>{t('dashboard.about.features.typescript')}</li>
                <li>{t('dashboard.about.features.errorHandling')}</li>
                <li>{t('dashboard.about.features.architecture')}</li>
                <li>{t('dashboard.about.features.responsive')}</li>
                <li>{t('dashboard.about.features.nextjs')}</li>
              </ul>
            </Card>
          </>
        )}
      </div>
    </MainLayout>
  );
}
