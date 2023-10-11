import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: null,
    loading: false,
    error: false,
    view: true,
    proCategory: "",
    totalCount: 0,
    perPageCount: 0,
    sorting: "",
    min: 0,
    max: 2000,
    page: 1,
    company:""
  },
  reducers: {
    fetchUser: (state) => {
      state.loading = true;
    },
    fetchUserSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.totalCount = action.payload.nbhits;
      state.perPageCount = action.payload.count;
    },
    fetchUserError: (state) => {
      state.loading = false;
      state.error = true;
    },
    changeView: (state, action) => {
      state.view = action.payload;
    },
    changeCategory: (state, action) => {
      state.proCategory = action.payload;
    },
    changeSorting: (state, action) => {
      state.sorting = action.payload;
    },
    changePrice: (state, action) => {
      state.min = action.payload[0];
      state.max = action.payload[1];
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    changeCompany:(state,action)=>{
      state.company=action.payload;
    }
  },
});

export const {
  fetchUser,
  fetchUserSuccess,
  fetchUserError,
  changeView,
  changeCategory,
  changeSorting,
  changePrice,
  changePage,
  changeCompany
} = productSlice.actions;
export default productSlice.reducer;
