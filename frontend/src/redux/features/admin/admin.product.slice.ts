import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AdminProductState {
  product: Array<any>;
  isLoading: boolean;
  isError: boolean;
  currentPage: number;
}

const initialState: AdminProductState = {
  product: [],
  isLoading: true,
  isError: false,
  currentPage: 1,
};

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {
    productsLoaded: (state, actions: PayloadAction<any>) => {
      // state.product = [...state.product, ...actions.payload.product];
      state.product = actions.payload.product;
      console.log(state.product);
      state.currentPage = actions.payload.page;
      state.isLoading = false;
    },
    productError: (state) => {
      state.isError = true;
    },
    setProductsLoading: (state) => {
      state.isLoading = true;
    },
    // productsLoadPage: (state, actions: PayloadAction<any>) => {
    //   state.product = ;
    //   state.currentPage = actions.payload.page;
    //   state.isLoading = false;
    // },
  },
});

export const {
  productError,
  productsLoaded,
  setProductsLoading,
  //   productsLoadPage,
} = adminProductSlice.actions;

export default adminProductSlice.reducer;
