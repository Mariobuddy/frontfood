import { all } from 'redux-saga/effects';
import { allProductsSaga } from './allProductsSaga';
export default function* rootSaga() {
  yield all([...allProductsSaga]);
}