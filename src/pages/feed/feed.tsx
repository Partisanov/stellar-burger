import React, { useEffect } from 'react';
import { Page } from '../../components/page/page.tsx';
import { OrdersHistoryList } from '../../components/orders-history-list/orders-history-list.tsx';
import { useDispatch } from '../../hooks/redux.ts';
import {
  wsConnect,
  wsDisconnect,
} from '../../services/ws-feed-orders/actions.ts';
import { WS_BASE_URL } from '../../utils/constants.ts';
import { Stats } from '../../components/stats/stats.tsx';
import styles from './feed.module.css';

interface IOrderPageProps {}

export const FeedPage: React.FC<IOrderPageProps> = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsConnect(`${WS_BASE_URL}/all`));
    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  return (
    <Page>
      <div className='container pt-10 pr-5 pl-5'>
        <h1 className='text text_type_main-large '>Соберите бургер</h1>
        <div className={styles.content}>
          <OrdersHistoryList />
          <Stats />
        </div>
      </div>
    </Page>
  );
};
