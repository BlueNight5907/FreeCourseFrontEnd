import { take, call, put, fork, delay, takeLatest } from "redux-saga/effects";
import { getAccountInfor } from "services/api/accountAPI";
import {
  getAllStudent,
  getCourseComments,
  getCourseDetail,
  getCoursesWithCategory,
  getNewStudent,
  joinCourse,
  ratingCourse,
  sendCourseComment,
} from "services/api/courseAPI";
import {
  ADD_COURSE_COMMENT_REQUEST,
  GET_ALL_STUDENT_REQUEST,
  GET_COURSES_WITH_CATEGORY_ERROR,
  GET_COURSES_WITH_CATEGORY_REQUEST,
  GET_COURSES_WITH_CATEGORY_SUCCESS,
  GET_COURSE_COMMENTS_ERROR,
  GET_COURSE_COMMENTS_REQUEST,
  GET_COURSE_COMMENTS_SUCCESS,
  GET_COURSE_DETAIL_ERROR,
  GET_COURSE_DETAIL_REQUEST,
  GET_COURSE_DETAIL_SUCCESS,
  GET_NEW_STUDENT_REQUEST,
  GET_TEACHER_INFOR_ERROR,
  GET_TEACHER_INFOR_REQUEST,
  GET_TEACHER_INFOR_SUCCESS,
  JOIN_COURSE_REQUEST,
  RATING_COURSE_REQUEST,
} from "store/types/data-types/course-detail-types";
import { GET_MY_COURSE_REQUEST } from "store/types/data-types/learning-process-types";

// Get course detail
function* getCourse(courseId) {
  try {
    const courseDetail = yield call(getCourseDetail, courseId);
    yield put({ type: GET_COURSE_DETAIL_SUCCESS, payload: courseDetail });
  } catch (error) {
    yield put({
      type: GET_COURSE_DETAIL_ERROR,
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
    const { courseId } = yield take(GET_COURSE_DETAIL_REQUEST);
    yield fork(getCourse, courseId);
  }
}

// Get teacher infor
function* getTeacherInfor(teacherId) {
  try {
    const teacher = yield call(getAccountInfor, teacherId);
    yield put({ type: GET_TEACHER_INFOR_SUCCESS, payload: teacher });
  } catch (error) {
    yield put({
      type: GET_TEACHER_INFOR_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* watchGetTeacherInfor() {
  while (true) {
    const { teacherId } = yield take(GET_TEACHER_INFOR_REQUEST);
    yield fork(getTeacherInfor, teacherId);
  }
}

// Get teacher infor
function* addNewComment(courseId, comment) {
  try {
    yield call(sendCourseComment, courseId, comment);
    yield delay(500);
    yield put({ type: GET_COURSE_COMMENTS_REQUEST, courseId });
  } catch (error) {
    yield put({
      type: GET_COURSE_COMMENTS_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* watchAddComment() {
  while (true) {
    const { courseId, comment } = yield take(ADD_COURSE_COMMENT_REQUEST);
    yield call(addNewComment, courseId, comment);
  }
}

// Get teacher infor
function* doRatingCourse(courseId, point, callback) {
  try {
    yield call(ratingCourse, courseId, point);
    yield delay(500);
    callback();
    yield put({ type: GET_COURSE_DETAIL_REQUEST, courseId });
  } catch (error) {
    yield put({
      type: GET_COURSE_COMMENTS_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* watchRatingCourse() {
  while (true) {
    const { courseId, point, callback } = yield take(RATING_COURSE_REQUEST);
    yield call(doRatingCourse, courseId, point, callback);
  }
}

function* getAllComment(courseId) {
  try {
    const { comments } = yield call(getCourseComments, courseId);
    yield put({
      type: GET_COURSE_COMMENTS_SUCCESS,
      payload: comments?.reverse() || [],
    });
  } catch (error) {
    yield put({
      type: GET_COURSE_COMMENTS_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* watchGetComment() {
  while (true) {
    const { courseId } = yield take(GET_COURSE_COMMENTS_REQUEST);
    yield fork(getAllComment, courseId);
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
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* watchFetchCourseList() {
  while (true) {
    const { params, category } = yield take(GET_COURSES_WITH_CATEGORY_REQUEST);
    yield fork(fetchCourseList, category, params);
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

function* getStudents(courseId, callback) {
  try {
    const students = yield call(getAllStudent, courseId);
    yield call(callback, students);
  } catch (error) {}
}

function* watchGetAllStudent() {
  while (true) {
    const { courseId, callback } = yield take(GET_ALL_STUDENT_REQUEST);
    yield fork(getStudents, courseId, callback);
  }
}

function* getNewStudents(courseId, callback) {
  try {
    const students = yield call(getNewStudent, courseId);
    yield call(callback, students);
  } catch (error) {}
}

function* watchGetNewStudent() {
  while (true) {
    const { courseId, callback } = yield take(GET_NEW_STUDENT_REQUEST);
    yield fork(getNewStudents, courseId, callback);
  }
}

const courseDetailSagaList = [
  fork(watchGetCourse),
  fork(watchGetTeacherInfor),
  fork(watchFetchCourseList),
  fork(watchJoinCourse),
  fork(watchAddComment),
  fork(watchGetComment),
  fork(watchRatingCourse),
  fork(watchGetAllStudent),
  fork(watchGetNewStudent),
];
export default courseDetailSagaList;
