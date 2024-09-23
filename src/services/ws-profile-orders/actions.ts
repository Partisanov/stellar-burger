import { createAction } from '@reduxjs/toolkit';

export const wsConnect = createAction<string, 'WS_PROFILE_ORDERS_CONNECT'>(
  'WS_PROFILE_ORDERS_CONNECT',
);
export const wsDisconnect = createAction('WS_PROFILE_ORDERS_DISCONNECT');
