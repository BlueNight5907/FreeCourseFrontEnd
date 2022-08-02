import React, { useEffect, useState } from "react";
import { Button, Dialog, Stack, Tabs, Tab } from "@mui/material";
import { ArrowCircleUp, ModeEdit } from "@mui/icons-material";
import Slide from "@mui/material/Slide";
import TabPanel from "components/tab-panel/TabPanel";
import Wrapper from "./../../../components/wrapper/Wrapper";
import DescriptionForm from "containers/post-panel/Post.DescriptionForm";
import ContentForm from "containers/post-panel/Post.ContentForm";
import { useDispatch } from "react-redux";
import { UPDATE_BLOG_REQUEST } from "store/types/data-types/blog-type";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function a11yProps(index) {
  return {
    id: `course-tab-${index}`,
    "aria-controls": `course-slide-tabpanel-${index}`,
  };
}

const PostEditDialog = (props) => {
  const { open, setOpen, post } = props;
  const dispatch = useDispatch();

  const [selected, setSelected] = useState(0);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [background, setBackground] = useState(post.backgroundUrl);
  const [content, setContent] = useState(post.content);
  const [url, setUrl] = useState(post.url);

  const handleSelectedChange = (event, newValue) => {
    setSelected(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditBlog = () => {
    dispatch({
      type: UPDATE_BLOG_REQUEST,
      postId: post._id,
      title,
      description,
      background,
      content,
      url,
    });

    // setTitle("");
    // setDescription("");
    // setBackground(null);
    // setContent("");
    handleClose();
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <Wrapper
        marginY={1}
        title="Chỉnh sửa bài viết"
        titleVariant="h3"
        BoxProps={{ className: "flex flex-col" }}
        titleIcon={<ModeEdit color="primary" />}
        actions={
          <Stack className="flex-row justify-end gap-3">
            <Button onClick={handleClose}>Hủy</Button>
            <Button
              variant="contained"
              startIcon={<ArrowCircleUp />}
              onClick={handleEditBlog}
            >
              Cập nhật
            </Button>
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
    </Dialog>
  );
};

export default PostEditDialog;
