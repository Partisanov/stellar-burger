import { ingredientsSlice, initialState, IngredientsState } from './reducer';
import {
  getSauceIngredients,
  getBunIngredients,
  getMainIngredients,
  getAllIngredients,
} from './reducer';
import { fetchIngredients } from './action';

const mockState = {
  ingredients: {
    ingredients: [
      {
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
      },
      {
        _id: '60666c42cc7b410027a1a9b5',
        name: 'Говяжий метеорит (отбивная)',
        type: 'main',
        proteins: 800,
        fat: 800,
        carbohydrates: 300,
        calories: 2674,
        price: 3000,
        image: 'https://code.s3.yandex.net/react/code/meat-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
        __v: 0,
      },
      {
        _id: '60666c42cc7b410027a1a9b7',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0,
      },
    ],
    isLoading: false,
    error: null,
  } as IngredientsState,
};

describe('ingredientsSlice reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientsSlice.reducer(undefined, { type: '' })).toEqual(
      initialState,
    );
  });

  it('should handle fetchIngredients.pending', () => {
    const nextState = ingredientsSlice.reducer(initialState, {
      type: fetchIngredients.pending.type,
    });
    expect(nextState).toEqual({
      ...initialState,
      isLoading: true,
      error: null,
    });
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const mockPayload = [
      {
        _id: '1',
        name: 'Test Sauce',
        type: 'sauce',
        proteins: 10,
        fat: 5,
        carbohydrates: 10,
        calories: 100,
        price: 50,
        image: '',
        image_mobile: '',
        image_large: '',
        __v: 0,
      },
      {
        _id: '2',
        name: 'Test Bun',
        type: 'bun',
        proteins: 20,
        fat: 10,
        carbohydrates: 25,
        calories: 200,
        price: 100,
        image: '',
        image_mobile: '',
        image_large: '',
        __v: 0,
      },
    ];
    const nextState = ingredientsSlice.reducer(initialState, {
      type: fetchIngredients.fulfilled.type,
      payload: mockPayload,
    });
    expect(nextState).toEqual({
      ...initialState,
      isLoading: false,
      ingredients: mockPayload,
    });
  });

  it('should handle fetchIngredients.rejected', () => {
    const error = { message: 'Ошибка загрузки' };
    const nextState = ingredientsSlice.reducer(initialState, {
      type: fetchIngredients.rejected.type,
      error,
    });
    expect(nextState).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Ошибка загрузки',
    });
  });
});

describe('ingredientsSlice selectors', () => {
  it('should select sauce ingredients', () => {
    expect(getSauceIngredients(mockState)).toEqual([
      {
        _id: '60666c42cc7b410027a1a9b7',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0,
      },
    ]);
  });

  it('should select bun ingredients', () => {
    expect(getBunIngredients(mockState)).toEqual([
      {
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
      },
    ]);
  });

  it('should select main ingredients', () => {
    expect(getMainIngredients(mockState)).toEqual([
      {
        _id: '60666c42cc7b410027a1a9b5',
        name: 'Говяжий метеорит (отбивная)',
        type: 'main',
        proteins: 800,
        fat: 800,
        carbohydrates: 300,
        calories: 2674,
        price: 3000,
        image: 'https://code.s3.yandex.net/react/code/meat-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
        __v: 0,
      },
    ]);
  });

  it('should select all ingredients', () => {
    expect(getAllIngredients(mockState)).toEqual(
      mockState.ingredients.ingredients,
    );
  });
});
