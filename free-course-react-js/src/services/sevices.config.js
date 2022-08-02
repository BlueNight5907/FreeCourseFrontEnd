const apiPath = {
  login: "/auth/signin",
  register: "/auth/signup",
  teacherCourses: (id) => "/course/search/" + id,
  editAccount: "account/edit",
  editUserAccount: (id) => `account/${id}`,
  changePassword: "/auth/updatePassword",
  allAccount: "/account/all",
  searchCourse: "/course/search",
  getCourse: (id) => "/course/" + id,
  getModule: (courseId, moduleId) => `/module/${courseId}/${moduleId}`,
  updateModule: (id) => `/module/${id}`,
  createLesson: (id) => `/module/${id}/step/lesson`,
  addCourseComment: (id) => `/course/${id}/comment`,
  deleteLessonComment: (moduleId, stepId, commentId) =>
    `/module/${moduleId}/step/${stepId}/comment/${commentId}`,
  ratingCourse: (id) => `/course/${id}/rating`,
  deleteCourseComment: (courseId, commentId) =>
    `/course/${courseId}/comment/${commentId}`,
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
  getAllFeeds: "community/feeds/all",
  getNewFeeds: (time) => `/community/feeds?time=${time}`,
  getUserFeeds: (time, userId) =>
    `/community/feeds?time=${time}&userId=${userId}`,
  getBlog: (id) => `/community/post/${id}`,
  postBlog: "/community/post",
  updateBlog: (id) => `/community/post/${id}`,
  deleteBlog: (id) => `/community/post/${id}`,
  likePost: (id) => `/community/post/${id}/like`,
  likeComment: (postId, commentId) =>
    `/community/post/${postId}/comment/${commentId}/like`,
  postComment: (id) => `/community/post/${id}/comment`,
  deleteComment: (postId, commentId) =>
    `/community/post/${postId}/comment/${commentId}`,
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
  addCategory: "/category/create",
  addTag: "/tag/create",
  editCategory: (id) => `/category/update/${id}`,
  editTag: (id) => `/tag/update/${id}`,
  deleteCategory: (id) => `/category/delete/${id}`,
  deleteTag: (id) => `/tag/delete/${id}`,
};

export default apiPath;
