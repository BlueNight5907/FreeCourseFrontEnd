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
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "components/wrapper/Wrapper";
import Button, { buttonBg } from "components/button/Button";
import TeacherAvatar from "components/teacher-avatar/TeacherAvatar";
import {
  Chat,
  ClearRounded,
  DriveFileRenameOutline,
  NoteAltRounded,
} from "@mui/icons-material";
import { scrollSetting } from "utils/classUltis";
import { useNavigate } from "react-router-dom";
import Comment from "components/comment/Comment";

const TestInformation = () => {
  const { courseOpen } = useSelector((state) => state.setting);
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const matchLg = useMediaQuery(theme.breakpoints.up("lg"));
  const matchMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchSm = useMediaQuery(theme.breakpoints.up("sm"));
  // state

  const [open, setOpen] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const handleClick = () => setOpen((s) => !s);
  const toggleComment = () => setOpenComment((s) => !s);

  const doTest = () => {
    navigate("/learning/test/dosomething");
  };

  return (
    <>
      <Stack flexDirection="row" gap={2} alignItems="flex-start">
        <Box flexGrow={1}>
          <Wrapper elevation={0} sx={{ mb: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Stack className="flex-row justify-between items-center">
                  <Typography variant="body1" className="font-semibold">
                    Lập trình OOP
                  </Typography>
                  <Stack gap={1} flexDirection="row">
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
                <Stack className="flex-row justify-between">
                  <TeacherAvatar />
                  <Button variant="contained" specialBg={buttonBg.red}>
                    Đi đến trang chủ
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Wrapper>
          <Wrapper elevation={0} sx={{ mb: 1 }}>
            <Stack className="flex-row justify-between items-center" mb={2}>
              <Typography>Làm bài kiểm tra</Typography>
              <Button variant="contained" onClick={doTest}>
                Bắt đầu làm bài
              </Button>
            </Stack>
            <Divider />
            <Stack className="flex-row items-center" my={2}>
              <Box flexGrow={1}>
                <Typography fontWeight={500} gutterBottom>
                  Tổng số câu hỏi: 35
                </Typography>
                <Typography variant="body2">
                  Số câu đúng tối thiểu: 80%
                </Typography>
              </Box>
              <Divider flexItem orientation="vertical" />
              <Box padding={theme.spacing(2, 3)}>
                <Typography fontWeight={500} gutterBottom>
                  Điểm của bạn
                </Typography>
                <Typography>____</Typography>
              </Box>
            </Stack>
            <Divider />
          </Wrapper>
        </Box>
        <Box width={400} display={{ xs: "none", xl: "block" }}>
          <Box
            sx={{
              position: "sticky",
              maxHeight: "400px",
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

export default TestInformation;
