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
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../../assets/icons/logo.png";
const Header = () => {
  const dispatch = useDispatch();
  const { stepId, courseId } = useParams();
  const { goBack, headerTitle } = useSelector((state) => state.setting);
  const { courseDetail } = useSelector((state) => state.courseDetail);
  const { process } = useSelector((state) => state.learningProcess);

  const [buttonHref, setButtonHref] = useState({ prev: null, next: null });

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

  useEffect(() => {
    if (courseDetail && process) {
      const learned = process.learned;
      const allSteps = courseDetail.modules.reduce((steps, module) => {
        return [
          ...steps,
          ...module.steps.map((item) => ({ step: item, moduleId: module._id })),
        ];
      }, []);

      const stepIndex = allSteps.findIndex((item) => item.step._id === stepId);

      setButtonHref({
        prev:
          stepIndex > 0 && stepIndex <= learned.length
            ? `/learning/${courseId}/${allSteps[stepIndex - 1].step._id}`
            : null,
        next:
          stepIndex < allSteps.length - 1 && stepIndex < learned.length
            ? `/learning/${courseId}/${allSteps[stepIndex + 1].step._id}`
            : null,
      });
    }
  }, [courseDetail, courseId, process, stepId]);

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
        <ButtonBase sx={styles.menu} onClick={() => navigate("/")}>
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
            disabled={!buttonHref.prev}
            onClick={() => navigate(buttonHref.prev)}
            startIcon={<ArrowBackIosRounded />}
          >
            {matchSm && "Bài trước"}
          </Button>
          <Button
            variant="contained"
            disabled={!buttonHref.next}
            onClick={() => navigate(buttonHref.next)}
            endIcon={<ArrowForwardIosOutlined />}
          >
            {matchSm && "Bài tiếp theo"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
