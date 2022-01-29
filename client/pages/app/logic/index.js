import { combineReducers } from "@reduxjs/toolkit";

import userSlice from "./user/userSlice";

export default combineReducers({
  user: userSlice,
});
