import { createSlice } from "@reduxjs/toolkit";

export interface HomeState {
  isModalOpen: boolean;
  isSellerRequestOpen: boolean;
}

const initialState: HomeState = {
  isModalOpen: false,
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
  },
});

export const {
  openAuthModal,
  closeAuthModal,
  openSellerRequestModal,
  closeSellerRequestModal,
} = homeSlice.actions;

export default homeSlice.reducer;
