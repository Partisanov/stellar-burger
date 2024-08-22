import React from 'react';
import { Page } from '../../components/page/page.tsx';
import { OrdersHistoryList } from '../../components/orders-history-list/orders-history-list.tsx';

interface IOrderPageProps {}

export const OrderPage: React.FC<IOrderPageProps> = () => {
  return (
    <Page>
      <div className='wrapper'>
        <OrdersHistoryList />
      </div>
    </Page>
  );
};
