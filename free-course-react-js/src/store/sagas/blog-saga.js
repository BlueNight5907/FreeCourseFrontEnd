import {
  take,
  call,
  put,
  fork,
  select,
  delay,
  takeLatest,
  takeEvery,
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
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_ERROR,
  LIKE_BLOG,
  LIKE_COMMENT,
  GET_MORE_FEEDS_REQUEST,
  GET_MORE_FEEDS_SUCCESS,
  GET_MORE_FEEDS_ERROR,
} from "../types/data-types/blog-type";
import * as firebase from "../../firebase";

function* getNewFeeds({ time, page_size }) {
  console.log("render first");
  try {
    const { feeds, totalSize, size } = yield call(
      blogAPI.getNewFeeds,
      time,
      page_size,
      1
    );
    yield put({ type: GET_FEEDS_SUCCESS, payload: { feeds, totalSize, size } });
  } catch (error) {
    yield put({ type: GET_FEEDS_ERROR, payload: error });
  }
}

function* getMoreNewFeeds({ time, page_size }) {
  // const { currentPage } = select((state) => state.blog);
  console.log("render more");
  try {
    const { nextPage, isEndFeed, totalFeed } = yield select(
      (state) => state.blog
    );

    if (isEndFeed) {
      console.log("end feeds");
      const itemReminder = totalFeed % page_size;
      if (itemReminder === 0) return;

      const { feeds, totalSize, size } = yield call(
        blogAPI.getNewFeeds,
        time,
        itemReminder,
        nextPage
      );
      yield put({
        type: GET_MORE_FEEDS_SUCCESS,
        payload: { feeds, totalSize, size },
      });
    }
    const { feeds, totalSize, size } = yield call(
      blogAPI.getNewFeeds,
      time,
      page_size,
      nextPage
    );
    yield put({
      type: GET_MORE_FEEDS_SUCCESS,
      payload: { feeds, totalSize, size },
    });
    // }
    // console.log(time);
    // console.log(page_size);
  } catch (error) {
    yield put({ type: GET_MORE_FEEDS_ERROR, payload: error });
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
    const data = yield call(
      blogAPI.postBlog,
      title,
      description,
      content,
      `/community/post/`,
      backgroundUrl
    );
    const post = data.post;
    const message = "Đã đăng bài viết";
    yield delay(500);
    yield put({ type: POST_BLOG_SUCCESS, payload: { post, message } });
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
    const data = yield call(blogAPI.deleteBlog, postId);
    // const message = "Xóa thành công";
    const message = data?.message;
    // console.log(message);
    yield delay(500);
    yield put({ type: DELETE_BLOG_SUCCESS, payload: { message, postId } });
  } catch (error) {
    yield put({ type: DELETE_BLOG_ERROR, payload: error });
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
    console.log("like:", postId, "+", commentId);
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
    yield put({ type: POST_COMMENT_ERROR, payload: error });
  }
}

// Watcher
function* getFeedsFlow() {
  // while (true) {
  //   const { time, page_size } = yield take(GET_FEEDS_REQUEST);
  //   yield call(getNewFeeds, time, page_size);
  // }
  yield takeLatest(GET_FEEDS_REQUEST, getNewFeeds);
  yield takeEvery(GET_MORE_FEEDS_REQUEST, getMoreNewFeeds);
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

const blogSagaList = [
  fork(postBlogFlow),
  fork(getBlogFlow),
  fork(getFeedsFlow),
  fork(updateBlogFlow),
  fork(deleteBlogFlow),
  fork(likeBlogWatcher),
  fork(likeCommentWatcher),
  fork(postCommentFlow),
];
export default blogSagaList;
