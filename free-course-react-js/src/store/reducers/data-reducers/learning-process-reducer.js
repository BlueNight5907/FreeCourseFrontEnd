import {
  GET_LEARNING_PROCESS_ERROR,
  GET_LEARNING_PROCESS_SUCCESS,
  GET_LESSON_DETAIL_ERROR,
  GET_LESSON_DETAIL_SUCCESS,
  GET_MY_COURSE_ERROR,
  GET_MY_COURSE_SUCCESS,
} from "store/types/data-types/learning-process-types";

const initState = {
  learned: [],
  lessonDetail: null,
  process: null,
  error: null,
};

const learningProcessReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_MY_COURSE_SUCCESS:
      return {
        ...state,
        learned: payload,
        error: null,
      };
    case GET_MY_COURSE_ERROR:
      return {
        ...state,
        error: payload,
      };

    case GET_LEARNING_PROCESS_SUCCESS:
      return {
        ...state,
        process: payload,
        error: null,
      };
    case GET_LEARNING_PROCESS_ERROR:
      return {
        ...state,
        error: payload,
      };
    case GET_LESSON_DETAIL_SUCCESS:
      return {
        ...state,
        lessonDetail: payload,
        error: null,
      };
    case GET_LESSON_DETAIL_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default learningProcessReducer;
