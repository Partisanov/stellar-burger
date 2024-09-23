import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types.ts';
import { WebsocketStatus } from '../../utils/constants.ts';

export interface IProfileOrdersState {
  status: WebsocketStatus;
  connectionError: string | null;
  orders: TOrder[];
}

const initialState: IProfileOrdersState = {
  status: WebsocketStatus.OFFLINE,
  connectionError: null,
  orders: [],
};

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
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
      state.orders = action.payload.orders.reverse();
    },
  },
  selectors: {
    getProfileOrders: (state) => state.orders,
  },
});

export const { wsConnecting, wsOpen, wsClose, wsError, wsMessage } =
  profileOrdersSlice.actions;
export const { getProfileOrders } = profileOrdersSlice.selectors;
