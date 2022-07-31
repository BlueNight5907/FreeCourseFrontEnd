import {
  useTheme,
  useMediaQuery,
  Grid,
  Box,
  Stack,
  Typography,
  IconButton,
  Fab,
  Snackbar,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import Button from "../../../components/button/Button";
import Post from "components/post/Post";
import UserCard from "components/user-card/UserCard";
import Posts from "mock-data/post";
import TeacherOfWeek from "mock-data/teacherOfWeek";
import CourseCard from "components/course-card/CourseCard";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_FEEDS_REQUEST,
  GET_MORE_FEEDS_REQUEST,
} from "store/types/data-types/blog-type";
import CourseSlide from "containers/courses-slide/CourseSlide";
import { GET_COURSES_WITH_FILTER } from "store/types/data-types/common-types";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getRandomItem } from "utils/array-utils";
import { useCallback } from "react";
import useFetch from "./useFetch";
import { getNewFeeds } from "services/api/blogAPI";

const Feed = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const matchLg = useMediaQuery(theme.breakpoints.up("lg"));
  const matchSm = useMediaQuery(theme.breakpoints.up("md"));

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.blog);
  // const [feeds, setFeeds] = useState([]);
  const [frontendCourses, setFrontendCourses] = useState([]);

  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const [page, setPage] = useState(1);
  const [feeds, setFeeds] = useState([]);

  // const nextPage = ;

  useEffect(() => {
    getNewFeeds("", 5, page).then((data) => {
      setFeeds((prev) => [...prev, ...data.feeds]);
    });
  }, [page]);

  useEffect(() => {
    dispatch({
      type: GET_COURSES_WITH_FILTER,
      category: "frontend",
      params: { page: 1, page_size: 8 },
      callback: setFrontendCourses,
    });
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      setSnackMessage(message);
      setOpenSnack(true);
    }
  }, [message]);
  return (
    <Grid container spacing={3} sx={{ justifyContent: "flex-end" }}>
      {matchSm && (
        <Fab
          color="primary"
          size="medium"
          elevation={2}
          className="fixed bottom-4 right-1"
          title="Tạo bài viết mới"
          onClick={() => navigate("/community/post/create")}
        >
          <Add />
        </Fab>
      )}
      {/* Post */}
      <Grid item xs={12} lg={8}>
        {feeds.map((post, index) => (
          <Post
            key={post._id}
            post={post}
            nextPage={() => {
              setPage(page + 1);
            }}
            isLast={index === feeds.length - 1}
          />
        ))}
      </Grid>
      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleClose}
        message={snackMessage}
      />
      {/* Right of post */}
      {matchLg && (
        <Grid item xs={12} lg={4}>
          <Stack direction="column" spacing={1} className="fixed top-20">
            <Box
              sx={{
                backgroundColor: theme.palette.foreground.main,
                padding: theme.spacing(1.5, 2, 1.5, 2),
                borderRadius: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <UserCard
                name={
                  user?.userInformation?.fullName &&
                  user.userInformation.fullName
                }
                subtitle={
                  user?.userInformation?.major && user.userInformation.major
                }
                avatar={
                  user?.userInformation?.avatar && user.userInformation.avatar
                }
              />
              <Button>Đăng xuất</Button>
            </Box>
            <Box
              sx={{
                backgroundColor: theme.palette.foreground.main,
                padding: theme.spacing(1.5),
                borderRadius: 1,
              }}
            >
              <Typography variant="subtitle1" fontWeight={500}>
                Giáo viên nổi bật (Tuần)
              </Typography>
              <Stack padding={1} spacing={1}>
                {TeacherOfWeek.map((teacher) => (
                  <Box
                    key={teacher.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <UserCard
                      name={teacher.name}
                      avatar={teacher.avatar}
                      size="small"
                    />
                    <Button onClick={() => navigate(teacher.link)}>
                      Xem trang
                    </Button>
                  </Box>
                ))}
              </Stack>
            </Box>
            <Box
              sx={{
                backgroundColor: theme.palette.foreground.main,
                padding: theme.spacing(1.5),
                borderRadius: "10px",
              }}
            >
              <Typography variant="subtitle1" fontWeight={500}>
                Khóa học đề xuất
              </Typography>
              <Box
                sx={{
                  padding: theme.spacing(1, 0),
                }}
              >
                <CourseCard gridView data={getRandomItem(frontendCourses)} />
              </Box>
            </Box>
          </Stack>
        </Grid>
      )}
    </Grid>
  );
};

export default Feed;
