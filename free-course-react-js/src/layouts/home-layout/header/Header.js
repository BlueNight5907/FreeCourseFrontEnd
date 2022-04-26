import {
  Box,
  ButtonBase,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MiniSearch from "../../../components/search/MiniSearch";
import MyCourseDropdown from "../../../containers/dropdowns/my-courses-dropdown/MyCoursesDropdown";
import NotificationDropDown from "../../../containers/dropdowns/notification-dropdown/NotificationDropDown";
import UserDropdown from "../../../containers/dropdowns/user-dropdown/UserDropdown";
import { AppBar } from "../styled-components";
import {
  ArrowBackIosRounded,
  Menu,
  TravelExploreRounded,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_GO_BACK_NAV_BAR,
  TOGGLE_HOME_DRAWER,
} from "../../../store/types/page-types/setting-types";
import Button from "../../../components/button/Button";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const dispatch = useDispatch();
  const { goBack, headerTitle } = useSelector((state) => state.setting);
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.up("sm"));
  const matchMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchLg = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();
  const styles = {
    header: {
      backgroundColor: theme.palette.foreground.main,
    },
    title: {
      fontSize: 20,
      fontWeight: 500,
      color: (theme) => theme.palette.text.main,
    },
    menu: {
      width: 50,
      height: 50,
      mr: 2,
      color: theme.palette.primary.main,
      borderRadius: 1,
    },
  };

  const toggleDrawer = () => {
    dispatch({ type: TOGGLE_HOME_DRAWER });
  };

  const handleGoBack = () => {
    dispatch({ type: SET_GO_BACK_NAV_BAR, payload: { value: false } });
    navigate(-1);
  };

  return (
    <AppBar
      sx={styles.header}
      elevation={4}
      className="app-bar"
      position="fixed"
      matchMd={matchMd}
    >
      <Toolbar
        sx={{
          padding: {
            xs: theme.spacing(0, 1),
            md: theme.spacing(0, 3),
          },
          justifyContent: "space-between",
        }}
      >
        <ButtonBase sx={styles.menu} onClick={toggleDrawer}>
          <Menu fontSize="large" />
        </ButtonBase>

        {matchSm ? (
          goBack ? (
            <div className="grow">
              <Button
                startIcon={<ArrowBackIosRounded />}
                onClick={handleGoBack}
              >
                Quay lại
              </Button>
            </div>
          ) : (
            <Typography variant="h2" sx={styles.title} className="title grow">
              {headerTitle}
            </Typography>
          )
        ) : null}

        <Box className="right-app-bar flex flex-row items-center md:gap-4 sm:gap-2">
          {matchLg && <MiniSearch title="Tìm kiếm ..." />}
          {!matchLg && (
            <IconButton
              sx={{
                width: 45,
                height: 45,
              }}
              onClick={() => {}}
            >
              <TravelExploreRounded />
            </IconButton>
          )}
          <NotificationDropDown />
          {matchSm && <MyCourseDropdown />}
          <UserDropdown />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
