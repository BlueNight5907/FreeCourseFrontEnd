import React from "react";
import { useRoutes } from "react-router-dom";
import HomeLayout from "../layouts/home-layout/HomeLayout";
import Home from "./home/Home";
import SamplePage from "./sample-page/SamplePage";
import SamplePage2 from "./sample-page/SamplePage2";
import Setting from "./setting/Setting";

const Routes = () => {
  const routes = useRoutes([
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
      ],
    },
    {
      path: "/sample1",
      element: <SamplePage />,
    },
    {
      path: "/sample2",
      element: <SamplePage2 />,
    },
  ]);
  return routes;
};

export default Routes;
