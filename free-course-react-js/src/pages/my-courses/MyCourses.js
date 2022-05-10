import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Button from "../../components/button/Button";
import Wrapper from "../../components/wrapper/Wrapper";
import CourseSlide from "../../containers/courses-slide/CourseSlide";

const MyCourses = () => {
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Wrapper
      className="my-2"
      title="Khóa học của tôi"
      actions={
        matchSm && <Button variant="contained">Thêm khóa học mới</Button>
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            className="pl-2 pr-[80px] py-1"
            sx={{
              borderRadius: 1,
              background: theme.palette.special_blue.main,
              color: "#fff",
              width: "fit-content",
            }}
          >
            <Typography variant="body1">Khóa học đã hoàn thành</Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <CourseSlide title="Cấu trúc dữ liệu và giải thuật" learned />
        </Grid>

        <Grid item xs={12}>
          <Box
            className="pl-2 pr-[80px] py-1"
            sx={{
              borderRadius: 1,
              background: theme.palette.special_red.main,
              color: "#fff",
              width: "fit-content",
            }}
          >
            <Typography variant="body1">Khóa học chưa hoàn thành</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <CourseSlide title="Cấu trúc dữ liệu và giải thuật" learned />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default MyCourses;
