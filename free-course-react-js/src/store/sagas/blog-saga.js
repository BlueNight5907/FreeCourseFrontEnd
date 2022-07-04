import {
  take,
  call,
  put,
  fork,
  cancelled,
  race,
  delay,
} from "redux-saga/effects";
import * as blogAPI from "../../services/api/blogAPI";
import {
  GET_FEEDS_REQUEST,
  GET_FEEDS_SUCCESS,
  GET_FEEDS_ERROR,
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
} from "../types/data-types/blog-type";
import * as firebase from "../../firebase";

function* getNewFeeds(time, page_size) {
  try {
    const feeds = yield call(blogAPI.getNewFeeds, time, page_size);
    yield delay(1000);
    yield put({ type: GET_FEEDS_SUCCESS, payload: { feeds } });
  } catch (error) {
    yield put({ type: GET_FEEDS_ERROR, payload: error });
  }
}

function* getBlog(postId) {
  try {
    const post = yield call(blogAPI.getBlog, postId);
    yield delay(500);
    yield put({ type: GET_BLOG_SUCCESS, payload: { post } });
  } catch (error) {
    yield put({ type: GET_BLOG_ERROR, payload: error });
  }
}

function* uploadBlog(title, description, content, background) {
  try {
    let backgroundUrl = "";
    if (background) {
      let filename =
        background.name.split(".")[0] +
        "-" +
        background.lastModified +
        "-" +
        crypto.randomUUID();
      backgroundUrl = yield call(
        firebase.upload,
        "post-background",
        {
          fileName: filename,
          file: background,
        },
        () => {},
        () => {}
      );
    }
    yield delay(500);
    const post = yield call(
      blogAPI.postBlog,
      title,
      description,
      content,
      `/community/post/`,
      backgroundUrl
    );
    yield delay(500);
    yield put({ type: POST_BLOG_SUCCESS, payload: { post } });
  } catch (error) {
    yield put({ type: POST_BLOG_ERROR, payload: error });
  }
}

function* updateBlog(postId, title, description, content, background) {
  try {
    let backgroundUrl = "";
    if (background) {
      let filename =
        background.name.split(".")[0] +
        "-" +
        background.lastModified +
        "-" +
        crypto.randomUUID();
      backgroundUrl = yield call(
        firebase.upload,
        "post-background",
        {
          fileName: filename,
          file: background,
        },
        () => {},
        () => {}
      );
    }
    yield delay(500);
    const post = yield call(
      blogAPI.updateBlog,
      postId,
      title,
      description,
      content,
      backgroundUrl
    );
    yield delay(500);
    let message = "Cập nhật bài viết thành công";
    yield put({ type: UPDATE_BLOG_SUCCESS, payload: { post, message } });
  } catch (error) {
    yield put({ type: UPDATE_BLOG_ERROR, payload: error });
  }
}

function* deleteBlog(postId) {
  try {
    const message = yield call(blogAPI.deleteBlog, postId);
    yield delay(500);
    yield put({ type: DELETE_BLOG_SUCCESS, payload: { message } });
  } catch (error) {
    yield put({ type: DELETE_BLOG_ERROR, payload: error });
  }
}

// Watcher
function* getFeedsFlow() {
  while (true) {
    const { time, page_size } = yield take(GET_FEEDS_REQUEST);
    yield call(getNewFeeds, time, page_size);
  }
}

function* getBlogFlow() {
  while (true) {
    const { id } = yield take(GET_BLOG_REQUEST);
    yield call(getBlog, id);
  }
}

function* postBlogFlow() {
  while (true) {
    const { title, description, content, background } = yield take(
      POST_BLOG_REQUEST
    );
    yield call(uploadBlog, title, description, content, background);
  }
}
function* updateBlogFlow() {
  while (true) {
    const { postId, title, description, content, background } = yield take(
      UPDATE_BLOG_REQUEST
    );
    yield call(updateBlog, postId, title, description, content, background);
  }
}

function* deleteBlogFlow() {
  while (true) {
    const { postId } = yield take(DELETE_BLOG_REQUEST);
    yield call(deleteBlog, postId);
  }
}

const blogSagaList = [
  fork(postBlogFlow),
  fork(getBlogFlow),
  fork(getFeedsFlow),
  fork(updateBlogFlow),
  fork(deleteBlogFlow),
];
export default blogSagaList;
