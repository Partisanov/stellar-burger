import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/constants';
import { getAccessToken } from '../../utils/local-storage';
import { TOrder } from '../../utils/types';

interface IOrderResponse {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
}

export const postOrderDetails = createAsyncThunk(
  'order/postOrderDetails',
  async (ingredients: string[]) => {
    const response = await axios.post<IOrderResponse>(
      `${BASE_URL}/orders`,
      {
        ingredients,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: getAccessToken(),
        },
      },
    );
    return response.data.order.number;
  },
);
interface IGetOrderResponse {
  success: boolean;
  orders: TOrder[];
}

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (orderNumber: number) => {
    const response = await axios.get<IGetOrderResponse>(
      `${BASE_URL}/orders/${orderNumber}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data.orders[0];
  },
);
