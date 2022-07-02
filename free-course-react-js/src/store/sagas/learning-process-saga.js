import { take, call, fork, put } from "redux-saga/effects";
import {
  completeLesson,
  getAllMyCourse,
  getLearningProcess,
  getStep,
} from "services/api/courseAPI";
import {
  COMPLETE_LESSON_REQUEST,
  GET_LEARNING_PROCESS_ERROR,
  GET_LEARNING_PROCESS_REQUEST,
  GET_LEARNING_PROCESS_SUCCESS,
  GET_LESSON_DETAIL_ERROR,
  GET_LESSON_DETAIL_REQUEST,
  GET_LESSON_DETAIL_SUCCESS,
  GET_MY_COURSE_ERROR,
  GET_MY_COURSE_REQUEST,
  GET_MY_COURSE_SUCCESS,
} from "store/types/data-types/learning-process-types";

// Get teacher infor
function* getAllMyCourses() {
  try {
    const data = yield call(getAllMyCourse);
    yield put({ type: GET_MY_COURSE_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: GET_MY_COURSE_ERROR, payload: error.message });
  }
}

function* watchGetMyCourses() {
  while (true) {
    yield take(GET_MY_COURSE_REQUEST);
    yield call(getAllMyCourses);
  }
}

function* getProcess(courseId) {
  try {
    const data = yield call(getLearningProcess, courseId);
    yield put({ type: GET_LEARNING_PROCESS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: GET_LEARNING_PROCESS_ERROR, payload: error.message });
  }
}

function* watchGetLearningProcess() {
  while (true) {
    const { courseId } = yield take(GET_LEARNING_PROCESS_REQUEST);
    yield call(getProcess, courseId);
  }
}

function* getLesson(moduleId, stepId) {
  try {
    const data = yield call(getStep, moduleId, stepId);
    yield put({ type: GET_LESSON_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: GET_LESSON_DETAIL_ERROR, payload: error.message });
  }
}

function* watchGetLesson() {
  while (true) {
    const { moduleId, stepId } = yield take(GET_LESSON_DETAIL_REQUEST);
    yield call(getLesson, moduleId, stepId);
  }
}

function* doCompleteLesson(moduleId, stepId, callback) {
  try {
    yield call(completeLesson, moduleId, stepId);
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
    yield put({ type: GET_LEARNING_PROCESS_REQUEST, courseId });
    yield put({ type: GET_MY_COURSE_REQUEST });
  }
}

const learningProcessSagaList = [
  fork(watchGetMyCourses),
  fork(watchGetLearningProcess),
  fork(watchGetLesson),
  fork(watchCompleteLesson),
];
export default learningProcessSagaList;
