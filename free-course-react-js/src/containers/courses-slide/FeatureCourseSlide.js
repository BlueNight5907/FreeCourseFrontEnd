/* eslint-disable import/no-unresolved */
import {
  Box,
  Paper,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "../../components/image/Image";
import { SlideNextButton, SlidePrevButton } from "./slide-action";
import courseBg from "../../assets/background/Students watching webinar on computer.jpg";
import Button from "../../components/button/Button";

const FeatureCourseItem = (props) => {
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.up("sm"));
  const matchMd = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Paper
      elevation={0}
      sx={{
        padding: 2,
        ...(matchSm && {
          border: "1px solid " + theme.palette.hover.main,
        }),
        display: "flex",
        gap: 2,
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        alignItems: "flex-start",
        cursor: "pointer",
        "&:hover .img-wrapper::before": {
          content: "''",
          position: "absolute",
          zIndex: 2,
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: theme.palette.text.main + "40",
        },
      }}
    >
      <div className="img-wrapper relative shrink-0 flex items-center">
        <Image
          alt="feature"
          className="aspect-video"
          maxWidth={{
            lg: 420,
            md: 340,
            sm: 280,
            xs: "100%",
          }}
          src={courseBg}
          style={{ objectFit: "cover" }}
          border={"0.5px solid #d1d7dc"}
        />
      </div>
      <Box
        flexGrow={1}
        display="flex"
        alignSelf="stretch"
        flexDirection="column"
        gap={0.2}
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Box
          flexGrow={1}
          display="flex"
          flexDirection="column"
          gap={0.2}
          alignItems="flex-start"
        >
          <Typography fontFamily="Roboto" className="font-semibold">
            Cấu trúc dữ liệu và giải thuật
          </Typography>
          {matchSm && (
            <Typography
              fontFamily="Roboto"
              variant="button"
              className="font-normal block"
            >
              Go Beyond the Basics with Project-Based Building Information
              Modeling for Architects
            </Typography>
          )}

          <Typography
            fontFamily="Roboto"
            variant="button"
            className="font-light block"
          >
            Nguyễn Văn Huy
          </Typography>
          <Stack flexDirection="Row" gap={0.5} alignItems="center">
            <Typography color="orange" variant="subtitle2">
              5.0
            </Typography>
            <Rating size="small" value={5} readOnly />
            <Typography
              fontFamily="Roboto"
              variant="button"
              className="font-light"
            >
              (400)
            </Typography>
          </Stack>
          <Typography
            fontFamily="Roboto"
            variant="caption"
            className="font-light block"
          >
            8 giờ học - 10 video - Mới bắt đầu
          </Typography>
          <Typography
            variant="caption"
            fontFamily="Roboto"
            sx={{
              padding: 0.5,
              color: "#4d3105",
              backgroundColor: "#f3ca8c",
            }}
          >
            Recommend
          </Typography>
        </Box>
        {matchMd && <Button>Xem chi tiết</Button>}
      </Box>
    </Paper>
  );
};

const FeatureCourseSlide = () => {
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
        backgroundColor: (theme) => theme.palette.foreground.main,
        padding: 1,
        borderRadius: 1,
      }}
    >
      <Typography marginX={1} variant="h6" fontFamily="Roboto">
        Khoá học nổi bật
      </Typography>
      <Box sx={style}>
        <Swiper
          slidesPerView={1}
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
          <SwiperSlide>
            <FeatureCourseItem />
          </SwiperSlide>
          <SwiperSlide>
            <FeatureCourseItem />
          </SwiperSlide>
          <SwiperSlide>
            <FeatureCourseItem />
          </SwiperSlide>
        </Swiper>
      </Box>
    </Box>
  );
};

export default FeatureCourseSlide;
