import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { RootState } from '../../services/store.ts';
import { TData } from '../../utils/types.ts';
import { IngredientDetails } from '../ingredient-details/ingredient-details.tsx';


export const Ingredient: React.FC = () => {
  const location = useLocation();
  const { ingredients } = useSelector((state: RootState) => state.ingredients);
  
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
