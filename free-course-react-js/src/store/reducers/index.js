import { combineReducers } from "redux";
import authReducer from "./data-reducers/auth-reducer";
import settingReducer from "./page-state/setting-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  setting: settingReducer,
});

export default rootReducer;
