import { createAsyncThunk } from "@reduxjs/toolkit";
import { verifyOtp } from "./userAPI";

export const loginUserToApp = createAsyncThunk("Auth/Login", async (values) =>
  verifyOtp(values)
);
