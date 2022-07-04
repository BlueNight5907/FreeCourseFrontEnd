const apiPath = {
  login: "/auth/signin",
  getMyAccount: "/account/me",
  getCategories: "/category/all",
  getAllTags: "/tag/all",
  getCoursesWithCategory: (category) => `/course/category/${category}`,
  getNewFeeds: (time, page_size) =>
    `/community/feeds?time=${time}&page_size=${page_size}`,
  getBlog: (id) => `/community/post/${id}`,
  postBlog: "/community/post",
  updateBlog: (id) => `/community/post/${id}`,
  deleteBlog: (id) => `/community/post/${id}`,
  getCourseDetail: (id) => `/course/detail/${id}`,
  getAccountInfor: (id) => `/account/${id}`,
  getLearningProcess: (courseId) => `/course/${courseId}/learning-process`,
  getAllMyCourse: "/course/me",
  joinCourse: (id) => `/course/join/${id}`,
  getStep: (module, step) => `/module/${module}/step/${step}`,
  completeLesson: (module, step) => `/module/${module}/step/${step}/complete`,
};

export default apiPath;
