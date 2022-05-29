import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from "swiper/react";
// import required modules
import { Autoplay } from "swiper";
import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";

import socialBg from "../../assets/background/social-network-bg.jpg";
import learningBg from "../../assets/background/learning-bg.jpg";
import studentBg from "../../assets/background/Students watching webinar on computer.jpg";
import courseBg from "../../assets/background/course-slide-bg.jpg";

import studentReadingBg from "../../assets/background/Tiny student sitting on book pile and reading.jpg";
import { SlideNextButton, SlidePrevButton } from "./slide-action";
const SlidePagination = (props) => {
  const { activeIndex } = props;
  const swiper = useSwiper();
  const [active, setActive] = useState(activeIndex);
  const slides = swiper.slides;
  const handleClick = (index) => {
    swiper.slideTo(index);
  };
  useEffect(() => {
    setActive(activeIndex);
  }, [activeIndex]);

  return (
    <Stack
      sx={{
        position: "absolute",
        bottom: -2,
        left: 0,
        right: 0,
        width: "100%",
        height: "fit-content",
        padding: (theme) => theme.spacing(0, 1),
        "& .item": {
          height: 6,
          width: 25,
          borderRadius: 0.5,
          backgroundColor: (theme) => theme.palette.text2.main,
          "&.active": {
            width: 50,
          },
        },
      }}
      flexDirection="row"
      gap={1}
      className=".swiper-pagination"
    >
      {slides.map((item, index) => (
        <span
          className={`item ${active === index ? "active" : ""}`}
          key={index}
          onClick={() => handleClick(index)}
        ></span>
      ))}
    </Stack>
  );
};

const SlideItem = (props) => {
  const { setActiveIndex, index, children, bgColor, img, imgStyle } = props;
  const swiperSlide = useSwiperSlide();
  useEffect(() => {
    if (swiperSlide.isActive) {
      setActiveIndex(index);
    }
  }, [swiperSlide.isActive, index, setActiveIndex]);
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: {
          xs: 1,
          md: 1.5,
        },
        height: {
          lg: 320,
          md: 280,
          xs: 220,
        },
        display: "flex",
        position: "relative",
        overflow: "hidden",
        padding: 2,
        background: bgColor,
      }}
    >
      <Box>{children}</Box>
      <Box
        component="img"
        src={img}
        alt="slide-bg"
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: {
            xs: -300,
            lg: 0,
            md: -100,
          },
          maxHeight: "100%",
          ...imgStyle,
        }}
      />
    </Box>
  );
};

function HeroSlide(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const style = {
    position: "relative",
    padding: (theme) => theme.spacing(1, 0),
    width: "100%",
    "& .swiper": {
      position: "static",
    },
  };

  return (
    <Box sx={style}>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          900: {
            spaceBetween: 20,
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        <SlidePagination activeIndex={activeIndex} />
        <SlideNextButton />
        <SlidePrevButton />

        <SwiperSlide>
          <SlideItem
            setActiveIndex={setActiveIndex}
            index={0}
            bgColor="linear-gradient(180deg, #78A9EE 0%, #A19CE9 30.73%, #D190E2 60.42%, #D190E2 100%)"
            img={courseBg}
          />
        </SwiperSlide>

        <SwiperSlide>
          <SlideItem
            setActiveIndex={setActiveIndex}
            index={1}
            bgColor="#fff"
            img={learningBg}
            imgStyle={{
              right: {
                xs: -150,
                lg: 0,
                md: -100,
              },
            }}
          />
        </SwiperSlide>

        <SwiperSlide>
          <SlideItem
            setActiveIndex={setActiveIndex}
            index={2}
            bgColor="#fff"
            img={studentBg}
            imgStyle={{
              right: {
                xs: -150,
                lg: 0,
                md: -100,
              },
            }}
          />
        </SwiperSlide>

        <SwiperSlide>
          <SlideItem
            setActiveIndex={setActiveIndex}
            index={3}
            bgColor="#fff"
            img={socialBg}
            imgStyle={{
              right: {
                xs: -150,
                lg: 0,
                md: -100,
              },
            }}
          />
        </SwiperSlide>

        <SwiperSlide>
          <SlideItem
            setActiveIndex={setActiveIndex}
            index={4}
            bgColor="#fff"
            img={studentReadingBg}
            imgStyle={{
              right: {
                xs: -150,
                lg: 0,
                md: -100,
              },
            }}
          />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
}

export default HeroSlide;
