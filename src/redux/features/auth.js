import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    loading: null,
    error: null,
    isAuth:localStorage.getItem("jwtToken")
  },

  reducers: {
    fetchAuth: (state) => {
      state.loading = true;
    },
    fetchAuthSuccess: (state, action) => {
      state.loading = null;
      state.data = action.payload;
      state.isAuth=localStorage.getItem("jwtToken")
    },
    fetchAuthError: (state) => {
      state.loading = null;
      state.error = true;
    },
    remAuth:(state)=>{
      state.data=null;
      state.loading=null;
      state.error=null;
      state.isAuth=null
    }
  },
});

export const { fetchAuth,fetchAuthError,fetchAuthSuccess,remAuth } = authSlice.actions;

export default authSlice.reducer;
