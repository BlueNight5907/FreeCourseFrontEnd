import {
  Avatar,
  Box,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { scrollSetting } from "../../../utils/classUltis";

import img1 from "../../../assets/avatar/u30.jfif";
import img2 from "../../../assets/avatar/u31.jfif";
const Item = (props) => {
  const { rank, userInformation } = props;
  return (
    <ListItem
      sx={{
        marginBottom: 1,
        borderRadius: 1,
        "&:hover": {
          backgroundColor: (theme) => theme.palette.hover.main,
        },
        "&:hover .profile-link": {
          display: "block",
        },
      }}
    >
      <Stack direction="row" gap={1} alignItems="center" width="100%">
        <Typography
          sx={{
            width: 25,
          }}
        >
          {rank}
        </Typography>
        <Stack direction="row" gap={1} alignItems="center" flexGrow={1}>
          <Avatar src={rank % 2 === 0 ? img1 : img2} />
          <Typography> ABC d</Typography>
        </Stack>
        <Typography
          className="profile-link"
          sx={{
            display: "none",
            fontSize: 12,
            "&:hover": { color: (theme) => theme.palette.primary.main },
          }}
          component={Link}
          to="./"
        >
          Xem thông tin
        </Typography>
      </Stack>
    </ListItem>
  );
};

const TeacherRanking = () => {
  const theme = useTheme();
  return (
    <Paper className="inset-0 relative w-full h-full overflow-hidden min-h-[400px]">
      <Box
        sx={{
          position: "absolute",
          backgroundColor: theme.palette.foreground.main,
          height: "100%",
          width: "100%",

          padding: (theme) => {
            return {
              xs: theme.spacing(1, 0, 1, 1),
              md: theme.spacing(2, 0, 2, 2),
            };
          },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 500,
            color: theme.palette.text.main,
            mb: 1,
          }}
        >
          Xếp hạng giáo viên
        </Typography>
        <Stack direction="row" gap={1} marginBottom={1}>
          <Typography
            sx={{
              fontSize: 14,
              color: theme.palette.text3.main,
            }}
          >
            Hạng
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              color: theme.palette.text3.main,
            }}
          >
            Thông tin giáo viên
          </Typography>
        </Stack>
        <List
          disablePadding
          sx={{
            overflow: "auto",
            paddingRight: 2,
            ...scrollSetting(),
          }}
        >
          {Array(15)
            .fill(0)
            .map((_, index) => (
              <Item rank={index + 1} key={index} />
            ))}
        </List>
      </Box>
    </Paper>
  );
};

export default TeacherRanking;
