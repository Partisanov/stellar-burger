import styles from './price.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

interface IPriceProps {
  price: number | string;
}

export const Price: React.FC<IPriceProps> = ({ price }) => {
  return (
    <div className={styles.wrap}>
      <p className={'text text_type_digits-default pr-2'}>{price}</p>
      <CurrencyIcon type='primary' />
    </div>
  );
};
