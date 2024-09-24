import React from 'react';
import styles from './stats-board.module.css';
import { TOrder } from '../../utils/types.ts';
interface IStatsBoardProps {
  title: string;
  orders: TOrder[];
  isDone?: boolean;
}

export const StatsBoard: React.FC<IStatsBoardProps> = ({
  title,
  orders,
  isDone = false,
}) => {
  return (
    <div className={styles.board}>
      <h2 className={'text text_type_main-medium mb-6'}>{title}:</h2>
      <ul className={styles.list}>
        {orders &&
          orders.map((order) => {
            return (
              <li key={order.number}>
                <p
                  className={`text text_type_digits-medium ${isDone ? styles.done : ''}`}
                >
                  {order.number}
                </p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
