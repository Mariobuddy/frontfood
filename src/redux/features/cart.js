import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalItemCount: 0,
    gross: 0,
    shippingDetails:{
      address:"",
      pincode:"",
      phone:"",
      country:"",
      state:"",
      city:""
    }
  },

  reducers: {
    shippingUpdate:(state,action)=>{
      state.shippingDetails=action.payload;
    },
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
      state.gross = state.items.reduce((acc, cur) => {
        return acc + cur.price * cur.gcount;
      }, 0);
    },
    setCount: (state, action) => {
      state.totalItemCount = action.payload[0];
      state.gross = action.payload[1];
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((val) => {
        return val._id !== action.payload;
      });
      state.totalItemCount = state.items.reduce((acc, cur) => {
        return acc + cur.gcount;
      }, 0);
      state.gross = state.items.reduce((acc, cur) => {
        return acc + cur.price * cur.gcount;
      }, 0);
    },
    clearAll: (state) => {
      state.items = [];
      state.totalItemCount = state.items.reduce((acc, cur) => {
        return acc + cur.gcount;
      }, 0);
      state.gross = state.items.reduce((acc, cur) => {
        return acc + cur.price * cur.gcount;
      }, 0);
    },
    updateLocalStorage: (state, action) => {
      state.items = action.payload[0];
      state.shippingDetails=action.payload[1]
    },
    decreaseItem: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item.gcount > 1) {
        item.gcount -= 1;
      } else {
        item.gcount = 1;
      }
      state.totalItemCount = state.items.reduce((acc, cur) => {
        return acc + cur.gcount;
      }, 0);
      state.gross = state.items.reduce((acc, cur) => {
        return acc + cur.price * cur.gcount;
      }, 0);
    },
    increaseItem: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      item.gcount += 1;
      state.totalItemCount = state.items.reduce((acc, cur) => {
        return acc + cur.gcount;
      }, 0);
      state.gross = state.items.reduce((acc, cur) => {
        return acc + cur.price * cur.gcount;
      }, 0);
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
  decreaseItem,
  increaseItem,
  shippingUpdate
} = cartSlice.actions;

export default cartSlice.reducer;
