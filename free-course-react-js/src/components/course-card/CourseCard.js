import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Rating,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  PeopleOutlineRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";
import Button, { buttonBg } from "../button/Button";

import courseImage from "../../assets/background/course-image.png";
import userAvt from "../../assets/avatar/u29.jfif";
import LearningProgress from "../learning-progress/LearningProgress";

const CourseCard = (props) => {
  const { learned, data, sx, fullWidth, ...others } = props;
  const ref = useRef();
  const style = {
    card: {
      position: "relative",
      mb: 0.5,
      maxWidth: fullWidth
        ? "unset"
        : {
            xs: 300,
            sm: 340,
            md: 380,
            lg: 420,
          },
      minWidth: 280,
      backgroundColor: (theme) => theme.palette.foreground.main,
      "& .card-detail.active": {
        visibility: "visible",
        opacity: 1,
        top: 0,
      },
    },
    cardContent: {
      paddingTop: 0.6,
      paddingBottom: 0.6,
      paddingLeft: 1.6,
      paddingRight: 1.6,
      height: "fit-content",
    },

    courseTitle: {
      fontWeight: 600,
      fontSize: 14,
      lineHeight: 1.9,
    },

    avatar: {
      width: 30,
      height: 30,
    },

    cardDetail: {
      backgroundColor: (theme) => theme.palette.overlay.main,
      transition: "all 0.5s ease",
      overflow: "hidden",
      top: "150%",
    },

    card2: {
      maxWidth: fullWidth
        ? "unset"
        : {
            xs: 300,
            sm: 340,
            md: 380,
            lg: 420,
          },
      minWidth: 280,
    },
    boxGradient: {
      background:
        "linear-gradient(180deg, #111136 15.1%, rgba(100, 255, 227, 0) 48.44%, rgba(22, 30, 31, 0.69) 100%)",
      opacity: 0.7,
    },
  };
  const toggleDetail = () => {
    if (!ref.current.classList.contains("active")) {
      ref.current.classList.toggle("active");
    } else {
      ref.current.classList.remove("active");
    }
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      if (ref.current.classList.contains("active")) toggleDetail();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  if (learned) {
    return (
      <Box className="course-card" sx={style.card2}>
        <Card className="w-full">
          <CardActionArea
            className="relative"
            onClick={() => console.log("hello")}
          >
            <CardMedia
              component="img"
              className="aspect-[18/10]"
              image={courseImage}
              alt="green iguana"
            />
            <Box
              sx={style.boxGradient}
              className="card-gradient absolute inset-0 z-0"
            ></Box>
            <Box className="card-detail absolute inset-0 z-10 p-2 flex flex-col justify-between">
              <Box className="card-content__bottom w-full flex flex-row justify-between items-center">
                <Link
                  to="/"
                  className="card-content__bottom__user flex flex-row items-center gap-2"
                >
                  <Avatar src={userAvt} />
                  <Typography
                    sx={{
                      color: "#fff",
                    }}
                    component="span"
                    className="text-normal font-medium"
                  >
                    Easin Arafat
                  </Typography>
                </Link>

                <Button
                  component="div"
                  width={72}
                  height={33}
                  sx={{
                    backgroundColor: "#FB6D3A",
                    color: "#fff",
                  }}
                >
                  90p
                </Button>
              </Box>

              <Box>
                <Box
                  sx={{
                    padding: (theme) => theme.spacing(1.2, 2),
                    background: "rgba(148, 37, 57, 0.3)",
                    backdropFilter: "blur(36px)",
                    borderRadius: 1,
                    marginBottom: 1,
                    color: "#fff",
                    fontSize: 14,
                  }}
                  className="course-desc"
                >
                  Lorem ipsum dolor sit amet consectetur a elit. Sapiente fkdfk
                  hdk
                </Box>

                <LearningProgress
                  variant="determinate"
                  total={20}
                  learned={10}
                />
              </Box>
            </Box>
          </CardActionArea>
        </Card>

        <Typography className="mt-1 ml-2" variant="body2">
          Đã học 15 ngày trước
        </Typography>
      </Box>
    );
  } else {
    return (
      <Card {...others} sx={style.card} className="course-card">
        <CardActionArea disableTouchRipple onClick={toggleDetail}>
          <CardMedia
            component="img"
            className="aspect-[18/8]"
            image={courseImage}
            alt="green iguana"
          />
          <CardContent sx={style.cardContent}>
            <Typography component="p" gutterBottom sx={style.courseTitle}>
              E-Shop Mobile App
            </Typography>
            <div className="card-content__bottom flex flex-row justify-between items-center">
              <Link
                to="/"
                className="card-content__bottom__user flex flex-row items-center gap-2"
              >
                <Avatar src={userAvt} sx={style.avatar} />
                <Typography component="span" className="text-xs font-normal">
                  Easin Arafat
                </Typography>
              </Link>
              <div
                className="card-content__bottom__people
                flex flex-row items-center text-xs font-light gap-1"
              >
                <PeopleOutlineRounded
                  sx={{
                    width: 16,
                    height: 16,
                  }}
                />
                7000
              </div>
            </div>
          </CardContent>
        </CardActionArea>
        <Box
          className="card-detail bottom-0 absolute inset-x-0 w-full h-full"
          sx={style.cardDetail}
          ref={ref}
        >
          <Box className=" flex p-2 flex-col gap-3 items-center justify-center box-border h-full">
            <Typography
              sx={{
                color: (theme) => theme.palette.foreground.main,
              }}
              className="px-2 text-bases font-normal w-full"
            >
              Cấu trúc dữ liệu và giải thuật
            </Typography>
            <Box className="card-content__bottom w-full flex flex-row justify-between items-center">
              <Link
                to="/"
                className="card-content__bottom__user flex flex-row items-center gap-2"
              >
                <Avatar src={userAvt} sx={style.avatar} />
                <Typography
                  sx={{
                    color: (theme) => theme.palette.foreground.main,
                  }}
                  component="span"
                  className="text-sm font-normal"
                >
                  Easin Arafat
                </Typography>
              </Link>
              <Box
                sx={{
                  color: (theme) => theme.palette.foreground.main,
                }}
                className="card-content__bottom__people
                flex flex-row items-center text-xs font-light gap-1"
              >
                <PeopleOutlineRounded
                  sx={{
                    width: 16,
                    height: 16,
                  }}
                />
                7000
              </Box>
            </Box>
            <div className="flex flex-row gap-3 items-center justify-between w-full">
              <Typography
                sx={{
                  color: (theme) => theme.palette.foreground.main,
                  flexGrow: 1,
                }}
                className="text-sm font-normal"
              >
                Đánh giá:
              </Typography>
              <Typography
                sx={{
                  color: (theme) => theme.palette.foreground.main,
                }}
                className="text-sm font-normal"
              >
                4.9
              </Typography>
              <Rating
                name="size-small"
                readOnly
                defaultValue={5}
                size="small"
              />
            </div>
            <Typography
              sx={{
                color: (theme) => theme.palette.foreground.main,
              }}
              className="text-sm font-normal"
            >
              Lorem ipsum dolor sit amet consectetur a elit. Sapiente
            </Typography>

            <Button
              variant="contained"
              specialBg={buttonBg.red}
              endIcon={<ArrowForwardIosRounded />}
            >
              Chi tiết
            </Button>
          </Box>
        </Box>
      </Card>
    );
  }
};

CourseCard.propTypes = {
  learned: PropTypes.bool,
};

export default CourseCard;
