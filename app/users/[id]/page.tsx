'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { useI18n } from '@/i18n/I18nProvider';
import { fetchUserById, fetchPostsByUser } from '@/services/api';
import { User, Post, ApiError } from '@/types';
import styles from './page.module.css';

export default function UserDetailPage() {
  const { t } = useI18n();
  const params = useParams();
  const router = useRouter();
  const userId = params?.id ? parseInt(params.id as string, 10) : null;

  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const loadUserData = async () => {
    if (!userId || isNaN(userId)) {
      setError({ message: t('userDetail.invalidId') });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [userData, userPosts] = await Promise.all([
        fetchUserById(userId),
        fetchPostsByUser(userId),
      ]);

      setUser(userData);
      setPosts(userPosts);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, [userId]);

  const handleBackClick = () => {
    router.push('/users');
  };

  return (
    <MainLayout>
      <div className={styles.userDetailPage}>
        {isLoading && <LoadingSpinner message={t('userDetail.loading')} />}

        {error && (
          <ErrorMessage message={error.message} onRetry={userId ? loadUserData : undefined} />
        )}

        {user && !isLoading && !error && (
          <>
            <div className={styles.header}>
              <Button variant="secondary" onClick={handleBackClick}>
                {t('userDetail.backButton')}
              </Button>
            </div>

            <div className={styles.content}>
              <Card className={styles.userInfoCard}>
                <h1 className={styles.userName}>{user.name}</h1>
                <p className={styles.userUsername}>@{user.username}</p>

                <div className={styles.infoGrid}>
                  <div className={styles.infoSection}>
                    <h3>{t('userDetail.contact.title')}</h3>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>{t('userDetail.contact.email')}</span>
                      <span className={styles.value}>{user.email}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>{t('userDetail.contact.phone')}</span>
                      <span className={styles.value}>{user.phone}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>{t('userDetail.contact.website')}</span>
                      <span className={styles.value}>{user.website}</span>
                    </div>
                  </div>

                  <div className={styles.infoSection}>
                    <h3>{t('userDetail.address.title')}</h3>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>{t('userDetail.address.street')}</span>
                      <span className={styles.value}>
                        {user.address.street}, {user.address.suite}
                      </span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>{t('userDetail.address.city')}</span>
                      <span className={styles.value}>
                        {user.address.zipcode} {user.address.city}
                      </span>
                    </div>
                  </div>

                  <div className={styles.infoSection}>
                    <h3>{t('userDetail.company.title')}</h3>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>{t('userDetail.company.name')}</span>
                      <span className={styles.value}>{user.company.name}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>{t('userDetail.company.slogan')}</span>
                      <span className={styles.value}>{user.company.catchPhrase}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>{t('userDetail.company.business')}</span>
                      <span className={styles.value}>{user.company.bs}</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className={styles.postsCard}>
                <h2>
                  {t('userDetail.posts.title')} {user.name}
                </h2>
                <p className={styles.postsCount}>
                  {posts.length}{' '}
                  {posts.length === 1
                    ? t('userDetail.posts.count')
                    : t('userDetail.posts.countPlural')}
                </p>

                {posts.length > 0 ? (
                  <div className={styles.postsList}>
                    {posts.map((post) => (
                      <div key={post.id} className={styles.postItem}>
                        <h4 className={styles.postTitle}>{post.title}</h4>
                        <p className={styles.postBody}>{post.body}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={styles.noPosts}>{t('userDetail.posts.empty')}</p>
                )}
              </Card>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
