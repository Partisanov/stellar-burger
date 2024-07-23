import React from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TData } from '../../utils/types.ts';
import styles from './burger-constructor.module.css';
import { OrderDetails } from '../order-details/order-details.tsx';
import { Modal } from '../modal/modal.tsx';
import { useModal } from '../../hooks/useModal.ts';

export const BurgerConstructor = ({ data }: TData[]) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  // const bun = data.filter(item => item.type === 'bun') думаю в будущем понадобится
  const ingredients = data.filter((item) => item.type !== 'bun');

  return (
    <div className={`${styles.wrapper} pl-4`}>
      <div className={`${styles.item} mb-4 pl-8 pr-4`}>
        <ConstructorElement
          type='top'
          isLocked={true}
          text='Краторная булка N-200i (верх)'
          price='200'
          thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
        />
      </div>
      <div className={`${styles.list_wrap} custom-scroll`}>
        <ul className={`${styles.list}`}>
          {ingredients.map((item) => (
            <li key={item._id}>
              <div className={`${styles.item} mb-4`}>
                <DragIcon type='primary' />
                <ConstructorElement
                  type={item.type}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  extraClass='ml-2'
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={`${styles.item} mb-10 pl-8 pr-4`}>
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text='Краторная булка N-200i (низ)'
          price='200'
          thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
        />
      </div>
      <div className={styles.order}>
        <p className='text text_type_digits-medium mr-2'>610</p>
        <CurrencyIcon type='primary' />
        <Button
          htmlType='button'
          type='primary'
          size='large'
          extraClass='ml-10 mr-8'
          onClick={openModal}
        >
          Оформить заказ
        </Button>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};
