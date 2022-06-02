import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NAVBAR_HEIGHT } from "../../../config";
import {
  CLOSE_HOME_DRAWER_SUB_MENU,
  OPEN_HOME_DRAWER_SUB_MENU,
  TOGGLE_HOME_DRAWER,
} from "../../../store/types/page-types/setting-types";
import { Drawer as MuiDrawer } from "../styled-components";
import logo from "../../../assets/icons/logo.png";
import MainMenu from "../menu/MainMenu";
import SubMenu from "../menu/SubMenu";
import { scrollSetting } from "../../../utils/classUltis";
import { teacherSubMenuList } from "../menu/menu-list";
import { matchPath, useLocation } from "react-router-dom";
const Drawer = () => {
  const { sideOpen, subMenu } = useSelector((state) => state.setting);
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchMd = useMediaQuery(theme.breakpoints.up("md"));
  const { pathname } = useLocation();
  const toggleDrawer = () => {
    dispatch({ type: TOGGLE_HOME_DRAWER });
  };
  const containerRef = useRef();
  React.useEffect(() => {
    let hasSubMenu = false;
    teacherSubMenuList.every((item) => {
      const match = matchPath({ path: item.href || "./", end: true }, pathname);
      if (match) {
        hasSubMenu = true;
        dispatch({
          type: OPEN_HOME_DRAWER_SUB_MENU,
          payload: {
            subMenu: teacherSubMenuList,
          },
        });
      }
      return !match;
    });
    if (!hasSubMenu) {
      dispatch({
        type: CLOSE_HOME_DRAWER_SUB_MENU,
      });
    }
  }, [dispatch, pathname]);
  return (
    <MuiDrawer
      variant={matchMd ? "permanent" : "temporary"}
      open={sideOpen}
      anchor="left"
      onClose={toggleDrawer}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.palette.foreground.main,
          height: "100%",
          width: "100%",
          overflowY: "overlay",
          overflowX: "hidden",
          ...scrollSetting({ width: 4 }),
          mt: {
            xs: "unset",
            md: `${sideOpen ? NAVBAR_HEIGHT : NAVBAR_HEIGHT + 5}px`,
          },
          border: {
            xs: "unset",
            md: !sideOpen && "0.5px solid " + theme.palette.text2.main + "90",
          },
          borderRadius: {
            xs: "unset",
            md: sideOpen ? 0 : 1.5,
          },
          ...(theme.palette.mode === "dark" &&
            matchMd && {
              background:
                "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
            }),
          padding: {
            xs: 0.8,
            md: sideOpen ? 1.6 : 1.2,
          },
        }}
        ref={containerRef}
      >
        {!subMenu && (
          <Box
            sx={{
              gap: 2,
              display: "flex",
              flexDirection: {
                xs: "row",
                md: "column",
              },
              alignItems: "center",
              padding: (theme) => (sideOpen ? 3 : theme.spacing(3, 0)),
            }}
            className="logo"
          >
            <Box className=" " component="img" alt="logo" src={logo} />
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 18,
                display: sideOpen ? "block" : "none",
              }}
            >
              TDT Learn
            </Typography>
          </Box>
        )}
        {subMenu ? (
          <SubMenu subMenu={subMenu} container={containerRef.current} />
        ) : (
          <MainMenu subMenu={subMenu} container={containerRef.current} />
        )}
      </Box>
    </MuiDrawer>
  );
};

export default Drawer;
