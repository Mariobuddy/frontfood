import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
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
    setCount: (state, action) => {
      state.totalItemCount = action.payload;
    },
    removeFromCart: (state, action) => {},
    clearAll: (state) => {
      state.items = [];
    },
    updateLocalStorage: (state, action) => {
      state.items = action.payload;
    },
    getItems: () => {},
  },
});

export const {
  addToCart,
  clearAll,
  removeFromCart,
  updateLocalStorage,
  getItems,
  setCount,
} = cartSlice.actions;

export default cartSlice.reducer;
