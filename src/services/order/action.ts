import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/constants.ts';

interface IOrderResponse {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
}

export const postOrderDetails = createAsyncThunk(
  'order/postOrderDetails',
  async (ingredients: string[], { rejectWithValue }) => {
    try {
      const response = await axios.post<IOrderResponse>(`${BASE_URL}/orders`, {
        ingredients,
      });
      return response.data.order.number;
    } catch (error) {
      return rejectWithValue('Не удалось отправить заказ');
    }
  },
);
