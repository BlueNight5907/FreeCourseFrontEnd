import {
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
  styled,
} from "@mui/material";
import { COURSE_SIDEBAR_WIDTH } from "../../../config";

const drawerWidth = COURSE_SIDEBAR_WIDTH;
export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "matchMd",
})(({ theme, matchMd }) => ({
  zIndex: matchMd ? theme.zIndex.drawer + 1 : theme.zIndex.drawer - 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  backgroundColor: "transparent",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "transparent",
  width: 0,
});

export const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  overflowX: "hidden",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
