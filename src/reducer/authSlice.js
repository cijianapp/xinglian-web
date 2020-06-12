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

export const openLoginControlSelector = state => state.auth.openLoginControl;
export const openRegisterControlSelector = state =>
  state.auth.openRegisterControl;
export const loggedSelector = state => state.auth.logged;
export const authActions = slice.actions;

export default slice.reducer;
