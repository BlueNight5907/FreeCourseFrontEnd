import { LOCAL_STORAGE } from "constants/storage-constants";
import { getItem } from "utils/storeData";
import {
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  RESET_AUTH_PENDING,
  LOGOUT,
} from "../../types/data-types/auth-types";

const initState = {
  user: null,
  isLogin: false,
  accessToken: getItem(LOCAL_STORAGE, "token"),
  accountType: null,
  refreshToken: getItem(LOCAL_STORAGE, "refreshToken"),
  error: null,
  loadingLogin: false,
  loadingRegister: false,
};

const authReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loadingLogin: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        user: payload?.user,
        accessToken: payload.accessToken || state.accessToken,
        refreshToken: payload.refreshToken || state.refreshToken,
        loadingLogin: false,
      };
    case LOGIN_ERROR:
      return {
        user: null,
        isLogin: false,
        accountType: null,
        refreshToken: null,
        loadingLogin: false,
        loadingRegister: false,
        error: payload,
      };
    case RESET_AUTH_PENDING:
      return {
        ...state,
        loadingLogin: false,
        loadingRegister: false,
      };
    case LOGOUT:
      return {
        user: null,
        isLogin: false,
        accountType: null,
        refreshToken: null,
        loadingLogin: false,
        loadingRegister: false,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
