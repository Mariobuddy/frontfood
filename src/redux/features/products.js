import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: { data: null, loading: false, error: false,view:true,proCategory:""},
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
    changeView:(state,action)=>{
      state.view=action.payload;
    },
    changeCategory:(state,action)=>{
      state.proCategory=action.payload;
    }
  },
});

export const { fetchUser, fetchUserSuccess, fetchUserError,changeView,changeCategory } = productSlice.actions;
export default productSlice.reducer;