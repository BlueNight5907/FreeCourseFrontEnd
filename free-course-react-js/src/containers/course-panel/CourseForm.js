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
  Divider,
  OutlinedInput,
} from "@mui/material";
import Wrapper from "components/wrapper/Wrapper";
import {
  AddCircle,
  TagFaces,
  Delete,
  EditRounded,
  Save,
  DeleteOutline,
  Add,
} from "@mui/icons-material";
import Button, { buttonBg } from "components/button/Button";
import { scrollSetting } from "utils/classUltis";
import { useSelector } from "react-redux";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const ResultBox = (props) => {
  const [list, setList] = useState([]);

  const handleDelete = (selected) => () => {
    const newList = list.filter((_, index) => selected !== index);
    setList(newList);
  };

  const addNew = () => {
    setList([...list, ""]);
  };

  const onChange = (index) => (event) => {
    list[index] = event.target.value;
    setList([...list]);
  };

  return (
    <>
      <Divider className="mb-5" orientation="horizontal" />
      <Stack className="mb-5 flex-row items-center gap-5">
        <Typography className="font-medium">Kết quả đạt được</Typography>
        <Button
          onClick={addNew}
          startIcon={<Add />}
          disableElevation
          variant="outlined"
        >
          Thêm kết quả
        </Button>
      </Stack>
      <Stack gap={1}>
        {list.map((item, index) => (
          <Stack key={index} className="flex-row gap-2">
            <FormControl required className="flex-grow">
              <OutlinedInput
                onChange={onChange(index)}
                placeholder="Nhập kết quả đạt được"
                fullWidth
                value={item}
              />
              <FormHelperText>
                Kết quả đạt được sau khi học khóa học
              </FormHelperText>
            </FormControl>
            <Button
              color="error"
              onClick={handleDelete(index)}
              className="h-[58px]"
            >
              <DeleteOutline />
            </Button>
          </Stack>
        ))}
      </Stack>
    </>
  );
};

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
    <Box className="flex h-full flex-col" gap={2}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={sideOpen ? 12 : 7} xl={8}>
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
              select
              label="Danh mục"
              value=""
              sx={{ flexGrow: { xs: 1, lg: 0 } }}
              onChange={() => {}}
              fullWidth={!matchSm}
              helperText="Lựa chọn danh mục cho khóa học"
            >
              <MenuItem value="df">123</MenuItem>
            </TextField>
            <TextField
              sx={{ flexGrow: { xs: 1, lg: 0 } }}
              select
              label="Mức độ"
              value=""
              onChange={() => {}}
              fullWidth={!matchSm}
              helperText="Lựa chọn danh mục cho khóa học"
            >
              <MenuItem value="df">123</MenuItem>
            </TextField>
          </Stack>
        </Grid>

        <Grid
          item
          xs={12}
          md={sideOpen ? 12 : 5}
          xl={4}
          minHeight={{ xs: 250, sm: 300, lg: 380 }}
        >
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
        <Grid item xs={12}>
          <FormControl className="flex-grow w-full">
            <Paper
              className="flex self-start gap-3 items-center w-full"
              elevation={0}
              sx={{ border: "1px solid " + theme.palette.divider, p: 0.6 }}
            >
              <Button className="flex-shrink-0" variant="outlined">
                Thêm Tag
              </Button>
              <Box className="h-[42px]  relative flex-grow">
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
        </Grid>

        <Grid item xs={12}>
          <ResultBox />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseForm;
