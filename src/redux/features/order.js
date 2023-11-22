import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    myOrderData: [],
    loading: true,
    error: false,
    singleOrder: {},
    singleLoading: false,
    singleError: false,
  },

  reducers: {
    makeOrder: async (state, action) => {
      try {
        const res = await fetch("http://localhost:4000/neworder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(action.payload),
        });
        const data = await res.json();
        if (res.status === 200) {
          toast("Order Placed");
          state.newOrder.push(data.order);
        } else if (
          data.message === "All Field are required" ||
          data.message === "Internal Server Error"
        ) {
          toast(data.message);
        }
      } catch (error) {
        return error;
      }
    },
    fetchOrder: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    fetchOrderSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        myOrderData: action.payload,
      };
    },
    fetchOrderError: (state) => {
      return {
        ...state,
        loading: false,
        error: true,
      };
    },
    fetchSingleOrder: (state) => {
      return {
        ...state,
        singleLoading: true,
      };
    },
    fetchSingleOrderSuccess: (state, action) => {
      return {
        ...state,
        singleLoading: false,
        singleOrder: action.payload,
      };
    },
    fetchSingleOrderError: (state) => {
      return {
        ...state,
        singleLoading: false,
        singleError: true,
      };
    },
  },
});

export const {
  makeOrder,
  fetchOrder,
  fetchOrderError,
  fetchOrderSuccess,
  fetchSingleOrder,
  fetchSingleOrderError,
  fetchSingleOrderSuccess,
} = orderSlice.actions;

export default orderSlice.reducer;
