import {
  Box,
  IconButton,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Dropdown from "../../../components/dropdown/Dropdown";
import DropdownItem from "../../../components/dropdown/DropdownItem";
import DropdownMenu from "../../../components/dropdown/DropdownMenu";
import DropdownToggle from "../../../components/dropdown/DropdownToggle";
import LearningProgress from "../../../components/learning-progress/LearningProgress";

import courseImage from "../../../assets/background/course-image.png";
import { Link } from "react-router-dom";
import { NotificationsRounded } from "@mui/icons-material";

function NotificationDropDown(props) {
  const { children, sx } = props;

  return (
    <Dropdown>
      <DropdownToggle
        render={({ toggleDropdown }) => (
          <IconButton
            sx={{
              width: 45,
              height: 45,
            }}
            onClick={toggleDropdown}
          >
            <NotificationsRounded />
          </IconButton>
        )}
      />
      <DropdownMenu
        shadow={8}
        width={{
          md: 400,
          xs: 280,
        }}
        direction="right"
        title={
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            sx={{
              padding: (theme) => theme.spacing(0.2, 2),
              marginBottom: 1,
            }}
          >
            <Typography sx={{}}>Thông báo</Typography>
            <MuiLink
              component={Link}
              to="/"
              sx={{
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Xem tất cả
            </MuiLink>
          </Stack>
        }
        maxHeight={450}
        minHeight={400}
      >
        <DropdownItem>
          <Stack flexDirection="row" gap={1} className="w-full">
            <Box
              component="img"
              src={courseImage}
              className="course-image"
              sx={{
                width: 110,
                borderRadius: 0.8,
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
              loading="lazy"
              alt="source background"
            />
            <Stack flexDirection="column" gap={0.5} flex={1}>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: (theme) => theme.palette.text.main,
                  fontSize: 14,
                }}
              >
                Cấu trúc dữ liệu và giải thuật
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  color: (theme) => theme.palette.grey.main,
                  fontSize: 12,
                }}
                color="InfoText"
              >
                Học lần cuối 15 ngày trước
              </Typography>
              <LearningProgress
                variant="determinate"
                showLabel
                learned={10}
                total={20}
                progressSx={{
                  height: 8,
                }}
              />
            </Stack>
          </Stack>
        </DropdownItem>
        <DropdownItem>
          <Stack flexDirection="row" gap={1} className="w-full">
            <Box
              component="img"
              src={courseImage}
              className="course-image"
              sx={{
                width: 110,
                borderRadius: 0.8,
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
              loading="lazy"
              alt="source background"
            />
            <Stack flexDirection="column" gap={0.5} flex={1}>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: (theme) => theme.palette.text.main,
                  fontSize: 14,
                }}
              >
                Cấu trúc dữ liệu và giải thuật
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  color: (theme) => theme.palette.grey.main,
                  fontSize: 12,
                }}
                color="InfoText"
              >
                Học lần cuối 15 ngày trước
              </Typography>
              <LearningProgress
                variant="determinate"
                showLabel
                learned={10}
                total={20}
                progressSx={{
                  height: 8,
                }}
              />
            </Stack>
          </Stack>
        </DropdownItem>
        <DropdownItem>
          <Stack flexDirection="row" gap={1} className="w-full">
            <Box
              component="img"
              src={courseImage}
              className="course-image"
              sx={{
                width: 110,
                borderRadius: 0.8,
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
              loading="lazy"
              alt="source background"
            />
            <Stack flexDirection="column" gap={0.5} flex={1}>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: (theme) => theme.palette.text.main,
                  fontSize: 14,
                }}
              >
                Cấu trúc dữ liệu và giải thuật
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  color: (theme) => theme.palette.grey.main,
                  fontSize: 12,
                }}
                color="InfoText"
              >
                Học lần cuối 15 ngày trước
              </Typography>
              <LearningProgress
                variant="determinate"
                showLabel
                learned={10}
                total={20}
                progressSx={{
                  height: 8,
                }}
              />
            </Stack>
          </Stack>
        </DropdownItem>
        <DropdownItem>
          <Stack flexDirection="row" gap={1} className="w-full">
            <Box
              component="img"
              src={courseImage}
              className="course-image"
              sx={{
                width: 110,
                borderRadius: 0.8,
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
              loading="lazy"
              alt="source background"
            />
            <Stack flexDirection="column" gap={0.5} flex={1}>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: (theme) => theme.palette.text.main,
                  fontSize: 14,
                }}
              >
                Cấu trúc dữ liệu và giải thuật
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  color: (theme) => theme.palette.grey.main,
                  fontSize: 12,
                }}
                color="InfoText"
              >
                Học lần cuối 15 ngày trước
              </Typography>
              <LearningProgress
                variant="determinate"
                showLabel
                learned={10}
                total={20}
                progressSx={{
                  height: 8,
                }}
              />
            </Stack>
          </Stack>
        </DropdownItem>
        <DropdownItem>
          <Stack flexDirection="row" gap={1} className="w-full">
            <Box
              component="img"
              src={courseImage}
              className="course-image"
              sx={{
                width: 110,
                borderRadius: 0.8,
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
              loading="lazy"
              alt="source background"
            />
            <Stack flexDirection="column" gap={0.5} flex={1}>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: (theme) => theme.palette.text.main,
                  fontSize: 14,
                }}
              >
                Cấu trúc dữ liệu và giải thuật
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  color: (theme) => theme.palette.grey.main,
                  fontSize: 12,
                }}
                color="InfoText"
              >
                Học lần cuối 15 ngày trước
              </Typography>
              <LearningProgress
                variant="determinate"
                showLabel
                learned={10}
                total={20}
                progressSx={{
                  height: 8,
                }}
              />
            </Stack>
          </Stack>
        </DropdownItem>
        <DropdownItem>
          <Stack flexDirection="row" gap={1} className="w-full">
            <Box
              component="img"
              src={courseImage}
              className="course-image"
              sx={{
                width: 110,
                borderRadius: 0.8,
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
              loading="lazy"
              alt="source background"
            />
            <Stack flexDirection="column" gap={0.5} flex={1}>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: (theme) => theme.palette.text.main,
                  fontSize: 14,
                }}
              >
                Cấu trúc dữ liệu và giải thuật
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  color: (theme) => theme.palette.grey.main,
                  fontSize: 12,
                }}
                color="InfoText"
              >
                Học lần cuối 15 ngày trước
              </Typography>
              <LearningProgress
                variant="determinate"
                showLabel
                learned={10}
                total={20}
                progressSx={{
                  height: 8,
                }}
              />
            </Stack>
          </Stack>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default NotificationDropDown;
