import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// import required modules
import { FreeMode } from "swiper";
import Tag from "../../components/tag/Tag";
import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

function FeatureCourse(props) {
  const { href, title } = props;

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
            fontSize: 20,
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
            color: (theme) => theme.palette.primary.main,
            fontSize: 16,
            fontWeight: 500,
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
        <SwiperSlide>
          <Tag>ABC</Tag>
        </SwiperSlide>
        <SwiperSlide>
          <Tag>ABC</Tag>
        </SwiperSlide>
        <SwiperSlide>
          <Tag>ABC</Tag>
        </SwiperSlide>
        <SwiperSlide>
          <Tag>ABC</Tag>
        </SwiperSlide>
        <SwiperSlide>
          <Tag>ABC</Tag>
        </SwiperSlide>
        <SwiperSlide>
          <Tag>ABC</Tag>
        </SwiperSlide>
        <SwiperSlide>
          <Tag>ABC</Tag>
        </SwiperSlide>
        <SwiperSlide>
          <Tag>ABC</Tag>
        </SwiperSlide>
        <SwiperSlide>
          <Tag>ABC</Tag>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
}

export default FeatureCourse;
