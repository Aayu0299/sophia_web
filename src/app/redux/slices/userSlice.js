import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userInfo: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // userLogoutClear: (state, action) => {
    //   state.pushNotificationData = {};
    //   state.firebaseToken = null;
    //   deleteCookie("isAuthenticated");
    // },
  },

  extraReducers: (builder) => {},
});

export const {
  // userLogoutClear,
} = authSlice.actions;
export default authSlice.reducer;
