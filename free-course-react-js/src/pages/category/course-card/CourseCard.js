import {
  Box,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import Button from "../../../components/button/Button";
import Image from "../../../components/image/Image";
import courseImg from "../../../assets/background/course-slide-bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { getRandomItem } from "utils/array-utils";
import colors from "utils/colors";
import { useDispatch } from "react-redux";
import { GET_ACCOUNT_INFORMATION } from "store/types/data-types/common-types";
import { maxLines } from "utils/classUltis";
const CourseCard = (props) => {
  const { gridView, data } = props;
  const [teacherInfor, setTeacherInfor] = useState({
    id: "",
    email: "",
    userInformation: {
      fullName: "",
      avatar: "",
    },
  });
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.up("sm"));
  const matchMd = useMediaQuery(theme.breakpoints.up("md"));
  const color = useMemo(() => {
    return data?.tags.map((item) => getRandomItem(colors)) || [];
  }, [data?.tags]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      dispatch({
        type: GET_ACCOUNT_INFORMATION,
        accountId: data.creator,
        callback: (data) => setTeacherInfor(data),
      });
    }
  }, [data, dispatch]);

  const points = useMemo(() => {
    return (
      data?.rates?.reduce((total, rating) => {
        return total + rating.point;
      }, 0) / data?.rates.length || 0
    );
  }, [data]);

  return (
    <Box
      sx={{
        ...(!gridView && {
          "&:not(:last-child)": {
            borderBottom: "1px solid #d1d7dc",
          },
        }),
        cursor: "pointer",
        "&:hover .overlay": {
          display: "block",
        },
        height: gridView ? "100%" : "fit-content",
        paddingY: gridView ? 0.8 : 2,
        paddingX: gridView ? (matchSm ? 0.8 : 0.4) : 0,
        borderRadius: gridView ? 1 : 0,
        ...(gridView && {
          backgroundColor: theme.palette.foreground.main,
          "&:hover": {
            backgroundColor: theme.palette.select.main,
          },
        }),
      }}
    >
      <Stack
        flexDirection={gridView ? "column" : "row"}
        gap={gridView ? 1 : 1.5}
        mb={gridView ? 0 : 1}
      >
        <Box
          className="relative overflow-hidden flex-shrink-0 flex items-center"
          borderRadius={0.5}
          width={gridView ? "100%" : "fit-content"}
          alignSelf="flex-start"
          onClick={() => navigate(`/course/${data?._id}`)}
        >
          <Image
            src={data?.background || courseImg}
            {...(!gridView
              ? {
                  width: matchSm ? 260 : 80,
                  height: matchSm ? 145 : 80,
                }
              : {
                  className: "aspect-video",
                  width: "100%",
                })}
            alt="course"
            style={{ objectFit: "cover" }}
            border={"0.5px solid #d1d7dc"}
          />
          <div className="overlay hidden absolute inset-0 bg-slate-900 opacity-20 "></div>
        </Box>
        <Stack flexGrow={1} flexDirection="row" gap={2}>
          <Box
            flexGrow={1}
            display="flex"
            flexDirection="column"
            gap={gridView ? 0.3 : 0.2}
            alignItems="flex-start"
          >
            <Typography
              component={Link}
              to={`/course/${data?._id}`}
              sx={{
                "&:hover": {
                  color: theme.palette.primary.main,
                },
                ...maxLines(1),
              }}
              fontFamily="Roboto"
              variant={gridView && !matchSm ? "body2" : "body1"}
              className="font-semibold"
            >
              {data?.title}
            </Typography>
            {!gridView && matchSm && (
              <Typography
                fontFamily="Roboto"
                variant={gridView && !matchSm ? "caption" : "button"}
                className="font-normal"
                sx={maxLines(2)}
              >
                {data?.shortDesc}
              </Typography>
            )}

            <Typography
              fontFamily="Roboto"
              variant={gridView && !matchSm ? "caption" : "subtitle2"}
              className="font-normal block"
            >
              {teacherInfor.userInformation.fullName}
            </Typography>
            <Stack flexDirection="Row" gap={0.5} alignItems="center">
              <Typography color="orange" variant="subtitle2">
                {points}
              </Typography>
              <Rating size="small" value={points} readOnly precision={0.5} />
              <Typography
                fontFamily="Roboto"
                variant="button"
                className="font-light"
              >
                ({data?.rates.length})
              </Typography>
            </Stack>
            <Typography
              fontFamily="Roboto"
              variant="caption"
              className="font-light block"
            >
              {data?.level.name} - {data?.participants.length} người học
            </Typography>
            <Stack
              direction="row"
              gap={0.5}
              flexWrap="wrap"
              alignItems="center"
            >
              <Typography
                variant="caption"
                fontFamily="Roboto"
                sx={{
                  padding: 0.5,
                  color: "#4d3105",
                  backgroundColor: "#f3ca8c",
                }}
              >
                {data?.category.name}
              </Typography>
              {matchSm &&
                data?.tags.map((tag, index) => (
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
          {!gridView && matchMd && (
            <Box flexShrink={0} className="flex flex-col gap-1">
              <Button component={Link} to={`/course/${data?._id}`}>
                Xem chi tiết
              </Button>
            </Box>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default CourseCard;
