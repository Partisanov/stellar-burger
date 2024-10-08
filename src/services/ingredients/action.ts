import { TData } from '../../utils/types';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface IResponseApi {
  data: TData[];
  status: number;
}
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  async (_) => {
    const response = await axios.get<IResponseApi>(`${BASE_URL}/ingredients`);
    return response.data.data;
  },
);
