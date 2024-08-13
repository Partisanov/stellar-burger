import { TData } from '../../utils/types.ts';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface IResponseApi {
  data: TData[];
  status: number;
}
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  async (_, thunkApi) => {
    try {
      const response = await axios.get<IResponseApi>(`${BASE_URL}/ingredients`);
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue('Не удалось загрузить ингредиенты');
    }
  },
);
