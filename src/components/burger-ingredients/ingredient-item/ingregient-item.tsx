import { TData } from '../../../utils/types.ts';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';
import { useState } from 'react';
import { IngredientDetails } from '../../ingredient-details/ingregient-details.tsx';
export const IngredientItem = (props: TData) => {
  const item = props;
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => {
    setShowModal(true);
  };
  const handleHide = (e: MouseEvent) => {
    e.stopPropagation();
    setShowModal(false);
  };

  return (
    <div
      className={styles.item}
      onClick={handleShow}
    >
      <div className='pl-4 pr-4 mb-1'></div>
      <img
        src={item.image}
        alt={item.name}
      />
      <div className={`${styles.price} mb-1`}>
        <p className={'text text_type_digits-default mr-2'}>{item.price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <p className='text text_type_main-small'>{item.name}</p>
      {!!props.__v && (
        <Counter
          className={styles.counter}
          count={item.__v}
          size='small'
        />
      )}
      {showModal && (
        <IngredientDetails
          item={item}
          onClose={handleHide}
        />
      )}
    </div>
  );
};
