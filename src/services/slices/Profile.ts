import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  updateUserApi,
  logoutApi,
  loginUserApi,
  registerUserApi,
  TLoginData,
  getOrdersApi,
  TRegisterData
} from '../../utils/burger-api';
import { TUser, TOrder } from '../../utils/types';
import { setCookie, deleteCookie } from '../../utils/cookie';

type TProfileState = {
  user: TUser | null;
  isLoadingOrder: boolean;
  isLoadingRegistration: boolean;
  error: string;
  isAuthChecked: boolean;
  userOrders: TOrder[];
};

export const initialState: TProfileState = {
  user: null,
  isLoadingOrder: false,
  isLoadingRegistration: false,
  error: '',
  isAuthChecked: false,
  userOrders: []
};

export const registUser = createAsyncThunk(
  'profile/register',
  async (data: TRegisterData) =>
    await registerUserApi(data).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    })
);

export const loginUser = createAsyncThunk(
  'profile/login',
  async (data: TLoginData) =>
    await loginUserApi(data).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    })
);

export const logoutUser = createAsyncThunk(
  'profile/logout',
  async () =>
    await logoutApi().then(() => {
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
    })
);

export const getOrders = createAsyncThunk('profile/orders', getOrdersApi);

export const getUser = createAsyncThunk('profile/fetch', getUserApi);

export const updateUser = createAsyncThunk('profile/update', updateUserApi);

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (state) => state.user,
    selectUserOrders: (state) => state.userOrders,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectIsLoadingRegistration: (state) => state.isLoadingRegistration,
    selectIsLoadingOrder: (state) => state.isLoadingOrder,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(registUser.pending, (state) => {
        state.isLoadingRegistration = true;
      })
      .addCase(registUser.fulfilled, (state, action) => {
        state.isLoadingRegistration = false;
        state.user = action.payload;
      })
      .addCase(registUser.rejected, (state, action) => {
        state.isLoadingRegistration = false;
        state.error = action.error.message || '';
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoadingRegistration = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoadingRegistration = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoadingRegistration = false;
        state.error = action.error.message || '';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message || '';
      })
      .addCase(getUser.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message || '';
        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message || '';
        state.isAuthChecked = true;
        state.user = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoadingRegistration = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        state.isLoadingOrder = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoadingOrder = true;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.error.message || '';
      });
  }
});

export const {
  selectUser,
  selectIsAuthChecked,
  selectUserOrders,
  selectIsLoadingOrder,
  selectIsLoadingRegistration,
  selectError
} = ProfileSlice.selectors;
export default ProfileSlice.reducer;
