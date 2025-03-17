import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';
import { selectIsLoading } from './Ingredients';

export const fetchOrder = createAsyncThunk(
  'order/fetch',
  async (number: number) => await getOrderByNumberApi(number)
);

type TOrderState = {
  order: TOrder | null;
  orderRequest: boolean;
  error: string;
};

export const initialState: TOrderState = {
  order: null,
  orderRequest: false,
  error: ''
};

export const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    selectOrder: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.orderRequest = false;
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.order = null;
        state.orderRequest = false;
      });
  }
});

export default OrderSlice.reducer;
export const { selectOrder } = OrderSlice.selectors;
