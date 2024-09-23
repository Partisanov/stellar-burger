import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks/redux.ts';
import { getOrderByNumber } from '../../services/order/action.ts';
import { toast } from 'react-toastify';
import { Price } from '../price/price.tsx';
import { ruStatus } from '../../utils/constants.ts';
import { getAllIngredients } from '../../services/ingredients/reducer.ts';
import { getOrderIngredients } from '../../utils/order.ts';
import { IngredientImage } from '../ingredient-image/ingredient-image.tsx';
import styles from './order-info.module.css';
import { TData } from '../../utils/types.ts';

interface IOrderInfoProps {}

export const OrderInfo: React.FC<IOrderInfoProps> = () => {
  const allIngredients = useSelector(getAllIngredients);
  const { id } = useParams();
  const dispatch = useDispatch();

  const number = Number(id);

  const order = useSelector((state) => {
    let foundOrder = state.feedOrders.orders.find((o) => o.number === number);
    if (foundOrder) {
      return foundOrder;
    }
    foundOrder = state.profileOrders.orders.find((o) => o.number === number);
    if (foundOrder) {
      return foundOrder;
    }

    return state.order.currentOrder;
  });

  useEffect(() => {
    if (!order) {
      dispatch(getOrderByNumber(number));
    }
  }, []);

  if (isNaN(number)) {
    toast.error(`Ошибка в номере заказа! ${id}`);
    return <p>Неверный номер заказа</p>;
  }

  if (!order)
    return (
      <p className='text text_type_main-medium pt-15 pr-10 pb-10 pl-10'>
        Загрузка...
      </p>
    );

  const { name, status, ingredients, createdAt } = order;
  const orderIngredients = getOrderIngredients(allIngredients, ingredients);

  const getTotalPrice = (
    orderItems: { ingredient: TData; count: number }[],
  ): number => {
    return orderItems.reduce((sum, item) => {
      return sum + item.ingredient.price * item.count;
    }, 0);
  };

  const totalPrice = getTotalPrice(orderIngredients);

  return (
    <div className='pt-15 pr-10 pb-10 pl-10'>
      <h2 className='mb-3 text text_type_main-medium'>{name}</h2>
      <p
        className={`text text_type_main-default ${
          status === 'done' ? 'status-done' : ''
        }`}
      >
        {ruStatus[status as keyof typeof ruStatus] || order.status}
      </p>
      <div className='mt-15 mb-10'>
        <p className='mb-6 text text_type_main-medium'>Состав:</p>
        <ul className={`${styles.list} custom-scroll pr-6`}>
          {orderIngredients.map(({ ingredient, count }) => {
            const { name, image, price } = ingredient;
            return (
              <li
                key={ingredient._id}
                className={`space-between mb-4 ${styles.item}`}
              >
                <IngredientImage
                  src={image}
                  alt={name}
                />
                <p className={`text text_type_main-small ${styles.name}`}>
                  {name}
                </p>
                <Price price={`${count} x ${price}`} />
              </li>
            );
          })}
        </ul>
      </div>
      <div className='space-between'>
        <p className='text text_type_main-small text_color_inactive'>
          {new Date(createdAt).toLocaleString()}
        </p>
        <Price price={totalPrice} />
      </div>
    </div>
  );
};
