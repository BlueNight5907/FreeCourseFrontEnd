import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { differenceInDays } from "date-fns";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Wrapper from "../../components/wrapper/Wrapper";
import CourseSlide from "../../containers/courses-slide/CourseSlide";

const MyCourses = () => {
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.up("sm"));
  const { learned } = useSelector((state) => state.learningProcess);
  const navigate = useNavigate();

  const completeCourse = useMemo(() => {
    return learned.reduce((arr, item) => {
      const allSteps = item.courseData.modules.reduce((steps, module) => {
        return [...steps, ...module.steps];
      }, []);
      if (item.learned?.length !== allSteps.length) {
        return arr;
      }
      const data = {
        visited: item.visited
          ? differenceInDays(new Date().getTime(), item.visited)
          : -1,
        name: item.courseData.title,
        background: item.courseData.background,
        courseId: item.courseId,
        creator: item.courseData.creator._id,
        shortDesc: item.courseData.shortDesc,
      };

      data.learned = item.learned?.length || 0;
      data.total = allSteps.length;
      arr.push(data);
      return arr;
    }, []);
  }, [learned]);

  const unCompleteCourse = useMemo(() => {
    return learned.reduce((arr, item) => {
      const allSteps = item.courseData.modules.reduce((steps, module) => {
        return [...steps, ...module.steps];
      }, []);
      if (item.learned?.length === allSteps.length) {
        return arr;
      }
      const data = {
        visited: item.visited
          ? differenceInDays(new Date().getTime(), item.visited)
          : -1,
        name: item.courseData.title,
        background: item.courseData.background,
        courseId: item.courseId,
        creator: item.courseData.creator._id,
        shortDesc: item.courseData.shortDesc,
      };

      data.learned = item.learned?.length || 0;
      data.total = allSteps.length;
      arr.push(data);
      return arr;
    }, []);
  }, [learned]);

  return (
    <Wrapper
      className="my-2"
      title="Khóa học của tôi"
      actions={
        matchSm && (
          <Button variant="contained" onClick={() => navigate("/courses/all")}>
            Thêm khóa học mới
          </Button>
        )
      }
    >
      <Grid container spacing={2}>
        {completeCourse.length > 0 && (
          <>
            <Grid item xs={12}>
              <Box
                className="pl-2 pr-[80px] py-1"
                sx={{
                  borderRadius: 1,
                  background: theme.palette.special_blue.main,
                  color: "#fff",
                  width: "fit-content",
                }}
              >
                <Typography variant="body1">Khóa học đã hoàn thành</Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <CourseSlide learned courses={completeCourse} />
            </Grid>
          </>
        )}

        {unCompleteCourse.length > 0 && (
          <>
            <Grid item xs={12}>
              <Box
                className="pl-2 pr-[80px] py-1"
                sx={{
                  borderRadius: 1,
                  background: theme.palette.special_red.main,
                  color: "#fff",
                  width: "fit-content",
                }}
              >
                <Typography variant="body1">
                  Khóa học chưa hoàn thành
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <CourseSlide learned courses={unCompleteCourse} />
            </Grid>
          </>
        )}
      </Grid>
    </Wrapper>
  );
};

export default MyCourses;
