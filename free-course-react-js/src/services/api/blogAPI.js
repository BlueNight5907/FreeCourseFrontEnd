import { GET, POST, PUT, DELETE } from "constants/services-constant";
import request from "services/axios-client/request";
import apiPath from "services/sevices.config";
// import apiPath from "../sevices.config";

export const getAllFeeds = async () => {
  return await request(GET, apiPath.getAllFeeds);
};

export const getNewFeeds = async (time) => {
  return request(GET, apiPath.getNewFeeds(time));
};

export const getUserFeeds = async (time, userId) => {
  return request(GET, apiPath.getUserFeeds(time, userId));
};

export const postBlog = async (
  title,
  description,
  content,
  url,
  backgroundUrl
) => {
  const body = { title, description, content, url, backgroundUrl };
  const data = await request(POST, apiPath.postBlog, { body });
  return data;
};

export const getBlog = async (id) => {
  return request(GET, apiPath.getBlog(id));
};

export const updateBlog = async (
  id,
  title,
  description,
  content,
  url,
  backgroundUrl
) => {
  const body = { title, description, content, url, backgroundUrl };
  return request(PUT, apiPath.updateBlog(id), { body });
};

export const deleteBlog = async (id) => {
  return request(DELETE, apiPath.deleteBlog(id));
};

export const likeBlog = async (id) => {
  return request(POST, apiPath.likePost(id), {}, {}, "comment");
};

export const likeComment = async (postId, commentId) => {
  return request(
    POST,
    apiPath.likeComment(postId, commentId),
    {},
    {},
    "comment"
  );
};

export const postComment = async (id, content, url) => {
  const body = { content, url };
  const data = await request(POST, apiPath.postComment(id), { body });
  return data;
};

export const deleteComment = async (postId, commentId) => {
  return request(DELETE, apiPath.deleteComment(postId, commentId));
};
