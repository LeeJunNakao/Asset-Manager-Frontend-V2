import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authenticated",
  initialState: {
    authenticated: Boolean(localStorage.getItem("access_token")),
  },
  reducers: {
    setLogin: (state) => {
      state.authenticated = true;
    },
    setLogout: (state) => {
      state.authenticated = false;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
