import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/constants.ts';
import { getAccessToken } from '../../utils/local-storage.ts';

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
