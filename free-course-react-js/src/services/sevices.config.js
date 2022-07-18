const apiPath = {
  login: "/auth/signin",
  register: "/auth/signup",
  editAccount: "account/edit",
  changePassword: "/auth/updatePassword",
  getCourse: (id) => "/course/" + id,
  getModule: (courseId, moduleId) => `/module/${courseId}/${moduleId}`,
  updateModule: (id) => `/module/${id}`,
  createLesson: (id) => `/module/${id}/step/lesson`,
  addCourseComment: (id) => `/course/${id}/comment`,
  ratingCourse: (id) => `/course/${id}/rating`,
  getCourseComment: (id) => `/course/${id}/all-comment`,
  getLessonComment: (moduleId, stepId) =>
    `/module/${moduleId}/step/${stepId}/comment`,
  deleteLesson: (moduleId, stepId) => `/module/${moduleId}/step/${stepId}`,
  updateLesson: (moduleId, stepId) =>
    `/module/${moduleId}/step/${stepId}/lesson`,
  allModules: (id) => `/module/all/${id}`,
  createCourse: "/course/create",
  createModule: (id) => "module/" + id,
  getMyAccount: "/account/me",
  getCategories: "/category/all",
  getAllTags: "/tag/all",
  getAllLevels: "course/levels",
  getCoursesWithCategory: (category) => `/course/category/${category}`,
  getNewFeeds: (time, page_size, page) =>
    `/community/feeds?time=${time}&page=${page}&page_size=${page_size}`,
  getBlog: (id) => `/community/post/${id}`,
  postBlog: "/community/post",
  updateBlog: (id) => `/community/post/${id}`,
  deleteBlog: (id) => `/community/post/${id}`,
  likePost: (id) => `/community/post/${id}/like`,
  likeComment: (postId, commentId) =>
    `/community/post/${postId}/comment/${commentId}/like`,
  postComment: (id) => `/community/post/${id}/comment`,
  getCourseDetail: (id) => `/course/detail/${id}`,
  getAccountInfor: (id) => `/account/${id}`,
  getLearningProcess: (courseId) => `/course/${courseId}/learning-process`,
  getAllMyCourse: "/course/me",
  joinCourse: (id) => `/course/join/${id}`,
  allStudent: (id) => `/course/people/${id}`,
  newStudent: (id) => `/course/${id}/new-register`,
  getMyCreatedCourses: "course/created-by-me",
  getStep: (module, step) => `/module/${module}/step/${step}`,
  completeLesson: (module, step) => `/module/${module}/step/${step}/complete`,
};

export default apiPath;
