import {
  Alert,
  Box,
  Chip,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useMemo } from "react";
import CourseSlide from "../../containers/courses-slide/CourseSlide";
import CourseInformation from "./course-information/CourseInformation";
import bgImage from "../../assets/background/social-network-bg.jpg";
import Wrapper from "../../components/wrapper/Wrapper";
import GroupList from "../../components/module/GroupList";
import Comment from "../../components/comment/Comment";
import Button from "../../components/button/Button";
import { MoreHoriz } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_COURSES_WITH_CATEGORY_REQUEST,
  GET_COURSE_DETAIL_REQUEST,
  GET_TEACHER_INFOR_REQUEST,
} from "store/types/data-types/course-detail-types";
import Prism from "prismjs";
import { millisecondsToHours, millisecondsToMinutes } from "date-fns";
import ReactHtmlParser from "react-html-parser";

const styles = {
  backgroundContainer: {
    position: "sticky",
    top: 70,
    marginX: "auto",
    pt: 1,
  },
};

const CourseDetail = () => {
  const theme = useTheme();
  const { courseId } = useParams();
  const { courseDetail, category, teacher, courses } = useSelector(
    (s) => s.courseDetail
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_COURSE_DETAIL_REQUEST, courseId });
  }, [courseId, dispatch]);

  useEffect(() => {
    if (category?.name) {
      dispatch({
        type: GET_COURSES_WITH_CATEGORY_REQUEST,
        category: category.urlPath,
        params: {
          page: 1,
          page_size: 8,
        },
      });
    }
  }, [category, dispatch]);

  useEffect(() => {
    if (courseDetail) {
      dispatch({
        type: GET_TEACHER_INFOR_REQUEST,
        teacherId: courseDetail.creator,
      });
      Prism.highlightAll();
    }
  }, [courseDetail, dispatch]);

  const calculatingSteps = (modules) => {
    if (!modules) {
      return 0;
    }
    return modules.reduce((number, module) => {
      return number + module.steps.length;
    }, 0);
  };

  const caculatingTotalTime = (modules) => {
    if (!modules) {
      return 0;
    }
    const allSteps = modules.reduce((arr, module) => {
      arr = [...arr, ...module.steps];
      return arr;
    }, []);
    return allSteps.reduce((time, step) => {
      return time + step.time;
    }, 0);
  };
  const time = caculatingTotalTime(courseDetail?.modules);

  const courseModules = useMemo(() => {
    if (!courseDetail) {
      return [];
    }
    return courseDetail.modules.reduce((arr, module) => {
      const name = module.title;
      const steps = module.steps.map((step) => ({
        name: step.title,
        href: `./`,
        type: step.type === "lesson" ? "video" : "test",
        time: step.time,
      }));
      arr.push({ name, steps });
      return arr;
    }, []);
  }, [courseDetail]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={5} lg={4}>
        <Box sx={styles.backgroundContainer}>
          <Box
            style={{
              backgroundImage: `url(${
                courseDetail?.background ? courseDetail.background : bgImage
              })`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            className="aspect-video rounded-lg mb-2"
          ></Box>
          <Typography variant="body2" className="mb-3">
            Chương: {courseDetail?.modules.length || 0} | Bài học:{" "}
            {calculatingSteps(courseDetail?.modules)} | Thời lượng:{" "}
            {millisecondsToHours(time)} giờ{" "}
            {millisecondsToMinutes(time) - millisecondsToHours(time) * 60} phút
          </Typography>
          <CourseInformation
            teacherDetail={teacher}
            courseDetail={courseDetail}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box className="py-1" />
          </Grid>
          <Grid item xs={12}>
            <Wrapper elevation={0}>
              <Box className="content" sx={{ minHeight: 200, pb: 2 }}>
                <Stack direction="row" flexWrap="wrap" gap={1} mb={2}>
                  {courseDetail && (
                    <Chip label={courseDetail.category.name} color="primary" />
                  )}
                  {courseDetail?.tags.map((item, index) => (
                    <Chip label={item.name} key={index} />
                  ))}
                </Stack>
                {ReactHtmlParser(
                  courseDetail?.content || courseDetail?.shortDesc
                )}
              </Box>
              <Box my={1}>
                {courseDetail?.gains?.length > 0 && (
                  <>
                    <Typography gutterBottom>Kết quả đạt được:</Typography>
                    <Grid container spacing={1}>
                      {courseDetail?.gains?.map((item, index) =>
                        item ? (
                          <Grid item key={index} xs={12} md={6}>
                            <Alert severity="success">{item}</Alert>
                          </Grid>
                        ) : null
                      )}
                    </Grid>
                  </>
                )}
              </Box>
              <Box className="module-container">
                <Typography variant="h6" className="mb-2">
                  Nội dung khóa học:
                </Typography>
                <Typography variant="body2" className="mb-1">
                  Chương: {courseDetail?.modules.length || 0} | Bài học:{" "}
                  {calculatingSteps(courseDetail?.modules)} | Thời lượng:{" "}
                  {millisecondsToHours(time)} giờ{" "}
                  {millisecondsToMinutes(time) - millisecondsToHours(time) * 60}{" "}
                  phút
                </Typography>
                <Stack gap={1}>
                  {courseModules.map((item, index) => (
                    <GroupList data={item} key={index} index={index} />
                  ))}
                </Stack>
              </Box>
            </Wrapper>
          </Grid>

          <Grid item xs={12}>
            <Stack gap={1} alignItems="center">
              <Comment />
              <Comment />
              <Comment />
              <Comment />

              <Button width={300} variant="contained" endIcon={<MoreHoriz />}>
                Tải thêm bình luận
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <CourseSlide title="Các khóa học tương tự" courses={courses} />
        <Box p={0.5} width="100%" />
      </Grid>
    </Grid>
  );
};

export default CourseDetail;
