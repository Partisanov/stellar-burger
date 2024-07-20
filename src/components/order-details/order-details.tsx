// компонент OrderDetails содержит тестовые данные и использует UI-компоненты из библиотеки: иконки, типографику.
import styles from './order-details.module.css';
import { Modal } from '../modal/modal.tsx';

interface IOrderDetailsProps {
  onClose: () => (e) => void;
}
export const OrderDetails = ({ onClose }: IOrderDetailsProps) => {
  return (
    <Modal onClose={onClose}>
      <div className={`${styles.order} mt-10`}>
        <div className='text text_type_digits-large mb-8'>034536</div>
        <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
        <img
          className={`${styles.image} mb-15`}
          src='./images/done.png'
          alt='decorate images'
        />
        <p className='text text_type_main-small mb-2'>
          Ваш заказ начали готовить
        </p>
        <p className='text text_type_main-default text_color_inactive mb-30'>
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </Modal>
  );
};
