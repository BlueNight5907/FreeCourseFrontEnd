import {
  Alert,
  Avatar,
  Box,
  Card,
  CardHeader,
  Chip,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import GroupList from "components/module/GroupList";
import Wrapper from "components/wrapper/Wrapper";
import ReactEcharts from "echarts-for-react";
import { newStudent } from "mock-data/module.mock";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import bgImage from "assets/background/social-network-bg.jpg";
import Prism from "prismjs";
import ReactHtmlParser from "react-html-parser";
import { GET_NEW_STUDENT_REQUEST } from "store/types/data-types/course-detail-types";

const Detail = () => {
  const theme = useTheme();
  const { sideOpen } = useSelector((s) => s.setting);
  const { courseDetail } = useSelector((s) => s.courseDetail);
  const [newStudents, setNewStudents] = useState([]);
  const [rateData, setRateData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (courseDetail) {
      Prism.highlightAll();
      dispatch({
        type: GET_NEW_STUDENT_REQUEST,
        courseId: courseDetail._id,
        callback: (data) => setNewStudents(data),
      });

      const data = courseDetail.rates.reduce(
        (array, item) => {
          if (item.point < 3) {
            array[0].value += 1;
          } else if (item.point < 4) {
            array[1].value += 1;
          } else {
            array[2].value += 1;
          }
          return array;
        },
        [
          { name: "Đánh giá kém", value: 0 },
          { name: "Đánh giá tích cực", value: 0 },
          { name: "Đánh giá tốt", value: 0 },
        ]
      );
      setRateData(data);
    }
  }, [courseDetail, dispatch]);

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
        data: rateData,
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

  const courseModules = useMemo(() => {
    if (!courseDetail) {
      return [];
    }
    return courseDetail.modules.reduce((arr, module) => {
      const name = module.title;
      const steps = module.steps.map((step) => ({
        name: step.title,
        href: `./`,
        type: step.type === "lesson" ? "video" : "test",
        time: step.time,
      }));
      arr.push({ name, steps });
      return arr;
    }, []);
  }, [courseDetail]);

  return (
    <Grid container spacing={2} minHeight={0}>
      <Grid item xs={12} lg={7.5} xl={8.5}>
        <Grid item xs={12}>
          <Wrapper>
            <Box className="content" sx={{ minHeight: 500, pb: 2 }}>
              <Stack direction="row" flexWrap="wrap" gap={1} mb={2}>
                {courseDetail && (
                  <Chip label={courseDetail.category.name} color="primary" />
                )}
                {courseDetail?.tags.map((item, index) => (
                  <Chip label={item.name} key={index} />
                ))}
              </Stack>
              {ReactHtmlParser(
                courseDetail?.content || courseDetail?.shortDesc
              )}
            </Box>
            <Box my={1}>
              {courseDetail?.gains?.length > 0 && (
                <>
                  <Typography gutterBottom>Kết quả đạt được:</Typography>
                  <Grid container spacing={1}>
                    {courseDetail?.gains?.map((item, index) =>
                      item ? (
                        <Grid item key={index} xs={12} md={6}>
                          <Alert severity="success">{item}</Alert>
                        </Grid>
                      ) : null
                    )}
                  </Grid>
                </>
              )}
            </Box>
          </Wrapper>
        </Grid>
        <Grid item xs={12} sx={{ my: 2 }}>
          <Wrapper>
            <Stack gap={1}>
              {courseModules.map((item, index) => (
                <GroupList data={item} key={index} index={index} />
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
                backgroundImage: `url(${
                  courseDetail?.background ? courseDetail.background : bgImage
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></Paper>
            <Typography ml={1}>Background khóa học</Typography>
          </Stack>
        </Grid>
        {courseDetail?.rates?.length > 0 && (
          <Grid item xs={12} sx={{ my: 2 }}>
            <Box>
              <Grid container spacing={1}>
                <Grid item xs={12} md={sideOpen ? 12 : 6} lg={12}>
                  <Paper
                    sx={{ position: "relative", pb: "100%" }}
                    elevation={0}
                  >
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
        )}

        <Grid item xs={12} sx={{ my: 2 }}>
          <Wrapper>
            <Typography sx={{ mb: 2 }} fontWeight={500}>
              Người học đăng ký mới
            </Typography>
            <Stack gap={1}>
              {newStudents.map((item, index) => (
                <Card key={index} elevation={0}>
                  <CardHeader
                    avatar={
                      <Avatar
                        alt="N"
                        src={item.userInformation.avatar}
                        aria-label="recipe"
                      >
                        R
                      </Avatar>
                    }
                    title={item.userInformation.fullName}
                    subheader={new Date(
                      item.learningProccess.createdAt
                    ).toLocaleString()}
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
