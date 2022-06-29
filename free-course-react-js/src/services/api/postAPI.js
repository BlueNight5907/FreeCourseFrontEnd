import { GET, POST, PUT, DELETE } from "constants/services-constant";
import request from "services/axios-client/request";
import apiPath from "services/sevices.config";

export const getNewFeeds = async () => {
  return request(GET, apiPath.getNewFeeds);
};

export const uploadPost = async (
  title,
  description,
  content,
  url,
  backgroundUrl
) => {
  const body = { title, description, content, url, backgroundUrl };
  const data = await request(POST, apiPath.uploadPost, { body });
  return data;
};
