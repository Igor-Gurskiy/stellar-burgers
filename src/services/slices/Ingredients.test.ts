import reducer, { fetchIngredients, initialState } from './Ingredients';

const mockIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  },
  {
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
  }
];

describe('IngredientsSlice', () => {
  it('should handle fetchIngredients.pending', () => {
    const state = reducer(
      initialState,
      fetchIngredients.pending('fetchIngredients.pending')
    );
    expect(state.isLoading).toEqual(true);
  });
  it('should handle fetchIngredients.fulfilled', async () => {
    const state = reducer(
      initialState,
      fetchIngredients.fulfilled(mockIngredients, 'fetchIngredients.fulfilled')
    );
    expect(state.isLoading).toEqual(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });
  it('should handle fetchIngredients.rejected', async () => {
    const state = reducer(
      initialState,
      fetchIngredients.rejected(
        new Error('Error fetching ingredients'),
        'fetchIngredients.rejected'
      )
    );
    expect(state.isLoading).toEqual(false);
    expect(state.hasError).toEqual(true);
    expect(state.error).toEqual('Error fetching ingredients');
  });
});
