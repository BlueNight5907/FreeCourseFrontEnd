import {
  useTheme,
  useMediaQuery,
  Grid,
  Box,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import React from "react";
import { Icon } from "@iconify/react";
import Button from "../../../components/button/Button";
import Post from "components/post/Post";
import UserCard from "components/user-card/UserCard";
import Posts from "mock-data/post";
import TeacherOfWeek from "mock-data/teacherOfWeek";
import CourseCard from "components/course-card/CourseCard";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { GET_FEEDS_REQUEST } from "store/types/data-types/blog-type";

const Feed = () => {
  const theme = useTheme();
  const matchLg = useMediaQuery(theme.breakpoints.up("lg"));

  const iconStyle = {
    default: {
      color: "#000",
      fontSize: theme.typography.pxToRem(34),
    },
    action: {
      ticked: {
        color: theme.palette.mintygreen.main,
        fontSize: theme.typography.pxToRem(20),
      },
    },
  };

  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch({ type: GET_FEEDS_REQUEST, page_size: 50 });
  }, []);
  return (
    <Grid container spacing={1} sx={{ justifyContent: "flex-end" }}>
      {/* Left of post */}
      <Grid item xs={12} lg={1} />

      {/* Post */}
      <Grid item xs={12} lg={6} marginRight={2}>
        {
          /* {posts
          ? posts
          : Posts.map((post) => <Post key={post._id} post={post} />)} */
          posts.map((post) => {
            console.log(post);
          })
        }
      </Grid>

      {/* Right of post */}
      {matchLg && (
        <Grid item xs={12} lg={4}>
          <Stack direction="column" spacing={1} className="fixed top-20">
            <Box
              sx={{
                backgroundColor: theme.palette.foreground.main,
                width: 400,
                padding: theme.spacing(1.5, 2, 1.5, 2),
                borderRadius: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <UserCard
                name={"Nguyen Van Huy"}
                subtitle={"Sinh viên"}
                avatar={"A"}
              />
              <Button>Đăng xuất</Button>
            </Box>
            <Box
              sx={{
                backgroundColor: theme.palette.foreground.main,
                width: 400,
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
                    {teacher.followed ? (
                      <IconButton>
                        <Icon
                          icon="teenyicons:tick-circle-outline"
                          style={iconStyle.action.ticked}
                        />
                      </IconButton>
                    ) : (
                      <Button>Theo dõi</Button>
                    )}
                    {/*  */}
                  </Box>
                ))}
              </Stack>
            </Box>
            <Box
              sx={{
                backgroundColor: theme.palette.foreground.main,
                width: 400,
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
                <CourseCard />
              </Box>
            </Box>
          </Stack>
        </Grid>
      )}
    </Grid>
  );
};

export default Feed;
