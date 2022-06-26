import { combineReducers } from "redux";
import authReducer from "./data-reducers/auth-reducer";
import categoryReducer from "./data-reducers/category-reducer";
import settingReducer from "./page-state/setting-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  setting: settingReducer,
  category: categoryReducer,
});

export default rootReducer;
