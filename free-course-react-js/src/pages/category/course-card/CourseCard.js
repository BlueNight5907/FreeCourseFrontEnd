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
const CourseCard = () => {
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.up("sm"));
  const matchMd = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box
      sx={{
        "&:not(:last-child)": {
          borderBottom: "1px solid #d1d7dc",
        },
        cursor: "pointer",
        "&:hover .overlay": {
          display: "block",
        },
        paddingY: 2,
      }}
    >
      <Stack flexDirection="row" gap={1.5} mb={1}>
        <Box
          className="relative overflow-hidden flex-shrink-0"
          borderRadius={0.5}
          sx={{
            width: matchSm ? 260 : 80,
            height: matchSm ? 145 : 80,
          }}
          alignSelf="flex-start"
        >
          <Image
            src={courseImg}
            width={matchSm ? 260 : 80}
            height={matchSm ? 145 : 80}
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
          {matchMd && (
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
