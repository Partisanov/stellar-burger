import React from 'react';
import styles from './stats.module.css';
import { StatsBoard } from '../stats-board/stats-board.tsx';
import { useSelector } from '../../hooks/redux.ts';
import {
  getFeedOrders,
  getTotalFeedOrders,
  getTotalTodayFeedOrders,
} from '../../services/ws-feed-orders/slice.ts';

interface IStatsProps {}

export const Stats: React.FC<IStatsProps> = () => {
  const ordersIsDone = useSelector(getFeedOrders)
    ?.filter((order) => order.status === 'done')
    .slice(0, 10);
  const ordersInWork = useSelector(getFeedOrders)
    ?.filter((order) => order.status === 'pending')
    .slice(0, 10);
  const totalOrders = useSelector(getTotalFeedOrders);
  const totalTodayOrders = useSelector(getTotalTodayFeedOrders);
  return (
    <section className={styles.stats}>
      <div className={`${styles['boards-wrap']} mb-15`}>
        <StatsBoard
          title='Готовы'
          orders={ordersIsDone}
          isDone={true}
        />
        <StatsBoard
          title='В работе'
          orders={ordersInWork}
        />
      </div>
      <div className='mb-15'>
        <p className='text text_type_main-medium'>Выполнено за все время:</p>
        <p className='text text_type_digits-large'>{totalOrders}</p>
      </div>
      <div>
        <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
        <p className='text text_type_digits-large'>{totalTodayOrders}</p>
      </div>
    </section>
  );
};
