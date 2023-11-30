import { all } from "redux-saga/effects";
import {
  allProductsSaga,
  singleProductsSaga,
  mainAuthSaga,
  mainitemSaga,
  mainOrderSaga,
  realsingleOrderSaga,
  mainAdminProductSaga,
  mainAdminOrderSaga,
  mainAdminAuthSaga
} from "./allProductsSaga";
export default function* rootSaga() {
  yield all([
    ...allProductsSaga,
    ...singleProductsSaga,
    ...mainAuthSaga,
    ...mainitemSaga,
    ...mainOrderSaga,
    ...realsingleOrderSaga,
    ...mainAdminProductSaga,
    ...mainAdminOrderSaga,
    ...mainAdminAuthSaga
  ]);
}
