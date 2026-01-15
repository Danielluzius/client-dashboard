'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/i18n/I18nProvider';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import styles from './Navigation.module.css';

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useI18n();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(path);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoIcon}>📊</span>
          {t('nav.logo')}
        </Link>

        <button
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Navigation Menu"
          aria-expanded={isMenuOpen}
        >
          <span className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <ul className={`${styles.navList} ${isMenuOpen ? styles.navListOpen : ''}`}>
          <li>
            <Link
              href="/"
              onClick={closeMenu}
              className={isActive('/') && !pathname?.includes('/users') ? styles.active : ''}
            >
              {t('nav.dashboard')}
            </Link>
          </li>
          <li>
            <Link
              href="/users"
              onClick={closeMenu}
              className={isActive('/users') ? styles.active : ''}
            >
              {t('nav.users')}
            </Link>
          </li>
          <li className={styles.langSwitcherItem}>
            <LanguageSwitcher />
          </li>
        </ul>
      </div>
    </nav>
  );
};
