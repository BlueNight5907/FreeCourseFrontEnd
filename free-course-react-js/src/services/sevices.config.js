const apiPath = {
  login: "/auth/signin",
  getMyAccount: "/account/me",
  getCategories: "/category/all",
  getAllTags: "/tag/all",
  getCoursesWithCategory: (category) => `/course/category/${category}`,
};

export default apiPath;
