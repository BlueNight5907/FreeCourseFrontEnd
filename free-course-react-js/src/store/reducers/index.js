import { combineReducers } from "redux";
import authReducer from "./data-reducers/auth-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
