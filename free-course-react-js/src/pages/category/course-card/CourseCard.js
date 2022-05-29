import {
  Box,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import Button from "../../../components/button/Button";
import Image from "../../../components/image/Image";
import courseImg from "../../../assets/background/course-slide-bg.jpg";
import { Link } from "react-router-dom";
const CourseCard = (props) => {
  const { gridView } = props;
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.up("sm"));
  const matchMd = useMediaQuery(theme.breakpoints.up("md"));

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
          alignSelf="flex-start"
        >
          <Image
            src={courseImg}
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
              to="./"
              sx={{
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              }}
              fontFamily="Roboto"
              variant={gridView && !matchSm ? "body2" : "body1"}
              className="font-semibold"
            >
              Cấu trúc dữ liệu và giải thuật
            </Typography>
            {!gridView && matchSm && (
              <Typography
                fontFamily="Roboto"
                variant={gridView && !matchSm ? "caption" : "button"}
                className="font-normal block"
              >
                Go Beyond the Basics with Project-Based Building Information
                Modeling for Architects
              </Typography>
            )}

            <Typography
              fontFamily="Roboto"
              variant={gridView && !matchSm ? "caption" : "subtitle2"}
              className="font-normal block"
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
          {!gridView && matchMd && (
            <Box flexShrink={0} className="flex flex-col gap-1">
              <Button>Xem chi tiết</Button>
            </Box>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default CourseCard;
