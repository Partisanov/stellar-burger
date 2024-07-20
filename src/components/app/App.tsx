import './App.module.css';
import { AppHeader } from '../app-header/app-header.tsx';
import { BurgerConstructor } from '../burger-constructor/burger-constructor.tsx';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients.tsx';
import styles from './App.module.css';
import useFetch from '../../hooks/useFetch.ts';
import { TData } from '../../utils/types.ts';
import { BASE_URL } from '../../utils/constants.ts';


function App() {
  const { data, loading, error } = useFetch<TData[]>(BASE_URL);

  return (
    <>
      <AppHeader />
      <main className={`${styles.main} mb-10`}>
        {loading ? (
          <div className={styles['message-container']}>
            <p>Загрузка...</p>
          </div>
        ) : error ? (
          <div className={styles['message-container']}>
            <p>Произошла ошибка загрузки</p>
          </div>
        ) : (
          <section>
            <div className={`${styles.container} pt-10 pr-5 pl-5`}>
              <h1 className='text text_type_main-large mb-5'>
                Соберите бургер
              </h1>
              <div className={styles.content}>
                <BurgerIngredients data={data} />
                <BurgerConstructor data={data} />
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
