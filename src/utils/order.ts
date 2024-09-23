import { TData } from './types.ts';

export const calculateTotal = (
  bun: TData | null,
  ingredients: TData[],
): number => {
  let total = 0;
  if (bun) total += bun.price * 2;
  total += ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
  return total;
};

export const getArrayIds = (
  bun: TData | null,
  ingredients: TData[],
): string[] => {
  return [
    ...(bun ? [bun._id] : []),
    ...ingredients.map((ingredient) => ingredient._id),
    ...(bun ? [bun._id] : []),
  ];
};

export const getOrderIngredients = (
  allIngredients: TData[],
  orderIngredients: string[],
): { ingredient: TData; count: number }[] => {
  const ingredientCountMap = new Map<string, number>();

  orderIngredients.forEach((id) => {
    const currentCount = ingredientCountMap.get(id) || 0;
    ingredientCountMap.set(id, currentCount + 1);
  });

  const result = allIngredients
    .map((ingredient) => {
      const count = ingredientCountMap.get(ingredient._id) || 0;
      return count > 0 ? { ingredient, count } : null;
    })
    .filter((item) => item !== null) as { ingredient: TData; count: number }[];
  result.sort((a, b) =>
    a.ingredient.type === 'bun' ? -1 : b.ingredient.type === 'bun' ? 1 : 0,
  );

  return result;
};
