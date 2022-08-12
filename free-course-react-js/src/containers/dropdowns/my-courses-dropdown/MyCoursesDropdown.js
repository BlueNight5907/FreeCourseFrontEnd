import { Box, Link as MuiLink, Stack, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import Dropdown from "../../../components/dropdown/Dropdown";
import DropdownItem from "../../../components/dropdown/DropdownItem";
import DropdownMenu from "../../../components/dropdown/DropdownMenu";
import DropdownToggle from "../../../components/dropdown/DropdownToggle";
import LearningProgress from "../../../components/learning-progress/LearningProgress";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { differenceInDays } from "date-fns";
import { maxLines } from "utils/classUltis";

function MyCourseDropdown(props) {
  const { learned } = useSelector((state) => state.learningProcess);
  const navigate = useNavigate();
  const [close, setClose] = useState({ state: true });

  const learnedStatusList = useMemo(() => {
    return learned.reduce((arr, item) => {
      const data = {
        visited: item.visited
          ? differenceInDays(new Date().getTime(), item.visited)
          : -1,
        name: item.courseData.title,
        background: item.courseData.background,
        courseId: item.courseId,
      };
      const allSteps = item.courseData.modules.reduce((steps, module) => {
        return [...steps, ...module.steps];
      }, []);
      data.learned = item.learned?.length || 0;
      data.total = allSteps.length;
      arr.push(data);
      return arr;
    }, []);
  }, [learned]);

  return (
    <Dropdown closeDropdown={close}>
      <DropdownToggle
        height="100%"
        sx={{
          paddingX: 1,
          color: (theme) => theme.palette.text.main,
          backgroundColor: (theme) => theme.palette.foreground.main,
          "&:hover": {
            backgroundColor: (theme) => theme.palette.foreground.main,
          },
        }}
      >
        Khóa học
      </DropdownToggle>
      <DropdownMenu
        shadow={8}
        width={{
          xl: 450,
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
            <Typography>Lớp học của tôi</Typography>
            <MuiLink
              component={Link}
              to="/my-courses"
              sx={{
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
              }}
              onClick={() => setClose({ state: true })}
            >
              Xem tất cả
            </MuiLink>
          </Stack>
        }
        maxHeight={450}
        minHeight={400}
      >
        {learnedStatusList.map((course, index) => (
          <DropdownItem
            key={index}
            onClick={() => {
              navigate("/course/" + course.courseId);
            }}
          >
            <Stack flexDirection="row" gap={1} className="w-full">
              <Box
                component="img"
                src={course.background}
                className="course-image"
                sx={{
                  width: 110,
                  height: 70,
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
                    ...maxLines(1),
                  }}
                >
                  {course.name}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    color: (theme) => theme.palette.grey.main,
                    fontSize: 12,
                  }}
                  color="InfoText"
                >
                  {course.visited <= 0 &&
                    course.learned === 0 &&
                    "Bạn chưa học bất kì bài học nào"}
                  {course.visited === 0 &&
                    course.learned !== 0 &&
                    "Bạn mới học vào hôm nay"}
                  {course.visited > 0 &&
                    `Học lần cuối vào ${course.visited} ngày trước`}
                </Typography>
                <LearningProgress
                  variant="determinate"
                  showLabel
                  learned={course.learned}
                  total={course.total}
                  progressSx={{
                    height: 8,
                  }}
                />
              </Stack>
            </Stack>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default MyCourseDropdown;
