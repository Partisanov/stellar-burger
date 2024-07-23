import { TIngredientType } from './types.ts';

export const IngredientTypes: TIngredientType[] = [
  {
    name: 'bun',
    title: 'Булки',
  },
  {
    name: 'sauce',
    title: 'Соусы',
  },
  {
    name: 'main',
    title: 'Начинки',
  },
];

export const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';
