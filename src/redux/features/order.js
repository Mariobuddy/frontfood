import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    newOrder: [],
  },

  reducers: {
    getNewOrder: (state, action) => {
      state.newOrder = state.newOrder.push(action.payload);
    },
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
  },
});

export const { getNewOrder, makeOrder } = orderSlice.actions;

export default orderSlice.reducer;
