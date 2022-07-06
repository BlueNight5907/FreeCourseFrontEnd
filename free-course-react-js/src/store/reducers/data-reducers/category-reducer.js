import {
  GET_CATEGORIES_ERROR,
  GET_CATEGORIES_SUCCESS,
  GET_COURSES_ERROR,
  GET_COURSES_SUCCESS,
  GET_LEVELS_ERROR,
  GET_LEVELS_SUCCESS,
  GET_TAGS_ERROR,
  GET_TAGS_SUCCESS,
} from "store/types/data-types/category-types";

const initState = {
  categories: [],
  tags: [],
  courses: [],
  levels: [],
  total: 0,
  error: null,
};

const categoryReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LEVELS_SUCCESS:
      return {
        ...state,
        levels: payload.levels,
      };

    case GET_LEVELS_ERROR:
      return {
        ...state,
        error: payload,
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload.categories,
      };

    case GET_CATEGORIES_ERROR:
      return {
        ...state,
        error: payload,
      };
    case GET_COURSES_SUCCESS:
      return {
        ...state,
        total: payload.total,
        courses: payload.courses,
      };
    case GET_COURSES_ERROR:
      return {
        ...state,
        error: payload,
      };
    case GET_TAGS_SUCCESS:
      return {
        ...state,
        tags: payload.tags,
      };
    case GET_TAGS_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
