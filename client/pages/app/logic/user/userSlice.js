import { createSlice } from "@reduxjs/toolkit";
import { loginUserToApp } from "./userActions";

const initialState = {
  error: null,
  token: null,
  profile: null,
  isPending: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUserToApp.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(loginUserToApp.fulfilled, (state, action) => {
      const loginData = action.payload;

      state.isPending = false;
      state.profile = loginData.user;
      state.token = loginData.tokens.access.token;
      localStorage.setItem("token", loginData.tokens.access.token);
    });
    builder.addCase(loginUserToApp.rejected, (state) => {
      state.isPending = false;
      state.error = "Error In Getting Data";
    });
  },
});

export default userSlice.reducer;

export const authProfile = (state) => state.user.profile;
export const isAuthPending = (state) => state.user.isPending;
export const isAuthenticated = (state) => !!state.user.profile;
