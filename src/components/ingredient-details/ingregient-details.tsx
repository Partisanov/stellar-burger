import { Modal } from '../modal/modal.tsx';
import { TData } from '../../utils/types.ts';
import styles from './ingredient-details.module.css';
interface IIngredientDetailsProps {
  item: TData;
  onClose: () => void;
}
export const IngredientDetails = ({
  item,
  onClose,
}: IIngredientDetailsProps) => {
  return (
    <Modal
      caption='Детали ингредиента'
      onClose={onClose}
    >
      <div className={styles.details}>
        <div className='pl-5 pr-5 mb-4'>
          <img
            src={item.image_large}
            alt={item.name}
          />
        </div>
        <p className='text text_type_main-medium mb-8'>{item.name} </p>
        <ul className={`${styles.info_list} mb-15`}>
          <li className={`${styles.info_item} mr-5`}>
            <div className='text text_type_main-default text_color_inactive mb-2'>
              Калории,ккал
            </div>
            <div className='text-center text text_type_digits-default text_color_inactive'>
              {item.calories}
            </div>
          </li>
          <li className={`${styles.info_item} mr-5`}>
            <div className='text text_type_main-default text_color_inactive mb-2'>
              Белки, г
            </div>
            <div className='text-center text text_type_digits-default text_color_inactive'>
              {item.proteins}
            </div>
          </li>
          <li className={`${styles.info_item} mr-5`}>
            <div className='text text_type_main-default text_color_inactive mb-2'>
              Жиры, г
            </div>
            <div className='text-center text text_type_digits-default text_color_inactive'>
              {item.fat}
            </div>
          </li>
          <li className={`${styles.info_item} mr-5`}>
            <div className='text text_type_main-default text_color_inactive mb-2'>
              Углеводы, г
            </div>
            <div className='text-center text text_type_digits-default text_color_inactive'>
              {item.carbohydrates}
            </div>
          </li>
        </ul>
      </div>
    </Modal>
  );
};
