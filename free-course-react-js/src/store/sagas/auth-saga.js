import { take, call, put, fork, cancel, cancelled } from "redux-saga/effects";
import { clearItem, storeItem } from "../../utils/storeData";
import { LOCAL_STORAGE } from "../../constants/storage-constants";
import * as authAPI from "../../services/api/authAPI";
import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  RESET_AUTH_PENDING,
} from "../types/data-types/auth-types";

function* authorize(username, password) {
  try {
    const user = yield call(authAPI.login, username, password);
    yield put({ type: LOGIN_SUCCESS, payload: { user } });
    yield call(storeItem, LOCAL_STORAGE, "user", user);
  } catch (error) {
    yield put({ type: LOGIN_ERROR, payload: error });
  } finally {
    if (yield cancelled()) {
      yield put({ type: RESET_AUTH_PENDING });
    }
  }
}

function* loginFlow() {
  while (true) {
    const { username, password } = yield take(LOGIN_REQUEST);
    // fork return a Task object
    const task = yield fork(authorize, username, password);
    const action = yield take([LOGOUT, LOGIN_ERROR]);
    if (action.type === LOGOUT) yield cancel(task);
    yield call(clearItem, LOCAL_STORAGE, "user");
  }
}

const authSagaList = [fork(loginFlow)];
export default authSagaList;
