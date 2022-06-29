import { take, call, put, fork, delay } from "redux-saga/effects";
import { getAccountInfor } from "services/api/accountAPI";
import {
  getCourseDetail,
  getCoursesWithCategory,
  joinCourse,
} from "services/api/courseAPI";
import {
  GET_COURSES_WITH_CATEGORY_ERROR,
  GET_COURSES_WITH_CATEGORY_REQUEST,
  GET_COURSES_WITH_CATEGORY_SUCCESS,
  GET_COURSE_DETAIL_ERROR,
  GET_COURSE_DETAIL_REQUEST,
  GET_COURSE_DETAIL_SUCCESS,
  GET_TEACHER_INFOR_ERROR,
  GET_TEACHER_INFOR_REQUEST,
  GET_TEACHER_INFOR_SUCCESS,
  JOIN_COURSE_REQUEST,
} from "store/types/data-types/course-detail-types";
import { GET_MY_COURSE_REQUEST } from "store/types/data-types/learning-process-types";

// Get course detail
function* getCourse(courseId) {
  try {
    const courseDetail = yield call(getCourseDetail, courseId);
    yield put({ type: GET_COURSE_DETAIL_SUCCESS, payload: courseDetail });
  } catch (error) {
    yield put({ type: GET_COURSE_DETAIL_ERROR, payload: error.message });
  }
}

function* watchGetCourse() {
  while (true) {
    const { courseId } = yield take(GET_COURSE_DETAIL_REQUEST);
    yield call(getCourse, courseId);
  }
}

// Get teacher infor
function* getTeacherInfor(teacherId) {
  try {
    const teacher = yield call(getAccountInfor, teacherId);
    yield put({ type: GET_TEACHER_INFOR_SUCCESS, payload: teacher });
  } catch (error) {
    yield put({ type: GET_TEACHER_INFOR_ERROR, payload: error.message });
  }
}

function* watchGetTeacherInfor() {
  while (true) {
    const { teacherId } = yield take(GET_TEACHER_INFOR_REQUEST);
    yield call(getTeacherInfor, teacherId);
  }
}

// Get course list
function* fetchCourseList(category, params) {
  try {
    const { data } = yield call(getCoursesWithCategory, category, params);
    yield put({
      type: GET_COURSES_WITH_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_COURSES_WITH_CATEGORY_ERROR,
      payload: error.message,
    });
  }
}

function* watchFetchCourseList() {
  while (true) {
    const { params, category } = yield take(GET_COURSES_WITH_CATEGORY_REQUEST);
    yield call(fetchCourseList, category, params);
  }
}

function* doJoinCourse(id, callback) {
  try {
    yield call(joinCourse, id);
    yield put({ type: GET_MY_COURSE_REQUEST });
    yield delay(1000);
    yield call(callback);
  } catch (error) {}
}

function* watchJoinCourse() {
  while (true) {
    const { courseId, callback } = yield take(JOIN_COURSE_REQUEST);
    yield call(doJoinCourse, courseId, callback);
  }
}

const courseDetailSagaList = [
  fork(watchGetCourse),
  fork(watchGetTeacherInfor),
  fork(watchFetchCourseList),
  fork(watchJoinCourse),
];
export default courseDetailSagaList;
