import React, { useCallback, useEffect } from 'react';
import styles from './burger-constructor.module.css';
import { OrderDetails } from '../order-details/order-details.tsx';
import { Modal } from '../modal/modal.tsx';
import { useModal } from '../../hooks/useModal.ts';
import { useDrop } from 'react-dnd';
import { TargetType } from '../../utils/types.ts';

import {
  getIds,
  getOrderId,
  getTotalAmount,
  setIds,
  setOrderId,
  setTotalAmount,
} from '../../services/order/reducer.ts';
import { useDispatch, useSelector } from '../../hooks/redux.ts';
import {
  clearConstructorList,
  getBun,
  getIngredients,
  removeIngredient,
  updateIngredients,
} from '../../services/burger-constructor/reducer.ts';
import { calculateTotal, getArrayIds } from '../../utils/order.ts';
import { OrderButton } from './order-button/order-button.tsx';
import {
  ConstructorItem,
  ConstructorItemWithDrag,
} from './constructor-item/constructor-item.tsx';
import { postOrderDetails } from '../../services/order/action.ts';
import { Pages } from '../../utils/constants.ts';
import { RootState } from '../../services/store.ts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Preloader } from '../preloader/preloader.tsx';

interface IBurgerConstructorProps {}

export const BurgerConstructor: React.FC<IBurgerConstructorProps> = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingredients = useSelector(getIngredients);
  const bun = useSelector(getBun);
  let orderId = useSelector(getOrderId);
  const total = useSelector(getTotalAmount);
  const ids = useSelector(getIds);
  const { isLoading } = useSelector((state) => state.order);
  const { isLogIn } = useSelector((state: RootState) => state.auth);
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: TargetType.BurgerConstructor,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isOrderLoading = useSelector((state) => state.order.isLoading);

  useEffect(() => {
    const total = calculateTotal(bun, ingredients);
    dispatch(setTotalAmount(total));
    const ids = getArrayIds(bun, ingredients);
    dispatch(setIds(ids));
  }, [bun, ingredients, dispatch]);

  const moveElement = useCallback((dragIndex: number, hoverIndex: number) => {
    dispatch(updateIngredients({ dragIndex, hoverIndex }));
  }, []);

  const removeElement = useCallback((key: string) => {
    dispatch(removeIngredient({ key }));
  }, []);

  const isActive = canDrop && isOver;

  const handleToggleModal = useCallback(
    async (open: boolean) => {
      if (open) {
        if (!isLogIn) {
          toast.error(
            'Не удалось оформить заказ. Пожалуйста, войдите в систему.',
          );
          navigate(Pages.login);
          return;
        }
        
        const resultAction = await dispatch(postOrderDetails(ids));
        
        if (postOrderDetails.fulfilled.match(resultAction)) {
          orderId = resultAction.payload;
        }
        
        openModal();
      } else {
        dispatch(setOrderId(0));
        dispatch(clearConstructorList());
        closeModal();
      }
    },
    [ids, orderId, dispatch, openModal, closeModal],
  );

  return (
    <div
      className={`${styles.wrapper}  ${isActive ? styles.active : ''} pl-4`}
      ref={drop}
    >
      {/*top bun*/}
      <div className={`${styles.item} mb-4 pr-4`}>
        {bun ? (
          <ConstructorItem
            item={bun}
            isLocked={true}
            type='top'
          />
        ) : (
          <div className={`${styles.topElement} ml-8`}>Булка не выбрана</div>
        )}
      </div>
      {/*ingredients*/}
      <div className={`${styles.list_wrap} custom-scroll`}>
        <ul className={`${styles.list}`}>
          {ingredients.length === 0 && (
            <div className={`${styles.element} mb-4 ml-8`}>
              Выберите ингредиенты из списка
            </div>
          )}
          {ingredients.map((item, index) => (
            <li key={item.key}>
              <div className={`${styles.item} mb-4`}>
                <ConstructorItemWithDrag
                  index={index}
                  item={item}
                  isLocked={false}
                  moveElement={moveElement}
                  removeElement={removeElement}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/*bottom bun*/}
      <div className={`${styles.item} mb-10 pr-4`}>
        {bun ? (
          <ConstructorItem
            item={bun}
            isLocked={true}
            type='bottom'
          />
        ) : (
          <div className={`${styles.bottomElement} ml-8`}>Булка не выбрана</div>
        )}
      </div>
      <OrderButton
        onClick={() => handleToggleModal(true)}
        price={total}
        disabled={!bun || isLoading}
      />
      {isOrderLoading && <Preloader title='Создание заказа...' />}
      {!!orderId && !isOrderLoading && isModalOpen && (
        <Modal onClose={() => handleToggleModal(false)}>
          <OrderDetails orderId={orderId} />
        </Modal>
      )}
    </div>
  );
};
