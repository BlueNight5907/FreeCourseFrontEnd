import {
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
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DELETE_COMMENT_REQUEST } from "store/types/data-types/blog-type";

const CommentActionDropDown = (props) => {
  const { post, user, comment, setListComment } = props;
  const dispatch = useDispatch();

  const owned = comment?.accountId === user._id;
  const [snackMessage, setSnackMessage] = useState("");

  // Copy link
  const [openSnack, setOpenSnack] = useState(false);

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

  // Delete post
  const handleDeleteComment = () => {
    setListComment((current) =>
      current.filter((cmt) => {
        return cmt._id !== comment._id;
      })
    );
    dispatch({
      type: DELETE_COMMENT_REQUEST,
      postId: post._id,
      commentId: comment._id,
    });
    handleActionClose();
  };

  const handleEditComment = () => {
    console.log({ comment, post, user });
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
            <MenuItem onClick={handleEditComment}>
              <ListItemIcon>
                <EditRounded />
              </ListItemIcon>
              <Typography fontWeight={500}>Chỉnh sửa</Typography>
            </MenuItem>
            <MenuItem onClick={handleDeleteComment}>
              <ListItemIcon>
                <DeleteRounded />
              </ListItemIcon>
              <Typography fontWeight={500}>Xóa bình luận</Typography>
            </MenuItem>
          </div>
        ) : (
          <MenuItem onClick={handleEditComment}>
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
      </Menu>
      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleClose}
        message={snackMessage}
      />
    </div>
  );
};

export default CommentActionDropDown;
