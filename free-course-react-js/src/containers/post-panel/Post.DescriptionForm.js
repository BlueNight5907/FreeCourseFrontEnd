import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Stack,
  TextField,
  useTheme,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import Button from "components/button/Button";
import { useSelector } from "react-redux";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const ImageInput = ({ background, setBackground }) => {
  const theme = useTheme();
  const bgRef = useRef(null);

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
  }, [file, background]);
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
          onClick={(e) => {
            e.target.value = null;
          }}
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
            {file ? "Thay ảnh bìa" : "Thêm ảnh bìa"}
          </Button>
          {file && (
            <Button
              sx={{ minWidth: 40 }}
              variant="contained"
              color="background"
              onClick={() => {
                setFile();
                setFileDataURL();
              }}
            >
              <Delete color="error" />
            </Button>
          )}
        </Stack>
      </Paper>
      <Typography variant="caption" ml={1}>
        Ảnh bìa cho bài viết
      </Typography>
    </Stack>
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
