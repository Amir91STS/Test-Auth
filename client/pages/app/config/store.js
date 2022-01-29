import { configureStore } from "@reduxjs/toolkit";
import appReducers from "../logic";

export const store = configureStore({
  reducer: appReducers,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const dispatch = store.dispatch;
export const storeState = store.getState;
