import { take, call, put, fork, delay } from "redux-saga/effects";
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
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_ERROR,
  LIKE_BLOG,
  LIKE_COMMENT,
  GET_USER_FEEDS_REQUEST,
  GET_USER_FEEDS_SUCCESS,
  GET_USER_FEEDS_ERROR,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_ERROR,
  RESET_POST,
} from "../types/data-types/blog-type";
import { getNewFeeds, getUserFeeds } from "services/api/blogAPI";
import * as firebase from "../../firebase";

function* getNewFeedAt(time) {
  try {
    const data = yield call(getNewFeeds, time);
    yield delay(500);
    yield put({ type: GET_FEEDS_SUCCESS, payload: data });
  } catch (error) {
    yield put({
      type: GET_FEEDS_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* getUserFeedAt(time, id) {
  try {
    const data = yield call(getUserFeeds, time, id);
    yield delay(500);
    yield put({ type: GET_USER_FEEDS_SUCCESS, payload: data });
  } catch (error) {
    yield put({
      type: GET_USER_FEEDS_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* getBlog(postId) {
  try {
    const post = yield call(blogAPI.getBlog, postId);
    yield delay(500);
    yield put({ type: GET_BLOG_SUCCESS, payload: { post } });
  } catch (error) {
    yield put({
      type: GET_BLOG_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* uploadBlog(title, description, content, backgroundUrl) {
  try {
    yield call(
      blogAPI.postBlog,
      title,
      description,
      content,
      `/community/post/`,
      backgroundUrl
    );
    const message = "Đã đăng bài viết";
    yield delay(500);
    yield put({ type: POST_BLOG_SUCCESS, payload: { message } });
  } catch (error) {
    yield put({
      type: POST_BLOG_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* updateBlog(postId, title, description, content, url, backgroundUrl) {
  try {
    const post = yield call(
      blogAPI.updateBlog,
      postId,
      title,
      description,
      content,
      url,
      backgroundUrl
    );
    yield delay(500);
    let message = "Cập nhật bài viết thành công";
    yield put({ type: UPDATE_BLOG_SUCCESS, payload: { post, message } });
    yield put({ type: RESET_POST });
    yield put({ type: GET_FEEDS_REQUEST, time: new Date().toISOString() });
    console.log({ postId, title, description, content, backgroundUrl });
  } catch (error) {
    yield put({
      type: UPDATE_BLOG_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* deleteBlog(postId) {
  try {
    const data = yield call(blogAPI.deleteBlog, postId);
    // const message = "Xóa thành công";
    const message = data?.message;
    // console.log(message);
    yield delay(500);
    yield put({ type: DELETE_BLOG_SUCCESS, payload: { message, postId } });
  } catch (error) {
    yield put({
      type: DELETE_BLOG_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* likeBlog(id) {
  try {
    yield call(blogAPI.likeBlog, id);
  } catch (error) {
    console.log(error);
  }
}

function* likeComment(postId, commentId) {
  try {
    // console.log("like:", postId, "+", commentId);
    yield call(blogAPI.likeComment, postId, commentId);
  } catch (error) {
    console.log(error);
  }
}

function* uploadComment(postId, content, image, callback) {
  try {
    let imageUrl = "";
    if (image) {
      let filename =
        image.name.split(".")[0] +
        "-" +
        image.lastModified +
        "-" +
        crypto.randomUUID();
      imageUrl = yield call(
        firebase.upload,
        "post-comment",
        {
          fileName: filename,
          file: image,
        },
        () => {},
        (progress) => {
          console.log(progress);
        }
      );
    }

    const comment = yield call(blogAPI.postComment, postId, content, imageUrl);
    delay(500);
    callback(comment);
    yield put({ type: POST_COMMENT_SUCCESS });
  } catch (error) {
    yield put({
      type: POST_COMMENT_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

function* deleteComment(postId, commentId) {
  try {
    yield call(blogAPI.deleteComment(postId, commentId));
  } catch (error) {
    yield put({
      type: DELETE_COMMENT_ERROR,
      payload:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        error,
    });
  }
}

// Watcher
function* getFeedsFlow() {
  while (true) {
    const { time } = yield take(GET_FEEDS_REQUEST);
    yield call(getNewFeedAt, time);
  }
}

function* getUserFeedsFlow() {
  while (true) {
    const { time, id } = yield take(GET_USER_FEEDS_REQUEST);
    yield call(getUserFeedAt, time, id);
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
    const { postId, title, description, content, url, background } = yield take(
      UPDATE_BLOG_REQUEST
    );
    yield call(
      updateBlog,
      postId,
      title,
      description,
      content,
      url,
      background
    );
  }
}

function* deleteBlogFlow() {
  while (true) {
    const { postId } = yield take(DELETE_BLOG_REQUEST);
    yield call(deleteBlog, postId);
  }
}

function* likeBlogWatcher() {
  while (true) {
    const { id } = yield take(LIKE_BLOG);
    yield call(likeBlog, id);
  }
}

function* likeCommentWatcher() {
  while (true) {
    const { postId, commentId } = yield take(LIKE_COMMENT);
    yield call(likeComment, postId, commentId);
  }
}

function* postCommentFlow() {
  while (true) {
    const { postId, content, image, callback } = yield take(
      POST_COMMENT_REQUEST
    );
    yield fork(uploadComment, postId, content, image, callback);
  }
}

function* deleteCommentFlow() {
  while (true) {
    const { postId, commentId } = yield take(DELETE_COMMENT_REQUEST);
    yield fork(deleteComment, postId, commentId);
  }
}

const blogSagaList = [
  fork(postBlogFlow),
  fork(getBlogFlow),
  fork(getFeedsFlow),
  fork(getUserFeedsFlow),
  fork(updateBlogFlow),
  fork(deleteBlogFlow),
  fork(likeBlogWatcher),
  fork(likeCommentWatcher),
  fork(postCommentFlow),
  fork(deleteCommentFlow),
];
export default blogSagaList;
