import {
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  RESET_AUTH_PENDING,
} from "../../types/data-types/auth-types";

const initState = {
  user: {},
  isLogin: false,
  accountType: null,
  refreshToken: null,
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
      console.log(action);
      return {
        ...state,
        isLogin: true,
        user: payload?.user,
        loadingLogin: false,
      };
    case LOGIN_ERROR:
      return {
        user: {},
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
    default:
      return state;
  }
};

export default authReducer;
