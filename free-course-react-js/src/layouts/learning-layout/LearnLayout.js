import { Menu } from "@mui/icons-material";
import { Box, Container, Typography } from "@mui/material";
import AlertDialog from "components/dialog/alert-dialog";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import {
  GET_COURSE_DETAIL_REQUEST,
  GET_TEACHER_INFOR_REQUEST,
} from "store/types/data-types/course-detail-types";
import {
  GET_LEARNING_PROCESS_REQUEST,
  GET_LESSON_DETAIL_REQUEST,
  SET_COMPLETED,
  SET_LEARN,
} from "store/types/data-types/learning-process-types";
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
  const { courseId, stepId } = useParams();
  const { courseOpen } = useSelector((state) => state.setting);
  const { user } = useSelector((state) => state.auth);
  const { courseDetail } = useSelector((s) => s.courseDetail);
  const { process, completed } = useSelector((state) => state.learningProcess);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let spacing = courseOpen ? HOME_SIDEBAR_WIDTH : HOME_SIDEBAR_CLOSE_WIDTH;

  const toggleDrawer = () => {
    dispatch({ type: TOGGLE_COURSE_DRAWER });
  };

  const handleClose = () => {
    dispatch({ type: SET_COMPLETED, payload: false });
  };

  useEffect(() => {
    setOpen(completed);
  }, [completed]);

  useEffect(() => {
    if (user && courseId) {
      dispatch({ type: GET_COURSE_DETAIL_REQUEST, courseId });
      dispatch({ type: GET_LEARNING_PROCESS_REQUEST, courseId });
    }
  }, [user, courseId, dispatch]);

  useEffect(() => {
    if (courseDetail) {
      dispatch({
        type: GET_TEACHER_INFOR_REQUEST,
        teacherId: courseDetail.creator,
      });
    }
  }, [courseDetail, dispatch]);

  useEffect(() => {
    if (courseDetail && process) {
      const learned = process.learned;

      const isLearned =
        learned?.findIndex((item) => item.stepId === stepId) > -1;

      dispatch({ type: SET_LEARN, payload: isLearned });

      const allSteps = courseDetail.modules.reduce((steps, module) => {
        return [
          ...steps,
          ...module.steps.map((item) => ({ step: item, moduleId: module._id })),
        ];
      }, []);

      const stepIndex = allSteps.findIndex((item) => item.step._id === stepId);
      if (stepIndex > learned.length) {
        navigate("/");
      }
    }
  }, [courseDetail, courseId, dispatch, navigate, process, stepId]);

  useEffect(() => {
    if (courseDetail) {
      const allSteps = courseDetail.modules.reduce((steps, module) => {
        return [
          ...steps,
          ...module.steps.map((item) => ({ step: item, moduleId: module._id })),
        ];
      }, []);

      const stepIndex = allSteps.findIndex((item) => item.step._id === stepId);

      const selectedStep = allSteps[stepIndex];
      if (selectedStep.step.type === "lesson") {
        dispatch({
          type: GET_LESSON_DETAIL_REQUEST,
          moduleId: selectedStep.moduleId,
          stepId,
        });
      }
    }
  }, [courseDetail, dispatch, stepId]);

  return (
    <>
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
      <AlertDialog
        title="Thông báo"
        onClose={handleClose}
        open={open}
        setOpen={setOpen}
      >
        <Typography>Chúc mừng bạn đã hoàn thành khóa học này</Typography>
      </AlertDialog>
    </>
  );
};

export default HomeLayout;
