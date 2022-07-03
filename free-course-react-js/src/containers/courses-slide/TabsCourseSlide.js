import { Box, Paper, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GET_COURSES_WITH_FILTER } from "store/types/data-types/common-types";
import TabPanel from "../../components/tab-panel/TabPanel";
import DetailCourseSlide from "./DetailCourseSlide";
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `course-slide-tabpanel-${index}`,
  };
}

const TabsCourseSlide = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(0);
  const [popularCourses, setPopularCourses] = useState([]);
  const [newestCourses, setNewestCourses] = useState([]);
  const [hotTrendCourses, setHotTrendCourses] = useState([]);
  const handleSelectedChange = (event, newValue) => {
    setSelected(newValue);
  };

  useEffect(() => {
    dispatch({
      type: GET_COURSES_WITH_FILTER,
      category: "all",
      params: { sort: "participants", page: 1, page_size: 8 },
      callback: setPopularCourses,
    });
    dispatch({
      type: GET_COURSES_WITH_FILTER,
      category: "all",
      params: { page: 1, page_size: 8 },
      callback: setNewestCourses,
    });
    dispatch({
      type: GET_COURSES_WITH_FILTER,
      category: "all",
      params: { sort: "rates", page: 1, page_size: 8 },
      callback: setHotTrendCourses,
    });
  }, [dispatch]);

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
        <DetailCourseSlide courses={popularCourses} />
      </TabPanel>
      <TabPanel value={selected} index={1}>
        <DetailCourseSlide courses={newestCourses} />
      </TabPanel>
      <TabPanel value={selected} index={2}>
        <DetailCourseSlide courses={hotTrendCourses} />
      </TabPanel>
    </Paper>
  );
};

export default TabsCourseSlide;
