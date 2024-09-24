import React from 'react';
import { Page } from '../../components/page/page.tsx';
import { OrderInfo } from '../../components/order-info/order-info.tsx';
import styles from './order-info.module.css';
import { useParams } from 'react-router-dom';

export const OrderInfoPage: React.FC = () => {
  const { id } = useParams();

  return (
    <Page>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h2 className='text text_type_digits-medium'>#{id}</h2>
          <OrderInfo />
        </div>
      </div>
    </Page>
  );
};
