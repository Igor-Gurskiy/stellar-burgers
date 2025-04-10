import { describe } from 'node:test';
import reducer, { fetchFeeds, initialState } from './Feeds';

const mockFeeds = {
  orders: [
    {
      _id: '1',
      ingredients: [],
      status: 'done',
      name: 'Test Order',
      number: 1,
      createdAt: '2023-06-01T00:00:00.000Z',
      updatedAt: '2023-06-01T00:00:00.000Z'
    },
    {
      _id: '2',
      ingredients: [],
      status: 'done',
      name: 'Test Order',
      number: 2,
      createdAt: '2023-06-01T00:00:00.000Z',
      updatedAt: '2023-06-01T00:00:00.000Z'
    }
  ],
  total: 20,
  totalToday: 2
};
describe('FeedsSlice', () => {
  it('should handle fetchFeeds.pending', () => {
    const state = reducer(
      initialState,
      fetchFeeds.pending('fetchFeeds.pending')
    );
    expect(state.isLoading).toEqual(true);
  });
  it('should handle fetchFeeds.fulfilled', async () => {
    const state = reducer(
      initialState,
      fetchFeeds.fulfilled(
        {
          success: true,
          orders: mockFeeds.orders,
          total: mockFeeds.total,
          totalToday: mockFeeds.totalToday
        },
        'fetchFeeds.fulfilled'
      )
    );
    expect(state.isLoading).toEqual(false);
    expect(state.orders).toEqual(mockFeeds.orders);
    expect(state.total).toEqual(mockFeeds.total);
    expect(state.totalToday).toEqual(mockFeeds.totalToday);
  });
  it('should handle fetchFeeds.rejected', async () => {
    const state = reducer(
      initialState,
      fetchFeeds.rejected(
        new Error('Error fetching feeds'),
        'fetchFeeds.rejected'
      )
    );
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual('Error fetching feeds');
  });
});
