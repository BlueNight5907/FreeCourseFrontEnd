import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// import required modules
import { FreeMode } from "swiper";
import CourseCard from "../../components/course-card/CourseCard";
import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const SlideNextButton = () => {
  const swiper = useSwiper();
  const slideActionStyle = {
    "&:hover .slide-action": {
      visibility: "visible",
      opacity: 1,
    },
    height: "calc(100% - 40px)",
    top: 40,
  };
  return (
    <Box
      sx={slideActionStyle}
      className="absolute bottom-0 right-0 w-[20px] md:w-[50px] flex z-10 items-center justify-center"
    >
      <IconButton
        className="slide-action"
        sx={{
          background: (theme) => theme.palette.foreground.main + "99",
          color: (theme) => theme.palette.primary.main,
          "&:hover": {
            background: (theme) => theme.palette.foreground.main,
          },
          boxShadow: "0px 0px 2px 2px rgba(0,0,0,0.15)",
          transform: {
            xs: "translate(10px,-10px)",
            md: "translate(20px,-10px)",
          },
          visibility: {
            xs: "visible",
            md: "hidden",
          },
          opacity: {
            xs: 1,
            md: 0,
          },
        }}
        onClick={() => swiper.slideNext()}
      >
        <ArrowForwardIosRounded />
      </IconButton>
    </Box>
  );
};

const SlidePrevButton = () => {
  const swiper = useSwiper();
  const slideActionStyle = {
    "&:hover .slide-action": {
      visibility: "visible",
      opacity: 1,
    },
    height: "calc(100% - 40px)",
    top: 40,
  };
  return (
    <Box
      sx={slideActionStyle}
      className="absolute bottom-0 left-0 w-[20px] md:w-[50px] flex z-10 items-center justify-center"
    >
      <IconButton
        className="slide-action"
        onClick={() => swiper.slidePrev()}
        sx={{
          background: (theme) => theme.palette.foreground.main + "99",
          color: (theme) => theme.palette.primary.main,
          "&:hover": {
            background: (theme) => theme.palette.foreground.main,
          },
          boxShadow: "0px 0px 2px 2px rgba(0,0,0,0.15)",
          transform: {
            xs: "translate(-10px,-10px)",
            md: "translate(-20px,-10px)",
          },
          visibility: {
            xs: "visible",
            md: "hidden",
          },
          opacity: {
            xs: 1,
            md: 0,
          },
        }}
      >
        <ArrowBackIosRounded />
      </IconButton>
    </Box>
  );
};

function CourseSlide(props) {
  const { href, title, learned } = props;

  const style = {
    "& .swiper": {
      "& .swiper-slide": {
        width: "fit-content!important",
      },
      position: "unset",
    },
    position: "relative",
    padding: (theme) => theme.spacing(1, 0),
    width: "100%",
  };

  return (
    <Box sx={style}>
      <div className="flex flex-row items-center justify-between mb-3">
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
      </div>
      <Swiper
        slidesPerView="auto"
        spaceBetween={10}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode]}
        breakpoints={{
          900: {
            spaceBetween: 20,
          },
        }}
      >
        <SlideNextButton />

        <SlidePrevButton />
        <SwiperSlide>
          <CourseCard learned={learned} />
        </SwiperSlide>
        <SwiperSlide>
          <CourseCard learned={learned} />
        </SwiperSlide>
        <SwiperSlide>
          <CourseCard learned={learned} />
        </SwiperSlide>
        <SwiperSlide>
          <CourseCard learned={learned} />
        </SwiperSlide>
        <SwiperSlide>
          <CourseCard learned={learned} />
        </SwiperSlide>
        <SwiperSlide>
          <CourseCard learned={learned} />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
}

export default CourseSlide;
