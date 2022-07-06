import {
  CREATE_COURSE_ERROR,
  CREATE_COURSE_SUCCESS,
  CREATE_NEW_COURSE,
  GET_TEACHER_COURSE_INFOR_ERROR,
  GET_TEACHER_COURSE_INFOR_SUCCESS,
} from "store/types/data-types/manage-course-types";

const initState = {
  courseData: null,
  modules: null,
  step: null,
  error: null,
};

const manageCourseReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
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

    default:
      return state;
  }
};

export default manageCourseReducer;
