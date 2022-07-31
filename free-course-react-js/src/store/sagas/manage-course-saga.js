import { call, delay, fork, put, take } from "redux-saga/effects";
import {
  createCourse,
  createLesson,
  createModule,
  deleteStep,
  editModule,
  getAllModules,
  getCourse,
  getMyCreatedCourses,
  getStep,
  removeModule,
  updateCourse,
  updateStep,
} from "services/api/courseAPI";
import {
  ADD_NEW_MODULE_ERROR,
  ADD_NEW_MODULE_REQUEST,
  CREATE_COURSE_ERROR,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_LESSON_REQUEST,
  CREATE_NEW_COURSE,
  DELETE_LESSON_REQUEST,
  EDIT_COURSE_REQUEST,
  EDIT_MODULE_REQUEST,
  GET_ALL_MODULES_ERROR,
  GET_ALL_MODULES_REQUEST,
  GET_ALL_MODULES_SUCCESS,
  GET_LESSON_DATA_ERROR,
  GET_LESSON_DATA_REQUEST,
  GET_LESSON_DATA_SUCCESS,
  GET_MY_CREATED_COURSES_ERROR,
  GET_MY_CREATED_COURSES_REQUEST,
  GET_TEACHER_COURSE_INFOR_ERROR,
  GET_TEACHER_COURSE_INFOR_REQUEST,
  GET_TEACHER_COURSE_INFOR_SUCCESS,
  REMOVE_MODULE_REQUEST,
  UPDATE_LESSON_REQUEST,
} from "store/types/data-types/manage-course-types";

