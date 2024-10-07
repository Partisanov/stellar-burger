import {
  chosenIngredientSlice,
  initialState,
  chooseIngredient,
} from './reducer';
import { TData } from '../../utils/types';

describe('chosenIngredientSlice', () => {
  it('should return the initial state', () => {
    expect(chosenIngredientSlice.reducer(undefined, { type: '' })).toEqual(
      initialState,
    );
  });

  it('should handle choosing an ingredient', () => {
    const ingredient: TData = {
      _id: '60666c42cc7b410027a1a9b1',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 1,
    };

    const result = chosenIngredientSlice.reducer(
      initialState,
      chooseIngredient(ingredient),
    );

    expect(result).toEqual({
      ...initialState,
      ingredient,
    });
  });

  it('should handle unchoosing an ingredient', () => {
    const ingredient: TData = {
      _id: '60666c42cc7b410027a1a9b1',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 1,
    };

    const stateWithIngredient = chosenIngredientSlice.reducer(
      initialState,
      chooseIngredient(ingredient),
    );

    const result = chosenIngredientSlice.reducer(
      stateWithIngredient,
      chooseIngredient(null),
    );

    expect(result).toEqual({
      ...initialState,
      ingredient: null,
    });
  });

  it('should return the chosen ingredient', () => {
    const ingredient: TData = {
      _id: '60666c42cc7b410027a1a9b1',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 1,
    };

    const stateWithIngredient = chosenIngredientSlice.reducer(
      initialState,
      chooseIngredient(ingredient),
    );

    const selectedIngredient =
      chosenIngredientSlice.selectors.getChosenIngredient({
        chosenIngredient: stateWithIngredient,
      });

    expect(selectedIngredient).toEqual(ingredient);
  });
});
