import { testIngredient } from '../../utils/constants';
import {
  chooseIngredient,
  chosenIngredientSlice,
  initialState,
} from './reducer';

describe('chosenIngredientSlice', () => {
  it('should return the initial state', () => {
    expect(chosenIngredientSlice.reducer(undefined, { type: '' })).toEqual(
      initialState,
    );
  });

  it('should handle choosing an ingredient', () => {
    

    const result = chosenIngredientSlice.reducer(
      initialState,
      chooseIngredient(testIngredient),
    );

    expect(result).toEqual({
      ...initialState,
      ingredient: testIngredient,
    });
  });

  it('should handle unchoosing an ingredient', () => {
    
    const stateWithIngredient = chosenIngredientSlice.reducer(
      initialState,
      chooseIngredient(testIngredient),
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
    
    const stateWithIngredient = chosenIngredientSlice.reducer(
      initialState,
      chooseIngredient(testIngredient),
    );

    const selectedIngredient =
      chosenIngredientSlice.selectors.getChosenIngredient({
        chosenIngredient: stateWithIngredient,
      });

    expect(selectedIngredient).toEqual(testIngredient);
  });
});
