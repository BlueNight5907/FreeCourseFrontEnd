import React, { useEffect, useRef, useState } from "react";
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
  Upload,
  YouTube,
} from "@mui/icons-material";
import Wrapper from "components/wrapper/Wrapper";
import Prism from "prismjs";
import ReactHtmlParser from "react-html-parser";
import EditContentDialog from "containers/course-panel/EditContentDialog";

const UploadFile = (props) => {
  const theme = useTheme();
  const fileRef = useRef();
  const [file, setFile] = useState("");
  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };
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
          startIcon={<Upload />}
          sx={{ height: "unset", ml: 1, width: 130 }}
        >
          Tải lên
        </Button>
        <input ref={fileRef} type="file" hidden onChange={handleChange} />
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
        <LinearProgress className="grow" variant="determinate" value={70} />
        <Typography variant="body2">80%</Typography>
      </Stack>
    </Box>
  );
};

const EmbedYoutube = (props) => {
  const theme = useTheme();
  const fileRef = useRef();
  const [href, setHref] = useState("");
  const handleChange = (event) => {
    setHref(event.target.value);
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
          onClick={() => fileRef.current.click()}
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

function LessonForm({ goBack, open }) {
  const theme = useTheme();
  const matchLg = useMediaQuery(theme.breakpoints.up("md"));
  const [resourceType, setResourceType] = useState("default");
  const [openContentDialog, setOpenContentDialog] = useState(false);
  const [content, setContent] = useState("");
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);
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
                onClick={() => {
                  goBack();
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
                      Các thông tin cơ bản của khóa học
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Tên bài học"
                      helperText="Tiêu đề cho mỗi bài học"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={9}>
                    <Typography gutterBottom ml={0.5}>
                      Thời gian học
                    </Typography>
                    <Stack className="flex-row" gap={2} maxWidth={500}>
                      <FormControl className="grow">
                        <InputLabel>Giờ</InputLabel>
                        <Select label="Giờ" defaultValue="">
                          {Array(12)
                            .fill(0)
                            .map((item, index) => (
                              <MenuItem key={index} value={index}>
                                {index + 1} giờ
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      <FormControl className="grow">
                        <InputLabel>Phút</InputLabel>
                        <Select label="phút" defaultValue="">
                          {Array(12)
                            .fill(0)
                            .map((item, index) => (
                              <MenuItem key={index} value={index}>
                                {index * 5} phút
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
                        <Select label="Loại bài học" defaultValue="">
                          {Array(12)
                            .fill(0)
                            .map((item, index) => (
                              <MenuItem key={index} value={index}>
                                {index + 1} giờ
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    ) : (
                      <Stack gap={1} className="flex-row flex-wrap grow">
                        <Button
                          className="h-[46px] w-[170px]"
                          startIcon={<Upload />}
                          variant={
                            resourceType === "video" ? "contained" : "outlined"
                          }
                          {...(resourceType === "video" && {
                            style: { color: "#fff" },
                          })}
                          onClick={() => setResourceType("video")}
                          color="mintygreen"
                          disableElevation
                        >
                          Video tải lên
                        </Button>
                        <Button
                          className="h-[46px] w-[170px]"
                          startIcon={<Article />}
                          onClick={() => setResourceType("document")}
                          variant={
                            resourceType === "document"
                              ? "contained"
                              : "outlined"
                          }
                          {...(resourceType === "document" && {
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
                          onClick={() => setResourceType("youtube")}
                          variant={
                            resourceType === "youtube"
                              ? "contained"
                              : "outlined"
                          }
                          {...(resourceType === "youtube" && {
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
                          onClick={() => setResourceType("default")}
                          variant={
                            resourceType === "default"
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
                    {resourceType === "video" && <UploadFile />}
                    {resourceType === "document" && <UploadFile />}
                    {resourceType === "youtube" && <EmbedYoutube />}
                  </Grid>
                </Grid>
              </Box>
              {(resourceType === "video" || resourceType === "youtube") && (
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
                  <Box square className=" aspect-video xl:aspect-[18/9]">
                    <iframe
                      src="https://www.youtube.com/embed/E7wJTI-1dvQ"
                      frameborder="0"
                      allow="autoplay; encrypted-media"
                      allowfullscreen
                      title="video"
                      className="h-full w-full"
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
                {content && ReactHtmlParser(content)}
              </Wrapper>
            </Box>
          </Wrapper>
        </Box>
      </Slide>
      <EditContentDialog
        open={openContentDialog}
        setOpen={setOpenContentDialog}
        setContent={setContent}
        initialValue={content}
      />
    </>
  );
}

export default LessonForm;
