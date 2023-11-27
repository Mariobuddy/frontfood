import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    loading: null,
    error: null,
    isAuth: Cookies.get("jwt"),
    isAdmin:""
  },

  reducers: {
    fetchAuth: (state) => {
      state.loading = true;
    },
    fetchAuthSuccess: (state, action) => {
      state.loading = null;
      state.data = action.payload;
      state.isAdmin=state.data?.user?.role;
    },
    fetchAuthError: (state) => {
      state.loading = null;
      state.error = true;
    },
    remAuth: (state) => {
      state.data = null;
      state.loading = null;
      state.error = null;
      state.isAuth = null;
      state.isAdmin=null;
    },
    getToken: (state) => {
      state.isAuth = Cookies.get("jwt");
    },
  },
});

export const {
  fetchAuth,
  fetchAuthError,
  fetchAuthSuccess,
  remAuth,
  getToken,
} = authSlice.actions;

export default authSlice.reducer;
