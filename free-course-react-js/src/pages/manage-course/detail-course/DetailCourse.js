import { Edit } from "@mui/icons-material";
import { Box, Stack, useTheme } from "@mui/material";
import Button from "components/button/Button";
import TabPanel from "components/tab-panel/TabPanel";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GET_COURSE_DETAIL_REQUEST } from "store/types/data-types/course-detail-types";
import Detail from "./panel/Detail";
import Student from "./panel/Student";

const DetailCourse = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId } = useParams();
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (courseId) {
      dispatch({ type: GET_COURSE_DETAIL_REQUEST, courseId });
    }
  }, [courseId, dispatch]);

  useEffect(() => {
    let id = location.pathname.split("/")[3];
    if (location.pathname === `/manage-course/detail-course/${id}`) {
      setSelected(0);
    }
    if (location.pathname === `/manage-course/detail-course/${id}/student`) {
      setSelected(1);
    }
  }, [location.pathname]);

  return (
    <Stack my={1} gap={2} flexGrow={1}>
      <Box>
        <Stack
          className="flex-row justify-between items-center flex-wrap-reverse"
          gap={1}
        >
          <Stack
            className="flex-row items-center"
            borderRadius={1}
            bgcolor={theme.palette.foreground.main}
          >
            <Button
              variant="contained"
              color={selected === 0 ? "primary" : "foreground"}
              onClick={() =>
                navigate(
                  `/manage-course/detail-course/${
                    location.pathname.split("/")[3]
                  }`
                )
              }
              disableElevation
            >
              Tổng quan khóa học
            </Button>
            <Button
              variant="contained"
              color={selected === 1 ? "primary" : "foreground"}
              onClick={() =>
                navigate(
                  `/manage-course/detail-course/${
                    location.pathname.split("/")[3]
                  }/student`
                )
              }
              disableElevation
            >
              Người học
            </Button>
          </Stack>
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={() => {
              navigate(
                `/manage-course/edit/${location.pathname.split("/")[3]}`
              );
            }}
            disableElevation
          >
            Sửa khóa học
          </Button>
        </Stack>
      </Box>
      <Box className="grow">
        <TabPanel index={0} value={selected}>
          <Detail />
        </TabPanel>
        <TabPanel className="h-full" index={1} value={selected}>
          <Student />
        </TabPanel>
      </Box>
    </Stack>
  );
};

export default DetailCourse;
