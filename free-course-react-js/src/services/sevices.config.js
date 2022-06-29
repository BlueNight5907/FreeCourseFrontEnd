const apiPath = {
  login: "/auth/signin",
  getMyAccount: "/account/me",
  getCategories: "/category/all",
  getAllTags: "/tag/all",
  getCoursesWithCategory: (category) => `/course/category/${category}`,
  getCourseDetail: (id) => `/course/detail/${id}`,
  getAccountInfor: (id) => `/account/${id}`,
  getLearningProcess: (courseId) => `/course/${courseId}/learning-process`,
  getAllMyCourse: "/course/me",
  joinCourse: (id) => `/course/join/${id}`,
};

export default apiPath;
