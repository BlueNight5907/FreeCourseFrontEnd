import React, { useState, useRef, useEffect } from "react";
import Wrapper from "./../../../components/wrapper/Wrapper";
import { AddCircle, Save } from "@mui/icons-material";
import CourseForm from "containers/course-panel/CourseForm";
import Button from "components/button/Button";
import { Stack, Tab, Tabs } from "@mui/material";
import TabPanel from "components/tab-panel/TabPanel";
import ModuleForm from "containers/course-panel/ModuleForm";

function a11yProps(index) {
  return {
    id: `course-tab-${index}`,
    "aria-controls": `course-slide-tabpanel-${index}`,
  };
}

const CreateCourse = () => {
  const [selected, setSelected] = useState(0);
  const handleSelectedChange = (event, newValue) => {
    setSelected(newValue);
  };
  return (
    <Wrapper
      marginY={1}
      title="Tạo khóa học"
      titleVariant="h3"
      BoxProps={{ className: "flex flex-col" }}
      titleIcon={<AddCircle color="primary" />}
      actions={
        <Stack className="flex-row justify-end gap-3">
          <Button>Hủy</Button>
          <Button variant="contained" startIcon={<Save />}>
            Lưu và tiếp tục
          </Button>
        </Stack>
      }
    >
      <Tabs
        orientation={"horizontal"}
        variant="scrollable"
        value={selected}
        onChange={handleSelectedChange}
        allowScrollButtonsMobile
        aria-label="Vertical tabs example"
        sx={{
          flexShrink: 0,
          marginX: 1,
          height: "fit-content",
          borderBottom: "1px solid #d1d7dc",
        }}
      >
        <Tab
          label="Thông tin cơ bản"
          className="capitalize items-start"
          {...a11yProps(0)}
        />
        <Tab
          label="Chủ đề khóa học"
          className="capitalize items-start"
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel index={0} value={selected}>
        <CourseForm />
      </TabPanel>
      <TabPanel index={1} value={selected}>
        <ModuleForm />
      </TabPanel>
    </Wrapper>
  );
};

export default CreateCourse;
