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
