import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import GroupList from "../../../components/module/GroupList";
import { NAVBAR_HEIGHT } from "../../../config";
import { TOGGLE_COURSE_DRAWER } from "../../../store/types/page-types/setting-types";
import { scrollSetting } from "../../../utils/classUltis";
import { Drawer as MuiDrawer } from "../styled-components";
const Drawer = () => {
  const { courseOpen } = useSelector((state) => state.setting);
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchMd = useMediaQuery(theme.breakpoints.up("md"));
  const toggleDrawer = () => {
    dispatch({ type: TOGGLE_COURSE_DRAWER });
  };
  const containerRef = useRef();
  return (
    <MuiDrawer
      variant={matchMd ? "permanent" : "temporary"}
      open={courseOpen}
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
            md: `${NAVBAR_HEIGHT}px`,
          },
          padding: {
            xs: 0.8,
            md: 1.2,
          },
        }}
        ref={containerRef}
      >
        <Stack gap={1}>
          <GroupList />
          <GroupList />
          <GroupList />
          <GroupList />
        </Stack>
      </Box>
    </MuiDrawer>
  );
};

export default Drawer;
