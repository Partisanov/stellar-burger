import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { burgerConstructorSlice } from './burger-constructor/reducer.ts';
import { ingredientsSlice } from './ingredients/reducer.ts';
import { chosenIngredientSlice } from './chosen-ingredients/reducer.ts';
import { orderSlice } from './order/reducer.ts';
import { authSlice } from './auth/reducer.ts';

const rootReducer = combineSlices(
  burgerConstructorSlice,
  chosenIngredientSlice,
  ingredientsSlice,
  orderSlice,
  authSlice,
);
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];
