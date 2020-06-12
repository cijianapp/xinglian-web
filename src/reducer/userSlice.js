import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "user",
  initialState: { token: null, headerConfig: null, info: {} },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.headerConfig = { Authorization: "Bearer " + action.payload };
    },
    setUserInfo: (state, action) => {
      state.info = action.payload;
    }
  }
});

export const tokenSelector = state => state.user.token;
export const headerConfigSelector = state => state.user.headerConfig;
export const infoSelector = state => state.user.info;
export const userActions = slice.actions;

export default slice.reducer;
