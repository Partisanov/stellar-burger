import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types.ts';
import { WebsocketStatus } from '../../utils/constants.ts';

export interface IFeedOrdersState {
  status: WebsocketStatus;
  orders: TOrder[];
  total: number;
  totalToday: number;
  connectionError: string | null;
}

const initialState: IFeedOrdersState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  total: 0,
  totalToday: 0,
  connectionError: null,
};

export const feedOrdersSlice = createSlice({
  name: 'feedOrders',
  initialState,
  reducers: {
    wsConnecting: (state) => {
      state.status = WebsocketStatus.CONNECTING;
    },
    wsOpen: (state) => {
      state.status = WebsocketStatus.ONLINE;
    },
    wsClose: (state) => {
      state.status = WebsocketStatus.OFFLINE;
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    },
    wsMessage: (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
  },
  selectors: {
    getFeedOrders: (state) => state.orders,
    getTotalFeedOrders: (state) => state.total,
    getTotalTodayFeedOrders: (state) => state.totalToday,
  },
});

export const { wsConnecting, wsOpen, wsClose, wsError, wsMessage } =
  feedOrdersSlice.actions;
export const { getFeedOrders, getTotalFeedOrders, getTotalTodayFeedOrders } =
  feedOrdersSlice.selectors;
