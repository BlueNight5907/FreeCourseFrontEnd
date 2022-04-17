import queryString from "query-string";
import { GET } from "../../constants/services-constant";
import axiosClient from "./client";

const request = (
  method = GET,
  url = "/",
  data = { params: "", body: null, form: null },
  config = {}
) => {
  return axiosClient[method](url, data.body ? data.body : data.form, {
    params: "ac",
    paramsSerializer: (params) => {
      return queryString.stringify(params);
    },
    ...config,
  });
};

export default request;
