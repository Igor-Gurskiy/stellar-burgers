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
  user: TUser;
  isLoadingOrder: boolean;
  isLoadingRegistration: boolean;
  error: string;
  isAuthChecked: boolean;
  userOrders: TOrder[];
};

const initialState: TProfileState = {
  user: {
    name: '',
    email: ''
  },
  isLoadingOrder: false,
  isLoadingRegistration: false,
  error: '',
  isAuthChecked: false,
  userOrders: []
};

export const getUser = createAsyncThunk(
  'user/fetch',
  async () => await getUserApi()
);
export const updateUser = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => await updateUserApi(user)
);
export const loginUserThunk = createAsyncThunk(
  'user/login',
  async (data: TLoginData) =>
    await loginUserApi(data).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    })
);
export const fetchOrders = createAsyncThunk(
  'user/orders',
  async () => await getOrdersApi()
);
export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) =>
    await registerUserApi(data).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    })
);
export const logoutUser = createAsyncThunk(
  'user/logout',
  async () =>
    await logoutApi().then(() => {
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
    })
);

export const ProfileSlice = createSlice({
  name: 'profileData',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = '';
    }
  },
  selectors: {
    selectUser: (state) => state.user,
    selectUserOrders: (state) => state.userOrders,
    selectAuthChecked: (state) => state.isAuthChecked,
    selectIsLoadingRegistration: (state) => state.isLoadingRegistration,
    selectIsLoadingOrder: (state) => state.isLoadingOrder
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isLoadingRegistration = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoadingRegistration = true;
        state.isAuthChecked = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoadingRegistration = false;
        state.isAuthChecked = false;
        state.error = action.error?.message || '';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = { name: '', email: '' };
        state.isAuthChecked = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
      });
  }
});

export const {
  selectUser,
  selectAuthChecked,
  selectUserOrders,
  selectIsLoadingOrder,
  selectIsLoadingRegistration
} = ProfileSlice.selectors;
export default ProfileSlice.reducer;
export const { resetError } = ProfileSlice.actions;
