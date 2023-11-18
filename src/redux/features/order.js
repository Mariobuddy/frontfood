import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    newOrder: [],
  },

  reducers: {
    getNewOrder: (state, action) => {
      state.newOrder = state.newOrder.push(action.payload);
    },
  },
});

// export const {} = orderSlice.actions;

export default orderSlice.reducer;
