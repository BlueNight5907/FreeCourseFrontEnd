import { take, call, fork, put } from "redux-saga/effects";
import { getAllMyCourse } from "services/api/courseAPI";
import {
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

const learningProcessSagaList = [fork(watchGetMyCourses)];
export default learningProcessSagaList;
