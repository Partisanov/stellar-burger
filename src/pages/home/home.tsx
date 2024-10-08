import styles from './home.module.css';
import { useSelector } from '../../hooks/redux.ts';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients.tsx';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor.tsx';
import { Page } from '../../components/page/page.tsx';

export const HomePage = () => {
  const { ingredients, isLoading, error } = useSelector(
    (state) => state.ingredients,
  );
  const hasIngredients = ingredients.length > 0;

  return (
    <Page>
      {isLoading && (
        <div className="message-container">
          <p>Загрузка...</p>
        </div>
      )}
      {!isLoading && error && (
        <div className="message-container">
          <p>Произошла ошибка загрузки</p>
        </div>
      )}
      {!isLoading && !error && !hasIngredients && (
        <div className="message-container">
          <p>Нет ингредиентов</p>
        </div>
      )}
      {hasIngredients && (
        <div className="container pt-10 pr-5 pl-5">
          <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
          <div className={styles.content}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </div>
      )}
    </Page>
  );
};
