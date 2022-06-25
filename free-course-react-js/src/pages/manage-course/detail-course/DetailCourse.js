import { Edit } from "@mui/icons-material";
import { Box, Stack, useTheme } from "@mui/material";
import Button from "components/button/Button";
import TabPanel from "components/tab-panel/TabPanel";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Detail from "./panel/Detail";
import Student from "./panel/Student";

const DetailCourse = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(-1);

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
              Detail
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
              Student
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