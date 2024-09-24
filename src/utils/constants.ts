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
