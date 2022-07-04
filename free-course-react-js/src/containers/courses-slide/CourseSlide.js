/* eslint-disable import/no-unresolved */
import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import CourseCard from "../../components/course-card/CourseCard";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { SlidePrevButton, SlideNextButton } from "./slide-action";

function CourseSlide(props) {
  const { href, title, learned, courses } = props;

  const style = {
    "& .swiper": {
      "& .swiper-slide": {
        width: "fit-content!important",
      },

      position: "unset",
    },
    position: "relative",
    width: "100%",
  };

  return (
    <Paper sx={{ p: 1 }} elevation={0}>
      <div className="flex flex-row items-center justify-between mb-2">
        <Typography
          sx={{
            fontSize: {
              xs: 16,
              md: 20,
            },
            marginLeft: 1,
            fontWeight: 500,
          }}
        >
          {title}
        </Typography>
        {href && (
          <Typography
            component={Link}
            to={href || "./"}
            sx={{
              "&:hover": {
                textDecoration: "underline",
              },
              flexShrink: 0,
              color: (theme) => theme.palette.primary.main,
              fontSize: {
                xs: 14,
                md: 16,
              },
              fontWeight: 400,
            }}
            className="flex flex-row items-center gap-2"
          >
            Xem tất cả <ArrowForwardIosRounded fontSize="small" />
          </Typography>
        )}
      </div>
      <Box sx={style}>
        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            900: {
              spaceBetween: 20,
            },
          }}
        >
          <SlideNextButton />
          <SlidePrevButton />

          {courses?.map((course, index) => (
            <SwiperSlide key={index}>
              <CourseCard learned={learned} data={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Paper>
  );
}

export default CourseSlide;
