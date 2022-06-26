/* eslint-disable import/no-unresolved */
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import Tag from "../../components/tag/Tag";
import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GET_CATEGORIES_REQUEST } from "store/types/data-types/category-types";

function CategorySlide(props) {
  const { href = "/courses", title } = props;
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_CATEGORIES_REQUEST });
  }, [dispatch]);

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
          to={href + "/all"}
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
        {categories.map((item, index) => (
          <SwiperSlide key={index}>
            <Tag href={href + "/" + item.urlPath}>{item.name}</Tag>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default CategorySlide;
