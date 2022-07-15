import React, { useState, useRef, useEffect } from "react";
import Wrapper from "./../../../components/wrapper/Wrapper";
import { AddCircle, Save, ArrowCircleUp } from "@mui/icons-material";
import CourseForm from "containers/course-panel/CourseForm";
import Button from "components/button/Button";
import { Snackbar, Stack, Tab, Tabs } from "@mui/material";
import TabPanel from "components/tab-panel/TabPanel";
import DescriptionForm from "containers/post-panel/Post.DescriptionForm";
import ContentForm from "containers/post-panel/Post.ContentForm";
import { useDispatch, useSelector } from "react-redux";
import { POST_BLOG_REQUEST } from "store/types/data-types/blog-type";
import { useNavigate } from "react-router-dom";

function a11yProps(index) {
  return {
    id: `course-tab-${index}`,
    "aria-controls": `course-slide-tabpanel-${index}`,
  };
}

const PostCreate = () => {
  const [selected, setSelected] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [background, setBackground] = useState(null);
  const [content, setContent] = useState("");
  const handleSelectedChange = (event, newValue) => {
    setSelected(newValue);
  };
  const navigate = useNavigate();
  const { message } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  useEffect(() => {
    if (message) {
      setSnackMessage(message);
      setOpenSnack(true);
    }
  }, [message]);
  const handleUploadBlog = () => {
    dispatch({
      type: POST_BLOG_REQUEST,
      title,
      description,
      background,
      content,
    });

    setTitle("");
    setDescription("");
    setBackground(null);
    setContent("");
  };

  return (
    <Wrapper
      marginY={1}
      title="Tạo bài viết"
      titleVariant="h3"
      BoxProps={{ className: "flex flex-col" }}
      titleIcon={<AddCircle color="primary" />}
      actions={
        <Stack className="flex-row justify-end gap-3">
          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            Quay lại
          </Button>
          <Button
            variant="contained"
            startIcon={<ArrowCircleUp />}
            onClick={handleUploadBlog}
          >
            Đăng bài
          </Button>
          <Snackbar
            open={openSnack}
            autoHideDuration={2000}
            onClose={handleClose}
            message={snackMessage}
          />
        </Stack>
      }
    >
      <Tabs
        orientation={"horizontal"}
        variant="scrollable"
        value={selected}
        onChange={handleSelectedChange}
        allowScrollButtonsMobile
        aria-label="Vertical tabs example"
        sx={{
          flexShrink: 0,
          marginX: 1,
          height: "fit-content",
          borderBottom: "1px solid #d1d7dc",
        }}
      >
        <Tab
          label="Tiêu đề và mô tả"
          className="capitalize items-start"
          {...a11yProps(0)}
        />
        <Tab
          label="Nội dung bài viết"
          className="capitalize items-start"
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel index={0} value={selected}>
        <DescriptionForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          background={background}
          setBackground={setBackground}
        />
      </TabPanel>
      <TabPanel index={1} value={selected}>
        <ContentForm content={content} setContent={setContent} />
      </TabPanel>
    </Wrapper>
  );
};

export default PostCreate;
