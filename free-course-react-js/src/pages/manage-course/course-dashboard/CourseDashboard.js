import Wrapper from "components/wrapper/Wrapper";
import React, { useState } from "react";
import { Grid, Stack, useTheme } from "@mui/material";
import Button from "components/button/Button";
import { Add } from "@mui/icons-material";
import TabPanel from "components/tab-panel/TabPanel";
import Dashboard from "./panel/Dashboard";

function CourseDashboard() {
  const theme = useTheme();
  const [selected, setSelected] = useState(0);
  const styles = {
    grpButton: {},
  };
  return (
    <Grid container my={0} spacing={2}>
      <Grid item xs={12}>
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
              onClick={() => setSelected(0)}
              disableElevation
            >
              Dashboard
            </Button>
            <Button
              variant="contained"
              color={selected === 1 ? "primary" : "foreground"}
              onClick={() => setSelected(1)}
              disableElevation
            >
              Khóa học của tôi
            </Button>
          </Stack>
          <Button variant="contained" startIcon={<Add />} disableElevation>
            Tạo khóa học
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <TabPanel index={0} value={selected}>
          <Dashboard />
        </TabPanel>
        <TabPanel index={1} value={selected}>
          <Wrapper>Khoa hoc cua toi</Wrapper>
        </TabPanel>
      </Grid>
    </Grid>
  );
}

export default CourseDashboard;
