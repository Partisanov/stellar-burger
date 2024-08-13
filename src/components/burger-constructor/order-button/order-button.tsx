import React from 'react';
import styles from './order-button.module.css';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

interface IOrderButtonProps {
  price: number;
  onClick: () => void;
  disabled: boolean;
}

export const OrderButton: React.FC<IOrderButtonProps> = ({
  price,
  onClick,
  disabled,
}) => {
  return (
    <div className={styles.order}>
      <p className='text text_type_digits-medium mr-2'>{price}</p>
      <CurrencyIcon type='primary' />
      <Button
        htmlType='button'
        type='primary'
        size='large'
        extraClass='ml-10 mr-8'
        onClick={onClick}
        disabled={disabled}
      >
        Оформить заказ
      </Button>
    </div>
  );
};
