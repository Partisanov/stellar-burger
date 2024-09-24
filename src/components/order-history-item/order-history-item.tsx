import { TOrder } from '../../utils/types.ts';
import styles from './order-history-item.module.css';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IngredientsImages } from '../ingredients-images/ingredients-images.tsx';
import { Price } from '../price/price.tsx';
import { ruStatus } from '../../utils/constants.ts';
import { useIngredientsPrice } from '../../hooks/ingredients.ts';
interface IOrderHistoryItemProps {
  order: TOrder;
  showStatus?: boolean;
}

export const OrderHistoryItem: React.FC<IOrderHistoryItemProps> = ({
  order,
  showStatus = false,
}) => {
  const location = useLocation();
  const { name, ingredients, number, createdAt, status } = order;
  const price = useIngredientsPrice(ingredients);
  return (
    <Link
      to={{ pathname: `${location.pathname}/${order.number}` }}
      state={{ background: location, id: number }}
      className={`${styles.order} p-6`}
    >
      <div className={styles.wrap}>
        <div className={'space-between mb-6'}>
          <p className='text text_type_digits-default'>#{number}</p>
          <p className='text text_type_main-small text_color_inactive'>
            {order.createdAt && new Date(createdAt).toLocaleString()}
          </p>
        </div>
        <div>
          <p className='text text_type_main-medium'>{name}</p>
        </div>
        {showStatus && (
          <div className='mt-2'>
            <p
              className={`text text_type_main-default ${status == 'done' ? 'status-done' : ''}`}
            >
              {ruStatus[status as keyof typeof ruStatus] || order.status}
            </p>
          </div>
        )}

        <div className={'space-between mt-6'}>
          <IngredientsImages ingredients={ingredients} />
          <Price price={price} />
        </div>
      </div>
    </Link>
  );
};
