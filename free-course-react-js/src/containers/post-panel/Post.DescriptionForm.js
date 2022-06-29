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

const ImageInput = ({ background, setBackground }) => {
  const theme = useTheme();
  const bgRef = useRef(null);
  const matchSm = useMediaQuery(theme.breakpoints.up("sm"));

  const [fileDataURL, setFileDataURL] = useState(null);
  const [file, setFile] = useState(background);

  const changeBgHandler = (e) => {
    const file = e.target.files[0];
    if (!file?.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
    setBackground(file);
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
          <Button variant="contained" onClick={() => bgRef.current.click()}>
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
      <Typography variant="caption" ml={1}>
        Background khóa học
      </Typography>
    </Stack>
  );
};

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

const DescriptionForm = ({
  title,
  setTitle,
  description,
  setDescription,
  background,
  setBackground,
}) => {
  const theme = useTheme();
  const { sideOpen } = useSelector((s) => s.setting);

  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  useEffect(() => {});

  return (
    <Box className="flex h-full flex-col" gap={2}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={sideOpen ? 12 : 7} xl={8}>
          <Typography
            margin={theme.spacing(0, 0, 1.5, 0)}
            gutterBottom
            className="font-medium"
          >
            Mô tả cho bài viết
          </Typography>
          <TextField
            label="Tiêu đề bài viết"
            variant="outlined"
            fullWidth
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
          <TextField
            label="Mô tả tóm tắt bài viết"
            helperText="Giới thiệu sơ lược về nội dung của bài viết"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
          />
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

        <Grid
          item
          xs={12}
          md={sideOpen ? 12 : 5}
          xl={4}
          minHeight={{ xs: 250, sm: 300, lg: 380 }}
        >
          <ImageInput background={background} setBackground={setBackground} />
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </Box>
  );
};

export default DescriptionForm;
