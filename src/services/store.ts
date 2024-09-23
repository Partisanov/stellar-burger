import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { burgerConstructorSlice } from './burger-constructor/reducer.ts';
import { ingredientsSlice } from './ingredients/reducer.ts';
import { chosenIngredientSlice } from './chosen-ingredients/reducer.ts';
import { orderSlice } from './order/reducer.ts';
import { authSlice } from './auth/reducer.ts';
import { socketMiddleware } from './middleware/socket-middleware.ts';
import {
  wsConnect as wsFeedOrdersConnect,
  wsDisconnect as wsFeedOrdersDisconnect,
} from './ws-feed-orders/actions.ts';
import {
  feedOrdersSlice,
  wsClose as wsFeedOrdersClose,
  wsConnecting as wsFeedOrdersConnecting,
  wsError as wsFeedOrdersError,
  wsMessage as wsFeedOrdersMessage,
  wsOpen as wsFeedOrdersOpen,
} from './ws-feed-orders/slice.ts';
import {
  wsConnect as wsProfileOrdersConnect,
  wsDisconnect as wsProfileOrdersDisconnect,
} from './ws-profile-orders/actions.ts';
import {
  profileOrdersSlice,
  wsClose as wsProfileOrdersClose,
  wsConnecting as wsProfileOrdersConnecting,
  wsError as wsProfileOrdersError,
  wsMessage as wsProfileOrdersMessage,
  wsOpen as wsProfileOrdersOpen,
} from './ws-profile-orders/slice.ts';

const rootReducer = combineSlices(
  burgerConstructorSlice,
  chosenIngredientSlice,
  ingredientsSlice,
  orderSlice,
  authSlice,
  feedOrdersSlice,
  profileOrdersSlice,
);

const wsFeedOrdersActions = {
  connect: wsFeedOrdersConnect,
  disconnect: wsFeedOrdersDisconnect,
  wsConnecting: wsFeedOrdersConnecting,
  onOpen: wsFeedOrdersOpen,
  onClose: wsFeedOrdersClose,
  onError: wsFeedOrdersError,
  onMessage: wsFeedOrdersMessage,
};

const wsProfileOrdersActions = {
  connect: wsProfileOrdersConnect,
  disconnect: wsProfileOrdersDisconnect,
  wsConnecting: wsProfileOrdersConnecting,
  onOpen: wsProfileOrdersOpen,
  onClose: wsProfileOrdersClose,
  onError: wsProfileOrdersError,
  onMessage: wsProfileOrdersMessage,
};

const wsFeedOrdersMiddleware = socketMiddleware(wsFeedOrdersActions);
const wsProfileOrdersMiddleware = socketMiddleware(
  wsProfileOrdersActions,
  true,
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      wsFeedOrdersMiddleware,
      wsProfileOrdersMiddleware,
    );
  },
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
