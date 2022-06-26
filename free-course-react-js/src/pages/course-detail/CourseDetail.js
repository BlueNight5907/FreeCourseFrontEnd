import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import CourseSlide from "../../containers/courses-slide/CourseSlide";
import CourseInformation from "./course-information/CourseInformation";

import bgImage from "../../assets/background/social-network-bg.jpg";
import Wrapper from "../../components/wrapper/Wrapper";
import GroupList from "../../components/module/GroupList";
import Comment from "../../components/comment/Comment";
import Button from "../../components/button/Button";
import { MoreHoriz } from "@mui/icons-material";
import { modules } from "mock-data/module.mock";

const CourseDetail = () => {
  const theme = useTheme();

  const styles = {
    backgroundContainer: {
      position: "sticky",
      top: 70,
      marginX: "auto",
      pt: 1,
    },
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={5} lg={4}>
        <Box sx={styles.backgroundContainer}>
          <Box
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            className="aspect-video rounded-lg mb-2"
          >
            Image
          </Box>
          <Typography variant="body2" className="mb-3">
            Chương: 15 | Bài học: 137 | Thời lượng: 1 giờ 30 phút
          </Typography>
          <CourseInformation />
        </Box>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box className="py-1" />
          </Grid>
          <Grid item xs={12}>
            <Wrapper elevation={0}>
              <Box className="content" sx={{ minHeight: 500 }}></Box>
              <Box className="module-container">
                <Typography variant="h6" className="mb-2">
                  Nội dung khóa học:
                </Typography>
                <Typography variant="body2" className="mb-1">
                  Chương: 15 | Bài học: 137 | Thời lượng: 1 giờ 30 phút
                </Typography>
                <Stack gap={1}>
                  {modules.map((item, index) => (
                    <GroupList data={item} key={index} />
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
        <Box className="py-4" />
      </Grid>
      <Grid item xs={12}>
        <CourseSlide title="Các khóa học khác của giáo viên" />
      </Grid>
      <Grid item xs={12}>
        <CourseSlide title="Các khóa học tương tự" />
      </Grid>
    </Grid>
  );
};

export default CourseDetail;
