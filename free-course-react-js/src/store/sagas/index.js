import authSagaList from "./auth-saga";
import { all } from "redux-saga/effects";
import categorySagaList from "./category-saga";
const rootSaga = function* () {
  yield all([...authSagaList, ...categorySagaList]);
};

export default rootSaga;
