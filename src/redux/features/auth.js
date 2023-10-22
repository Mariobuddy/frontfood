import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    loading: false,
    error: false,
  },

  reducers: {
    fetchAuth: (state) => {
      state.loading = true;
    },
    fetchAuthSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchAuthError: (state) => {
      state.loading = false;
      state.error = true;
    },
    remAuth:(state,action)=>{
      state.data=action.payload;
      state.loading=false;
      state.error=false;
    }
  },
});

export const { fetchAuth,fetchAuthError,fetchAuthSuccess,remAuth } = authSlice.actions;

export default authSlice.reducer;
