import { TOGGLE_PAGE_MODE } from "../../types/page-types/setting-types";

const initState = {
  mode: "light",
};

const settingReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_PAGE_MODE:
      return {
        ...state,
        mode: state.mode === "light" ? "dark" : "light",
      };
    default:
      return state;
  }
};

export default settingReducer;
