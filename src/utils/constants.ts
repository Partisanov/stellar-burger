export enum TabEnum {
  Buns = 'buns',
  Sauces = 'sauces',
  Fillings = 'fillings',
}

export const tabsLabels: Record<TabEnum, string> = {
  [TabEnum.Buns]: 'Булки',
  [TabEnum.Sauces]: 'Соусы',
  [TabEnum.Fillings]: 'Начинки',
};

export const BASE_URL = 'https://norma.nomoreparties.space/api';

export enum Pages {
  home = '/',
  login = '/login',
  register = '/register',
  order = '/order',
  forgotPassword = '/forgot-password',
  resetPassword = '/reset-password',
  profile = '/profile',
  ingredients = '/ingredients/:id',
  page404 = '/404',
}
