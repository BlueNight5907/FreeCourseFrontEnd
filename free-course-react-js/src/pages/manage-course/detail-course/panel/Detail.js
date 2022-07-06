import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "components/button/Button";
import GroupList from "components/module/GroupList";
import Wrapper from "components/wrapper/Wrapper";
import ContentForm from "containers/course-panel/ContentForm";
import ReactEcharts from "echarts-for-react";
import { modules, newStudent } from "mock-data/module.mock";
import React from "react";
import { useSelector } from "react-redux";

const Detail = () => {
  const theme = useTheme();
  const { sideOpen } = useSelector((s) => s.setting);
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

  return (
    <Grid container spacing={2} minHeight={0}>
      <Grid item xs={12} lg={7.5} xl={8.5}>
        <Grid item xs={12}>
          <ContentForm></ContentForm>
        </Grid>
        <Grid item xs={12} sx={{ my: 2 }}>
          <Wrapper>
            <Stack gap={1}>
              {modules.map((item, index) => (
                <GroupList data={item} key={index} />
              ))}
            </Stack>
          </Wrapper>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={4.5} xl={3.5}>
        <Grid item xs={12}>
          <Stack gap={1} width="100%" height="300px">
            <Paper
              sx={{
                width: "100%",
                height: "100%",
                position: "relative",
                bgcolor: theme.palette.shadow.main,
                backgroundImage: `url()`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></Paper>
            <Typography ml={1}>Background khóa học</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{ my: 2 }}>
          <Box>
            <Grid container spacing={1}>
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
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ my: 2 }}>
          <Wrapper>
            <Typography sx={{ mb: 2 }} fontWeight={500}>
              New Student Attend
            </Typography>
            <Stack gap={1}>
              {newStudent.map((item) => (
                <Card key={item.id}>
                  <CardHeader
                    avatar={
                      <Avatar alt="N" src={item.avatar} aria-label="recipe">
                        R
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={item.name}
                    subheader={item.date}
                  />
                </Card>
              ))}
            </Stack>
          </Wrapper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Detail;
