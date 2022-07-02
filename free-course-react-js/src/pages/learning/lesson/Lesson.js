import {
  Chat,
  ClearRounded,
  DownloadRounded,
  DriveFileRenameOutline,
  NoteAltRounded,
} from "@mui/icons-material";
import ReactPlayer from "react-player";
import {
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Slide,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button, { buttonBg } from "../../../components/button/Button";
import { scrollSetting } from "../../../utils/classUltis";
import TeacherAvatar from "./../../../components/teacher-avatar/TeacherAvatar";
import Comment from "./../../../components/comment/Comment";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { COMPLETE_LESSON_REQUEST } from "store/types/data-types/learning-process-types";

const Lesson = () => {
  const { courseOpen } = useSelector((state) => state.setting);
  const { teacher } = useSelector((s) => s.courseDetail);
  const { courseId, stepId } = useParams();
  const { lessonDetail } = useSelector((state) => state.learningProcess);
  const [progress, setProgress] = useState(0);
  const [submit, setSubmit] = useState(false);
  const videoRef = useRef();
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.up("sm"));
  const [open, setOpen] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const handleClick = () => setOpen((s) => !s);
  const toggleComment = () => setOpenComment((s) => !s);

  const handleProgressVideo = useCallback((progress) => {
    console.log(progress);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(
        videoRef.current.getCurrentTime() / videoRef.current.getDuration()
      );
    }, 1000);
    return () => {
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    if (!submit && progress > 0.95 && lessonDetail) {
      dispatch({
        type: COMPLETE_LESSON_REQUEST,
        courseId,
        stepId,
        moduleId: lessonDetail.moduleId,
        callback: setSubmit,
      });
    }
  }, [courseId, dispatch, lessonDetail, progress, stepId, submit]);

  useEffect(() => {
    setTimeout(() => setSubmit(false), 5000);
  }, [stepId]);

  return (
    <>
      <Stack flexDirection="row" gap={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  className="aspect-video overflow-hidden relative w-full"
                  borderRadius={1}
                >
                  <ReactPlayer
                    className="absolute inset-0 bg-black rounded-sm"
                    width="100%"
                    height="100%"
                    onProgress={handleProgressVideo}
                    progressInterval={100}
                    controls={true}
                    url={lessonDetail?.content?.url}
                    ref={videoRef}
                    config={{
                      youtube: {
                        playerVars: { showinfo: 0 },
                      },
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Paper sx={{ padding: 1 }} elevation={0}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Stack className="flex-row justify-between">
                        <Box>
                          <Typography variant="body1" className="font-semibold">
                            {lessonDetail?.title}
                          </Typography>
                          <Typography variant="caption">
                            287.623 lượt xem -{" "}
                            {lessonDetail?.createdAt &&
                              format(
                                new Date(lessonDetail.createdAt),
                                "dd/MM/yyyy"
                              )}
                          </Typography>
                        </Box>
                        <Stack gap={1} flexDirection="row">
                          <Button startIcon={<DownloadRounded />}>
                            {matchSm && "Tải bài học"}
                          </Button>
                          <Button
                            startIcon={<DriveFileRenameOutline />}
                            onClick={handleClick}
                          >
                            {matchSm && "Ghi chú"}
                          </Button>
                          <Button
                            variant="outlined"
                            startIcon={<Chat />}
                            onClick={toggleComment}
                          >
                            {matchSm && "Thảo luận"}
                          </Button>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Stack className="flex-row justify-between items-center">
                        <TeacherAvatar
                          userInformation={teacher?.userInformation}
                        />
                        <Button variant="contained" specialBg={buttonBg.red}>
                          Đi đến trang chủ
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                {lessonDetail?.content && (
                  <Paper elevation={0} sx={{ p: 1, minHeight: 200, my: 1 }}>
                    {lessonDetail.content.content}
                  </Paper>
                )}
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box width={400} flexShrink={0} display={{ xs: "none", xl: "block" }}>
          <Box
            sx={{
              position: "sticky",
              maxHeight: "800px",
              height: "70vh",
              top: 80,
            }}
          >
            <Slide direction="left" in={open}>
              <Paper
                elevation={0}
                sx={{
                  height: "100%",
                  backgroundColor: theme.palette.foreground.main,
                  display: "flex",
                  flexDirection: "column",

                  paddingY: 1,
                  paddingLeft: 1,
                  paddingRight: 0.5,
                }}
              >
                <Box className="w-full flex-grow flex flex-col gap-2">
                  <Stack
                    flexDirection="row"
                    justifyContent="space-between"
                    pr={0.5}
                  >
                    <Typography className="flex items-center gap-2 font-semibold">
                      Ghi chú <NoteAltRounded />
                    </Typography>
                    <Button>Thêm ghi chú</Button>
                  </Stack>
                  <Box sx={{ flexGrow: 1, position: "relative" }}>
                    <Stack
                      gap={1}
                      sx={{
                        ...scrollSetting({ width: 8 }),
                        flexGrow: 1,
                        position: "absolute",
                        width: "100%",
                        paddingRight: 1,
                        top: 0,
                        left: 0,
                      }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          backgroundColor: theme.palette.background.main,
                          padding: 0.5,
                        }}
                      >
                        <Typography variant="subtitle2">
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Impedit ipsum eligendi voluptate dolorem vero
                          nesciunt maxime tenetur dolores beatae? Asperiores,
                          velit quos? Pariatur architecto maxime hic ullam atque
                          dolor consectetur.
                        </Typography>
                      </Paper>
                      <Paper
                        elevation={0}
                        sx={{
                          backgroundColor: theme.palette.background.main,
                          padding: 0.5,
                        }}
                      >
                        <Typography variant="subtitle2">
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Impedit ipsum eligendi voluptate dolorem vero
                          nesciunt maxime tenetur dolores beatae? Asperiores,
                          velit quos? Pariatur architecto maxime hic ullam atque
                          dolor consectetur.
                        </Typography>
                      </Paper>
                      <Paper
                        elevation={0}
                        sx={{
                          backgroundColor: theme.palette.background.main,
                          padding: 0.5,
                        }}
                      >
                        <Typography variant="subtitle2">
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Impedit ipsum eligendi voluptate dolorem vero
                          nesciunt maxime tenetur dolores beatae? Asperiores,
                          velit quos? Pariatur architecto maxime hic ullam atque
                          dolor consectetur.
                        </Typography>
                      </Paper>
                      <Paper
                        elevation={0}
                        sx={{
                          backgroundColor: theme.palette.background.main,
                          padding: 0.5,
                        }}
                      >
                        <Typography variant="subtitle2">
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Impedit ipsum eligendi voluptate dolorem vero
                          nesciunt maxime tenetur dolores beatae? Asperiores,
                          velit quos? Pariatur architecto maxime hic ullam atque
                          dolor consectetur.
                        </Typography>
                      </Paper>
                    </Stack>
                  </Box>
                </Box>
              </Paper>
            </Slide>
          </Box>
        </Box>
      </Stack>
      <Drawer
        sx={{ zIndex: theme.zIndex.appBar + 101 }}
        anchor="right"
        open={openComment}
        onClose={toggleComment}
      >
        <IconButton
          sx={{ position: "absolute", top: 10, right: 10, zIndex: 2 }}
          onClick={toggleComment}
        >
          <ClearRounded />
        </IconButton>
        <Box
          maxWidth={750}
          height="100%"
          padding={2}
          width="100vw"
          sx={{
            ...scrollSetting({ width: 8 }),
            position: "relative",
            backgroundColor: theme.palette.background.main,
          }}
        >
          <Box padding={2}>
            <Typography className="font-bold text-lg">80 bình luận</Typography>
            <Typography variant="body2">
              (Vui lòng không spam hoặc quấy rối dưới mọi hình thức)
            </Typography>
          </Box>
          <Box
            sx={{ backgroundColor: theme.palette.foreground.main }}
            height={150}
            mb={2}
            mt={4}
          ></Box>
          <Stack gap={1}>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default Lesson;
