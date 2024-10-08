import React, { useEffect } from 'react';
import { TOrder } from '../../utils/types.ts';
import { OrderHistoryItem } from '../order-history-item/order-history-item.tsx';
import styles from './order-history-list.module.css';
import { useMatch } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks/redux.ts';
import {
  wsConnect,
  wsDisconnect,
} from '../../services/ws-profile-orders/actions.ts';
import { WS_BASE_URL } from '../../utils/constants.ts';
import { getProfileOrders } from '../../services/ws-profile-orders/slice.ts';
import { getFeedOrders } from '../../services/ws-feed-orders/slice.ts';

const HistoryList: React.FC = () => {
  const isProfileOrders = useMatch('/profile/orders');
  const dispatch = useDispatch();
  const token = localStorage.getItem('accessToken');
  const orders = useSelector(
    isProfileOrders ? getProfileOrders : getFeedOrders,
  );

  useEffect(() => {
    isProfileOrders &&
      dispatch(
        wsConnect(`${WS_BASE_URL}?token=${token?.replace('Bearer ', '')}`),
      );
    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch, isProfileOrders, token]);

  return (
    <div className={styles.wrap}>
      <ul className="custom-scroll pr-2">
        {orders.map((order: TOrder) => {
          return (
            <li key={order._id}>
              <OrderHistoryItem
                order={order}
                showStatus={!!isProfileOrders}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export const OrdersHistoryList = React.memo(HistoryList);
