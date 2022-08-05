import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import LearnLayout from "../layouts/learning-layout/LearnLayout";
import HomeLayout from "../layouts/home-layout/HomeLayout";
import CourseDetail from "./course-detail/CourseDetail";
import Home from "./home/Home";
import Lesson from "./learning/lesson/Lesson";
import MyCourses from "./my-courses/MyCourses";
import Sample3 from "./sample-page/Sample3";
import SamplePage from "./sample-page/SamplePage";
import SamplePage2 from "./sample-page/SamplePage2";
import Setting from "./setting/Setting";
import Category from "./category/Category";
import Test from "./learning/test/Test";
import TestInformation from "./learning/test/TestInformation";
import Login from "./auth/login/Login";
import CourseDashboard from "./manage-course/course-dashboard/CourseDashboard";
import MessageLayout from "layouts/message-layout/MessageLayout";
import CreateCourse from "./manage-course/create-course/CreateCourse";
import Community from "./community/Community";
import Post from "./community/post/Post";
import PostCreate from "./community/post/PostCreate";
import DetailCourse from "./manage-course/detail-course/DetailCourse";
import Protected from "guards/Protected";
import MatchRoles from "guards/MatchRoles";
import Register from "./auth/register/Register";
import UserProfile from "./user/User";
import Logout from "./auth/logout/Logout";

const Routes = () => {
  const routes = useRoutes([
    { path: "/login", element: <Login /> },
    { path: "/logout", element: <Logout /> },
    { path: "/register", element: <Register /> },
    {
      path: "/",
      element: (
        <Protected>
          <HomeLayout />
        </Protected>
      ),
      children: [
        {
          index: true,
          element: (
            <MatchRoles>
              <Home />
            </MatchRoles>
          ),
        },
        {
          path: "/settings",
          element: (
            <MatchRoles>
              <Setting />
            </MatchRoles>
          ),
        },
        {
          path: "/course/:courseId",
          element: (
            <MatchRoles>
              <CourseDetail />
            </MatchRoles>
          ),
        },
        {
          path: "/my-courses",
          element: (
            <MatchRoles>
              <MyCourses />
            </MatchRoles>
          ),
        },
        {
          path: "/courses",
          element: <Navigate to="/courses/all" replace />,
        },
        {
          path: "/courses/:urlPath",
          element: (
            <MatchRoles>
              <Category />
            </MatchRoles>
          ),
        },
        {
          path: "/manage-course/category",
          element: (
            <MatchRoles roles={["teacher", "admin"]}>
              <CourseDashboard />
            </MatchRoles>
          ),
        },
        {
          path: "/manage-course/edit/:courseId",
          element: (
            <MatchRoles roles={["teacher", "admin"]}>
              <CreateCourse type="edit" />
            </MatchRoles>
          ),
        },
        {
          path: "/manage-course/detail-course/:courseId",
          element: (
            <MatchRoles roles={["teacher", "admin"]}>
              <DetailCourse />
            </MatchRoles>
          ),
        },
        {
          path: "/manage-course/detail-course/:courseId/student",
          element: (
            <MatchRoles roles={["teacher", "admin"]}>
              <DetailCourse />
            </MatchRoles>
          ),
        },
        {
          path: "/manage-course/create",
          element: (
            <MatchRoles roles={["teacher", "admin"]}>
              <CreateCourse />
            </MatchRoles>
          ),
        },
        {
          path: "/community",
          element: (
            <MatchRoles>
              <Community />
            </MatchRoles>
          ),
        },
        {
          path: "post/create",
          element: (
            <MatchRoles>
              <PostCreate />
            </MatchRoles>
          ),
        },
        {
          path: "community/post/:id",
          element: (
            <MatchRoles>
              <Post />
            </MatchRoles>
          ),
        },
        {
          path: "user/profile/:id",
          element: <UserProfile />,
        },
      ],
    },
    {
      path: "/learning/:courseId",
      element: (
        <Protected>
          <LearnLayout />
        </Protected>
      ),
      children: [
        {
          path: ":stepId",
          element: (
            <MatchRoles>
              <Lesson />
            </MatchRoles>
          ),
        },
        {
          path: "test",
          element: (
            <MatchRoles>
              <TestInformation />
            </MatchRoles>
          ),
        },
        {
          path: "test/dosomething",
          element: (
            <MatchRoles>
              <Test />
            </MatchRoles>
          ),
        },
      ],
    },
    {
      path: "/groups",
      element: (
        <MatchRoles>
          <MessageLayout />
        </MatchRoles>
      ),
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);
  return routes;
};

export default Routes;
