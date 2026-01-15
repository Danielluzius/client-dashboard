'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/i18n/I18nProvider';
import { User } from '@/types';
import styles from './UserTable.module.css';

interface UserTableProps {
  users: User[];
}

export const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const { t } = useI18n();
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{t('users.table.name')}</th>
            <th>{t('users.table.email')}</th>
            <th>{t('users.table.company')}</th>
            <th>{t('users.table.city')}</th>
            <th>{t('users.table.action')}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className={styles.userName}>{user.name}</div>
                <div className={styles.userUsername}>@{user.username}</div>
              </td>
              <td>{user.email}</td>
              <td>{user.company.name}</td>
              <td>{user.address.city}</td>
              <td>
                <Link href={`/users/${user.id}`} className={styles.detailsLink}>
                  {t('users.table.details')}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
