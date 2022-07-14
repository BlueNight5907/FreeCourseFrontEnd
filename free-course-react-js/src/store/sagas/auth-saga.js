import { take, call, put, fork, cancelled, race } from "redux-saga/effects";
import { clearItem, storeItem } from "../../utils/storeData";
import { LOCAL_STORAGE } from "../../constants/storage-constants";
import * as authAPI from "../../services/api/authAPI";
import {
  AUTHENTICATION_REQUEST,
  AUTH_ERROR,
  CHANGE_PASSWORD_REQUEST,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_REQUEST,
  RESET_AUTH_PENDING,
  UPDATE_ACCOUNT,
} from "../types/data-types/auth-types";

function* authorize(email, password) {
  try {
    const { user, accessToken, refreshToken } = yield call(
      authAPI.login,
      email,
      password
    );
    yield put({
      type: LOGIN_SUCCESS,
      payload: { user, accessToken, refreshToken },
    });
    yield call(storeItem, LOCAL_STORAGE, "token", accessToken);
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
  yield call(clearItem, LOCAL_STORAGE, "token");
  yield call(clearItem, LOCAL_STORAGE, "refreshToken");
}

function* authorizeWithToken() {
  try {
    const { user } = yield call(authAPI.getMyAccount);
    yield put({ type: LOGIN_SUCCESS, payload: { user } });
  } catch (error) {
    yield put({ type: LOGIN_ERROR, payload: error.message });
    yield put({ type: LOGOUT });
  } finally {
    if (yield cancelled()) {
      yield put({ type: RESET_AUTH_PENDING });
    }
  }
}

function* loginFlow() {
  while (true) {
    const isLogin = localStorage.getItem("token");
    if (!isLogin) {
      const { email, password } = yield take(LOGIN_REQUEST);
      // fork return a Task object
      yield fork(authorize, email, password);
      const { error } = yield race({
        success: take(LOGIN_SUCCESS),
        error: take(LOGIN_ERROR),
      });
      if (error) {
        console.log("login Error");
        continue;
      }
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

function* registerAccount(body, callback) {
  try {
    const data = yield call(authAPI.register, body);
    callback({ success: data, error: null });
  } catch (error) {
    callback({ success: null, error: error.message });
  }
}

function* registerWatcher() {
  while (true) {
    const { body, callback } = yield take(REGISTER_REQUEST);
    yield call(registerAccount, body, callback);
  }
}

function* changePassword(body, callback) {
  try {
    const data = yield call(authAPI.changePass, body);
    callback({ success: data, error: null });
  } catch (error) {
    callback({ success: null, error: error.message });
  }
}

function* changePassWatcher() {
  while (true) {
    const { body, callback } = yield take(CHANGE_PASSWORD_REQUEST);
    yield call(changePassword, body, callback);
  }
}

function* doEditAccount(body) {
  try {
    yield call(authAPI.updateUserAccount, body);
    yield put({ type: AUTHENTICATION_REQUEST });
  } catch (error) {
    yield put({ type: AUTH_ERROR, payload: error.message });
  }
}

function* editAccountWatcher() {
  while (true) {
    const { body } = yield take(UPDATE_ACCOUNT);
    yield call(doEditAccount, body);
  }
}

const authSagaList = [
  fork(loginFlow),
  fork(authenFlow),
  fork(registerWatcher),
  fork(changePassWatcher),
  fork(editAccountWatcher),
];
export default authSagaList;
