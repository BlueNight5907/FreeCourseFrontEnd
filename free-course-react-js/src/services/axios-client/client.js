import axios from "axios";
import { BACKEND_URL } from "../../config";

const axiosClient = axios.create({
  baseURL: BACKEND_URL,
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    const user = localStorage.getItem("user");

    //If local storage has toke, then attach it into request
    if (user) {
      const { accessToken } = JSON.parse(user);
      config.headers.common.Authorization = `Bearer ${accessToken}`;
    }

    //Using the form-data
    if (config.data instanceof FormData) {
      Object.assign(config.headers, config.data.getHeaders());
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    console.log(response);
    if (response.status === 200 || response.status === 201) {
    }
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
