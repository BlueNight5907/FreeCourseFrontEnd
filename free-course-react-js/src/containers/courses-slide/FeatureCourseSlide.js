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
import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "../../components/image/Image";
import { SlideNextButton, SlidePrevButton } from "./slide-action";
import courseBg from "../../assets/background/Students watching webinar on computer.jpg";
import Button from "../../components/button/Button";
import { useDispatch } from "react-redux";
import {
  GET_ACCOUNT_INFORMATION,
  GET_COURSES_WITH_FILTER,
} from "store/types/data-types/common-types";
import { getRandomItem } from "utils/array-utils";
import colors from "utils/colors";
import { Link } from "react-router-dom";
import { maxLines } from "utils/classUltis";

const FeatureCourseItem = ({ course }) => {
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.up("sm"));
  const matchMd = useMediaQuery(theme.breakpoints.up("md"));
  const [teacherInfor, setTeacherInfor] = useState({
    id: "",
    email: "",
    userInformation: {
      fullName: "",
      avatar: "",
    },
  });
  const color = useMemo(() => {
    return course?.tags.map((item) => getRandomItem(colors)) || [];
  }, [course?.tags]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (course) {
      dispatch({
        type: GET_ACCOUNT_INFORMATION,
        accountId: course.creator,
        callback: (data) => setTeacherInfor(data),
      });
    }
  }, [course, dispatch]);

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
          src={course?.background || courseBg}
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
          <Typography
            component={Link}
            to={`/course/${course?._id}`}
            sx={{
              "&:hover": {
                color: theme.palette.primary.main,
              },
              ...maxLines(2),
            }}
            fontFamily="Roboto"
            className="font-semibold"
          >
            {course?.title}
          </Typography>
          {matchSm && (
            <Typography
              fontFamily="Roboto"
              variant="button"
              className="font-normal block"
              sx={maxLines(3)}
            >
              {course?.shortDesc}
            </Typography>
          )}

          <Typography
            fontFamily="Roboto"
            variant="button"
            className="font-light block"
          >
            {teacherInfor.userInformation.fullName}
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
            {course?.level.name} - {course?.participants.length} người học
          </Typography>
          <Stack direction="row" gap={0.5} flexWrap="wrap" alignItems="center">
            <Typography
              variant="caption"
              fontFamily="Roboto"
              sx={{
                padding: 0.5,
                color: "#4d3105",
                backgroundColor: "#f3ca8c",
              }}
            >
              {course?.category.name}
            </Typography>
            {course?.tags.map((tag, index) => (
              <Typography
                key={index}
                variant="caption"
                fontFamily="Roboto"
                sx={{
                  padding: theme.spacing(0.5, 1),
                  borderRadius: 0.5,
                  color: "#fff",
                  backgroundColor: color[index],
                }}
              >
                {tag.name}
              </Typography>
            ))}
          </Stack>
        </Box>
        {matchMd && (
          <Button component={Link} to={`/course/${course?._id}`}>
            Xem chi tiết
          </Button>
        )}
      </Box>
    </Paper>
  );
};

const FeatureCourseSlide = () => {
  const dispatch = useDispatch();
  const [popularCourses, setPopularCourses] = useState([]);
  const [hotTrendCourses, setHotTrendCourses] = useState([]);
  const style = {
    "& .swiper": {
      position: "unset",
    },
    position: "relative",
    padding: (theme) => theme.spacing(1, 0),
    width: "100%",
  };

  useEffect(() => {
    dispatch({
      type: GET_COURSES_WITH_FILTER,
      category: "all",
      params: { sort: "participants", page: 1, page_size: 2 },
      callback: setPopularCourses,
    });
    dispatch({
      type: GET_COURSES_WITH_FILTER,
      category: "all",
      params: { sort: "rates", page: 1, page_size: 2 },
      callback: setHotTrendCourses,
    });
  }, [dispatch]);

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

          {[...popularCourses, ...hotTrendCourses].map((item, index) => (
            <SwiperSlide key={index}>
              <FeatureCourseItem course={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default FeatureCourseSlide;
