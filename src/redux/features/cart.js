import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items:[],
    totalItemCount: 0,
  },

  reducers: {
    addToCart: (state, action) => {
      const { data, gcount, id } = action.payload;
      const existingItem = state.items.find((item) => item._id === id);
      if (existingItem) {
        existingItem.gcount += gcount;
      } else {
        state.items.push({ ...data?.product, gcount });
      }
      state.totalItemCount = state.items.reduce((acc, cur) => {
        return acc + cur.gcount;
      }, 0);
    },
    removeFromCart: (state, action) => {},
    clearAll: (state, action) => {},
    updateLocalStorage: (state) => {
    },
  },
});

export const { addToCart, clearAll, removeFromCart, updateLocalStorage } =
  cartSlice.actions;

export default cartSlice.reducer;
