import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';
import { selectIsLoading } from './Ingredients';

export const fetchFeeds = createAsyncThunk(
  'feeds/fetch',
  async () => await getFeedsApi()
);

export type TFeedsState = {
  // order: TOrder | null;
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string;
};
const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: ''
};

export const FeedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (state) => state.orders,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        // console.log(state.orders);
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || '';
      });
  }
});

export default FeedsSlice.reducer;
export const { selectOrders, selectTotalToday, selectTotal } =
  FeedsSlice.selectors;

// export const { selectIsLoading } = FeedsSlice.selectors;
