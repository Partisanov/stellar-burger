import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TData } from '../../utils/types.ts';

interface ChosenIngredientState {
  ingredient: TData | null;
}

const initialState: ChosenIngredientState = {
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
