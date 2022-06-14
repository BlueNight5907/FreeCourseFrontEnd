import Wrapper from "components/wrapper/Wrapper";
import React, { useState } from "react";
import { Box, Grid, Stack, useTheme } from "@mui/material";
import Button from "components/button/Button";
import { Add } from "@mui/icons-material";
import TabPanel from "components/tab-panel/TabPanel";
import Dashboard from "./panel/Dashboard";
import CourseCategory from "./panel/CourseCategory";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function CourseDashboard() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(-1);
  const styles = {
    grpButton: {},
  };

  useEffect(() => {
    if (location.pathname === "/manage-course/dashboard") {
      setSelected(0);
    }
    if (location.pathname === "/manage-course/category") {
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
              onClick={() => navigate("/manage-course/dashboard")}
              disableElevation
            >
              Dashboard
            </Button>
            <Button
              variant="contained"
              color={selected === 1 ? "primary" : "foreground"}
              onClick={() => navigate("/manage-course/category")}
              disableElevation
            >
              Khóa học của tôi
            </Button>
          </Stack>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              navigate("/manage-course/create");
            }}
            disableElevation
          >
            Tạo khóa học
          </Button>
        </Stack>
      </Box>
      <Box className="grow">
        <TabPanel index={0} value={selected}>
          <Dashboard />
        </TabPanel>
        <TabPanel className="h-full" index={1} value={selected}>
          <CourseCategory />
        </TabPanel>
      </Box>
    </Stack>
  );
}

export default CourseDashboard;
