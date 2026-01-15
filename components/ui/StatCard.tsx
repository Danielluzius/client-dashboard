import React from 'react';
import { Card } from './Card';
import styles from './StatCard.module.css';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <Card className={styles.statCard}>
      <div className={styles.content}>
        <div className={styles.textContent}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.value}>{value}</p>
        </div>
        {icon && <div className={styles.icon}>{icon}</div>}
      </div>
    </Card>
  );
};
