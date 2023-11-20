import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth";
import productSlice from "../features/products"
import cartSlice from "../features/cart";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootsaga";
import singleSlice from "../features/singleProducts"
import orderSlice from "../features/order";
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    auth: authSlice,
    products:productSlice,
    singleProduct:singleSlice,
    cart:cartSlice,
    order:orderSlice
  },
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;