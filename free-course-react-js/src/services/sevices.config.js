const apiPath = {
  login: "/auth/signin",
  getMyAccount: "/account/me",
  getCategories: "/category/all",
  getAllTags: "/tag/all",
  getCoursesWithCategory: (category) => `/course/category/${category}`,
  getNewFeeds: "/community/feeds",
  uploadPost: "/community/post",
};

export default apiPath;
