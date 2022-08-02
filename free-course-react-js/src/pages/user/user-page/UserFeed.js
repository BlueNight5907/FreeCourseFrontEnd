import { Box, Grid, Tabs, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserFeeds } from "services/api/blogAPI";
import { useSelector } from "react-redux";
import Post from "components/post/Post";
import TabPanel from "components/tab-panel/TabPanel";
import {
  getAllMyCourse,
  getCoursesCreatedByUser,
} from "services/api/courseAPI";
import CourseCard from "./course-card/CourseCard";
import { convertTime } from "utils/number-utils";

function a11yProps(index) {
  return {
    id: `course-tab-${index}`,
    "aria-controls": `course-slide-tabpanel-${index}`,
  };
}

const UserFeed = (props) => {
  const { user, userId } = props;
  const { sideOpen } = useSelector((state) => state.setting);

  const [selected, setSelected] = useState(0);
  const [lastPostTime, setLastPostTime] = useState(new Date().toISOString());
  const [feeds, setFeeds] = useState([]);
  const [courses, setCourses] = useState([]);

  const nextPage = () => {
    setLastPostTime(
      feeds.length > 0
        ? convertTime(feeds.at(-1)?.updatedAt)
        : new Date().toISOString()
    );
  };

  const handleSelectedChange = (event, newValue) => {
    setSelected(newValue);
  };

  useEffect(() => {
    if (user) {
      setFeeds([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getUserFeeds(lastPostTime, user.id).then((data) => {
        setFeeds((prev) => [...new Set([...prev, ...data.feeds])]);
      });
    }
  }, [lastPostTime, user]);

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
        {feeds.map((post, index) => (
          <Post
            key={post._id}
            post={post}
            nextPage={nextPage}
            isLast={index === feeds.length - 1}
          />
        ))}
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
        </Grid>
      </TabPanel>
      <Grid container spacing={2}></Grid>
    </Box>
  );
};

export default UserFeed;
