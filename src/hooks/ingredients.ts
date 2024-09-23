import { useSelector } from './redux.ts';
import { getAllIngredients } from '../services/ingredients/reducer.ts';
import { TData } from '../utils/types.ts';

export const useImageById = (id: string) => {
  const ingredients = useSelector(getAllIngredients);
  const ingredient = ingredients.find(
    (ingredient: TData) => ingredient._id === id,
  );
  if (ingredient) {
    return {
      image: ingredient.image,
      name: ingredient.name,
    };
  }
  return null;
};

export const useIngredientsPrice = (ingredients: string[]) => {
  const allIngredients = useSelector(getAllIngredients);
  const orderIngredients = ingredients
    .map((id: string) =>
      allIngredients.find((ingredient: TData) => ingredient._id === id),
    )
    .filter(Boolean);
  return (
    orderIngredients?.reduce((acc, curr) => {
      return acc + (curr?.price ?? 0);
    }, 0) ?? 0
  );
};
