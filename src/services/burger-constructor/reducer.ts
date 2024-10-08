import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TData } from '../../utils/types';

export interface BurgerConstructorState {
  bun: null | TData;
  ingredients: TData[];
}

export const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    getIngredients: (state) => state.ingredients,
    getBun: (state) => state.bun,
  },
  reducers: {
    clearConstructorList: (state) => {
      state.ingredients = [];
      state.bun = null;
    },
    setBun: (state, { payload }: PayloadAction<TData>) => {
      state.bun = payload;
    },
    removeIngredient: (
      state,
      { payload: { key } }: PayloadAction<{ key: string }>,
    ) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.key !== key,
      );
    },
    updateIngredients: (
      state,
      { payload }: PayloadAction<{ dragIndex: number; hoverIndex: number }>,
    ) => {
      state.ingredients.splice(
        payload.dragIndex,
        0,
        state.ingredients.splice(payload.hoverIndex, 1)[0],
      );
    },
    addIngredient: {
      reducer: (state, { payload }: PayloadAction<TData>) => {
        state.ingredients.push(payload);
      },
      prepare: (ingredient: Omit<TData, 'key'>) => {
        return { payload: { ...ingredient, key: nanoid() } };
      },
    },
  },
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  updateIngredients,
  clearConstructorList,
} = burgerConstructorSlice.actions;
export const { getIngredients, getBun } = burgerConstructorSlice.selectors;
