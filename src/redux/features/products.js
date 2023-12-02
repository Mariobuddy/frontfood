import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: null,
    adminProductLoading: false,
    adminProduct: null,
    adminProductError: null,
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
    search: "",
    userReviewLoading: false,
    userReview: [],
    userReviewError: false,
    productId: "",
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
    },
    fetchUserError: (state) => {
      state.loading = false;
      state.error = true;
    },
    fetchAdminProduct: (state) => {
      state.adminProductLoading = true;
    },
    fetchAdminProductSuccess: (state, action) => {
      state.adminProductLoading = false;
      state.adminProduct = action.payload;
    },
    fetchAdminProductError: (state) => {
      state.adminProductLoading = false;
      state.adminProductError = true;
    },
    deleteFilter: (state) => {
      state.company = "";
      state.max = 2000;
      state.min = 0;
      state.proCategory = "";
      state.sorting = "";
      state.minStar = 0;
      state.maxStar = 5;
      state.search = "";
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
    changeRating: (state, action) => {
      state.minStar = action.payload[0];
      state.maxStar = action.payload[1];
    },
    changeSearch: (state, action) => {
      state.search = action.payload;
    },
    fetchReview: (state) => {
      state.userReviewLoading = true;
    },
    setReview: (state, action) => {
      state.userReview = action.payload;
    },
    getProductId: (state, action) => {
      state.productId = action.payload;
    },
    fetchReviewSuccess: (state, action) => {
      state.userReviewLoading = false;
      state.userReview = action.payload;
    },
    fetchReviewError: (state) => {
      state.userReviewLoading = false;
      state.userReviewError = true;
    },
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
  changeRating,
  fetchAdminProduct,
  fetchAdminProductError,
  fetchAdminProductSuccess,
  fetchReview,
  fetchReviewError,
  fetchReviewSuccess,
  getProductId,
  setReview
} = productSlice.actions;
export default productSlice.reducer;
