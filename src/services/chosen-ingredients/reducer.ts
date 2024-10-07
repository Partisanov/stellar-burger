import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TData } from '../../utils/types';

export interface ChosenIngredientState {
  ingredient: TData | null;
}

export const initialState: ChosenIngredientState = {
  ingredient: null,
};

export const chosenIngredientSlice = createSlice({
  name: 'chosenIngredient',
  initialState,
  selectors: {
    getChosenIngredient: (state) => state.ingredient,
  },
  reducers: {
    chooseIngredient: (state, { payload }: PayloadAction<TData | null>) => {
      state.ingredient = payload;
    },
  },
});

export const { chooseIngredient } = chosenIngredientSlice.actions;
export const { getChosenIngredient } = chosenIngredientSlice.selectors;
