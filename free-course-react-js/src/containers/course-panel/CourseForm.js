import React, { useState, useRef, useEffect, useMemo } from "react";
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
  LinearProgress,
  Alert,
} from "@mui/material";
import { TagFaces, Delete, DeleteOutline, Add } from "@mui/icons-material";
import Button, { buttonBg } from "components/button/Button";
import { scrollSetting } from "utils/classUltis";
import { useSelector } from "react-redux";
import ConfirmDialog from "components/dialog/confirm-dialog";
import TransferList from "./TransferList";
import { useFieldArray, useFormContext } from "react-hook-form";
import { getRandomItem } from "utils/array-utils";
import colors from "utils/colors";
import { Upload } from "../../firebase";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const ResultBox = () => {
  const [list, setList] = useState([]);
  const {
    register,
    formState: { errors },
    getValues,
    control,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "gains" });

  const addNew = () => {
    setList([...list, ""]);
    append("");
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
        {fields.map((item, index) => (
          <Stack key={item.id} className="flex-row gap-2">
            <FormControl required className="flex-grow">
              <OutlinedInput
                error={errors.gains && errors.gains[index] ? true : false}
                placeholder="Nhập kết quả đạt được"
                fullWidth
                value={getValues(`gains.${index}`)}
                {...register(`gains.${index}`, { required: true })}
              />
              <FormHelperText
                error={errors.gains && errors.gains[index] ? true : false}
              >
                {(errors.gains && errors.gains[index]?.message) ||
                  "Kết quả đạt được sau khi học khóa học"}
              </FormHelperText>
            </FormControl>
            <Button
              color="error"
              onClick={() => remove(index)}
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

const CourseForm = () => {
  const theme = useTheme();
  const { sideOpen } = useSelector((s) => s.setting);
  const { categories, tags, levels } = useSelector((state) => state.category);
  const matchSm = useMediaQuery(theme.breakpoints.up("sm"));
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [init, setInit] = useState(true);
  const [fileDataURL, setFileDataURL] = useState(null);
  const bgRef = useRef(null);

  const {
    register,
    setValue,
    formState: { errors },
    getValues,
  } = useFormContext();

  const changeBgHandler = (e) => {
    const file = e.target.files[0];
    if (!file?.type.match(imageMimeType)) {
      setValue("background", "");
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    let uploadTask;
    if (file) {
      setValue("background", "");
      // show file in background
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);

      // upload file
      uploadTask = new Upload(
        "course-bg",
        file,
        (res) => {
          setValue("background", res);
          setFileDataURL(res);
        },
        (progress) => {
          setProgress(progress);
        }
      );
      uploadTask.start();
    } else {
      if (!getValues("background")) {
        setFileDataURL();
      } else {
        setFileDataURL(getValues("background"));
      }
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
      uploadTask?.stop();
      setProgress(0);
    };
  }, [file, getValues, setValue]);

  const handleDelete = (selected) => () => {
    const newList = getValues("tags")?.filter((_, index) => selected !== index);
    setValue("tags", newList);
  };

  return (
    <>
      <Box className="flex h-full flex-col" gap={2}>
        {errors.content && (
          <Alert severity="error">{errors.content?.message}</Alert>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12} md={sideOpen ? 12 : 7} xl={8}>
            <Typography ml={0.5} gutterBottom className="font-medium">
              Các thông tin cơ bản của khóa học
            </Typography>
            <TextField
              label="Tên khóa học"
              variant="outlined"
              fullWidth
              defaultValue={getValues("name") || ""}
              {...register("title", { required: true })}
              error={errors.title ? true : false}
              helperText={
                errors.title?.message ||
                "Vd: Cấu trúc dữ liệu và giải thuật, ..."
              }
            />
            <TextField
              label="Mô tả ngắn cho khóa học(Không bắt buộc)"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              defaultValue={getValues("shortDesc") || ""}
              {...register("shortDesc", { required: true })}
              error={errors.shortDesc ? true : false}
              helperText={
                errors.shortDesc?.message ||
                "Tóm tắt các tính chất của khóa học"
              }
            />
            <Stack
              className="flex-row gap-3 mt-2"
              flexWrap={matchSm ? "nowrap" : "wrap"}
            >
              <TextField
                select
                label="Danh mục"
                sx={{ flexGrow: { xs: 1, lg: 0 } }}
                onChange={() => {}}
                fullWidth={!matchSm}
                SelectProps={{ MenuProps }}
                value={getValues("category") || ""}
                {...register("category", { required: true })}
                error={errors.category ? true : false}
                helperText={
                  errors.category?.message || "Lựa chọn danh mục cho khóa học"
                }
              >
                {[
                  ...categories.map((item) => ({
                    value: item._id,
                    name: item.name,
                  })),
                ].map((item, index) => (
                  <MenuItem value={item.value} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                sx={{ flexGrow: { xs: 1, lg: 0 } }}
                select
                label="Mức độ"
                value={getValues("level") || ""}
                {...register("level", { required: true })}
                error={errors.level ? true : false}
                helperText={
                  errors.level?.message || "Lựa chọn cấp độ cho khóa học"
                }
              >
                {levels.map((item, index) => (
                  <MenuItem value={item._id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
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
                  ...(fileDataURL && {
                    backgroundImage: `url(${fileDataURL})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }),
                }}
              >
                {progress > 0 && progress < 100 && (
                  <Box
                    sx={{
                      width: "100%",
                      position: "absolute",
                      right: 0,
                      left: 0,
                      top: 5,
                      px: 1,
                    }}
                  >
                    <LinearProgress
                      sx={{ height: 8, borderRadius: 1 }}
                      variant="determinate"
                      value={progress}
                    />
                  </Box>
                )}
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
              <Typography
                sx={{ color: errors.background ? "error.main" : "text.main" }}
                ml={1}
              >
                {errors.background?.message || " Background khóa học"}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <FormControl className="flex-grow w-full">
              <Paper
                className="flex self-start gap-3 items-center w-full"
                elevation={0}
                sx={{ border: "1px solid " + theme.palette.divider, p: 0.6 }}
              >
                <Button
                  className="flex-shrink-0"
                  variant="outlined"
                  onClick={() => setOpen(true)}
                >
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
                    {getValues("tags")?.map((data, index) => {
                      let tag = tags.find((item) => item._id === data);
                      return (
                        <ListItem
                          sx={{ p: 0, width: "fit-content" }}
                          key={index}
                        >
                          <Chip
                            label={tag.name}
                            sx={{
                              bgcolor: colors.at(index),
                              color: "#fff",
                            }}
                            onDelete={handleDelete(index)}
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
      <ChooseTagsDialog
        open={open}
        setOpen={setOpen}
        tags={tags}
        selected={getValues("tags")}
        onSave={(data) => {
          setValue("tags", data);
        }}
      />
    </>
  );
};

export default CourseForm;

const ChooseTagsDialog = ({ open, setOpen, onSave, selected, tags }) => {
  const [data, setData] = useState([]);

  const selectTags = useMemo(() => {
    return tags
      .filter((item) =>
        selected
          ? selected.findIndex((e) => e === item._id) >= 0
            ? true
            : false
          : false
      )
      .map((tag) => ({ value: tag._id, name: tag.name }));
  }, [selected, tags]);
  const tagArray = useMemo(
    () => tags?.map((tag) => ({ value: tag._id, name: tag.name })),
    [tags]
  );

  return (
    <ConfirmDialog
      onAccept={() => onSave && onSave(data)}
      open={open}
      setOpen={setOpen}
      title="Chọn tag cho khóa học"
    >
      <TransferList
        elevation={0}
        data={tagArray}
        selected={selectTags}
        onChange={setData}
        leftTitle="Tag chưa chọn"
        rightTitle="Tag đã chọn"
      />
    </ConfirmDialog>
  );
};
