import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { postOrderDetails } from './action.ts';
import { toast } from 'react-toastify';

export interface OrderState {
  ids: string[];
  totalAmount: number;
  currentOrderId: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  ids: [],
  totalAmount: 0,
  currentOrderId: 0,
  isLoading: false,
  error: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postOrderDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postOrderDetails.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.currentOrderId = payload;
        toast.success('Заказ успешно размещен!');
      })
      .addCase(postOrderDetails.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message || 'Не удалось отправить заказ';
        toast.error(`Ошибка при размещении заказа!`);
      });
  },
  selectors: {
    getIds: (state) => state.ids,
    getOrderId: (state) => state.currentOrderId,
    getTotalAmount: (state) => state.totalAmount,
  },
  reducers: {
    setIds: (state, { payload }: PayloadAction<string[]>) => {
      state.ids = payload;
    },
    setTotalAmount: (state, { payload }: PayloadAction<number>) => {
      state.totalAmount = payload;
    },
    setOrderId: (state, { payload }: PayloadAction<number>) => {
      state.currentOrderId = payload;
    },
  },
});

export const { setIds, setTotalAmount, setOrderId } = orderSlice.actions;
export const { getIds, getTotalAmount, getOrderId } = orderSlice.selectors;
