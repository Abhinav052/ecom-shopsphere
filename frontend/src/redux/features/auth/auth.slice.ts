// import { AuthState } from "@/models/auth.model";
// import { User } from "@/models/user.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../../models/auth.model";
import { User } from "../../../models/user.model";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

// function checkLogin (){
//     re
// }

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      console.log("Loigin run");

      console.log(action);
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    isLoggedIn: (state, action) => {
      action.payload;
    },
  },
});

export const { isLoggedIn, login, logout } = authSlice.actions;

export default authSlice.reducer;
