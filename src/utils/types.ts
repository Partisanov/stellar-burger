import React from 'react';

export type TBurgerIngredientType = 'bun' | 'sauce' | 'main';

export type TData = {
  _id: string;
  name: string;
  type: TBurgerIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};
export type TIconNavLink = {
  href?: string;
  isActive?: boolean;
  icon: React.ElementType;
  text: string;
};

export type TIngredientType = {
  name: string;
  title: string;
};
