import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HomeState {
  isModalOpen: boolean;
  isSellerRequestOpen: boolean;
  product: Array<any>;
  isLoading: boolean;
  isError: boolean;
}

const initialState: HomeState = {
  isModalOpen: false,
  product: [],
  isLoading: true,
  isError: false,
  isSellerRequestOpen: false,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    openAuthModal: (state) => {
      state.isModalOpen = true;
    },
    closeAuthModal: (state) => {
      state.isModalOpen = false;
    },
    openSellerRequestModal: (state) => {
      state.isSellerRequestOpen = true;
    },
    closeSellerRequestModal: (state) => {
      state.isSellerRequestOpen = false;
    },
    productsLoaded: (state, actions: PayloadAction<any>) => {
      // state.product = [...state.product, ...actions.payload.product];
      state.product = actions.payload.product;
      console.log(state.product);
      state.isLoading = false;
    },
    productError: (state) => {
      state.isError = true;
    },
    setProductsLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export const {
  openAuthModal,
  closeAuthModal,
  openSellerRequestModal,
  closeSellerRequestModal,
  productError,
  productsLoaded,
  setProductsLoading,
} = homeSlice.actions;

export default homeSlice.reducer;
