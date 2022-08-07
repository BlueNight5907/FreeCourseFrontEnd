import React, { useCallback, useEffect, useRef, useState } from "react";
import Button, { buttonBg } from "components/button/Button";
import {
  AppBar,
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Stack,
  TextField,
  LinearProgress,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  OutlinedInput,
} from "@mui/material";
import {
  Article,
  Close,
  EditRounded,
  Save,
  Source,
  Upload as UploadIcon,
  YouTube,
} from "@mui/icons-material";
import Wrapper from "components/wrapper/Wrapper";
import Prism from "prismjs";
import ReactHtmlParser from "react-html-parser";
import EditContentDialog from "containers/course-panel/EditContentDialog";
import ReactPlayer from "react-player";
import { millisecondsToHours, millisecondsToMinutes } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  CREATE_LESSON_REQUEST,
  UPDATE_LESSON_REQUEST,
} from "store/types/data-types/manage-course-types";
import { Upload } from "../../firebase";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const UploadFile = ({ setValue }) => {
  const theme = useTheme();
  const fileRef = useRef();
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploadTask, setUploadTask] = useState(null);
  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    if (file && uploadTask) {
      uploadTask?.start();
    }
    return () => {
      uploadTask?.stop();
      setProgress(0);
    };
  }, [file, uploadTask]);

  const doUpload = useCallback(() => {
    if (file) {
      const task = new Upload(
        "course-data",
        file,
        (res) => {
          setValue(res);
          setFile(null);
          setTimeout(() => setProgress(0), 500);
        },
        (res) => setProgress(res)
      );
      setUploadTask(task);
    }
  }, [file, setValue]);

  return (
    <Box>
      <Typography gutterBottom>Tải lên tài liệu</Typography>
      <Stack className="flex-row">
        <OutlinedInput
          readOnly
          value={file?.name || "Chọn tệp để tải lên"}
          sx={{ borderRadius: theme.spacing(1, 0, 0, 1), flexGrow: 1 }}
        />
        <Button
          variant="contained"
          onClick={() => fileRef.current.click()}
          disableElevation
          sx={{ borderRadius: theme.spacing(0, 1, 1, 0), height: "unset" }}
        >
          Chọn File
        </Button>
        <Button
          variant="outlined"
          startIcon={<UploadIcon />}
          onClick={doUpload}
          disabled={progress !== 0}
          sx={{ height: "unset", ml: 1, width: 130 }}
        >
          Tải lên
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept="video/*"
          hidden
          onChange={handleChange}
        />
      </Stack>
      <Stack
        sx={{
          width: "100%",
          mt: 1,
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        {progress > 0 && (
          <>
            <LinearProgress
              className="grow"
              variant="determinate"
              value={progress}
            />
            <Typography variant="body2">
              {Number(progress).toFixed(2)}%
            </Typography>
          </>
        )}
      </Stack>
    </Box>
  );
};

const EmbedYoutube = ({ setValue, value }) => {
  const theme = useTheme();
  const [href, setHref] = useState(value || "");
  const handleChange = (event) => {
    setHref(event.target.value);
    if (!event.target.value) {
      setValue("");
    }
  };
  return (
    <Box>
      <Typography gutterBottom>Nhúng URL của video</Typography>
      <Stack className="flex-row">
        <OutlinedInput
          onChange={handleChange}
          value={href}
          placeholder="Nhập URL"
          sx={{ borderRadius: theme.spacing(1, 0, 0, 1), flexGrow: 1 }}
        />
        <Button
          variant="contained"
          onClick={() => setValue(href)}
          disableElevation
          color="tomato"
          sx={{
            borderRadius: theme.spacing(0, 1, 1, 0),
            height: "unset",
            width: 140,
            color: "#fff",
          }}
        >
          Xem trước
        </Button>
      </Stack>
    </Box>
  );
};

function LessonForm({ goBack, open, moduleData, close }) {
  const theme = useTheme();
  const matchLg = useMediaQuery(theme.breakpoints.up("md"));
  const [openContentDialog, setOpenContentDialog] = useState(false);
  const { step } = useSelector((state) => state.manageCourse);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    content: "",
    type: "youtube",
    stepType: "lesson",
    time: 5 * 60 * 1000,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    Prism.highlightAll();
  }, [formData.content]);

  useEffect(() => {
    if (step) {
      setFormData({
        title: step.title,
        url: step.content.url,
        content: step.content.content,
        type: step.content.type,
        stepType: "lesson",
        time: step.time,
      });
    }
  }, [step]);

  const canSubmit =
    (formData.type === "default" ||
      (formData.url &&
        (formData.type === "youtube" || formData.type === "video"))) &&
    formData.title;

  const submitForm = () => {
    const { courseId, id: moduleId } = moduleData;
    const body = formData;
    console.log(body, courseId, moduleId);
    if (step) {
      dispatch({
        type: UPDATE_LESSON_REQUEST,
        body,
        courseId,
        moduleId,
        stepId: step._id,
        callback: close,
      });
    } else {
      dispatch({
        type: CREATE_LESSON_REQUEST,
        body,
        courseId,
        moduleId,
        callback: close,
      });
    }
  };

  return (
    <>
      <Slide direction="left" in={open}>
        <Box className="w-full relative flex flex-col gap-4">
          <AppBar
            sx={{
              position: "sticky",
              backgroundColor: "foreground.main",
              color: "text.primary",
            }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={goBack}
                aria-label="close"
              >
                <Close />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Tạo bài học
              </Typography>
              <Button
                autoFocus
                disableElevation
                onClick={goBack}
                className="mr-3"
              >
                Hủy bỏ
              </Button>
              <Button
                startIcon={<Save />}
                autoFocus
                disableElevation
                variant="contained"
                disabled={!canSubmit}
                onClick={() => {
                  submitForm();
                }}
              >
                Lưu
              </Button>
            </Toolbar>
          </AppBar>
          <Wrapper
            sx={{ margin: theme.spacing(0, 1, 1), height: "unset" }}
            className="grow"
          >
            <Stack className="flex-row flex-wrap w-full" gap={2}>
              <Box
                width={{ xl: "calc(100% - 800px)", lg: "calc(100% - 600px)" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography ml={0.5} gutterBottom className="font-medium">
                      Các thông tin cơ bản của bài học
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Tên bài học"
                      helperText={
                        formData.title
                          ? "Tiêu đề cho mỗi bài học"
                          : "Tên bài học không được để trống"
                      }
                      variant="outlined"
                      fullWidth
                      error={!formData.title}
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={9}>
                    <Typography gutterBottom ml={0.5}>
                      Thời gian học
                    </Typography>
                    <Stack className="flex-row" gap={2} maxWidth={500}>
                      <FormControl className="grow">
                        <InputLabel>Giờ</InputLabel>
                        <Select
                          label="Giờ"
                          value={millisecondsToHours(formData.time)}
                          onChange={(e) => {
                            const time =
                              e.target.value * 60 * 60 * 1000 +
                              (millisecondsToMinutes(formData.time) -
                                millisecondsToHours(formData.time) * 60) *
                                60 *
                                1000;
                            setFormData({ ...formData, time });
                          }}
                        >
                          {Array(13)
                            .fill(0)
                            .map((item, index) => (
                              <MenuItem key={index} value={index}>
                                {index} giờ
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      <FormControl className="grow">
                        <InputLabel>Phút</InputLabel>
                        <Select
                          MenuProps={MenuProps}
                          label="phút"
                          value={
                            millisecondsToMinutes(formData.time) -
                            millisecondsToHours(formData.time) * 60
                          }
                          onChange={(e) => {
                            const time =
                              e.target.value * 60 * 1000 +
                              millisecondsToHours(formData.time) *
                                60 *
                                60 *
                                1000;
                            setFormData({ ...formData, time });
                          }}
                        >
                          {Array(60)
                            .fill(0)
                            .map((item, index) => (
                              <MenuItem key={index} value={index}>
                                {index} phút
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Stack>
                  </Grid>
                  <Grid item className="flex flex-col" xs={12}>
                    <Typography gutterBottom ml={0.5}>
                      Tài nguyên cho bài học
                    </Typography>
                    {!matchLg ? (
                      <FormControl fullWidth>
                        <InputLabel>Loại bài học</InputLabel>
                        <Select label="Loại bài học" value={formData.type}>
                          <MenuItem value="video">Video tải lên</MenuItem>
                          <MenuItem value="document">Tài liệu</MenuItem>
                          <MenuItem value="youtube">Youtube</MenuItem>
                          <MenuItem value="default">
                            Mặc định(Chỉ bao gồm nội dung)
                          </MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      <Stack gap={1} className="flex-row flex-wrap grow">
                        <Button
                          className="h-[46px] w-[170px]"
                          startIcon={<UploadIcon />}
                          variant={
                            formData.type === "video" ? "contained" : "outlined"
                          }
                          {...(formData.type === "video" && {
                            style: { color: "#fff" },
                          })}
                          onClick={() =>
                            setFormData({ ...formData, type: "video" })
                          }
                          color="mintygreen"
                          disableElevation
                        >
                          Video tải lên
                        </Button>
                        <Button
                          className="h-[46px] w-[170px]"
                          startIcon={<Article />}
                          onClick={() =>
                            setFormData({ ...formData, type: "document" })
                          }
                          variant={
                            formData.type === "document"
                              ? "contained"
                              : "outlined"
                          }
                          {...(formData.type === "document" && {
                            style: { color: "#fff" },
                          })}
                          disableElevation
                          color="puple"
                        >
                          Tài liệu
                        </Button>
                        <Button
                          className="h-[46px] w-[170px]"
                          startIcon={<YouTube />}
                          onClick={() =>
                            setFormData({ ...formData, type: "youtube" })
                          }
                          variant={
                            formData.type === "youtube"
                              ? "contained"
                              : "outlined"
                          }
                          {...(formData.type === "youtube" && {
                            style: { color: "#fff" },
                          })}
                          disableElevation
                          color="tomato"
                        >
                          Youtube
                        </Button>
                        <Button
                          className="h-[46px]"
                          startIcon={<Source />}
                          onClick={() =>
                            setFormData({ ...formData, type: "default" })
                          }
                          variant={
                            formData.type === "default"
                              ? "contained"
                              : "outlined"
                          }
                          disableElevation
                        >
                          Mặc định(Chỉ bao gồm nội dung)
                        </Button>
                      </Stack>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {formData.type === "video" && (
                      <UploadFile
                        setValue={(data) =>
                          setFormData({ ...formData, url: data })
                        }
                      />
                    )}

                    {formData.type === "youtube" && (
                      <EmbedYoutube
                        setValue={(data) =>
                          setFormData({ ...formData, url: data })
                        }
                      />
                    )}
                  </Grid>
                </Grid>
              </Box>
              {(formData.type === "video" || formData.type === "youtube") && (
                <Stack
                  sx={{
                    flexGrow: 1,
                    width: { xl: 780, lg: 580 },
                    justifyContent: "center",
                    backgroundColor: theme.palette.text.main + "40",
                    p: { xs: theme.spacing(1, 0), sm: 1 },
                    borderRadius: 1,
                  }}
                >
                  <Typography gutterBottom color="foreground.main">
                    Xem trước video
                  </Typography>
                  <Box
                    square
                    className="relative aspect-video xl:aspect-[18/9]"
                  >
                    <ReactPlayer
                      className="absolute inset-0 bg-black rounded-sm"
                      width="100%"
                      height="100%"
                      url={formData.url}
                      config={{
                        youtube: {
                          playerVars: { showinfo: 0 },
                        },
                      }}
                    />
                  </Box>
                </Stack>
              )}
            </Stack>
            <Box mt={2}>
              <Typography ml={0.5} fontWeight={500} gutterBottom>
                Xem trước nội dung bài học
              </Typography>
              <Wrapper
                sx={{
                  border: "1px solid " + theme.palette.divider,
                  minHeight: 600,
                }}
                title="Nội dung"
                titleVariant="body1"
                elevation={0}
                BoxProps={{ className: "content" }}
                actions={
                  <Button
                    startIcon={<EditRounded />}
                    specialBg={buttonBg.red}
                    variant="contained"
                    onClick={() => setOpenContentDialog(true)}
                  >
                    Thêm / Chỉnh sửa
                  </Button>
                }
              >
                {formData.content && ReactHtmlParser(formData.content)}
              </Wrapper>
            </Box>
          </Wrapper>
        </Box>
      </Slide>
      <EditContentDialog
        open={openContentDialog}
        setOpen={setOpenContentDialog}
        setContent={(value) => setFormData({ ...formData, content: value })}
        initialValue={formData.content}
      />
    </>
  );
}

export default LessonForm;
