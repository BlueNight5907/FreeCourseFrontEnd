import {
  AutoStoriesRounded,
  DeleteRounded,
  EditRounded,
  InsertLinkRounded,
  MoreHoriz,
  ReportRounded,
} from "@mui/icons-material";
import {
  Divider,
  Fade,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Snackbar,
  Typography,
} from "@mui/material";
import PostEditDialog from "pages/community/post/PostEditDialog";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DELETE_BLOG_REQUEST } from "store/types/data-types/blog-type";

const PostActionDropDown = (props) => {
  const { post, user } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const owned = post.creator === user._id;
  const [snackMessage, setSnackMessage] = useState("");

  // Copy link
  const [openSnack, setOpenSnack] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(
        `https://tdtu-learning.herokuapp.com/community/post/${post._id}`
      )
      .then(() => {
        setSnackMessage("Sao chép địa chỉ thành công");
        setOpenSnack(true);
        handleActionClose();
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleActionOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleActionClose = () => {
    setAnchorEl(null);
  };
  // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Delete post
  const handleDeletePost = () => {
    dispatch({ type: DELETE_BLOG_REQUEST, postId: post._id });
    handleActionClose();
  };

  const handleClickOpen = () => {
    setOpenEdit(true);
    handleActionClose();
  };
  return (
    <div>
      <IconButton onClick={handleActionOpen}>
        <MoreHoriz />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleActionClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        TransitionComponent={Fade}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {owned ? (
          <div>
            <MenuItem onClick={handleClickOpen}>
              <ListItemIcon>
                <EditRounded />
              </ListItemIcon>
              <Typography fontWeight={500}>Chỉnh sửa</Typography>
            </MenuItem>
            <MenuItem onClick={handleDeletePost}>
              <ListItemIcon>
                <DeleteRounded />
              </ListItemIcon>
              <Typography fontWeight={500}>Xóa bài viết</Typography>
            </MenuItem>
          </div>
        ) : (
          <MenuItem>
            <ListItemIcon>
              <ReportRounded />
            </ListItemIcon>
            <Typography fontWeight={500}>Báo cáo</Typography>
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={handleCopyLink}>
          <ListItemIcon>
            <InsertLinkRounded />
          </ListItemIcon>
          <Typography fontWeight={500}>Sao chép liên kết</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate(`/community/post/${post._id}`);
          }}
        >
          <ListItemIcon>
            <AutoStoriesRounded />
          </ListItemIcon>
          <Typography fontWeight={500}>Xem chi tiết</Typography>
        </MenuItem>
      </Menu>
      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleClose}
        message={snackMessage}
      />
      <PostEditDialog open={openEdit} setOpen={setOpenEdit} post={post} />
    </div>
  );
};

export default PostActionDropDown;
