import authSagaList from "./auth-saga";
import { all } from "redux-saga/effects";
const rootSaga = function* () {
  yield all([...authSagaList]);
};

export default rootSaga;
