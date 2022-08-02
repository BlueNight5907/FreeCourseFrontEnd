import { take, call, fork } from "redux-saga/effects";
import { getAccountInfor, getAllTeacher } from "services/api/accountAPI";
import { getCoursesWithCategory } from "services/api/courseAPI";
import {
  GET_ACCOUNT_INFORMATION,
  GET_COURSES_WITH_FILTER,
  GET_ALL_TEACHER,
} from "store/types/data-types/common-types";

// Get teacher infor
function* getAccountInforWorker(accountId, callback) {
  try {
    const accountInformation = yield call(getAccountInfor, accountId);
    callback(accountInformation);
  } catch (error) {
    console.log(error);
  }
}

function* watchGetAccountInfor() {
  while (true) {
    const { accountId, callback } = yield take(GET_ACCOUNT_INFORMATION);
    yield fork(getAccountInforWorker, accountId, callback);
  }
}

// Get course list
function* fetchCourseList(category, params, callback) {
  try {
    const { data } = yield call(getCoursesWithCategory, category, params);
    callback(data);
  } catch (error) {
    console.log(error);
  }
}

function* watchFetchCourseList() {
  while (true) {
    const { params, category, callback } = yield take(GET_COURSES_WITH_FILTER);
    yield fork(fetchCourseList, category, params, callback);
  }
}

function* getTeacherList(callback) {
  try {
    const teacher = yield call(getAllTeacher);
    callback(teacher.data);
  } catch (error) {
    console.log(error);
  }
}

function* watchFetchAllTeacher() {
  while (true) {
    const { callback } = yield take(GET_ALL_TEACHER);
    yield call(getTeacherList, callback);
  }
}

const commonSagaList = [
  fork(watchGetAccountInfor),
  fork(watchFetchCourseList),
  fork(watchFetchAllTeacher),
];
export default commonSagaList;
