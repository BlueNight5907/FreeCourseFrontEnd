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
import { AppBar } from "../styled-components";
import {
  ArrowBackIosRounded,
  ArrowForwardIosOutlined,
  Menu,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_GO_BACK_NAV_BAR,
  TOGGLE_HOME_DRAWER,
} from "../../../store/types/page-types/setting-types";
import Button from "../../../components/button/Button";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/icons/logo.png";
const Header = () => {
  const dispatch = useDispatch();
  const { goBack, headerTitle } = useSelector((state) => state.setting);
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.up("sm"));
  const matchMd = useMediaQuery(theme.breakpoints.up("md"));
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
        <ButtonBase sx={styles.menu}>
          <img src={logo} alt="logo" />
        </ButtonBase>

        <Button startIcon={<ArrowBackIosRounded />} onClick={handleGoBack}>
          Quay lại
        </Button>
        <Typography variant="h2" sx={styles.title} className="title grow">
          {headerTitle}
        </Typography>

        <Box className="right-app-bar flex flex-row items-center md:gap-4 gap-2">
          <Button
            variant="contained"
            disabled
            startIcon={<ArrowBackIosRounded />}
          >
            {matchSm && "Bài trước"}
          </Button>
          <Button variant="contained" endIcon={<ArrowForwardIosOutlined />}>
            {matchSm && "Bài tiếp theo"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
