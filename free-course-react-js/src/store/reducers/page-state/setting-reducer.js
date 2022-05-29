import {
  CLOSE_HOME_DRAWER_SUB_MENU,
  CLOSE_PAGE_SETTING,
  OPEN_HOME_DRAWER_SUB_MENU,
  OPEN_PAGE_SETTING,
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
  pageLoading: false,
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
    case OPEN_PAGE_SETTING:
      return {
        ...state,
        pageLoading: true,
      };
    case CLOSE_PAGE_SETTING:
      return {
        ...state,
        pageLoading: false,
      };
    default:
      return state;
  }
};

export default settingReducer;
