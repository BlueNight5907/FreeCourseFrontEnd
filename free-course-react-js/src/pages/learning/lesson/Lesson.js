import {
  Chat,
  ClearRounded,
  DownloadRounded,
  DriveFileRenameOutline,
  NoteAltRounded,
  Send,
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
  TextField,
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
import {
  ADD_LESSON_COMMENT,
  COMPLETE_LESSON_REQUEST,
  DELETE_LESSON_COMMENT,
  GET_ALL_LESSON_COMMENT_REQUEST,
} from "store/types/data-types/learning-process-types";

const Lesson = () => {
  const { teacher } = useSelector((s) => s.courseDetail);
  const { user } = useSelector((s) => s.auth);
  const { comments } = useSelector((s) => s.learningProcess);
  const { courseId, stepId } = useParams();
  const { lessonDetail } = useSelector((state) => state.learningProcess);
  const { courseOpen } = useSelector((state) => state.setting);
  const [progress, setProgress] = useState(0);
  const [submit, setSubmit] = useState(false);
  const videoRef = useRef();
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.up("sm"));
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [openComment, setOpenComment] = useState(false);
  const handleClick = () => setOpen((s) => !s);
  const toggleComment = () => setOpenComment((s) => !s);

  const handleProgressVideo = useCallback((progress) => {
    // console.log(progress);
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
    if (stepId && lessonDetail?._id === stepId) {
      dispatch({
        type: GET_ALL_LESSON_COMMENT_REQUEST,
        stepId,
        moduleId: lessonDetail.moduleId,
      });
    }
  }, [dispatch, lessonDetail, stepId]);

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

  const sendComment = () => {
    dispatch({
      type: ADD_LESSON_COMMENT,
      moduleId: lessonDetail.moduleId,
      stepId,
      comment,
    });
    setComment("");
  };

  const deleteComment = useCallback(
    (commentId) => {
      const moduleId = lessonDetail?.moduleId;
      dispatch({ type: DELETE_LESSON_COMMENT, moduleId, stepId, commentId });
    },
    [dispatch, lessonDetail, stepId]
  );

  return (
    <>
      <Stack flexDirection="row" gap={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  className={`overflow-hidden relative w-full`}
                  sx={{
                    aspectRatio: {
                      xs: "16/9",
                      xl: courseOpen ? "18/9" : "20/8",
                      lg: courseOpen ? "18/8" : "18/9",
                    },
                  }}
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
              {lessonDetail?.content?.content && (
                <Grid item xs={12}>
                  <Paper elevation={0} sx={{ p: 1, minHeight: 200, my: 1 }}>
                    {lessonDetail.content.content}
                  </Paper>
                </Grid>
              )}
              <Grid item xs={12}></Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* <Box width={400} flexShrink={0} display={{ xs: "none", xl: "block" }}>
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
        </Box> */}
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
          <Box paddingX={2} paddingY={1}>
            <Typography className="font-bold text-lg">
              {comments.length} bình luận
            </Typography>
            <Typography variant="body2">
              (Vui lòng không spam hoặc quấy rối dưới mọi hình thức)
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: theme.palette.foreground.main,
              position: "relative",
            }}
            p={1}
            borderRadius={1}
            my={2}
          >
            <TextField
              label="Bình luận"
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full"
            />
            <Button
              sx={{ bottom: 15, right: 15, position: "absolute" }}
              variant="contained"
              onClick={sendComment}
              disabled={comment === ""}
              endIcon={<Send />}
            >
              Gửi
            </Button>
          </Box>
          <Stack gap={1}>
            {comments?.map((item, index) => (
              <Comment
                owner={user._id === item.accountId}
                onDelete={() => deleteComment(item._id)}
                key={index}
                data={item}
              />
            ))}
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default Lesson;
