import { createAction } from '@reduxjs/toolkit';

export const wsConnect = createAction<string, 'WS_FEED_ORDERS_CONNECT'>(
  'WS_FEED_ORDERS_CONNECT',
);
export const wsDisconnect = createAction('WS_FEED_ORDERS_DISCONNECT');
