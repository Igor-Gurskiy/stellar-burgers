import reducer, { fetchOrder, initialState } from './Order';

const mockOrders = [
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
];

describe('OrderSlice', () => {
  it('should handle fetchOrder.pending', () => {
    const state = reducer(
      initialState,
      fetchOrder.pending('fetchOrder.pending', 0)
    );
    expect(state.orderRequest).toEqual(true);
  });
  it('should handle fetchOrder.fulfilled', () => {
    const state = reducer(
      initialState,
      fetchOrder.fulfilled(
        {
          success: true,
          orders: mockOrders
        },
        'fetchOrder.fulfilled',
        0
      )
    );
    expect(state.orderRequest).toEqual(false);
    expect(state.order).toEqual(mockOrders[0]);
  });
  it('should handle fetchOrder.rejected', () => {
    const state = reducer(
      initialState,
      fetchOrder.rejected(
        new Error('Error fetching order'),
        'fetchOrder.rejected',
        0
      )
    );
    expect(state.orderRequest).toEqual(false);
    expect(state.order).toEqual(null);
    expect(state.error).toEqual('Error fetching order');
  });
});
