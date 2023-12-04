import {
  fetchUser,
  fetchUserError,
  fetchUserSuccess,
  fetchAdminProduct,
  fetchAdminProductError,
  fetchAdminProductSuccess,
  fetchReview,
  fetchReviewError,
  fetchReviewSuccess,
} from "../features/products";
import {
  fetchSingle,
  fetchSingleError,
  fetchSingleSuccess,
} from "../features/singleProducts";
import {
  fetchOrderError,
  fetchOrder,
  fetchOrderSuccess,
  fetchSingleOrderError,
  fetchSingleOrder,
  fetchSingleOrderSuccess,
  fetchAdminOrder,
  fetchAdminOrderSuccess,
  fetchAdminOrderError,
} from "../features/order";
import {
  fetchAuth,
  fetchAuthError,
  fetchAuthSuccess,
  fetchAdminAuth,
  fetchAdminAuthError,
  fetchAdminAuthSuccess,
  fetchAuthSingleAuth,
  fetchAuthSingleError,
  fetchAuthSingleSuccess,
} from "../features/auth";
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
  shippingUpdate,
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
      `https://rohit-backend-ecommerce.onrender.com/api/products?page=${page}&minPrice=${minPrice}&maxPrice=${maxPrice}&category=${category}&brand=${brand}&sortBy=${sort}&minStar=${minStar}&maxStar=${maxStar}&name=${search}`
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
      `https://rohit-backend-ecommerce.onrender.com/api/products/${action.payload}`,
      {
        method: "GET",
        withCredentials: true,
      }
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
    const auth = yield axios.get(
      `https://rohit-backend-ecommerce.onrender.com/profile`,
      {
        method: "GET",
        withCredentials: true,
      }
    ); // Replace with your API call
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
      yield put(updateLocalStorage([parsedItems, parsedItems2]));
      let count = parsedItems.reduce((acc, cur) => {
        return acc + cur.quantity;
      }, 0);
      let gross = parsedItems.reduce((acc, cur) => {
        return acc + cur.price * cur.quantity;
      }, 0);
      yield put(setCount([count, gross]));
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

function* fetchOrderAsync() {
  try {
    const myOrder = yield axios.get(
      `https://rohit-backend-ecommerce.onrender.com/myorder`,
      {
        method: "GET",
        withCredentials: true,
      }
    ); // Replace with your API call
    yield put(fetchOrderSuccess(myOrder.data.order)); // Dispatch a success action
  } catch (error) {
    yield put(fetchOrderError(error.message)); // Dispatch an error action
  }
}

export function* OrderSaga() {
  yield takeLatest(fetchOrder.type, fetchOrderAsync);
}

export const mainOrderSaga = [fork(OrderSaga)];

function* fetchSingleOrderAsync(action) {
  try {
    const singleOrder = yield axios.get(
      `https://rohit-backend-ecommerce.onrender.com/singleorder/${action.payload}`,
      {
        method: "GET",
        withCredentials: true,
      }
    ); // Replace with your API call
    yield put(fetchSingleOrderSuccess(singleOrder.data.order)); // Dispatch a success action
  } catch (error) {
    yield put(fetchSingleOrderError(error.message)); // Dispatch an error action
  }
}

export function* singleOrderSaga() {
  yield takeLatest(fetchSingleOrder.type, fetchSingleOrderAsync);
}

export const realsingleOrderSaga = [fork(singleOrderSaga)];

function* fetchAdminProductAsync() {
  try {
    const admin = yield axios.get(
      "https://rohit-backend-ecommerce.onrender.com/api/products/admin/allproducts",
      {
        method: "GET",
        withCredentials: true,
      }
    ); // Replace with your API call
    yield put(fetchAdminProductSuccess(admin.data.allProducts)); // Dispatch a success action
  } catch (error) {
    yield put(fetchAdminProductError(error.message)); // Dispatch an error action
  }
}

export function* adminProductSaga() {
  yield takeLatest(fetchAdminProduct.type, fetchAdminProductAsync);
}

export const mainAdminProductSaga = [fork(adminProductSaga)];

function* fetchAdminOrderAsync() {
  try {
    const adminOrder = yield axios.get(
      "https://rohit-backend-ecommerce.onrender.com/admin/allorder",
      {
        method: "GET",
        withCredentials: true,
      }
    ); // Replace with your API call
    yield put(fetchAdminOrderSuccess(adminOrder.data.order)); // Dispatch a success action
  } catch (error) {
    yield put(fetchAdminOrderError(error.message)); // Dispatch an error action
  }
}

export function* adminOrderSaga() {
  yield takeLatest(fetchAdminOrder.type, fetchAdminOrderAsync);
}

export const mainAdminOrderSaga = [fork(adminOrderSaga)];

function* fetchAdminAuthAsync() {
  try {
    const adminAuth = yield axios.get(
      "https://rohit-backend-ecommerce.onrender.com/api/products/admin/alluser",
      {
        method: "GET",
        withCredentials: true,
      }
    ); // Replace with your API call
    yield put(fetchAdminAuthSuccess(adminAuth.data.allUser)); // Dispatch a success action
  } catch (error) {
    yield put(fetchAdminAuthError(error.message)); // Dispatch an error action
  }
}

export function* adminAuthSaga() {
  yield takeLatest(fetchAdminAuth.type, fetchAdminAuthAsync);
}

export const mainAdminAuthSaga = [fork(adminAuthSaga)];

function* fetchAuthSingleAsync(action) {
  try {
    const authSingle = yield axios.get(
      `https://rohit-backend-ecommerce.onrender.com/api/products/admin/singleuser/${action.payload}`,
      {
        method: "GET",
        withCredentials: true,
      }
    ); // Replace with your API call
    yield put(fetchAuthSingleSuccess(authSingle.data.singleUser)); // Dispatch a success action
  } catch (error) {
    yield put(fetchAuthSingleError(error.message)); // Dispatch an error action
  }
}

export function* singleAuthSaga() {
  yield takeLatest(fetchAuthSingleAuth.type, fetchAuthSingleAsync);
}

export const realSingleAuthSaga = [fork(singleAuthSaga)];

function* fetchReviewAsync(action) {
  try {
    const review = yield axios.get(
      `https://rohit-backend-ecommerce.onrender.com/api/products/admin/getreview?productId=${action.payload}`,
      {
        method: "GET",
        withCredentials: true,
      }
    ); // Replace with your API call
    yield put(fetchReviewSuccess(review.data.review)); // Dispatch a success action
  } catch (error) {
    yield put(fetchReviewError(error.message)); // Dispatch an error action
  }
}

export function* reviewSaga() {
  yield takeLatest(fetchReview.type, fetchReviewAsync);
}

export const realReview = [fork(reviewSaga)];
