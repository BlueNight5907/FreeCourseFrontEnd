import { Paper, Rating, Stack, Typography } from "@mui/material";
import { differenceInDays } from "date-fns";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { JOIN_COURSE_REQUEST } from "store/types/data-types/course-detail-types";
import Button from "../../../components/button/Button";
import TeacherAvatar from "../../../components/teacher-avatar/TeacherAvatar";

const CourseInformation = ({ courseDetail, teacherDetail }) => {
  const { learned } = useSelector((state) => state.learningProcess);
  const dispatch = useDispatch();
  const isRegistered =
    learned.findIndex((item) => item.courseId === courseDetail?._id) > -1;
  const caculatingRates = () => {
    return 0;
  };

  const navigate = useNavigate();

  const moveToStep = useCallback(() => {
    const myCourseProcessIndex = learned.findIndex(
      (item) => item.courseId === courseDetail?._id
    );
    if (myCourseProcessIndex < 0) {
      // register new
      if (
        courseDetail?.modules.length > 0 &&
        courseDetail?.modules[0].steps.length > 0
      ) {
        const url = `/learning/${courseDetail?._id}/${courseDetail?.modules[0].steps[0]._id}`;
        navigate(url);
      }
    } else {
      const allSteps = courseDetail?.modules.reduce((steps, module) => {
        return [...steps, ...module.steps];
      }, []);

      if (allSteps.length > 0) {
        const learnedSteps = learned[myCourseProcessIndex].learned;
        const stepId =
          learnedSteps.length === allSteps.length
            ? allSteps.at(-1)._id
            : allSteps.at(learnedSteps.length)._id;
        const url = `/learning/${courseDetail?._id}/${stepId}`;
        navigate(url);
      }
    }
  }, [courseDetail?._id, courseDetail?.modules, learned, navigate]);

  const joinCourse = () => {
    if (courseDetail) {
      dispatch({
        type: JOIN_COURSE_REQUEST,
        courseId: courseDetail._id,
        callback: moveToStep,
      });
    }
  };

  return (
    <Paper className="flex-grow max-w-[900px] p-3" elevation={0}>
      <Stack className="flex-col gap-3">
        <Typography variant="h5" className="font-semibold">
          {courseDetail?.title}
        </Typography>
        <Typography variant="body2">{courseDetail?.shortDesc}</Typography>
        <Stack className="flex-row gap-2 flex-wrap items-center">
          <Rating value={caculatingRates()} readOnly />
          <Typography variant="subtitle2">
            {courseDetail?.rates.length || 0} học sinh đã đánh giá
          </Typography>
        </Stack>
        <TeacherAvatar userInformation={teacherDetail?.userInformation} />
        <Stack className="flex-row gap-4 flex-wrap items-center">
          {isRegistered ? (
            <Button variant="contained" onClick={moveToStep} width="12rem">
              Tiếp tục quá trình học
            </Button>
          ) : (
            <Button variant="contained" onClick={joinCourse} width="12rem">
              Đăng ký
            </Button>
          )}
          <Button variant="outlined" width="10rem">
            Đánh giá
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CourseInformation;
