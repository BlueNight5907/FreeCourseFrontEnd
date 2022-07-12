import { useTheme } from "@emotion/react";
import {
  AddRounded,
  ClearRounded,
  DriveFileRenameOutline,
  MoreVertRounded,
  RemoveRounded,
  ReplyRounded,
  ThumbUpRounded,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";
import React from "react";

import avatarSrc from "../../assets/avatar/u35.jfif";
import Button from "../button/Button";
import Dropdown from "../dropdown/Dropdown";
import DropdownItem from "../dropdown/DropdownItem";
import DropdownMenu from "../dropdown/DropdownMenu";
import DropdownToggle from "../dropdown/DropdownToggle";

function Comment(props) {
  const { owner, data, disableLikeCount } = props;
  const theme = useTheme();
  const matchMd = useMediaQuery(theme.breakpoints.up("md"));
  const styles = {
    box: {
      padding: {
        xs: 1,
        md: disableLikeCount ? 1 : 2,
      },
      borderRadius: 1,
      backgroundColor: (theme) => theme.palette.foreground.main,
      "&:hover .action-button": {
        display: "flex",
      },
    },
    likeCount: {
      backgroundColor: (theme) => theme.palette.background.main,
      padding: 1,
      borderRadius: 1,
      maxHeight: 130,
      "&:hover": {
        backgroundColor: (theme) => theme.palette.hover.main,
      },
    },
    text: {
      fontSize: 16,
      color: (theme) => theme.palette.text.main,
    },
    timeSpan: {
      fontSize: 12,
      color: (theme) => theme.palette.text2.main,
    },
    icon: {
      fontWeight: 700,
      color: (theme) => theme.palette.text2.main,
      cursor: "pointer",
      "&:hover": {
        color: (theme) => theme.palette.primary.main,
      },
    },
    text2: {
      fontWeight: 600,
      fontSize: 18,
    },
    action: {
      fontSize: 14,
      fontWeight: 500,
      "&:hover": {
        textDecoration: "underline",
        color: (theme) => theme.palette.primary.main,
        cursor: "pointer",
      },
    },
    rightAction: {
      top: 20,
      right: 20,
      zIndex: 10,
      display: "none",
    },
  };

  const displayTime = () => {
    if (!data) {
      return "";
    }
    if (differenceInDays(new Date(), new Date(data?.createdAt)) === 0) {
      const minutes =
        differenceInMinutes(new Date(), new Date(data?.createdAt)) % 60;
      const hours = differenceInHours(new Date(), new Date(data?.createdAt));
      return hours > 0 ? `${hours} giờ trước` : `${minutes} phút trước`;
    } else {
      const days = differenceInDays(new Date(), new Date(data?.createdAt));
      return `${days} ngày trước`;
    }
  };
  return (
    <Box sx={styles.box} className="relative gap-4 flex flex-row">
      <div className="flex flex-col gap-2 justify-between">
        <div className="user-information flex flex-row gap-2 items-center">
          <Avatar src={data?.userInformation.avatar} />
          <Box
            className="flex"
            sx={{
              flexDirection: {
                xs: "column",
                md: disableLikeCount ? "column" : "row",
              },
              gap: {
                xs: 0.3,
                md: disableLikeCount ? 0.3 : 1,
              },
              alignItems: {
                xs: "flex-start",
                md: disableLikeCount ? "flex-start" : "center",
              },
            }}
          >
            <Typography
              sx={styles.text}
              className="font-semibold"
              component="span"
            >
              {data?.userInformation.fullName}
            </Typography>
            <Typography sx={styles.timeSpan} component="span">
              {displayTime()}
            </Typography>
          </Box>
        </div>
        <Typography sx={styles.text} component="div">
          {data?.content}
        </Typography>
        <div className="flex flex-row items-center gap-5">
          {(!matchMd || disableLikeCount) && (
            <Typography
              sx={styles.action}
              className="leading-none no-underline flex items-end gap-2 align-middle"
            >
              <ThumbUpRounded fontSize="small" sx={{ width: 16, height: 16 }} />
              {data?.likes.length || 0}
            </Typography>
          )}
          <Typography sx={styles.action}>Thích</Typography>
          <Typography sx={styles.action}>Phản hồi</Typography>
        </div>
      </div>

      {!owner ? (
        <Button
          sx={styles.rightAction}
          className="absolute action-button"
          startIcon={<ReplyRounded />}
        >
          Báo cáo
        </Button>
      ) : matchMd ? (
        <Stack
          flexDirection="row"
          className="absolute action-button"
          sx={styles.rightAction}
          gap={0.5}
        >
          <Button startIcon={<DriveFileRenameOutline />}>Chỉnh sửa</Button>
          <Button startIcon={<ClearRounded />} color="error">
            Xóa
          </Button>
        </Stack>
      ) : (
        <Box
          sx={{
            top: 10,
            right: 10,
            display: "block",
          }}
          className="absolute"
        >
          <Dropdown>
            <DropdownToggle
              render={({ toggleDropdown }) => {
                return (
                  <IconButton onClick={toggleDropdown}>
                    <MoreVertRounded />
                  </IconButton>
                );
              }}
            />
            <DropdownMenu direction="right" width={250} shadow={10}>
              <DropdownItem>
                <ListItemIcon>
                  <DriveFileRenameOutline />
                </ListItemIcon>
                <ListItemText>Chỉnh sửa</ListItemText>
              </DropdownItem>
              <DropdownItem>
                <ListItemIcon>
                  <ClearRounded />
                </ListItemIcon>
                <ListItemText>Xóa bình luận</ListItemText>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Box>
      )}
    </Box>
  );
}

export default Comment;
