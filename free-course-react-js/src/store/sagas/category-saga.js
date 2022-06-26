import { take, call, put, fork, cancelled, race } from "redux-saga/effects";
import { getCoursesWithCategory } from "services/api/courseAPI";
import {
  GET_CATEGORIES_ERROR,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_COURSES_ERROR,
  GET_COURSES_REQUEST,
  GET_COURSES_SUCCESS,
  GET_TAGS_ERROR,
  GET_TAGS_REQUEST,
  GET_TAGS_SUCCESS,
} from "store/types/data-types/category-types";
import * as categoryAPI from "../../services/api/categoryAPI";

// Get all categories
function* getCategories() {
  try {
    const categories = yield call(categoryAPI.getAllCategories);
    yield put({ type: GET_CATEGORIES_SUCCESS, payload: { categories } });
  } catch (error) {
    yield put({ type: GET_CATEGORIES_ERROR, payload: error.message });
  }
}

function* watchGetCategories() {
  while (true) {
    yield take(GET_CATEGORIES_REQUEST);
    yield call(getCategories);
  }
}

// Get all tags
function* getTags() {
  try {
    const tags = yield call(categoryAPI.getAllTags);
    yield put({ type: GET_TAGS_SUCCESS, payload: { tags } });
  } catch (error) {
    yield put({ type: GET_TAGS_ERROR, payload: error.message });
  }
}

function* watchGetTags() {
  while (true) {
    yield take(GET_TAGS_REQUEST);
    yield call(getTags);
  }
}

// Get course list
function* fetchCourseList(category, params) {
  try {
    const { total, data } = yield call(
      getCoursesWithCategory,
      category,
      params
    );
    yield put({ type: GET_COURSES_SUCCESS, payload: { total, courses: data } });
  } catch (error) {
    yield put({ type: GET_COURSES_ERROR, payload: error.message });
  }
}

function* watchFetchCourseList() {
  while (true) {
    const { params, category } = yield take(GET_COURSES_REQUEST);
    yield call(fetchCourseList, category, params);
  }
}

const categorySagaList = [
  fork(watchGetCategories),
  fork(watchGetTags),
  fork(watchFetchCourseList),
];
export default categorySagaList;
