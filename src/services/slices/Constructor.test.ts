import { describe } from 'node:test';
import reducer, {
  initialState,
  addIngredient,
  removeIngredient,
  moveUp,
  moveDown,
  makeOrder
} from './Constructor';

const mockBun = {
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
  __v: 0
};

const mockIngredient = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0
};

const mockOrder = {
  _id: '67f56b02e8e61d001cec122d',
  status: 'done',
  name: 'Флюоресцентный люминесцентный бургер',
  createdAt: '2025-04-08T18:29:22.297Z',
  updatedAt: '2025-04-08T18:29:23.532Z',
  number: 73855,
  ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e']
};

let uuidCounter = 0;
jest.mock('uuid', () => ({
  v4: () => `${++uuidCounter}`
}));

describe('ConstructorSlice', () => {
  beforeEach(() => {
    uuidCounter = 0;
  });
  it('should add ingredient', () => {
    const addBunState = reducer(initialState, addIngredient(mockBun));
    const addIngredientState = reducer(
      initialState,
      addIngredient(mockIngredient)
    );
    expect(addBunState.composition.bun).toEqual({
      ...mockBun,
      id: '1'
    });
    expect(addIngredientState.composition.ingredients).toEqual([
      {
        ...mockIngredient,
        id: '2'
      }
    ]);
  });
  it('should remove ingredient', () => {
    const addIngredientState = reducer(
      initialState,
      addIngredient(mockIngredient)
    );
    const ingredientWithId = {
      ...mockIngredient,
      id: '1'
    };
    const removeIngredientState = reducer(
      addIngredientState,
      removeIngredient(ingredientWithId)
    );
    expect(addIngredientState.composition.ingredients).toEqual([
      {
        ...mockIngredient,
        id: '1'
      }
    ]);
    expect(removeIngredientState.composition.ingredients).toEqual([]);
  });
  it('should move ingredient', () => {
    let addIngredientState = reducer(
      initialState,
      addIngredient(mockIngredient)
    );
    addIngredientState = reducer(
      addIngredientState,
      addIngredient(mockIngredient)
    );
    const ingredients = [
      {
        ...mockIngredient,
        id: '1'
      },
      {
        ...mockIngredient,
        id: '2'
      }
    ];
    expect(addIngredientState.composition.ingredients).toEqual(ingredients);
    const movedIngredient = {
      ...mockIngredient,
      id: '2'
    };
    const moveUpState = reducer(addIngredientState, moveUp(movedIngredient));
    expect(moveUpState.composition.ingredients[0]).toEqual({
      ...mockIngredient,
      id: '2'
    });
    const moveDownState = reducer(
      addIngredientState,
      moveDown(movedIngredient)
    );
    expect(moveDownState.composition.ingredients[0]).toEqual({
      ...mockIngredient,
      id: '1'
    });
  });
  it('should handle makeOrder.pending', () => {
    const state = reducer(
      initialState,
      makeOrder.pending('makeOrder.pending', [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e'
      ])
    );
    expect(state.orderRequest).toEqual(true);
    expect(state.error).toEqual(null);
  });
  it('should handle makeOrder.fulfilled', () => {
    const state = reducer(
      initialState,
      makeOrder.fulfilled(
        {
          success: true,
          order: mockOrder,
          name: 'Флюоресцентный люминесцентный бургер'
        },
        'makeOrder.fulfilled',
        ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e']
      )
    );
    expect(state.orderModalData).toEqual(mockOrder);
    expect(state.orderRequest).toEqual(false);
    expect(state.error).toEqual(null);
    expect(state.composition.bun).toEqual(null);
    expect(state.composition.ingredients).toEqual([]);
  });
  it('should handle makeOrder.rejected', () => {
    const state = reducer(
      initialState,
      makeOrder.rejected(new Error('Error'), 'makeOrder.rejected', [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e'
      ])
    );
    expect(state.orderRequest).toEqual(false);
    expect(state.error).toEqual('Error');
  });
});
