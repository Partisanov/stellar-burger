import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo, useRef } from 'react';
import { IngredientTypes } from '../../utils/constants.ts';
import { TData } from '../../utils/types.ts';
import { IngredientsGroup } from './ingredients-group/ingredients-group.tsx';
import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({ data }: TData[]) => {
  const [current, setCurrent] = React.useState(IngredientTypes[0].name);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const groupedIngredients = useMemo(() => {
    return data.reduce((acc, ingredient) => {
      if (!acc[ingredient.type]) {
        acc[ingredient.type] = [];
      }
      acc[ingredient.type].push(ingredient);
      return acc;
    }, {});
  }, [data]);

  const { bun, sauce, main } = groupedIngredients;

  const handleTabClick = (name: string) => {
    setCurrent(name);
    switch (name) {
    case 'bun':
      bunRef.current.scrollIntoView({ behavior: 'smooth' });
      break;
    case 'sauce':
      sauceRef.current.scrollIntoView({ behavior: 'smooth' });
      break;
    case 'main':
      mainRef.current.scrollIntoView({ behavior: 'smooth' });
      break;
    default:
      break;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div style={{ display: 'flex' }}>
        {IngredientTypes &&
          IngredientTypes.map((item) => (
            <Tab
              key={item.name}
              value={item.name}
              active={current === item.name}
              onClick={() => handleTabClick(item.name)}
            >
              {item.title}
            </Tab>
          ))}
      </div>

      <ul className={`${styles.ingredients_list} custom-scroll`}>
        <li
          className='pt-10 pb-10'
          ref={bunRef}
        >
          <IngredientsGroup
            ingredients={bun}
            title='Булки'
          />
        </li>
        <li
          className='pt-10 pb-10'
          ref={sauceRef}
        >
          <IngredientsGroup
            ingredients={sauce}
            title='Соусы'
          />
        </li>
        <li
          className='pt-10 pb-10'
          ref={mainRef}
        >
          <IngredientsGroup
            ingredients={main}
            title='Начинка'
          />
        </li>
      </ul>
    </div>
  );
};
