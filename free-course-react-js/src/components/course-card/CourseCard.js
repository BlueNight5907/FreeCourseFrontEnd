import React, { useEffect, useRef, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import {
  PeopleOutlineRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";
import Button, { buttonBg } from "../button/Button";

import courseImage from "../../assets/background/course-image.png";
import userAvt from "../../assets/avatar/u29.jfif";
import LearningProgress from "../learning-progress/LearningProgress";
import { useDispatch } from "react-redux";
import { GET_ACCOUNT_INFORMATION } from "store/types/data-types/common-types";
import { maxLines } from "utils/classUltis";

const CourseCard = (props) => {
  const { learned, data, sx, fullWidth, ...others } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [teacherInfor, setTeacherInfor] = useState({
    id: "",
    email: "",
    userInformation: {
      fullName: "",
      avatar: "",
    },
  });
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
      width: fullWidth
        ? "unset"
        : {
            xs: 300,
            sm: 340,
            md: 380,
            lg: 420,
          },
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (ref.current.classList.contains("active")) toggleDetail();
      }
    };
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    if (data) {
      dispatch({
        type: GET_ACCOUNT_INFORMATION,
        accountId: data.creator,
        callback: (data) => setTeacherInfor(data),
      });
    }
  }, [data, dispatch]);

  const gotoCourse = () => {
    if (data?._id) {
      navigate("/course/" + data._id);
    }
  };

  if (learned) {
    return (
      <Box className="course-card" sx={style.card2}>
        <Card className="w-full">
          <CardActionArea
            className="relative"
            onClick={() => navigate("/course/" + data?.courseId)}
          >
            <CardMedia
              component="img"
              className="aspect-[18/10]"
              image={data?.background || courseImage}
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
                  <Avatar
                    src={teacherInfor.userInformation.avatar || userAvt}
                  />
                  <Typography
                    sx={{
                      color: "#fff",
                    }}
                    component="span"
                    className="text-normal font-medium"
                  >
                    {teacherInfor.userInformation.fullName}
                  </Typography>
                </Link>
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
                  }}
                  className="course-desc"
                >
                  <Typography gutterBottom>{data.name}</Typography>
                  <Typography
                    sx={{
                      ...maxLines(2),
                      display: { sm: "-webkit-box", xs: "none" },
                    }}
                    variant="body2"
                  >
                    {data?.shortDesc}
                  </Typography>
                </Box>

                {data.learned !== data.total && (
                  <LearningProgress
                    variant="determinate"
                    total={data.total}
                    learned={data.learned}
                  />
                )}
              </Box>
            </Box>
          </CardActionArea>
        </Card>

        <Typography className="mt-1 ml-2" variant="body2">
          {data.visited <= 0 &&
            data.learned === 0 &&
            "Bạn chưa học bất kì bài học nào"}
          {data.visited === 0 &&
            data.learned !== 0 &&
            "Bạn mới học vào hôm nay"}
          {data.visited > 0 && `Học lần cuối vào ${data.visited} ngày trước`}
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
            image={data?.background || courseImage}
            alt="green iguana"
          />
          <CardContent sx={style.cardContent}>
            <Typography component="p" gutterBottom sx={style.courseTitle}>
              {data?.title}
            </Typography>
            <div className="card-content__bottom flex flex-row justify-between items-center">
              <Link
                to="/"
                className="card-content__bottom__user flex flex-row items-center gap-2"
              >
                <Avatar
                  src={teacherInfor.userInformation.avatar}
                  sx={style.avatar}
                />
                <Typography component="span" className="text-xs font-normal">
                  {teacherInfor.userInformation.fullName}
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
                {data?.participants?.length || 0}
              </div>
            </div>
          </CardContent>
        </CardActionArea>
        <Box
          className="card-detail bottom-0 absolute inset-x-0 w-full h-full"
          sx={style.cardDetail}
          ref={ref}
        >
          <Box className=" flex p-2 flex-col gap-3 items-center box-border h-full">
            <Typography
              sx={{
                color: (theme) => theme.palette.foreground.main,
              }}
              className="px-2 text-bases font-normal w-full"
            >
              {data?.title}
            </Typography>
            <Box className="card-content__bottom w-full flex flex-row justify-between items-center">
              <Link
                to="/"
                className="card-content__bottom__user flex flex-row items-center gap-2"
              >
                <Avatar
                  src={teacherInfor.userInformation.avatar}
                  sx={style.avatar}
                />
                <Typography
                  sx={{
                    color: (theme) => theme.palette.foreground.main,
                  }}
                  component="span"
                  className="text-sm font-normal"
                >
                  {teacherInfor.userInformation.fullName}
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
                {data?.participants?.length || 0}
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
                ...maxLines(3),
                textAlign: "left",
              }}
              className="text-sm font-normal"
            >
              {data?.shortDesc}
            </Typography>

            <Button
              variant="contained"
              specialBg={buttonBg.red}
              endIcon={<ArrowForwardIosRounded />}
              onClick={gotoCourse}
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
