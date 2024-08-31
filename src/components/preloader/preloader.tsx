import React from 'react';
import styles from './preloader.module.css';

interface IPreloaderProps {
  title: string;
}

export const Preloader: React.FC<IPreloaderProps> = ({ title }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles['loader-container']}>
        <h2 className='text text_type_main-large mb-10'>{title}</h2>
        <div className={styles.spinner}></div>
      </div>
    </div>
  );
};
