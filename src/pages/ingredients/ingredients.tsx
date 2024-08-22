import React from 'react';
import { Page } from '../../components/page/page.tsx';
import { Ingredient } from '../../components/ingredient/ingredient.tsx';
import styles from './ingredients.module.css';

export const IngredientsPage: React.FC = () => {
  return (
    <Page>
      <div className={styles.wrapper}>
        <Ingredient />
      </div>
    </Page>
  );
};
