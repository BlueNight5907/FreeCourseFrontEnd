/* eslint-disable import/no-unresolved */
import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import CourseCard from "../../pages/category/course-card/CourseCard";
import { SlideNextButton, SlidePrevButton } from "./slide-action";

const TestCourseSlide = (props) => {
  const { title } = props;
  const { sideOpen } = useSelector((state) => state.setting);
  const style = {
    "& .swiper": {
      position: "unset",
    },
    position: "relative",
    padding: (theme) => theme.spacing(1, 0),
    width: "100%",
  };
  return (
    <Box
      sx={{
        ...(title && {
          backgroundColor: (theme) => theme.palette.foreground.main,
          padding: 1,
          borderRadius: 1,
        }),
      }}
    >
      {title && (
        <Typography marginX={1} variant="h6" fontFamily="Roboto">
          {title}
        </Typography>
      )}
      <Box sx={style}>
        <Swiper
          slidesPerView={2}
          spaceBetween={2}
          breakpoints={{
            600: {
              slidesPerView: 2.5,
            },
            900: {
              slidesPerView: sideOpen ? 2 : 3,
            },
            1200: {
              slidesPerView: sideOpen ? 3 : 4,
            },
            1536: {
              slidesPerView: 5,
            },
          }}
        >
          <SlideNextButton />
          <SlidePrevButton />
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <SwiperSlide key={index}>
                <CourseCard gridView />
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default TestCourseSlide;