function* removeModuleWorker(moduleId, courseId) {
  try {
    yield call(removeModule, courseId, moduleId);
    yield put({ type: GET_ALL_MODULES_REQUEST, courseId });
  } catch (error) {
    yield put({
      type: CREATE_COURSE_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* watchRemoveModule() {
  while (true) {
    const { moduleId, courseId } = yield take(REMOVE_MODULE_REQUEST);
    yield call(removeModuleWorker, moduleId, courseId);
  }
}

function* createNewLesson(moduleId, body, callback) {
  try {
    yield call(createLesson, moduleId, body);
    yield delay(500);
    callback();
  } catch (error) {
    yield put({
      type: CREATE_COURSE_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* watchCreateLesson() {
  while (true) {
    const { moduleId, body, callback, courseId } = yield take(
      CREATE_LESSON_REQUEST
    );
    yield call(createNewLesson, moduleId, body, callback);
    yield put({ type: GET_ALL_MODULES_REQUEST, courseId });
  }
}

function* deleteLesson(moduleId, stepId) {
  try {
    yield call(deleteStep, moduleId, stepId);
    yield delay(500);
  } catch (error) {
    yield put({
      type: CREATE_COURSE_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* watchDeleteLesson() {
  while (true) {
    const { moduleId, stepId, courseId } = yield take(DELETE_LESSON_REQUEST);
    yield call(deleteLesson, moduleId, stepId);
    yield put({ type: GET_ALL_MODULES_REQUEST, courseId });
  }
}

function* editModuleWorker(moduleId, courseId, title) {
  try {
    yield call(editModule, moduleId, { title });
    yield put({ type: GET_ALL_MODULES_REQUEST, courseId });
  } catch (error) {
    yield put({
      type: CREATE_COURSE_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* watchEditModule() {
  while (true) {
    const { moduleId, courseId, title } = yield take(EDIT_MODULE_REQUEST);
    yield call(editModuleWorker, moduleId, courseId, title);
  }
}

function* updateCurentLesson(moduleId, stepId, body, callback) {
  try {
    yield call(updateStep, moduleId, stepId, body);
    callback();
  } catch (error) {
    yield put({
      type: CREATE_COURSE_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* watchUpdateLesson() {
  while (true) {
    const { moduleId, courseId, stepId, body, callback } = yield take(
      UPDATE_LESSON_REQUEST
    );
    yield call(updateCurentLesson, moduleId, stepId, body, callback);

    yield put({ type: GET_ALL_MODULES_REQUEST, courseId });
  }
}

function* getLessonData(moduleId, stepId) {
  try {
    const data = yield call(getStep, moduleId, stepId);
    yield put({ type: GET_LESSON_DATA_SUCCESS, payload: data });
  } catch (error) {
    yield put({
      type: GET_LESSON_DATA_ERROR,
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
    const { moduleId, stepId } = yield take(GET_LESSON_DATA_REQUEST);
    yield call(getLessonData, moduleId, stepId);
  }
}

function* createCourseWorker(body, callback) {
  try {
    const course = yield call(createCourse, body);
    yield put({ type: CREATE_COURSE_SUCCESS, payload: course });
    yield delay(1000);
  } catch (error) {
    yield put({
      type: CREATE_COURSE_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* watchCreateCourse() {
  while (true) {
    const { body, callback } = yield take(CREATE_COURSE_REQUEST);
    yield call(createCourseWorker, body, callback);
  }
}

function* createModuleWorker(courseId, body, callback) {
  try {
    yield call(createModule, courseId, body);
    yield delay(500);
    callback();
    yield put({ type: GET_ALL_MODULES_REQUEST, courseId });
  } catch (error) {
    yield put({
      type: ADD_NEW_MODULE_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* watchCreateModule() {
  while (true) {
    const { body, courseId, callback } = yield take(ADD_NEW_MODULE_REQUEST);
    yield call(createModuleWorker, courseId, body, callback);
  }
}

function* getCourses(callback) {
  try {
    const data = yield call(getMyCreatedCourses);
    yield delay(1000);
    yield call(callback, data);
  } catch (error) {
    yield put({
      type: GET_MY_CREATED_COURSES_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* watchGetMyCreatedCourses() {
  while (true) {
    const { callback } = yield take(GET_MY_CREATED_COURSES_REQUEST);
    yield fork(getCourses, callback);
  }
}

function* getCourseInfor(courseId) {
  try {
    const data = yield call(getCourse, courseId);
    yield put({ type: GET_TEACHER_COURSE_INFOR_SUCCESS, payload: data });
  } catch (error) {
    yield put({
      type: GET_TEACHER_COURSE_INFOR_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* watchGetCourse() {
  while (true) {
    const { courseId } = yield take(GET_TEACHER_COURSE_INFOR_REQUEST);
    yield put({ type: CREATE_NEW_COURSE });
    yield call(getCourseInfor, courseId);
  }
}

function* updateCourseWorker(body, courseId) {
  try {
    const course = yield call(updateCourse, courseId, body);
    yield put({ type: CREATE_COURSE_SUCCESS, payload: course });
    yield delay(1000);
    // yield call(callback);
  } catch (error) {
    yield put({
      type: CREATE_COURSE_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* watchupdateCourse() {
  while (true) {
    const { body, courseId } = yield take(EDIT_COURSE_REQUEST);
    yield call(updateCourseWorker, body, courseId);
  }
}

function* getModules(courseId) {
  try {
    const data = yield call(getAllModules, courseId);
    yield put({ type: GET_ALL_MODULES_SUCCESS, payload: data.modules });
  } catch (error) {
    yield put({
      type: GET_ALL_MODULES_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* watchGetAllModules() {
  while (true) {
    const { courseId } = yield take(GET_ALL_MODULES_REQUEST);
    yield call(getModules, courseId);
  }
}

const manageCourseSagaList = [
  fork(watchCreateCourse),
  fork(watchCreateModule),
  fork(watchGetMyCreatedCourses),
  fork(watchGetCourse),
  fork(watchupdateCourse),
  fork(watchGetAllModules),
  fork(watchRemoveModule),
  fork(watchEditModule),
  fork(watchCreateLesson),
  fork(watchDeleteLesson),
  fork(watchGetLesson),
  fork(watchUpdateLesson),
];
export default manageCourseSagaList;
