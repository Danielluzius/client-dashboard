import React from 'react';
import styles from './LoadingSkeleton.module.css';

interface LoadingSkeletonProps {
  variant?: 'text' | 'card' | 'table' | 'stats';
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'card',
  count = 1,
}) => {
  if (variant === 'text') {
    return (
      <div className={styles.textContainer}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={styles.textLine} />
        ))}
      </div>
    );
  }

  if (variant === 'stats') {
    return (
      <div className={styles.statsGrid}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statTitle} />
            <div className={styles.statValue} />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={styles.tableHeaderCell} />
          ))}
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={styles.tableRow}>
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className={styles.tableCell} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.cardContainer}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.cardHeader} />
          <div className={styles.cardContent}>
            <div className={styles.line} />
            <div className={styles.line} />
            <div className={styles.lineShort} />
          </div>
        </div>
      ))}
    </div>
  );
};
