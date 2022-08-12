import { RESET_ERROR } from "store/types/data-types/common-types";
import {
  GET_FEEDS_REQUEST,
  GET_FEEDS_SUCCESS,
  GET_FEEDS_ERROR,
  GET_USER_FEEDS_REQUEST,
  GET_USER_FEEDS_SUCCESS,
  GET_USER_FEEDS_ERROR,
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
  CLEAR_MESSAGE,
  RESET_POST,
  RESET_USER_POST,
  CHANGE_USER,
} from "../../types/data-types/blog-type";

export const checkEndFeed = (currentPage, page_size, totalFeed) => {
  return currentPage * page_size >= totalFeed;
};

const initialState = {
  posts: [],
  user_posts: [],
  post: null,
  comments: [],
  loadingGetFeeds: false,
  loadingGetBlog: false,
  loadingAddBlog: false,
  loadingUpdateBlog: false,
  loadingDeleteBlog: false,
  loadingAddComment: false,
  isEndFeed: false,
  totalFeed: 10,
  nextPage: 1,
  message: null,
  error: null,
};

const BlogReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case RESET_POST:
      return {
        ...state,
        posts: [],
      };
    case RESET_USER_POST:
      return {
        ...state,
        user_posts: [],
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case RESET_ERROR:
      return {
        ...state,
        error: null,
      };
    case GET_FEEDS_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...payload.feeds],
      };
    case GET_FEEDS_ERROR:
      return {
        ...state,
        error: payload,
      };
    case CHANGE_USER:
      return {
        ...state,
        user_posts: [],
      };
    case GET_USER_FEEDS_SUCCESS:
      return {
        ...state,
        user_posts: [...state.user_posts, ...payload.feeds],
      };
    case GET_USER_FEEDS_ERROR:
      return {
        ...state,
        error: payload,
      };
    case GET_BLOG_REQUEST:
      return {
        ...state,
        loadingGetBlog: true,
        post: null,
        comments: [],
      };
    case GET_BLOG_SUCCESS:
      return {
        ...state,
        loadingGetBlog: false,
        post: payload.post,
      };
    case GET_BLOG_ERROR:
      return {
        ...state,
        error: payload,
      };
    case POST_BLOG_REQUEST:
      return {
        ...state,
        loadingAddBlog: true,
      };
    case POST_BLOG_SUCCESS:
      return {
        ...state,
        loadingAddBlog: false,
        message: payload.message,
      };
    case POST_BLOG_ERROR:
      return {
        ...state,
        error: payload,
      };
    case UPDATE_BLOG_REQUEST:
      return {
        ...state,
        loadingUpdateBlog: true,
        message: null,
      };
    case UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        loadingUpdateBlog: false,
        message: payload.message,
      };
    case UPDATE_BLOG_ERROR:
      return {
        ...state,
        error: payload,
      };
    case DELETE_BLOG_REQUEST:
      return {
        ...state,
        loadingDeleteBlog: true,
        message: null,
      };
    case DELETE_BLOG_SUCCESS:
      const index = state.posts.map((p) => p._id).indexOf(payload.postId);
      return {
        ...state,
        loadingDeleteBlog: false,
        posts: [
          ...state.posts.slice(0, index),
          ...state.posts.slice(index + 1),
        ],
        message: payload.message,
      };
    case DELETE_BLOG_ERROR:
      return {
        ...state,
        error: payload,
      };
    case POST_COMMENT_REQUEST:
      return {
        ...state,
        loadingAddComment: true,
      };
    case POST_COMMENT_SUCCESS:
      return {
        ...state,
        loadingAddComment: false,
      };
    case POST_COMMENT_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default BlogReducer;
