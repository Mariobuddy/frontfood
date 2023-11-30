import { createSlice } from "@reduxjs/toolkit";

const singleSlice = createSlice({
  name: "singleproduct",
  initialState: { data: {}, loading: false, error: false },
  reducers: {
    fetchSingle: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    fetchSingleSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    },
    fetchSingleError: (state) => {
      return {
        ...state,
        loading: false,
        error: true,
      };
    },
  },
});

export const { fetchSingle, fetchSingleSuccess, fetchSingleError, makeReview } =
  singleSlice.actions;
export default singleSlice.reducer;
