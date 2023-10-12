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
    resultPerPage: 0,
    currentPageLength: 0,
    sorting: "",
    min: 0,
    max: 2000,
    page: 1,
    company: "",
    maxStar: 5,
    minStar: 0,
    search:""

  },
  reducers: {
    fetchUser: (state) => {
      state.loading = true;
    },
    fetchUserSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.totalCount = action.payload.nbhits;
      state.resultPerPage = action.payload.resultPerPage;
      state.currentPageLength = action.payload.currentPageLength;
    },
    fetchUserError: (state) => {
      state.loading = false;
      state.error = true;
    },
    deleteFilter: (state) => {
      state.company = "";
      state.max = 2000;
      state.min = 0;
      state.proCategory = "";
      state.sorting = "";
      state.minStar=0;
      state.maxStar=5;
      state.search=""
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
    changeCompany: (state, action) => {
      state.company = action.payload;
    },
    changeRating:(state,action)=>{
      state.minStar=action.payload[0];
      state.maxStar=action.payload[1];
    },
    changeSearch:(state,action)=>{
      state.search=action.payload;
    }
  },
});

export const {
  fetchUser,
  changeSearch,
  fetchUserSuccess,
  fetchUserError,
  changeView,
  changeCategory,
  changeSorting,
  changePrice,
  changePage,
  changeCompany,
  deleteFilter,
  changeRating
} = productSlice.actions;
export default productSlice.reducer;
