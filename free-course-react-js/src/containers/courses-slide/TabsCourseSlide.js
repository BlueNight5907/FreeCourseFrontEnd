import { Box, Paper, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import TabPanel from "../../components/tab-panel/TabPanel";
import DetailCourseSlide from "./DetailCourseSlide";
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `course-slide-tabpanel-${index}`,
  };
}

const TabsCourseSlide = () => {
  const [selected, setSelected] = useState(0);
  const handleSelectedChange = (event, newValue) => {
    setSelected(newValue);
  };
  return (
    <Paper elevation={0} sx={{ padding: 1 }}>
      <Tabs
        orientation={"horizontal"}
        variant="scrollable"
        value={selected}
        onChange={handleSelectedChange}
        allowScrollButtonsMobile
        aria-label="Vertical tabs example"
        sx={{
          flexShrink: 0,
          margin: 1,
          height: "fit-content",
          borderBottom: "1px solid #d1d7dc",
        }}
      >
        <Tab
          label="Phổ biến"
          className="capitalize items-start"
          {...a11yProps(0)}
        />
        <Tab
          label="Mới nhất"
          className="capitalize items-start"
          {...a11yProps(1)}
        />
        <Tab
          label="Hot Trend"
          className="capitalize items-start"
          {...a11yProps(2)}
        />
      </Tabs>
      <TabPanel value={selected} index={0}>
        <DetailCourseSlide />
      </TabPanel>
      <TabPanel value={selected} index={1}>
        <DetailCourseSlide />
      </TabPanel>
      <TabPanel value={selected} index={2}>
        <DetailCourseSlide />
      </TabPanel>
    </Paper>
  );
};

export default TabsCourseSlide;
