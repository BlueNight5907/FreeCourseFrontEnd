import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NAVBAR_HEIGHT } from "../../../config";
import { TOGGLE_HOME_DRAWER } from "../../../store/types/page-types/setting-types";
import { Drawer as MuiDrawer } from "../styled-components";
import logo from "../../../assets/icons/logo.png";
import MainMenu from "../menu/MainMenu";
import SubMenu from "../menu/SubMenu";
const Drawer = () => {
  const { sideOpen, subMenu } = useSelector((state) => state.setting);
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchMd = useMediaQuery(theme.breakpoints.up("md"));
  const toggleDrawer = () => {
    dispatch({ type: TOGGLE_HOME_DRAWER });
  };
  const containerRef = useRef();
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
          "&::-webkit-scrollbar": {
            WebkitAppearance: "none",
          },
          "&::-webkit-scrollbar:vertical": {
            width: 4,
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: (theme) => theme.palette.shadow.main + "50",
            borderRadius: 1,
          },
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
