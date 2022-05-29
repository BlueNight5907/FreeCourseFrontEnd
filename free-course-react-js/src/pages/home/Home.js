import React from "react";
import HeroSlide from "../../containers/courses-slide/HeroSLide";
import CategorySlide from "../../containers/courses-slide/CategorySlide";
import { Grid, Stack } from "@mui/material";
import ChatGroupIntroduction from "../../containers/introduction/ChatGroupIntroduction";
import SocialNetworkIntroduction from "../../containers/introduction/SocialNetworkIntroduction";
import CourseSlide from "../../containers/courses-slide/CourseSlide";
import TeacherRanking from "./teacher-ranking/TeacherRanking";
import FeatureCourseSlide from "../../containers/courses-slide/FeatureCourseSlide";
import TabsCourseSlide from "../../containers/courses-slide/TabsCourseSlide";
import DetailCourseSlide from "../../containers/courses-slide/DetailCourseSlide";
const Home = () => {
  return (
    <Grid container spacing={2} minHeight={0}>
      <Grid item xs={12}>
        <HeroSlide />
      </Grid>
      <Grid item xs={12}>
        <CategorySlide title="Danh mục khóa học" href="/category" />
      </Grid>
      <Grid item xs={12}>
        <TabsCourseSlide />
      </Grid>
      <Grid item xs={12} lg={7.5} xl={8.5}>
        <Stack direction="column" gap={2}>
          <CourseSlide title="Các khóa học đã xem" learned />
          <ChatGroupIntroduction />
          <SocialNetworkIntroduction />
        </Stack>
      </Grid>
      <Grid item xs={12} lg={4.5} xl={3.5}>
        <TeacherRanking />
      </Grid>
      <Grid item xs={12}>
        <FeatureCourseSlide />
      </Grid>
      <Grid item xs={12}>
        <DetailCourseSlide title="Học nhiều trong tuần" />
      </Grid>
      <Grid item xs={12}>
        <CourseSlide title="Khóa học cơ bản" />
      </Grid>
    </Grid>
  );
};

export default Home;
