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
  key?: string;
};
export type TIconNavLink = {
  to?: string;
  icon: React.ElementType;
  text: string;
};

export type TIngredientType = {
  name: string;
  title: string;
};

export enum TargetType {
  BurgerConstructor = 'burgerConstructor',
  SortIngredient = 'sortIngredient',
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  };
  message?: string;
}

export interface IAxiosErrorResponse {
  message?: string;
}

export interface IApiError {
  message: string;
}

export interface IUser {
  email: string;
  name: string;
}
export interface IUpdateUser {}

export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export type TOrder = {
  ingredients: string[];
  _id: string;
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TOrdersList = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};
