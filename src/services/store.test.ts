import { rootReducer } from './store';
import { initialState as compositionState } from './slices/Constructor';
import { initialState as ingredientsState } from './slices/Ingredients';
import { initialState as orderState } from './slices/Order';
import { initialState as profileState } from './slices/Profile';
import { initialState as feedsState } from './slices/Feeds';

describe('rootReducer', () => {
  it('should return the initial state', () => {
    expect(rootReducer(undefined, { type: 'unknown' })).toEqual({
      composition: compositionState,
      ingredients: ingredientsState,
      order: orderState,
      profile: profileState,
      feeds: feedsState
    });
  });
});
