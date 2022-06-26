import React from "react";
import { useRoutes } from "react-router-dom";
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
import MessageContent from "./message/Message";
import CreateCourse from "./manage-course/create-course/CreateCourse";
import Community from "./community/Community";
import Post from "./community/post/Post";
import PostCreate from "./community/post/PostCreate";

const Routes = () => {
  const routes = useRoutes([
    { path: "/login", element: <Login /> },
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/settings",
          element: <Setting />,
        },
        {
          path: "/course/:id",
          element: <CourseDetail />,
        },
        {
          path: "/my-courses",
          element: <MyCourses />,
        },
        {
          path: "/category",
          element: <Category />,
        },
        {
          path: "/manage-course/dashboard",
          element: <CourseDashboard />,
        },
        {
          path: "/manage-course/category",
          element: <CourseDashboard />,
        },
        {
          path: "/manage-course/create",
          element: <CreateCourse />,
        },
        {
          path: "/community",
          element: <Community />,
        },
        {
          path: "community/post/create",
          element: <PostCreate />,
        },
        {
          path: "community/post/:id",
          element: <Post />,
        },
      ],
    },
    {
      path: "/learning",
      element: <LearnLayout />,
      children: [
        {
          path: "lesson",
          element: <Lesson />,
        },
        {
          path: "test",
          element: <TestInformation />,
        },
        {
          path: "test/dosomething",
          element: <Test />,
        },
      ],
    },
    {
      path: "/message",
      element: <MessageLayout />,
    },
    {
      path: "/sample1",
      element: <SamplePage />,
    },
    {
      path: "/sample2",
      element: <SamplePage2 />,
    },
    {
      path: "/sample4",
      element: <Sample3 />,
    },
  ]);
  return routes;
};

export default Routes;
