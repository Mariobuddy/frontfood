import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    loading: null,
    error: null,
  },

  reducers: {
    fetchAuth: (state) => {
      state.loading = true;
    },
    fetchAuthSuccess: (state, action) => {
      state.loading = null;
      state.data = action.payload;
    },
    fetchAuthError: (state) => {
      state.loading = null;
      state.error = true;
    },
    remAuth:(state,action)=>{
      state.data=action.payload;
      state.loading=null;
      state.error=null;
    }
  },
});

export const { fetchAuth,fetchAuthError,fetchAuthSuccess,remAuth } = authSlice.actions;

export default authSlice.reducer;
