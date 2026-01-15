import React from 'react';
import { Navigation } from './Navigation';
import { APP_CONFIG } from '@/lib/constants';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navigation />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Client Dashboard</h3>
            <p className={styles.footerDescription}>
              Ein professionelles Portfolio-Projekt zur Demonstration moderner Frontend-Entwicklung
              mit React, Next.js und TypeScript.
            </p>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Tech-Stack</h4>
            <ul className={styles.techList}>
              <li>Next.js 14</li>
              <li>React 18</li>
              <li>TypeScript</li>
              <li>CSS Modules</li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Links</h4>
            <ul className={styles.linkList}>
              <li>
                <a
                  href={APP_CONFIG.GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerLink}
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href={APP_CONFIG.API_SOURCE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerLink}
                >
                  API Quelle
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© 2026 Daniel Luzius - Demo-Projekt</p>
          <p className={styles.footerNote}>
            Dieses Projekt ist ein Demo-Projekt und nicht für den produktiven Einsatz gedacht.
          </p>
        </div>
      </footer>
    </div>
  );
};
