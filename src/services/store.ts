import { configureStore, combineSlices } from '@reduxjs/toolkit';
import { IngredientsSlice } from './slices/Ingredients';
import { ConstructorSlice } from './slices/Constructor';
import { FeedsSlice } from './slices/Feeds';
import { OrderSlice } from './slices/Order';
import { ProfileSlice } from './slices/Profile';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineSlices(
  IngredientsSlice,
  ConstructorSlice,
  FeedsSlice,
  OrderSlice,
  ProfileSlice
); // Заменить на импорт настоящего редьюсера
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
