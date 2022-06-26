import {
  take,
  call,
  put,
  fork,
  cancel,
  cancelled,
  takeLatest,
} from "redux-saga/effects";
import { clearItem, storeItem } from "../../utils/storeData";
import { LOCAL_STORAGE } from "../../constants/storage-constants";
import * as authAPI from "../../services/api/authAPI";
import {
  AUTHENTICATION_REQUEST,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  RESET_AUTH_PENDING,
} from "../types/data-types/auth-types";

function* authorize(email, password) {
  try {
    const { user, token, refreshToken } = yield call(
      authAPI.login,
      email,
      password
    );
    yield put({ type: LOGIN_SUCCESS, payload: { user, accessToken: token } });
    yield call(storeItem, LOCAL_STORAGE, "token", token);
    yield call(storeItem, LOCAL_STORAGE, "refreshToken", refreshToken);
  } catch (error) {
    yield put({ type: LOGIN_ERROR, payload: error });
  } finally {
    if (yield cancelled()) {
      yield put({ type: RESET_AUTH_PENDING });
    }
  }
}

function* handleLogout() {
  yield put({ type: LOGOUT });
  yield call(clearItem, LOCAL_STORAGE, "token");
  yield call(clearItem, LOCAL_STORAGE, "refreshToken");
}

function* authorizeWithToken() {
  try {
    const { user } = yield call(authAPI.login);
    yield put({ type: LOGIN_SUCCESS, payload: { user } });
  } catch (error) {
    yield call(clearItem, LOCAL_STORAGE, "token");
    yield call(clearItem, LOCAL_STORAGE, "refreshToken");
    yield put({ type: LOGIN_ERROR, payload: error });
  } finally {
    if (yield cancelled()) {
      yield put({ type: RESET_AUTH_PENDING });
    }
  }
}

function* loginFlow() {
  while (true) {
    const isLogin = localStorage.getItem("user");
    if (!isLogin) {
      const { email, password } = yield take(LOGIN_REQUEST);

      // fork return a Task object
      yield fork(authorize, email, password);
    }

    yield take(LOGOUT);
    yield call(handleLogout);
  }
}

function* authenFlow() {
  while (true) {
    yield take(AUTHENTICATION_REQUEST);
    yield call(authorizeWithToken);
  }
}

const authSagaList = [fork(loginFlow), fork(authenFlow)];
export default authSagaList;
