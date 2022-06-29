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
} from "../../types/data-types/post-type";

const initialState = {
  posts: [],
  loadingGetBlog: false,
  loadingAddBlog: false,
  loadingUpdateBlog: false,
  loadingDeleteBlog: false,
  error: null,
};

const PostReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_BLOG_REQUEST:
      return {
        ...state,
        loadingGetBlog: true,
      };
    case GET_BLOG_SUCCESS:
      return {
        ...state,
        loadingGetBlog: false,
        posts: [...state.posts, ...payload.data],
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
        posts: [...payload.post, ...state.posts],
      };
    case POST_BLOG_ERROR:
      return {
        ...state,
        error: payload,
      };
    case UPDATE_BLOG_REQUEST:
      return {};
    case UPDATE_BLOG_SUCCESS:
      return {};
    case UPDATE_BLOG_ERROR:
      return {
        ...state,
        error: payload,
      };
    case DELETE_BLOG_REQUEST:
      return {};
    case DELETE_BLOG_SUCCESS:
      return {};
    case DELETE_BLOG_ERROR:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};

export default PostReducer;
