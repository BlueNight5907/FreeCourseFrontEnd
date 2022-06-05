import React from "react";
import Wrapper from "components/wrapper/Wrapper";
import { Box, Grid, Paper, Stack, Typography, useTheme } from "@mui/material";
import ReactEcharts from "echarts-for-react";
import RenderTable from "components/render-table/RenderTable";
import { useSelector } from "react-redux";

const option = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  legend: {},
  grid: {
    left: "1%",
    right: "1%",
    bottom: "1%",
    containLabel: true,
  },
  yAxis: {
    type: "value",
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  series: [
    {
      name: "Direct",
      type: "bar",
      stack: "total",
      label: {
        show: true,
      },
      emphasis: {
        focus: "series",
      },
      data: [320, 302, 301, 334, 390, 330, 320],
    },
    {
      name: "Mail Ad",
      type: "bar",
      stack: "total",
      label: {
        show: true,
      },
      emphasis: {
        focus: "series",
      },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: "Affiliate Ad",
      type: "bar",
      stack: "total",
      label: {
        show: true,
      },
      emphasis: {
        focus: "series",
      },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: "Video Ad",
      type: "bar",
      stack: "total",
      label: {
        show: true,
      },
      emphasis: {
        focus: "series",
      },
      data: [150, 212, 201, 154, 190, 330, 410],
    },
    {
      name: "Search Engine",
      type: "bar",
      stack: "total",
      label: {
        show: true,
      },
      emphasis: {
        focus: "series",
      },
      data: [820, 832, 901, 934, 1290, 1330, 1320],
    },
  ],
};

const option2 = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "horizontal",
    bottom: "0%",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      top: "-15%",
      radius: ["40%", "60%"],
      data: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};

const option3 = {
  tooltip: {
    trigger: "axis",
  },
  legend: {
    top: "0%",
    left: "0%",
    right: "0%",
    data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "Email",
      type: "line",
      stack: "Total",
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: "Union Ads",
      type: "line",
      stack: "Total",
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: "Video Ads",
      type: "line",
      stack: "Total",
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: "Direct",
      type: "line",
      stack: "Total",
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: "Search Engine",
      type: "line",
      stack: "Total",
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
};

const Dashboard = () => {
  const { sideOpen } = useSelector((s) => s.setting);
  const theme = useTheme();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Wrapper
          sx={{ height: 550 }}
          title="Thống kê số lượng học sinh đăng ký các khóa học"
          titleVariant="body1"
        >
          <Box className="absolute inset-0 w-full h-full overflow-hidden flex">
            <ReactEcharts
              option={option}
              theme={theme.palette.mode === "dark" ? "dark" : "default"}
              style={{ width: "100%", height: "100%" }}
              className="bar-chart"
            />
          </Box>
        </Wrapper>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={12} lg={8} xl={9}>
            <Paper
              elevation={0}
              sx={{
                height: "100%",
                minHeight: 600,
                p: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography mb={1.5} fontWeight={500} ml={0.5}>
                Học viên đăng ký khóa học mới
              </Typography>
              <RenderTable
                params={{ page: 1, pageSize: 25 }}
                rowIdField="id"
                getData={async () => ({ totalRows: 0, data: [] })}
                columns={[
                  { headerName: "abx", field: "abx" },
                  { headerName: "abx", field: "aby" },
                  { headerName: "abx", field: "abz" },
                ]}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} lg={4} xl={3}>
            <Grid container spacing={1} width="100%">
              <Grid item xs={12} md={sideOpen ? 12 : 6} lg={12}>
                <Paper sx={{ position: "relative", pb: "100%" }} elevation={0}>
                  <Box
                    className="absolute inset-0 w-full h-full overflow-hidden flex flex-col"
                    padding={1}
                  >
                    <Typography fontWeight={500}>
                      Đánh giá của học viên
                    </Typography>
                    <Box flexGrow={1}>
                      <ReactEcharts
                        theme={
                          theme.palette.mode === "dark" ? "dark" : "default"
                        }
                        option={option2}
                        style={{ width: "100%", height: "100%" }}
                        className="bar-chart"
                      />
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={sideOpen ? 12 : 6} lg={12}>
                <Paper sx={{ position: "relative", pb: "100%" }} elevation={0}>
                  <Box
                    className="absolute inset-0 w-full h-full overflow-hidden flex flex-col"
                    padding={1}
                  >
                    <Typography fontWeight={500} gutterBottom>
                      Đánh giá của học viên
                    </Typography>
                    <Box flexGrow={1}>
                      <ReactEcharts
                        theme={
                          theme.palette.mode === "dark" ? "dark" : "default"
                        }
                        option={option3}
                        style={{ width: "100%", height: "100%" }}
                        className="bar-chart"
                      />
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
};

export default Dashboard;
