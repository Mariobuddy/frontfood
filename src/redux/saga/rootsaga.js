import { all } from 'redux-saga/effects';
import { allProductsSaga,singleProductsSaga,mainAuthSaga } from './allProductsSaga';
export default function* rootSaga() {
  yield all([...allProductsSaga,...singleProductsSaga,...mainAuthSaga]);
}