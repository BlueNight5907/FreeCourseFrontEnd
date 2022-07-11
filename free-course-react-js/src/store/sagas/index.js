import { all } from "redux-saga/effects";
import authSagaList from "./auth-saga";
import blogSagaList from "./blog-saga";
import categorySagaList from "./category-saga";
import commonSagaList from "./common-saga";
import courseDetailSagaList from "./course-detail-saga";
import learningProcessSagaList from "./learning-process-saga";
import manageCourseSagaList from "./manage-course-saga";
const rootSaga = function* () {
  yield all([
    ...authSagaList,
    ...categorySagaList,
    ...courseDetailSagaList,
    ...commonSagaList,
    ...learningProcessSagaList,
    ...blogSagaList,
    ...manageCourseSagaList,
  ]);
};

export default rootSaga;
