import {
  burgerConstructorSlice,
  setBun,
  addIngredient,
  removeIngredient,
  updateIngredients,
  clearConstructorList,
  initialState,
} from './reducer';
import { TData } from '../../utils/types';

describe('burgerConstructorSlice', () => {
  const mockBun: TData = {
    _id: '1',
    name: 'Bun',
    type: 'bun',
    price: 100,
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 200,
    image: 'bun_image.png',
    image_mobile: 'bun_image_mobile.png',
    image_large: 'bun_image_large.png',
    __v: 0,
  };

  const mockIngredient: Omit<TData, 'key'> = {
    _id: '2',
    name: 'Cheese',
    type: 'main',
    price: 50,
    proteins: 15,
    fat: 25,
    carbohydrates: 35,
    calories: 250,
    image: 'cheese_image.png',
    image_mobile: 'cheese_image_mobile.png',
    image_large: 'cheese_image_large.png',
    __v: 0,
  };

  it('should return the initial state', () => {
    expect(burgerConstructorSlice.reducer(undefined, { type: '' })).toEqual(
      initialState,
    );
  });

  it('should handle setBun', () => {
    const nextState = burgerConstructorSlice.reducer(
      initialState,
      setBun(mockBun),
    );
    expect(nextState.bun).toEqual(mockBun);
  });

  it('should handle addIngredient', () => {
    const action = addIngredient(mockIngredient);
    const nextState = burgerConstructorSlice.reducer(initialState, action);
    expect(nextState.ingredients.length).toBe(1);
    expect(nextState.ingredients[0]).toMatchObject(mockIngredient);
    expect(nextState.ingredients[0].key).toBeDefined();
  });

  it('should handle removeIngredient', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [
        { ...mockIngredient, key: '123' },
        { ...mockIngredient, name: 'Salad', key: '456' },
      ],
    };
    const nextState = burgerConstructorSlice.reducer(
      stateWithIngredients,
      removeIngredient({ key: '123' }),
    );
    expect(nextState.ingredients.length).toBe(1);
    expect(nextState.ingredients[0].key).toBe('456');
  });

  it('should handle updateIngredients', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [
        { ...mockIngredient, key: '123' },
        { ...mockIngredient, name: 'Salad', key: '456' },
      ],
    };
    const nextState = burgerConstructorSlice.reducer(
      stateWithIngredients,
      updateIngredients({ dragIndex: 0, hoverIndex: 1 }),
    );
    expect(nextState.ingredients[0].key).toBe('456');
    expect(nextState.ingredients[1].key).toBe('123');
  });

  it('should handle clearConstructorList', () => {
    const stateWithData = {
      bun: mockBun,
      ingredients: [{ ...mockIngredient, key: '123' }],
    };
    const nextState = burgerConstructorSlice.reducer(
      stateWithData,
      clearConstructorList(),
    );
    expect(nextState).toEqual(initialState);
  });
});
