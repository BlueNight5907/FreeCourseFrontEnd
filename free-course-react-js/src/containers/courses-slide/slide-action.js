import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useSwiper } from "swiper/react";

export const SlideNextButton = () => {
  const swiper = useSwiper();
  const slideActionStyle = {
    "&:hover .slide-action": {
      visibility: "visible",
      opacity: 1,
    },
    height: "100%",
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
            xs: "translateX(-10px)",
            sm: "translateX(10px)",
            md: "translateX(20px)",
          },
          visibility: {
            md: "visible",
            xs: "hidden",
          },
          opacity: {
            xs: 0,
            md: 1,
          },
        }}
        onClick={() => swiper.slideNext()}
      >
        <ArrowForwardIosRounded />
      </IconButton>
    </Box>
  );
};

export const SlidePrevButton = () => {
  const swiper = useSwiper();
  const slideActionStyle = {
    "&:hover .slide-action": {
      visibility: "visible",
      opacity: 1,
    },
    height: "100%",
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
            xs: "translateX(10px)",
            sm: "translateX(-10px)",
            md: "translateX(-20px)",
          },
          visibility: {
            md: "visible",
            xs: "hidden",
          },
          opacity: {
            xs: 0,
            md: 1,
          },
        }}
      >
        <ArrowBackIosRounded />
      </IconButton>
    </Box>
  );
};
