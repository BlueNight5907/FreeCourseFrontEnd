import { Menu } from "@mui/icons-material";
import { Box, Container } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Button from "../../components/button/Button";
import {
  HOME_SIDEBAR_CLOSE_WIDTH,
  HOME_SIDEBAR_WIDTH,
  NAVBAR_HEIGHT,
} from "../../config";
import { TOGGLE_COURSE_DRAWER } from "../../store/types/page-types/setting-types";
import Drawer from "./drawer/Drawer";

import Header from "./header/Header";

const HomeLayout = () => {
  const { courseOpen } = useSelector((state) => state.setting);
  const dispatch = useDispatch();
  let spacing = courseOpen ? HOME_SIDEBAR_WIDTH : HOME_SIDEBAR_CLOSE_WIDTH;
  const toggleDrawer = () => {
    dispatch({ type: TOGGLE_COURSE_DRAWER });
  };
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
            courseOpen
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
                theme.spacing(NAVBAR_HEIGHT / 10, courseOpen ? 2 : 3, 0) +
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
        <Box className="my-[10px]">
          <Button width={190} startIcon={<Menu />} onClick={toggleDrawer}>
            Điều hướng Menu
          </Button>
        </Box>
        <Outlet />
      </Container>
    </Box>
  );
};

export default HomeLayout;
