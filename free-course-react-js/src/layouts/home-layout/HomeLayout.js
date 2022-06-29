import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { GET_MY_COURSE_REQUEST } from "store/types/data-types/learning-process-types";
import {
  HOME_SIDEBAR_CLOSE_WIDTH,
  HOME_SIDEBAR_WIDTH,
  NAVBAR_HEIGHT,
} from "../../config";
import Drawer from "./drawer/Drawer";

import Header from "./header/Header";

const HomeLayout = () => {
  const { sideOpen } = useSelector((state) => state.setting);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let spacing = sideOpen ? HOME_SIDEBAR_WIDTH : HOME_SIDEBAR_CLOSE_WIDTH;
  useEffect(() => {
    if (user) {
      dispatch({ type: GET_MY_COURSE_REQUEST });
    }
  }, [user, dispatch]);
  return (
    <Box
      className="flex flex-row"
      sx={{
        minHeight: "inherit",
      }}
    >
      <Header />
      <Drawer />
      <Container
        maxWidth="xxl"
        sx={{
          width: {
            xs: "100%",
            md: `calc(100% - ${spacing}px)`,
          },

          transition: (theme) =>
            sideOpen
              ? theme.transitions.create("width", {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                })
              : theme.transitions.create("width", {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
          padding: (theme) => {
            return {
              md:
                theme.spacing(NAVBAR_HEIGHT / 10, sideOpen ? 3 : 2, 0) +
                "!important",
              sm: theme.spacing(NAVBAR_HEIGHT / 10, 2, 0) + "!important",
              xs: theme.spacing(NAVBAR_HEIGHT / 10 - 1, 1, 0) + "!important",
            };
          },
          paddingTop: NAVBAR_HEIGHT + "px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default HomeLayout;
