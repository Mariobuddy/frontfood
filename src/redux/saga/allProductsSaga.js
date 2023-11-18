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
import { fetchAuth, fetchAuthError, fetchAuthSuccess } from "../features/auth";
import { takeLatest, put, fork, call, select } from "redux-saga/effects";
import axios from "axios";
import {
  addToCart,
  updateLocalStorage,
  getItems,
  setCount,
  increaseItem,
  decreaseItem,
  removeFromCart,
  clearAll,
  shippingUpdate
} from "../features/cart";

function* fetchProductsAsync(action) {
  const {
    page,
    maxPrice,
    minPrice,
    category,
    brand,
    sort,
    minStar,
    maxStar,
    search,
  } = action.payload;
  try {
    const products = yield axios.get(
      `http://localhost:4000/api/products?page=${page}&minPrice=${minPrice}&maxPrice=${maxPrice}&category=${category}&brand=${brand}&sortBy=${sort}&minStar=${minStar}&maxStar=${maxStar}&name=${search}`
    ); // Replace with your API call
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

function* fetchAuthAsync() {
  try {
    const auth = yield axios.get(`http://localhost:4000/profile`, {
      method: "GET",
      withCredentials: true,
    }); // Replace with your API call
    yield put(fetchAuthSuccess(auth.data)); // Dispatch a success action
  } catch (error) {
    yield put(fetchAuthError(error.message)); // Dispatch an error action
  }
}

export function* authSaga() {
  yield takeLatest(fetchAuth.type, fetchAuthAsync);
}

export const mainAuthSaga = [fork(authSaga)];

function* storeItemInLocalStorage() {
  const items = yield select((state) => state.cart.items);
  try {
    yield call([localStorage, "setItem"], "cartItems", JSON.stringify(items));
  } catch (error) {
    console.error("Error storing items in localStorage:", error);
  }
}

function* storeShipInLocalStorage() {
  const items = yield select((state) => state.cart.shippingDetails);
  try {
    yield call([localStorage, "setItem"], "shipItems", JSON.stringify(items));
  } catch (error) {
    console.error("Error storing items in localStorage:", error);
  }
}

function* retrieveItemsFromLocalStorage() {
  try {
    const storedItems = yield call([localStorage, "getItem"], "cartItems");
    const storedShip = yield call([localStorage, "getItem"], "shipItems");
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      const parsedItems2 = JSON.parse(storedShip);
      yield put(updateLocalStorage([parsedItems,parsedItems2]));
      let count = parsedItems.reduce((acc, cur) => {
        return acc + cur.gcount;
      }, 0);
      let gross = parsedItems.reduce((acc, cur) => {
        return acc + cur.price * cur.gcount;
      }, 0);
      yield put(setCount([count,gross]));
    }
  } catch (error) {
    console.error("Error retrieving items from localStorage:", error);
  }
}

export function* itemSaga() {
  yield takeLatest(
    [
      addToCart.type,
      increaseItem.type,
      decreaseItem.type,
      removeFromCart.type,
      clearAll.type,
    ],
    storeItemInLocalStorage
  );
  yield takeLatest([getItems.type], retrieveItemsFromLocalStorage);
  yield takeLatest([shippingUpdate.type], storeShipInLocalStorage);

}

export const mainitemSaga = [fork(itemSaga)];
