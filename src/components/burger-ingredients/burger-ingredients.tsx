import React, { RefObject, useCallback, useMemo, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { IngredientsGroup } from './ingredients-group/ingredients-group.tsx';
import styles from './burger-ingredients.module.css';
import { useSelector } from '../../hooks/redux.ts';
import {
  getBunIngredients,
  getMainIngredients,
  getSauceIngredients,
} from '../../services/ingredients/reducer.ts';
import { TabEnum, tabsLabels } from '../../utils/constants.ts';
import {
  getBun,
  getIngredients,
} from '../../services/burger-constructor/reducer.ts';
import { TData } from '../../utils/types.ts';
import { IngredientItem } from './ingredient-item/ingregient-item.tsx';

export const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState<TabEnum>(TabEnum.Buns);
  const ingredients = useSelector(getIngredients);
  const bun = useSelector(getBun);

  const refs: Record<TabEnum, RefObject<HTMLLIElement>> = {
    [TabEnum.Buns]: useRef<HTMLLIElement>(null),
    [TabEnum.Sauces]: useRef<HTMLLIElement>(null),
    [TabEnum.Fillings]: useRef<HTMLLIElement>(null),
  };

  const ingredientsSort: Record<TabEnum, TData[]> = {
    [TabEnum.Buns]: useSelector(getBunIngredients),
    [TabEnum.Sauces]: useSelector(getSauceIngredients),
    [TabEnum.Fillings]: useSelector(getMainIngredients),
  };

  const handleTabClick = useCallback((name: string) => {
    setCurrent(name as TabEnum);
    refs[name as TabEnum].current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleScroll = useCallback((e: React.UIEvent<HTMLElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    Object.values(refs).forEach((ref) => {
      const tabTop = ref.current?.getBoundingClientRect().top!;
      if (scrollTop > tabTop - 30) {
        const tab = ref.current?.getAttribute('data-tab') as TabEnum;
        setCurrent(tab);
      }
    });
  }, []);

  const counts: Record<string, number> = useMemo(() => {
    const ingredientCounts: Record<string, number> = {};
    if (bun) ingredientCounts[bun._id] = 2;
    ingredients.forEach((ingredient) => {
      if (ingredientCounts[ingredient._id]) {
        ingredientCounts[ingredient._id] += 1;
      } else {
        ingredientCounts[ingredient._id] = 1;
      }
    });
    return ingredientCounts;
  }, [ingredients, bun]);

  return (
    <div className={styles.wrapper}>
      <div style={{ display: 'flex' }}>
        {Object.keys(refs).map((item) => (
          <Tab
            key={item}
            value={item}
            active={current === item}
            onClick={handleTabClick}
          >
            {tabsLabels[item as TabEnum]}
          </Tab>
        ))}
      </div>

      <ul
        className={`${styles.ingredients_list} custom-scroll`}
        onScroll={handleScroll}
      >
        {Object.entries(refs).map(([tab, ref]) => (
          <IngredientsGroup
            key={tab}
            tab={tab as TabEnum}
            refSection={ref}
            title={tabsLabels[tab as TabEnum]}
          >
            {ingredientsSort[tab as TabEnum].map((item: TData) => (
              <li key={item._id}>
                <IngredientItem
                  item={item}
                  count={counts[item._id]}
                />
              </li>
            ))}
          </IngredientsGroup>
        ))}
      </ul>
    </div>
  );
};
