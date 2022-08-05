import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import React, { useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GroupList from "../../../components/module/GroupList";
import { NAVBAR_HEIGHT } from "../../../config";
import { TOGGLE_COURSE_DRAWER } from "../../../store/types/page-types/setting-types";
import { scrollSetting } from "../../../utils/classUltis";
import { Drawer as MuiDrawer } from "../styled-components";
const Drawer = () => {
  const { courseId, stepId } = useParams();
  const { courseOpen } = useSelector((state) => state.setting);
  const { courseDetail } = useSelector((state) => state.courseDetail);
  const { process } = useSelector((state) => state.learningProcess);
  const dispatch = useDispatch();

  const theme = useTheme();
  const matchMd = useMediaQuery(theme.breakpoints.up("md"));

  const toggleDrawer = () => {
    dispatch({ type: TOGGLE_COURSE_DRAWER });
  };
  const containerRef = useRef();

  const courseModules = useMemo(() => {
    if (!courseDetail || !process) {
      return [];
    }
    const allSteps = courseDetail.modules.reduce((steps, module) => {
      return [...steps, ...module.steps];
    }, []);
    const learned = process.learned;
    return courseDetail.modules.reduce((arr, module) => {
      const name = module.title;
      const steps = module.steps.map((step) => ({
        name: step.title,
        href: `/learning/${courseId}/${step._id}`,
        type: step.type === "lesson" ? "video" : "test",
        time: step.time,
        disabled:
          allSteps.findIndex((item) => item._id === step._id) > learned.length,
        active:
          stepId === step._id &&
          (learned.findIndex((item) => stepId === item.stepId) > -1 ||
            allSteps.findIndex((item) => item._id === stepId) ===
              learned.length),
      }));
      arr.push({ name, steps });
      return arr;
    }, []);
  }, [courseDetail, courseId, process, stepId]);

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
          {courseModules.map((item, index) => (
            <GroupList data={item} index={index} key={index} learnLayout />
          ))}
        </Stack>
      </Box>
    </MuiDrawer>
  );
};

export default Drawer;
