import {
  Alert,
  Box,
  Chip,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import CourseSlide from "../../containers/courses-slide/CourseSlide";
import CourseInformation from "./course-information/CourseInformation";
import bgImage from "../../assets/background/social-network-bg.jpg";
import Wrapper from "../../components/wrapper/Wrapper";
import GroupList from "../../components/module/GroupList";
import Comment from "../../components/comment/Comment";
import Button from "../../components/button/Button";
import { ClearRounded, MoreHoriz, Send } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_COURSE_COMMENT_REQUEST,
  DELETE_COURSE_COMMENT_REQUEST,
  GET_COURSES_WITH_CATEGORY_REQUEST,
  GET_COURSE_COMMENTS_REQUEST,
  GET_COURSE_DETAIL_REQUEST,
  GET_TEACHER_INFOR_REQUEST,
} from "store/types/data-types/course-detail-types";
import Prism from "prismjs";
import { millisecondsToHours, millisecondsToMinutes } from "date-fns";
import ReactHtmlParser from "react-html-parser";
import { scrollSetting } from "utils/classUltis";

const styles = {
  backgroundContainer: {
    position: "sticky",
    top: 70,
    marginX: "auto",
    pt: 1.5,
  },
};

const CourseDetail = () => {
  const theme = useTheme();
  const { courseId } = useParams();
  const { courseDetail, category, teacher, courses, comments } = useSelector(
    (s) => s.courseDetail
  );
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [openComment, setOpenComment] = useState(false);
  const toggleComment = () => setOpenComment((s) => !s);

  useEffect(() => {
    if (courseId) {
      dispatch({ type: GET_COURSE_DETAIL_REQUEST, courseId });
      dispatch({ type: GET_COURSE_COMMENTS_REQUEST, courseId });
    }
  }, [courseId, dispatch]);

  const sendComment = () => {
    dispatch({ type: ADD_COURSE_COMMENT_REQUEST, courseId, comment });
    setComment("");
  };

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

  const deleteComment = useCallback(
    (commentId) => {
      dispatch({ type: DELETE_COURSE_COMMENT_REQUEST, courseId, commentId });
    },
    [dispatch, courseId]
  );

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
    <>
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
              {millisecondsToMinutes(time) - millisecondsToHours(time) * 60}{" "}
              phút
            </Typography>
            <CourseInformation
              teacherDetail={teacher}
              courseDetail={courseDetail}
              toggleComment={toggleComment}
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
                <Box className="content" sx={{ minHeight: 600, pb: 2 }}>
                  <Stack direction="row" flexWrap="wrap" gap={1} mb={2}>
                    {courseDetail && (
                      <Chip
                        label={courseDetail.category.name}
                        color="primary"
                      />
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
                    {millisecondsToMinutes(time) -
                      millisecondsToHours(time) * 60}{" "}
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
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <CourseSlide title="Các khóa học tương tự" courses={courses} />
          <Box p={0.5} width="100%" />
        </Grid>
      </Grid>
      <Drawer
        sx={{ zIndex: theme.zIndex.appBar + 101 }}
        anchor="right"
        open={openComment}
        onClose={toggleComment}
      >
        <IconButton
          sx={{ position: "absolute", top: 10, right: 10, zIndex: 2 }}
          onClick={toggleComment}
        >
          <ClearRounded />
        </IconButton>
        <Box
          maxWidth={750}
          height="100%"
          padding={2}
          width="100vw"
          sx={{
            ...scrollSetting({ width: 8 }),
            position: "relative",
            backgroundColor: theme.palette.background.main,
          }}
        >
          <Box paddingX={2} paddingY={1}>
            <Typography className="font-bold text-lg">
              {comments.length} bình luận
            </Typography>
            <Typography variant="body2">
              (Vui lòng không spam hoặc quấy rối dưới mọi hình thức)
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: theme.palette.foreground.main,
              position: "relative",
            }}
            p={1}
            borderRadius={1}
            my={2}
          >
            <TextField
              label="Bình luận"
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full"
            />
            <Button
              sx={{ bottom: 15, right: 15, position: "absolute" }}
              variant="contained"
              onClick={sendComment}
              disabled={comment === ""}
              endIcon={<Send />}
            >
              Gửi
            </Button>
          </Box>
          <Stack gap={1}>
            {comments?.map((item, index) => (
              <Comment
                owner={user._id === item.accountId}
                onDelete={() => deleteComment(item._id)}
                key={index}
                data={item}
              />
            ))}
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default CourseDetail;
