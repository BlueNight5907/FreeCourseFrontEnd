import Wrapper from "components/wrapper/Wrapper";
import React, { useState } from "react";
import { Box, Grid, Paper, Stack, useTheme } from "@mui/material";
import Button from "components/button/Button";
import { Add } from "@mui/icons-material";
import TabPanel from "components/tab-panel/TabPanel";
import CourseCategory from "./panel/CourseCategory";
import { useNavigate } from "react-router-dom";

function CourseDashboard() {
  const theme = useTheme();
  const navigate = useNavigate();

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
            <Paper className="p-3">Danh sách khóa học</Paper>
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
        <TabPanel className="h-full" index={1} value={1}>
          <CourseCategory />
        </TabPanel>
      </Box>
    </Stack>
  );
}

export default CourseDashboard;
