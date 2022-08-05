import { take, call, fork, put } from "redux-saga/effects";
import {
  completeLesson,
  deleteLessonCommentRequest,
  getAllMyCourse,
  getLearningProcess,
  getLessonComment,
  getStep,
  sendLessonComment,
} from "services/api/courseAPI";
import {
  ADD_LESSON_COMMENT,
  COMPLETE_LESSON_REQUEST,
  DELETE_LESSON_COMMENT,
  GET_ALL_LESSON_COMMENT_ERROR,
  GET_ALL_LESSON_COMMENT_REQUEST,
  GET_ALL_LESSON_COMMENT_SUCCESS,
  GET_LEARNING_PROCESS_ERROR,
  GET_LEARNING_PROCESS_REQUEST,
  GET_LEARNING_PROCESS_SUCCESS,
  GET_LESSON_DETAIL_ERROR,
  GET_LESSON_DETAIL_REQUEST,
  GET_LESSON_DETAIL_SUCCESS,
  GET_MY_COURSE_ERROR,
  GET_MY_COURSE_REQUEST,
  GET_MY_COURSE_SUCCESS,
  SET_COMPLETED,
} from "store/types/data-types/learning-process-types";

// Get teacher infor
function* getAllMyCourses(area) {
  try {
    const data = yield call(getAllMyCourse, area);
    yield put({ type: GET_MY_COURSE_SUCCESS, payload: data });
  } catch (error) {
    yield put({
      type: GET_MY_COURSE_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* watchGetMyCourses() {
  while (true) {
    const { area } = yield take(GET_MY_COURSE_REQUEST);
    yield fork(getAllMyCourses, area);
  }
}

function* senMyComment(moduleId, stepId, comment) {
  try {
    const data = yield call(sendLessonComment, moduleId, stepId, comment);
    yield put({
      type: GET_ALL_LESSON_COMMENT_SUCCESS,
      payload: data.comments?.reverse() || [],
    });
  } catch (error) {
    yield put({
      type: GET_ALL_LESSON_COMMENT_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* watchSendComment() {
  while (true) {
    const { moduleId, stepId, comment } = yield take(ADD_LESSON_COMMENT);
    yield call(senMyComment, moduleId, stepId, comment);
  }
}

function* getAllLessonComment(moduleId, stepId) {
  try {
    const data = yield call(getLessonComment, moduleId, stepId);
    yield put({
      type: GET_ALL_LESSON_COMMENT_SUCCESS,
      payload: data.comments?.reverse() || [],
    });
  } catch (error) {
    yield put({
      type: GET_ALL_LESSON_COMMENT_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* watchGetAllComment() {
  while (true) {
    const { moduleId, stepId } = yield take(GET_ALL_LESSON_COMMENT_REQUEST);
    yield call(getAllLessonComment, moduleId, stepId);
  }
}

function* getProcess(courseId, area) {
  try {
    const data = yield call(getLearningProcess, courseId, area);
    yield put({ type: GET_LEARNING_PROCESS_SUCCESS, payload: data });
  } catch (error) {
    yield put({
      type: GET_LEARNING_PROCESS_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* watchGetLearningProcess() {
  while (true) {
    const { courseId, area } = yield take(GET_LEARNING_PROCESS_REQUEST);
    yield fork(getProcess, courseId, area);
  }
}

function* getLesson(moduleId, stepId) {
  try {
    const data = yield call(getStep, moduleId, stepId);
    yield put({ type: GET_LESSON_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    yield put({
      type: GET_LESSON_DETAIL_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* watchGetLesson() {
  while (true) {
    const { moduleId, stepId } = yield take(GET_LESSON_DETAIL_REQUEST);
    yield fork(getLesson, moduleId, stepId);
  }
}

function* doCompleteLesson(moduleId, stepId, callback) {
  try {
    const { isCompleted } = yield call(completeLesson, moduleId, stepId);
    if (isCompleted) {
      yield put({ type: SET_COMPLETED, payload: isCompleted });
    }
    callback(true);
  } catch (error) {
    callback(false);
  }
}

function* watchCompleteLesson() {
  while (true) {
    const { moduleId, stepId, courseId, callback } = yield take(
      COMPLETE_LESSON_REQUEST
    );
    yield call(doCompleteLesson, moduleId, stepId, callback);
    yield put({
      type: GET_LEARNING_PROCESS_REQUEST,
      courseId,
      area: "nothing",
    });
    yield put({ type: GET_MY_COURSE_REQUEST, area: "nothing" });
  }
}
function* deleteLessonComment(moduleId, stepId, commentId) {
  try {
    yield call(deleteLessonCommentRequest, moduleId, stepId, commentId);
    yield put({ type: GET_ALL_LESSON_COMMENT_REQUEST, moduleId, stepId });
  } catch (error) {
    yield put({
      type: GET_LESSON_DETAIL_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* watchDeleteComment() {
  while (true) {
    const { moduleId, stepId, commentId } = yield take(DELETE_LESSON_COMMENT);
    yield call(deleteLessonComment, moduleId, stepId, commentId);
  }
}
const learningProcessSagaList = [
  fork(watchGetMyCourses),
  fork(watchGetLearningProcess),
  fork(watchGetLesson),
  fork(watchCompleteLesson),
  fork(watchSendComment),
  fork(watchGetAllComment),
  fork(watchDeleteComment),
];
export default learningProcessSagaList;
