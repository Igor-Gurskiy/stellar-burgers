import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { v4 as uuid } from 'uuid';
type TConstructorState = {
  composition: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  error: string | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

export const initialState: TConstructorState = {
  composition: {
    bun: null,
    ingredients: []
  },
  error: null,
  orderRequest: false,
  orderModalData: null
};

export const makeOrder = createAsyncThunk(
  'composition/makeOrder',
  async (ingredients: string[]) => {
    const res = await orderBurgerApi(ingredients);
    return res;
  }
);

export const ConstructorSlice = createSlice({
  name: 'composition',
  initialState,
  selectors: {
    selectcomposition: (state) => state.composition,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalData: (state) => state.orderModalData
  },
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        console.log(action.payload);
        if (action.payload.type === 'bun')
          state.composition.bun = action.payload;
        else state.composition.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => {
        const id = uuid();
        return {
          payload: {
            ...ingredient,
            id: id
          }
        };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.composition.ingredients = state.composition.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    moveUp: (state, action: PayloadAction<TConstructorIngredient>) => {
      const index = state.composition.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index > 0) {
        state.composition.ingredients[index] =
          state.composition.ingredients[index - 1];
        state.composition.ingredients[index - 1] = action.payload;
      }
    },
    moveDown: (state, action: PayloadAction<TConstructorIngredient>) => {
      const index = state.composition.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index < state.composition.ingredients.length - 1) {
        state.composition.ingredients[index] =
          state.composition.ingredients[index + 1];
        state.composition.ingredients[index + 1] = action.payload;
      }
    },
    closeModal: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
      state.composition.bun = null;
      state.composition.ingredients = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.composition.bun = null;
        state.composition.ingredients = [];
        state.error = null;
      })
      .addCase(makeOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error?.message || '';
      });
  }
});
export default ConstructorSlice.reducer;

export const { selectcomposition, selectOrderRequest, selectOrderModalData } =
  ConstructorSlice.selectors;
export const { addIngredient, removeIngredient, moveUp, moveDown, closeModal } =
  ConstructorSlice.actions;
