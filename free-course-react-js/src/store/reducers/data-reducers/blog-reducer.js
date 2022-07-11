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
} from "../../types/data-types/blog-type";

const initialState = {
  posts: [],
  post: null,
  comments: [],
  loadingGetFeeds: false,
  loadingGetBlog: false,
  loadingAddBlog: false,
  loadingUpdateBlog: false,
  loadingDeleteBlog: false,
  loadingAddComment: false,
  message: null,
  error: null,
};

const BlogReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_FEEDS_REQUEST:
      return {
        ...state,
        loadingGetFeeds: true,
      };
    case GET_FEEDS_SUCCESS:
      return {
        ...state,
        loadingGetFeeds: false,
        posts: [...state.posts, ...payload.feeds],
      };
    case GET_FEEDS_ERROR:
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
        posts: [payload.post, ...state.posts],
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
        //posts: []
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
      return {
        ...state,
        loadingDeleteBlog: false,
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
