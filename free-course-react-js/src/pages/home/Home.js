import React, { useEffect, useState } from "react";
import HeroSlide from "../../containers/courses-slide/HeroSLide";
import CategorySlide from "../../containers/courses-slide/CategorySlide";
import { Grid, Stack } from "@mui/material";
import ChatGroupIntroduction from "../../containers/introduction/ChatGroupIntroduction";
import SocialNetworkIntroduction from "../../containers/introduction/SocialNetworkIntroduction";
import CourseSlide from "../../containers/courses-slide/CourseSlide";
import TeacherRanking from "./teacher-ranking/TeacherRanking";
import FeatureCourseSlide from "../../containers/courses-slide/FeatureCourseSlide";
import TabsCourseSlide from "../../containers/courses-slide/TabsCourseSlide";
import { useDispatch } from "react-redux";
import { GET_COURSES_WITH_FILTER } from "store/types/data-types/common-types";
const Home = () => {
  const [frontendCourses, setFrontendCourses] = useState([]);
  const [aiCourses, setAICourses] = useState([]);
  const [backendCourses, setBackendCourses] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_COURSES_WITH_FILTER,
      category: "frontend",
      params: { page: 1, page_size: 8 },
      callback: setFrontendCourses,
    });
    dispatch({
      type: GET_COURSES_WITH_FILTER,
      category: "ai",
      params: { page: 1, page_size: 8 },
      callback: setAICourses,
    });
    dispatch({
      type: GET_COURSES_WITH_FILTER,
      category: "backend",
      params: { page: 1, page_size: 8 },
      callback: setBackendCourses,
    });
  }, [dispatch]);

  return (
    <Grid container spacing={2} minHeight={0}>
      <Grid item xs={12}>
        <HeroSlide />
      </Grid>
      <Grid item xs={12}>
        <CategorySlide title="Danh mục khóa học" />
      </Grid>
      <Grid item xs={12}>
        <TabsCourseSlide />
      </Grid>
      <Grid item xs={12} md={6}>
        <ChatGroupIntroduction />
      </Grid>
      <Grid item xs={12} md={6}>
        <SocialNetworkIntroduction />
      </Grid>

      <Grid item xs={12}>
        <FeatureCourseSlide />
      </Grid>
      <Grid item xs={12}>
        <CourseSlide
          title="Khóa học lập trình Front-end"
          courses={frontendCourses}
        />
      </Grid>
      <Grid item xs={12}>
        <CourseSlide title="Trí tuệ nhân tạo" courses={aiCourses} />
      </Grid>
      <Grid item xs={12}>
        <CourseSlide title="Lập trình backend" courses={backendCourses} />
      </Grid>
      <Grid item xs={12} />
    </Grid>
  );
};

export default Home;
