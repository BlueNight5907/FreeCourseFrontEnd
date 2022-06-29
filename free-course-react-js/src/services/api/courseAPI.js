import { GET, POST } from "constants/services-constant";
import request from "services/axios-client/request";
import apiPath from "services/sevices.config";

export const getCoursesWithCategory = (
  category,
  params = { page: 1, page_size: 10 }
) => {
  return request(GET, apiPath.getCoursesWithCategory(category), { params });
};

export const getCourseDetail = (id) =>
  request(GET, apiPath.getCourseDetail(id));

export const getAllMyCourse = () => {
  return request(GET, apiPath.getAllMyCourse);
};

export const joinCourse = (id) => {
  return request(POST, apiPath.joinCourse(id));
};
