import React from 'react';
import { TData } from '../../../utils/types.ts';
import styles from './ingredients-group.module.css';
import { IngredientItem } from '../ingredient-item/ingregient-item.tsx';

interface IIngredientsGroupProps {
  ingredients: TData[];
  title: string;
}
export const IngredientsGroup = (props: IIngredientsGroupProps) => {
  const { ingredients, title } = props;
  if (!ingredients.length) return <p>Ингредиенты отсутствуют</p>;
  return (
    <>
      <h2 className={'text text_type_main-medium'}>{title}</h2>
      <ul className={`${styles['ingredient-list']}  pt-6 pr-4 pl-4`}>
        {ingredients.map((item: TData) => (
          <li key={item._id}>
            <IngredientItem {...item} />
          </li>
        ))}
      </ul>
    </>
  );
};
