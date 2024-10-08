import { TData } from './types';

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
export const WS_BASE_URL = 'wss://norma.nomoreparties.space/orders';
export enum Pages {
  home = '/',
  login = '/login',
  register = '/register',
  feeds = '/feed',
  feedId = '/feed/:id',
  forgotPassword = '/forgot-password',
  resetPassword = '/reset-password',
  profile = '/profile',
  orders = '/profile/orders',
  ordersId = '/profile/orders/:id',
  ingredients = '/ingredients/:id',

  page404 = '/404',
}
export enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export enum ruStatus {
  done = 'Выполнено',
  pending = 'В ожидании',
  canceled = 'Отменено',
}
export const testIngredient: TData = {
  _id: '60666c42cc7b410027a1a9b1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 1,
};
