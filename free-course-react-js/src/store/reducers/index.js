import { combineReducers } from "redux";
import authReducer from "./data-reducers/auth-reducer";
import categoryReducer from "./data-reducers/category-reducer";
import settingReducer from "./page-state/setting-reducer";
import courseDetailReducer from "./data-reducers/course-detail-reducer";
import learningProcessReducer from "./data-reducers/learning-process-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  setting: settingReducer,
  category: categoryReducer,
  courseDetail: courseDetailReducer,
  learningProcess: learningProcessReducer,
});

export default rootReducer;
