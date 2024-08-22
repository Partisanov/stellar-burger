import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { fetchIngredients } from '../../services/ingredients/action.ts';
import { RootState } from '../../services/store.ts';
import { TData } from '../../utils/types.ts';
import { IngredientDetails } from '../ingredient-details/ingredient-details.tsx';
import { useDispatch } from '../../hooks/redux.ts';

export const Ingredient: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { ingredients } = useSelector((state: RootState) => state.ingredients);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients]);

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
