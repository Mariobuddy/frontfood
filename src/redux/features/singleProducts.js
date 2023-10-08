import { createSlice } from '@reduxjs/toolkit';

const singleSlice = createSlice({
  name: 'singleproduct',
  initialState: { data: null, loading: false, error: false},
  reducers: {
    fetchSingle: (state) => {
      state.loading = true;
    },
    fetchSingleSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchSingleError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchSingle, fetchSingleSuccess, fetchSingleError} = singleSlice.actions;
export default singleSlice.reducer;