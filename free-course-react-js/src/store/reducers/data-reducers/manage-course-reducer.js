import { RESET_ERROR } from "store/types/data-types/common-types";
import {
  CREATE_COURSE_ERROR,
  CREATE_COURSE_SUCCESS,
  CREATE_NEW_COURSE,
  GET_ALL_MODULES_ERROR,
  GET_ALL_MODULES_SUCCESS,
  GET_LESSON_DATA_ERROR,
  GET_LESSON_DATA_SUCCESS,
  GET_TEACHER_COURSE_INFOR_ERROR,
  GET_TEACHER_COURSE_INFOR_SUCCESS,
} from "store/types/data-types/manage-course-types";

const initState = {
  courseData: null,
  modules: [],
  step: null,
  error: null,
};

const manageCourseReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case RESET_ERROR:
      return {
        ...state,
        error: null,
      };
    case CREATE_NEW_COURSE:
      return {
        ...state,
        courseData: null,
      };
    case CREATE_COURSE_SUCCESS:
      return {
        ...state,
        courseData: payload,
      };

    case GET_ALL_MODULES_SUCCESS:
      return {
        ...state,
        modules: payload,
      };
    case GET_ALL_MODULES_ERROR:
      return {
        ...state,
        error: payload,
      };
    case CREATE_COURSE_ERROR:
      return {
        ...state,
        error: payload,
      };
    case GET_TEACHER_COURSE_INFOR_SUCCESS:
      return {
        ...state,
        courseData: payload,
      };
    case GET_TEACHER_COURSE_INFOR_ERROR:
      return {
        ...state,
        error: payload,
      };
    case GET_LESSON_DATA_SUCCESS:
      return {
        ...state,
        step: payload,
      };
    case GET_LESSON_DATA_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default manageCourseReducer;
