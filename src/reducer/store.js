import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import submitSlice from "./submitSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    submit: submitSlice
  }
});
