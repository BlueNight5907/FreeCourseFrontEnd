import { call, delay, fork, put, take } from "redux-saga/effects";
import { createCourse, createModule } from "services/api/courseAPI";
import {
  ADD_NEW_MODULE_ERROR,
  ADD_NEW_MODULE_REQUEST,
  ADD_NEW_MODULE_SUCCESS,
  CREATE_COURSE_ERROR,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
} from "store/types/data-types/manage-course-types";

function* createCourseWorker(body, callback) {
  try {
    const course = yield call(createCourse, body);
    yield put({ type: CREATE_COURSE_SUCCESS, payload: course });
    yield delay(1000);
    // yield call(callback);
  } catch (error) {
    yield put({ type: CREATE_COURSE_ERROR, payload: error.message });
  }
}

function* watchCreateCourse() {
  while (true) {
    const { body, callback } = yield take(CREATE_COURSE_REQUEST);
    yield call(createCourseWorker, body, callback);
  }
}

function* createModuleWorker(courseId, body) {
  try {
    const course = yield call(createModule, courseId, body);
    yield put({ type: ADD_NEW_MODULE_SUCCESS, payload: course });
    yield delay(1000);
    // yield call(callback);
  } catch (error) {
    yield put({ type: ADD_NEW_MODULE_ERROR, payload: error.message });
  }
}

function* watchCreateModule() {
  while (true) {
    const { body, courseId } = yield take(ADD_NEW_MODULE_REQUEST);
    yield call(createModuleWorker, courseId, body);
  }
}

const manageCourseSagaList = [fork(watchCreateCourse), fork(watchCreateModule)];
export default manageCourseSagaList;
