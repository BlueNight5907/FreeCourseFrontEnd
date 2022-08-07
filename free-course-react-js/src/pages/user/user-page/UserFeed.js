import { Box, Grid, Tabs, Tab, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserFeeds } from "services/api/blogAPI";
import { useDispatch, useSelector } from "react-redux";
import Post from "components/post/Post";
import TabPanel from "components/tab-panel/TabPanel";
import {
  getAllMyCourse,
  getCoursesCreatedByUser,
} from "services/api/courseAPI";
import CourseCard from "./course-card/CourseCard";
import { convertTime } from "utils/number-utils";
import {
  GET_USER_FEEDS_REQUEST,
  RESET_USER_POST,
} from "store/types/data-types/blog-type";

function a11yProps(index) {
  return {
    id: `course-tab-${index}`,
    "aria-controls": `course-slide-tabpanel-${index}`,
  };
}

const UserFeed = (props) => {
  const dispatch = useDispatch();
  const { user, userId } = props;
  const { sideOpen } = useSelector((state) => state.setting);

  const [selected, setSelected] = useState(0);
  const [lastPostTime, setLastPostTime] = useState(new Date().toISOString());
  const [feeds, setFeeds] = useState([]);
  const [courses, setCourses] = useState([]);

  const { user_posts } = useSelector((state) => state.blog);

  const nextPage = () => {
    setLastPostTime(
      user_posts.length > 0
        ? convertTime(user_posts.at(-1)?.createdAt)
        : new Date().toISOString()
    );
  };

  const handleSelectedChange = (event, newValue) => {
    setSelected(newValue);
  };

  useEffect(() => {
    dispatch({ type: RESET_USER_POST });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: GET_USER_FEEDS_REQUEST,
      time: lastPostTime,
      id: userId,
    });
  }, [dispatch, lastPostTime, userId]);

  useEffect(() => {
    if (userId) {
      getCoursesCreatedByUser(userId).then((data) => {
        setCourses((prev) => [...data]);
      });
    }
  }, [userId]);
  return (
    <Box>
      <Tabs
        orientation={"horizontal"}
        variant="scrollable"
        value={selected}
        onChange={handleSelectedChange}
        allowScrollButtonsMobile
        aria-label="Vertical tabs example"
        sx={{
          flexShrink: 0,
          marginX: 1,
          height: "fit-content",
          borderBottom: "1px solid #d1d7dc",
        }}
      >
        <Tab
          label="Bài viết"
          className="capitalize items-start"
          {...a11yProps(0)}
        />
        {user?.type?.name !== "student" && (
          <Tab
            label="Khóa học"
            className="capitalize items-start"
            {...a11yProps(1)}
          />
        )}
      </Tabs>
      <TabPanel index={0} value={selected}>
        <Box my={2}>
          {user_posts?.map((post, index) => (
            <Post
              key={post._id}
              post={post}
              nextPage={nextPage}
              isLast={index === user_posts.length - 1}
            />
          ))}
          {user_posts.length === 0 && (
            <Typography>
              {user?.type?.name === "student" ? "Sinh viên" : "Giảng viên"} này
              chưa có bài viết nào.
            </Typography>
          )}
        </Box>
      </TabPanel>
      <TabPanel index={1} value={selected}>
        <Grid container spacing={1} my={2}>
          {courses.map((course, index) => (
            <Grid
              item
              xs={6}
              md={sideOpen ? 6 : 4}
              lg={sideOpen ? 6 : 4}
              xl={sideOpen ? 4 : 3}
              key={index}
            >
              <CourseCard gridView key={course._id} data={course} />
            </Grid>
          ))}
          {courses.length === 0 && (
            <Typography>
              {user?.type?.name === "student" ? "Sinh viên" : "Giảng viên"} này
              chưa có khóa học nào.
            </Typography>
          )}
        </Grid>
      </TabPanel>
      <Grid container spacing={2}></Grid>
    </Box>
  );
};

export default UserFeed;
