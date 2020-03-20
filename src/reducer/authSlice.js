import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "auth",
  initialState: {
    openLoginControl: false,
    openRegisterControl: false,
    logged: false
  },
  reducers: {
    toRegister: (state, action) => {
      state.openRegisterControl = action.payload;
    },
    toLogin: (state, action) => {
      state.openLoginControl = action.payload;
    },
    login: (state, action) => {
      state.logged = action.payload;
    }
  }
});

export const openLoginControl = state => state.auth.openLoginControl;
export const openRegisterControl = state => state.auth.openRegisterControl;
export const logged = state => state.auth.logged;
export const authActions = slice.actions;

export default slice.reducer;
