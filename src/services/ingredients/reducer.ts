import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { TData } from '../../utils/types.ts';
import { fetchIngredients } from './action.ts';

export interface IngredientsState {
  ingredients: TData[];
  isLoading: boolean;
  error: null | string;
}

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: true,
  error: null,
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.ingredients = payload;
      })
      .addCase(fetchIngredients.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message || 'Не удалось загрузить ингредиенты';
      });
  },
  selectors: {
    getSauceIngredients: createSelector(
      (state) => state.ingredients,
      (ingredients: TData[]) =>
        ingredients.filter((ingredient) => ingredient.type === 'sauce'),
    ),
    getBunIngredients: createSelector(
      (state) => state.ingredients,
      (ingredients: TData[]) =>
        ingredients.filter((ingredient) => ingredient.type === 'bun'),
    ),
    getMainIngredients: createSelector(
      (state) => state.ingredients,
      (ingredients: TData[]) =>
        ingredients.filter((ingredient) => ingredient.type === 'main'),
    ),
    getAllIngredients: (state) => state.ingredients,
  },
});

export const {
  getSauceIngredients,
  getBunIngredients,
  getMainIngredients,
  getAllIngredients,
} = ingredientsSlice.selectors;
