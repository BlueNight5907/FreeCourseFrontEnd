import { RESET_ERROR } from "store/types/data-types/common-types";
import {
  GET_COURSES_WITH_CATEGORY_ERROR,
  GET_COURSES_WITH_CATEGORY_SUCCESS,
  GET_COURSE_COMMENTS_ERROR,
  GET_COURSE_COMMENTS_SUCCESS,
  GET_COURSE_DETAIL_ERROR,
  GET_COURSE_DETAIL_REQUEST,
  GET_COURSE_DETAIL_SUCCESS,
  GET_TEACHER_INFOR_ERROR,
  GET_TEACHER_INFOR_SUCCESS,
} from "store/types/data-types/course-detail-types";

const initState = {
  teacher: null,
  courseDetail: null,
  category: null,
  courses: [],
  comments: [],
  error: null,
};

const courseDetailReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case RESET_ERROR:
      return {
        ...state,
        error: null,
      };
    case GET_COURSE_DETAIL_REQUEST:
      return {
        teacher: null,
        courseDetail: null,
        category: null,
        courses: [],
        comments: [],
        error: null,
      };
    case GET_COURSE_DETAIL_SUCCESS:
      return {
        ...state,
        category: payload?.category,
        courseDetail: payload,
        error: null,
      };

    case GET_COURSE_DETAIL_ERROR:
      return {
        ...state,
        error: payload,
      };
    case GET_TEACHER_INFOR_SUCCESS:
      return {
        ...state,
        teacher: payload,
        error: null,
      };
    case GET_TEACHER_INFOR_ERROR:
      return {
        ...state,
        error: payload,
      };
    case GET_COURSE_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: payload,
        error: null,
      };
    case GET_COURSE_COMMENTS_ERROR:
      return {
        ...state,
        error: payload,
      };
    case GET_COURSES_WITH_CATEGORY_SUCCESS:
      return {
        ...state,
        courses: payload,
        error: null,
      };
    case GET_COURSES_WITH_CATEGORY_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default courseDetailReducer;
