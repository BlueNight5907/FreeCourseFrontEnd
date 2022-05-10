import {
  CLOSE_HOME_DRAWER_SUB_MENU,
  OPEN_HOME_DRAWER_SUB_MENU,
  SET_GO_BACK_NAV_BAR,
  SET_HEADER_TITLE,
  TOGGLE_COURSE_DRAWER,
  TOGGLE_HOME_DRAWER,
  TOGGLE_PAGE_MODE,
} from "../../types/page-types/setting-types";

const initState = {
  mode: "light",
  sideOpen: false,
  courseOpen: false,
  subMenu: null,
  goBack: false,
  headerTitle: "",
};

const settingReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_PAGE_MODE:
      return {
        ...state,
        mode: state.mode === "light" ? "dark" : "light",
      };
    case TOGGLE_HOME_DRAWER:
      return {
        ...state,
        sideOpen: !state.sideOpen,
      };
    case TOGGLE_COURSE_DRAWER:
      return {
        ...state,
        courseOpen: !state.courseOpen,
      };
    case OPEN_HOME_DRAWER_SUB_MENU:
      return {
        ...state,
        subMenu: payload.subMenu,
      };
    case CLOSE_HOME_DRAWER_SUB_MENU:
      return {
        ...state,
        subMenu: null,
      };
    case SET_GO_BACK_NAV_BAR:
      return {
        ...state,
        goBack: payload.value,
      };
    case SET_HEADER_TITLE:
      return {
        ...state,
        headerTitle: payload?.value,
      };
    default:
      return state;
  }
};

export default settingReducer;
