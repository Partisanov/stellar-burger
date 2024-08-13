import React, { useCallback } from 'react';
import { TData, TargetType } from '../../../utils/types.ts';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';
import { IngredientDetails } from '../../ingredient-details/ingregient-details.tsx';
import { useModal } from '../../../hooks/useModal.ts';
import { Modal } from '../../modal/modal.tsx';
import { useDrag } from 'react-dnd';
import {
  addIngredient,
  setBun,
} from '../../../services/burger-constructor/reducer';
import { useDispatch } from '../../../hooks/redux.ts';
import { chooseIngredient } from '../../../services/chosen-ingredients/reducer.ts';

interface IIngredientItem {
  item: TData;
  count?: number;
}

export const IngredientItem: React.FC<IIngredientItem> = ({ item, count }) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const dispatch = useDispatch();

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: TargetType.BurgerConstructor,
    item,
    end: (draggedItem, monitor) => {
      const dropResult = monitor.getDropResult();
      if (draggedItem && dropResult) {
        if (draggedItem.type === 'bun') {
          dispatch(setBun(draggedItem));
        } else {
          dispatch(addIngredient(draggedItem));
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.5 : 1;

  const handleToggleModal = useCallback((open: boolean) => {
    if (open) {
      openModal();
      dispatch(chooseIngredient(item));
    } else {
      closeModal();
      dispatch(chooseIngredient(null));
    }
  }, []);

  return (
    <>
      <div
        className={styles.item}
        onClick={() => handleToggleModal(true)}
        ref={dragRef}
        style={{ opacity }}
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
        {!!count && (
          <div className={styles.counter}>
            <Counter
              count={count}
              size='small'
            />
          </div>
        )}
        {isModalOpen && (
          <Modal
            caption='Детали ингредиента'
            onClose={() => handleToggleModal(false)}
          >
            <IngredientDetails item={item} />
          </Modal>
        )}
      </div>
    </>
  );
};
