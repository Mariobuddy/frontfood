import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth";
import productSlice from "../features/products"
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootsaga";
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    auth: authSlice,
    products:productSlice
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export default store;