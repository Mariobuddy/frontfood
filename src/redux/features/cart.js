import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalItemCount: 0,
    gross: 0,
    shippingDetails: {
      address: "",
      pincode: "",
      phone: "",
      country: "",
      state: "",
      city: "",
    },
  },

  reducers: {
    shippingUpdate: (state, action) => {
      state.shippingDetails = action.payload;
    },
    addToCart: (state, action) => {
      const { data, gcount, id } = action.payload;
      let obj = {
        name: data?.product?.name,
        image: data?.product?.images[0]?.url,
        product: data?.product._id,
        price: data?.product?.price,
        quantity: gcount,
      };
      const existingItem = state.items.find((item) => item.product === id);
      if (existingItem) {
        existingItem.quantity += gcount;
      } else {
        state.items.push(obj);
      }
      state.totalItemCount = state.items.reduce((acc, cur) => {
        return acc + cur.quantity;
      }, 0);
      state.gross = state.items.reduce((acc, cur) => {
        return acc + cur.price * cur.quantity;
      }, 0);
    },
    setCount: (state, action) => {
      state.totalItemCount = action.payload[0];
      state.gross = action.payload[1];
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((val) => {
        return val.product !== action.payload;
      });
      state.totalItemCount = state.items.reduce((acc, cur) => {
        return acc + cur.quantity;
      }, 0);
      state.gross = state.items.reduce((acc, cur) => {
        return acc + cur.price * cur.quantity;
      }, 0);
    },
    clearAll: (state) => {
      state.items = [];
      state.totalItemCount = state.items.reduce((acc, cur) => {
        return acc + cur.quantity;
      }, 0);
      state.gross = state.items.reduce((acc, cur) => {
        return acc + cur.price * cur.quantity;
      }, 0);
    },
    updateLocalStorage: (state, action) => {
      state.items = action.payload[0];
      state.shippingDetails = action.payload[1];
    },
    decreaseItem: (state, action) => {
      const item = state.items.find((item) => item.product === action.payload);
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        item.quantity = 1;
      }
      state.totalItemCount = state.items.reduce((acc, cur) => {
        return acc + cur.quantity;
      }, 0);
      state.gross = state.items.reduce((acc, cur) => {
        return acc + cur.price * cur.quantity;
      }, 0);
    },
    increaseItem: (state, action) => {
      const item = state.items.find((item) => item.product === action.payload);
      item.quantity += 1;
      state.totalItemCount = state.items.reduce((acc, cur) => {
        return acc + cur.quantity;
      }, 0);
      state.gross = state.items.reduce((acc, cur) => {
        return acc + cur.price * cur.quantity;
      }, 0);
    },
    removeAllCart: (state) => {
      state.items = [];
      state.gross = 0;
      state.totalItemCount = 0;
      state.shippingDetails = {
        address: "",
        pincode: "",
        phone: "",
        country: "",
        state: "",
        city: "",
      };
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
  shippingUpdate,
  removeAllCart
} = cartSlice.actions;

export default cartSlice.reducer;
