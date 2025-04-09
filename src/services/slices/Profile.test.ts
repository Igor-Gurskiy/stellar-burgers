import reducer, {
  initialState,
  registUser,
  loginUser,
  logoutUser,
  getOrders,
  getUser,
  updateUser
} from './Profile';

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

const registerDataMock = {
  email: 'email',
  name: 'name',
  password: 'password'
};

const userMock = {
  email: 'email',
  name: 'name'
};

const loginDataMock = {
  email: 'email',
  password: 'password'
};

describe('profileSlice', () => {
  it('should handle registUser.pending', () => {
    const state = reducer(
      initialState,
      registUser.pending('registUser.pending', registerDataMock)
    );
    expect(state.isLoadingRegistration).toEqual(true);
  });
  it('should handle registUser.fulfilled', () => {
    const state = reducer(
      initialState,
      registUser.fulfilled(userMock, 'registUser.fulfilled', registerDataMock)
    );
    expect(state.isLoadingRegistration).toEqual(false);
    expect(state.user).toEqual(userMock);
  });
  it('should handle registUser.rejected', () => {
    const state = reducer(
      initialState,
      registUser.rejected(
        new Error('Error'),
        'registUser.rejected',
        registerDataMock
      )
    );
    expect(state.isLoadingRegistration).toEqual(false);
    expect(state.error).toEqual('Error');
  });
  it('should handle loginUser.pending', () => {
    const state = reducer(
      initialState,
      loginUser.pending('loginUser.pending', loginDataMock)
    );
    expect(state.isLoadingRegistration).toEqual(true);
  });
  it('should handle loginUser.fulfilled', () => {
    const state = reducer(
      initialState,
      loginUser.fulfilled(userMock, 'loginUser.fulfilled', loginDataMock)
    );
    expect(state.isLoadingRegistration).toEqual(false);
    expect(state.user).toEqual(userMock);
    expect(state.isAuthChecked).toEqual(true);
  });
  it('should handle loginUser.rejected', () => {
    const state = reducer(
      initialState,
      loginUser.rejected(
        new Error('Error'),
        'loginUser.rejected',
        loginDataMock
      )
    );
    expect(state.isLoadingRegistration).toEqual(false);
    expect(state.error).toEqual('Error');
  });
  it('should handle logoutUser.fulfilled', () => {
    const state = reducer(
      initialState,
      logoutUser.fulfilled(undefined, 'logoutUser.fulfilled')
    );
    expect(state.user).toEqual(null);
  });
  it('should handle logoutUser.rejected', () => {
    const state = reducer(
      initialState,
      logoutUser.rejected(new Error('Error'), 'logoutUser.rejected')
    );
    expect(state.error).toEqual('Error');
  });
  it('should handle getUser.pending', () => {
    const state = reducer(initialState, getUser.pending('getUser.pending'));
    expect(state.isAuthChecked).toEqual(false);
  });
  it('should handle getUser.fulfilled', () => {
    const state = reducer(
      initialState,
      getUser.fulfilled({ success: true, user: userMock }, 'getUser.fulfilled')
    );
    expect(state.isAuthChecked).toEqual(true);
    expect(state.user).toEqual(userMock);
  });
  it('should handle getUser.rejected', () => {
    const state = reducer(
      initialState,
      getUser.rejected(new Error('Error'), 'getUser.rejected')
    );
    expect(state.error).toEqual('Error');
    expect(state.isAuthChecked).toEqual(true);
  });
  it('should handle getOrders.pending', () => {
    const state = reducer(initialState, getOrders.pending('getOrders.pending'));
    expect(state.isLoadingOrder).toEqual(true);
  });
  it('should handle getOrders.fulfilled', () => {
    const state = reducer(
      initialState,
      getOrders.fulfilled(mockOrders, 'getOrders.fulfilled')
    );
    expect(state.isLoadingOrder).toEqual(false);
    expect(state.userOrders).toEqual(mockOrders);
  });
  it('should handle getOrders.rejected', () => {
    const state = reducer(
      initialState,
      getOrders.rejected(new Error('Error'), 'getOrders.rejected')
    );
    expect(state.error).toEqual('Error');
  });
  it('should handle updateUser.pending', () => {
    const state = reducer(
      initialState,
      updateUser.pending('updateUser.pending', registerDataMock)
    );
    expect(state.isLoadingRegistration).toEqual(true);
  });
  it('should handle updateUser.fulfilled', () => {
    const state = reducer(
      initialState,
      updateUser.fulfilled(
        { success: true, user: userMock },
        'updateUser.fulfilled',
        registerDataMock
      )
    );
    expect(state.user).toEqual(userMock);
  });
  it('should handle updateUser.rejected', () => {
    const state = reducer(
      initialState,
      updateUser.rejected(
        new Error('Error'),
        'updateUser.rejected',
        registerDataMock
      )
    );
    expect(state.error).toEqual('Error');
    expect(state.isAuthChecked).toEqual(true);
    expect(state.user).toEqual(null);
  });
});
