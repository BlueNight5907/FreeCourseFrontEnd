import React, { useState, useRef, useEffect } from "react";
import {
  FormHelperText,
  Box,
  Chip,
  Grid,
  ListItem,
  MenuItem,
  Paper,
  Stack,
  TextField,
  FormControl,
  useTheme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Wrapper from "components/wrapper/Wrapper";
import {
  AddCircle,
  TagFaces,
  Delete,
  EditRounded,
  Save,
} from "@mui/icons-material";
import Button, { buttonBg } from "components/button/Button";
import { scrollSetting } from "utils/classUltis";
import { useSelector } from "react-redux";
import EditContentDialog from "./EditContentDialog";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const CourseForm = () => {
  const theme = useTheme();
  const { sideOpen } = useSelector((s) => s.setting);
  const matchSm = useMediaQuery(theme.breakpoints.up("sm"));
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
  ]);
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [openContentDialog, setOpenContentDialog] = useState(false);

  const bgRef = useRef(null);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const changeBgHandler = (e) => {
    const file = e.target.files[0];
    if (!file?.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    } else {
      setFileDataURL();
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <>
      <Box className="flex h-full flex-col" gap={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7} xl={8}>
            <Typography ml={0.5} gutterBottom className="font-medium">
              Các thông tin cơ bản của khóa học
            </Typography>
            <TextField
              label="Tên khóa học"
              helperText="Vd: Cấu trúc dữ liệu và giải thuật, ..."
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Mô tả ngắn cho khóa học(Không bắt buộc)"
              helperText="Tóm tắt các tính chất của khóa học"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              defaultValue=""
            />
            <Stack
              className="flex-row gap-3 mt-2"
              flexWrap={matchSm ? "nowrap" : "wrap"}
            >
              <TextField
                id="outlined-select-currency"
                select
                label="Danh mục"
                value=""
                onChange={() => {}}
                fullWidth={!matchSm}
                className="flex-shrink-0"
                helperText="Lựa chọn danh mục cho khóa học"
              >
                <MenuItem value="df">123</MenuItem>
              </TextField>
              <FormControl className="flex-grow">
                <Paper
                  className="flex self-start gap-3 items-center w-full"
                  elevation={0}
                  sx={{ border: "1px solid " + theme.palette.divider, p: 0.6 }}
                >
                  <Button className="flex-shrink-0" variant="outlined">
                    Thêm Tag
                  </Button>
                  <Box className="h-[42px] relative flex-grow">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        gap: 0.5,
                        listStyle: "none",
                        p: 0.5,
                        m: 0,
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        ...scrollSetting({
                          overflowX: "overlay",
                          overflowY: "hidden",
                          width: 5,
                        }),
                      }}
                      component="ul"
                    >
                      {chipData.map((data) => {
                        let icon;

                        if (data.label === "React") {
                          icon = <TagFaces />;
                        }

                        return (
                          <ListItem
                            sx={{ p: 0, width: "fit-content" }}
                            key={data.key}
                          >
                            <Chip
                              icon={icon}
                              label={data.label}
                              onDelete={
                                data.label === "React"
                                  ? undefined
                                  : handleDelete(data)
                              }
                            />
                          </ListItem>
                        );
                      })}
                    </Box>
                  </Box>
                </Paper>
                <FormHelperText>
                  Thêm tag để khóa học dễ dàng được tìm thấy
                </FormHelperText>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12} md={5} xl={4} minHeight={380}>
            <Stack gap={1} width="100%" height="100%">
              <Paper
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  bgcolor: theme.palette.shadow.main,
                  backgroundImage: `url(${fileDataURL})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <input
                  type="file"
                  hidden
                  ref={bgRef}
                  accept=".png, .jpg, .jpeg"
                  onChange={changeBgHandler}
                />
                <Stack
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    gap: 1,
                    flexDirection: "row",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => bgRef.current.click()}
                  >
                    Đổi ảnh nền
                  </Button>
                  {file && (
                    <Button
                      sx={{ minWidth: 40 }}
                      variant="contained"
                      color="background"
                      onClick={() => setFile(null)}
                    >
                      <Delete color="error" />
                    </Button>
                  )}
                </Stack>
              </Paper>
              <Typography ml={1}>Background khóa học</Typography>
            </Stack>
          </Grid>
        </Grid>
        <Wrapper
          sx={{
            border: "1px solid " + theme.palette.divider,
            minHeight: 400,
            flexGrow: 1,
          }}
          title="Nội dung khóa học"
          titleVariant="body1"
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
        ></Wrapper>
      </Box>
      <EditContentDialog
        open={openContentDialog}
        setOpen={setOpenContentDialog}
      />
    </>
  );
};

export default CourseForm;
