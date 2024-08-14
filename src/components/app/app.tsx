import { AppHeader } from '../app-header/app-header.tsx';

// import { BurgerIngredients } from '../burger-ingredients/burger-ingredients.tsx';
import styles from './app.module.css';
import { fetchIngredients } from '../../services/ingredients/action.ts';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../hooks/redux.ts';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients.tsx';
import { BurgerConstructor } from '../burger-constructor/burger-constructor.tsx';

function App() {
  const dispatch = useDispatch();
  const { ingredients, isLoading, error } = useSelector(
    (state) => state.ingredients,
  );
  const hasIngredients = ingredients.length > 0;
  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);
  return (
    <>
      <AppHeader />
      <main className={`${styles.main} mb-10`}>
        {isLoading && (
          <div className={styles['message-container']}>
            <p>Загрузка...</p>
          </div>
        )}{' '}
        {!isLoading && error && (
          <div className={styles['message-container']}>
            <p>Произошла ошибка загрузки</p>
          </div>
        )}
        {!isLoading && !error && !hasIngredients && (
          <div className={styles['message-container']}>
            <p>Нет ингредиентов</p>
          </div>
        )}
        {hasIngredients && (
          <section>
            <div className={`${styles.container} pt-10 pr-5 pl-5`}>
              <h1 className='text text_type_main-large mb-5'>
                Соберите бургер
              </h1>
              <div className={styles.content}>
                <BurgerIngredients />
                <BurgerConstructor />
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
