import { fetchUser,fetchUserError,fetchUserSuccess } from "../features/products";
import { takeLatest, call, put ,fork} from 'redux-saga/effects';
import { productsApi } from "./api";


function* fetchProductsAsync() {
    try {
      const products = yield call(productsApi); // Replace with your API call
      yield put(fetchUserSuccess(products)); // Dispatch a success action
    } catch (error) {
      yield put(fetchUserError(error.message)); // Dispatch an error action
    }
  }
  
  export function* productsSaga() {
    yield takeLatest(fetchUser.type, fetchProductsAsync);
  }


  export const allProductsSaga=[fork(productsSaga)];