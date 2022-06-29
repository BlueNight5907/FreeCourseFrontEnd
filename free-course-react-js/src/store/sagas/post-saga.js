import { take, call, put, fork, cancelled, race } from "redux-saga/effects";
import { clearItem, storeItem } from "../../utils/storeData";
import { LOCAL_STORAGE } from "../../constants/storage-constants";
import * as postAPI from "../../services/api/postAPI";
import {
  GET_BLOG_REQUEST,
  GET_BLOG_SUCCESS,
  GET_BLOG_ERROR,
  POST_BLOG_REQUEST,
  POST_BLOG_SUCCESS,
  POST_BLOG_ERROR,
  UPDATE_BLOG_REQUEST,
  UPDATE_BLOG_SUCCESS,
  UPDATE_BLOG_ERROR,
  DELETE_BLOG_REQUEST,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_ERROR,
} from "../types/data-types/post-type";
import { upload } from "firebase";

// function* getNewFeeds () {
//     try{
//         const feeds =
//     }
//     catch(error) {}
// }

function* uploadBlog(title, description, content, background) {
  try {
    const backgroundUrl = yield call(
      upload,
      "post-background",
      background,
      () => {},
      () => {}
    );

    const post = yield call(
      postAPI.uploadPost,
      title,
      description,
      content,
      `community/post/${1}`,
      backgroundUrl
    );

    yield put({ type: POST_BLOG_SUCCESS, payload: post });
  } catch (error) {
    yield put({ type: POST_BLOG_ERROR, payload: error });
  }
}

function* postFlow() {
  while (true) {
    const { title, description, content, background } = yield take(
      POST_BLOG_REQUEST
    );
    yield call(uploadBlog, title, description, content, background);
  }
}

const authSagaList = [fork(postFlow)];
export default authSagaList;
