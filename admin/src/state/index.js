import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "76d29862-606d-40ef-b633-493fae0356f2",
  customerId: "Nameless",
  pathName: "login",
  authToken: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setPathName: (state, action) => {
      state.pathName = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    }
  },
});

export const { setMode, setCustomerId, setPathName, setUserId, setAuthToken } = globalSlice.actions;

export default globalSlice.reducer;
