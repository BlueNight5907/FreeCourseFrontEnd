import {
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { width } from "@mui/system";
import React from "react";
import bg from "../../../../assets/background/course-slide-bg.jpg";
import avt from "../../../../assets/avatar/u34.jfif";
import Button from "../../../../components/button/Button";
import { EditRounded, PhotoCamera } from "@mui/icons-material";
const AvatarWrapper = () => {
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box
      sx={{
        height: "100%",
        borderRadius: 1,
        overflow: "hidden",
      }}
    >
      <Box
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          borderRadius: 10,
        }}
        className="md:aspect-[20/7] lg:aspect-[20/6] aspect-[20/8] w-full relative"
      >
        <IconButton
          sx={{
            bottom: 5,
            right: 5,
            position: "absolute",
            backgroundColor: theme.palette.background.main + "60",
            "&:hover": {
              backgroundColor: theme.palette.background.main + "90",
            },
          }}
        >
          <PhotoCamera />
        </IconButton>
      </Box>
      <Stack
        flexDirection="row"
        gap={2}
        sx={{
          padding: (theme) => theme.spacing(0, 0, 0, 2),
          mt: 1,
        }}
      >
        <Box
          style={{
            backgroundImage: `url(${avt})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          sx={{
            width: {
              md: 140,
              lg: 220,
              sm: 160,
              xs: 100,
            },
            height: {
              md: 140,
              lg: 220,
              sm: 160,
              xs: 100,
            },
            mt: {
              md: -7,
              sm: -9,
              lg: -12,
              xs: -6,
            },
            position: "relative",
            borderRadius: "50%",
            border: (theme) => {
              return {
                sm: "5px solid " + theme.palette.foreground.main,
                xs: "2px solid " + theme.palette.foreground.main,
              };
            },
          }}
        >
          <IconButton
            sx={{
              bottom: {
                xs: 0,
                sm: 5,
                lg: 10,
              },
              right: {
                xs: 0,
                sm: 5,
                lg: 10,
              },
              position: "absolute",
              width: 35,
              height: 35,
              backgroundColor: theme.palette.background.main,
              border: "1px solid " + theme.palette.text.main + "40",
              "&:hover": {
                backgroundColor: theme.palette.background.main + "90",
              },
            }}
          >
            <PhotoCamera fontSize="small" />
          </IconButton>
        </Box>
        <Stack flexDirection="column" gap={0.5} flexGrow={1}>
          <Typography>Nguyễn Văn Huy</Typography>
          <Typography variant="caption">Sinh viên</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AvatarWrapper;
