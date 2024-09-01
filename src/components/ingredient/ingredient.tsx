import React from 'react';
import { useSelector } from '../../hooks/redux.ts';
import { useLocation, useParams } from 'react-router-dom';
import { TData } from '../../utils/types.ts';
import { IngredientDetails } from '../ingredient-details/ingredient-details.tsx';

export const Ingredient: React.FC = () => {
  const location = useLocation();
  const { ingredients } = useSelector((state) => state.ingredients);
  
  let { id } = useParams<{ id: string }>();
  if (!id && location.state?.id) {
    id = location.state.id;
  }

  const data = ingredients.find((item: TData) => item._id === id) || null;

  if (!data) {
    return <p className='text text_type_main-large'>Ingredient not found</p>;
  }

  return <IngredientDetails item={data} />;
};
