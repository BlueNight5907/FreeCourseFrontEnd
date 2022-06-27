import { GET, POST } from "constants/services-constant";
import request from "services/axios-client/request";
import apiPath from "services/sevices.config";

export const getCoursesWithCategory = (
  category,
  params = { page: 1, page_size: 10 }
) => {
  return request(GET, apiPath.getCoursesWithCategory(category), { params });
};
