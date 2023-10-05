import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: { data: null, loading: false, error: false},
  reducers: {
    fetchUser: (state) => {
      state.loading = true;
    },
    fetchUserSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchUserError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchUser, fetchUserSuccess, fetchUserError } = productSlice.actions;
export default productSlice.reducer;