import { RESET_ERROR } from "store/types/data-types/common-types";
import {
  GET_ALL_LESSON_COMMENT_ERROR,
  GET_ALL_LESSON_COMMENT_SUCCESS,
  GET_LEARNING_PROCESS_ERROR,
  GET_LEARNING_PROCESS_SUCCESS,
  GET_LESSON_DETAIL_ERROR,
  GET_LESSON_DETAIL_REQUEST,
  GET_LESSON_DETAIL_SUCCESS,
  GET_MY_COURSE_ERROR,
  GET_MY_COURSE_SUCCESS,
  SET_COMPLETED,
  SET_LEARN,
} from "store/types/data-types/learning-process-types";

const initState = {
  learned: [],
  lessonDetail: null,
  comments: [],
  isLearned: false,
  process: null,
  error: null,
  completed: false,
};

const learningProcessReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LEARN:
      return {
        ...state,
        isLearned: payload,
      };
    case SET_COMPLETED:
      return {
        ...state,
        completed: payload,
      };
    case RESET_ERROR:
      return {
        ...state,
        error: null,
      };
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
    case GET_LESSON_DETAIL_REQUEST:
      return {
        ...state,
        lessonDetail: null,
        error: null,
      };
    case GET_ALL_LESSON_COMMENT_SUCCESS:
      return {
        ...state,
        comments: payload,
        error: null,
      };
    case GET_ALL_LESSON_COMMENT_ERROR:
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
