import {
  fetchUser,
  fetchUserError,
  fetchUserSuccess,
} from "../features/products";
import {
  fetchSingle,
  fetchSingleError,
  fetchSingleSuccess,
} from "../features/singleProducts";
import { takeLatest, put, fork } from "redux-saga/effects";
import axios from "axios";

function* fetchProductsAsync() {
  try {
    const products = yield axios.get(`http://localhost:4000/api/products`); // Replace with your API call
    yield put(fetchUserSuccess(products.data)); // Dispatch a success action
  } catch (error) {
    yield put(fetchUserError(error.message)); // Dispatch an error action
  }
}

export function* productsSaga() {
  yield takeLatest(fetchUser.type, fetchProductsAsync);
}

export const allProductsSaga = [fork(productsSaga)];

function* fetchSingleAsync(action) {
  try {
    const singleproduct = yield axios.get(
      `http://localhost:4000/api/products/${action.payload}`
    ); // Replace with your API call
    yield put(fetchSingleSuccess(singleproduct.data)); // Dispatch a success action
  } catch (error) {
    yield put(fetchSingleError(error.message)); // Dispatch an error action
  }
}

export function* singleSaga() {
  yield takeLatest(fetchSingle.type, fetchSingleAsync);
}

export const singleProductsSaga = [fork(singleSaga)];
