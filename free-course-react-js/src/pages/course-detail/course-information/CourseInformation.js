import { Box, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import Button from "../../../components/button/Button";
import TeacherAvatar from "../../../components/teacher-avatar/TeacherAvatar";

const CourseInformation = () => {
  return (
    <Box className="flex-grow max-w-[900px]">
      <Stack className="flex-col gap-3">
        <Typography variant="h5" className="font-semibold">
          Lesson 6 - Implement Navigation
        </Typography>
        <Typography variant="body2">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga,
          corrupti sit! Et quia culpa quae natus accusamus voluptatem
          distinctio, molestias quasi quis, odio fugiat ipsam laborum aut ut,
          provident nobis!
        </Typography>
        <Stack className="flex-row gap-2 flex-wrap items-center">
          <Rating value={4.5} readOnly />
          <Typography variant="subtitle2">16 học sinh đã đánh giá</Typography>
        </Stack>
        <TeacherAvatar />
        <Stack className="flex-row gap-4 flex-wrap items-center">
          <Button variant="contained" width="12rem">
            Đăng ký
          </Button>
          <Button variant="outlined" width="10rem">
            Đánh giá
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CourseInformation;
