import { Box, Container } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import {
  HOME_SIDEBAR_CLOSE_WIDTH,
  HOME_SIDEBAR_WIDTH,
  NAVBAR_HEIGHT,
} from "../../config";
import Drawer from "./drawer/Drawer";

import Header from "./header/Header";

const HomeLayout = () => {
  const { sideOpen } = useSelector((state) => state.setting);
  let spacing = sideOpen ? HOME_SIDEBAR_WIDTH : HOME_SIDEBAR_CLOSE_WIDTH;
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
          overflowX: "hidden",
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default HomeLayout;
