import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  Grid,
  Button,
  useTheme,
  Stack,
  Tabs,
  Tab,
} from "@mui/material";
import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { useEffect, useState } from "react";
import { getUserFeeds } from "services/api/blogAPI";
import { useSelector } from "react-redux";
import Post from "components/post/Post";
import Wrapper from "components/wrapper/Wrapper";
import { ArrowCircleUp, ModeEdit } from "@mui/icons-material";
import TabPanel from "components/tab-panel/TabPanel";
import { getAllMyCourse } from "services/api/courseAPI";
import { FeatureCourseItem } from "containers/courses-slide/FeatureCourseSlide";
import CourseCard from "./course-card/CourseCard";

function a11yProps(index) {
  return {
    id: `course-tab-${index}`,
    "aria-controls": `course-slide-tabpanel-${index}`,
  };
}

const convertTime = (time) => {
  const tempTime = new Date(time).getTime();
  return new Date(tempTime - 1).toISOString();
};

const UserFeed = () => {
  const theme = useTheme();
  const { user } = useSelector((state) => state.auth);
  const { sideOpen } = useSelector((state) => state.setting);

  const [selected, setSelected] = useState(0);
  const [lastPostTime, setLastPostTime] = useState(new Date().toISOString());
  const [page, setPage] = useState(1);
  const [feeds, setFeeds] = useState([]);
  const [courses, setCourses] = useState([]);

  const nextPage = () => {
    setLastPostTime(
      feeds.length > 0
        ? convertTime(feeds.at(-1)?.createdAt)
        : new Date().toISOString()
    );
  };

  const handleSelectedChange = (event, newValue) => {
    if (newValue === 0) {
      setCourses([]);
    }
    if (newValue === 1) {
      setPage(1);
      setFeeds([]);
    }

    setSelected(newValue);
  };

  useEffect(() => {
    if (selected === 0 && user) {
      getUserFeeds(lastPostTime, user._id).then((data) => {
        setFeeds((prev) => [...new Set([...prev, ...data.feeds])]);
      });
    }
  }, [lastPostTime, user, selected]);

  useEffect(() => {
    if (selected === 1 && user) {
      getAllMyCourse().then((data) => {
        setCourses((prev) => [...new Set([...prev, ...data])]);
      });
    }
  }, [selected, user]);
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
        {user?.type.name !== "student" && (
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
              <CourseCard gridView key={course._id} data={course.courseData} />
            </Grid>
          ))}
        </Grid>
        {/* <Stack spacing={1}>
          {courses.map((course, index) => (
            <CourseCard key={course._id} data={course.courseData} />
          ))}
        </Stack> */}
      </TabPanel>
      {/* </Wrapper> */}
      <Grid container spacing={2}></Grid>
    </Box>
    // </Card>
  );
};

export default UserFeed;
