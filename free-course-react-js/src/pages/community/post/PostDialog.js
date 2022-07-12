import {
  useTheme,
  styled,
  Dialog as MuiDialog,
  DialogContent,
  DialogActions as MuiDialogActions,
  DialogTitle,
  Typography,
  Box,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import UserCard from "components/user-card/UserCard";
import viLocale from "date-fns/locale/vi";
import CommentField from "./CommentField";
import { useState } from "react";
import Comment from "components/comment/Comment2";

const DialogActions = styled(MuiDialogActions)(({ theme }) => ({
  display: "inline",
  padding: theme.spacing(0, 0.6),
}));

const PostDialog = (props) => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  const {
    openCommentDialog,
    setOpenCommentDialog,
    creatorData,
    post,
    comments,
    user,
  } = props;

  const theme = useTheme();
  const [listComment, setListComment] = useState(comments || []);

  return (
    <MuiDialog
      sx={{
        "& .MuiDialog-paper": { height: 700 },
      }}
      open={openCommentDialog}
      setOpen={() => setOpenCommentDialog(true)}
      onClose={() => setOpenCommentDialog(false)}
      scroll={"paper"}
      {...(isMobile
        ? { fullScreen: true }
        : { fullWidth: true, maxWidth: "lg" })}
    >
      <DialogTitle sx={{ background: theme.palette.foreground.main }}>
        <UserCard
          name={creatorData.userInformation.fullName}
          subtitle={formatDistanceToNow(new Date(post.createdAt), {
            locale: viLocale,
            addSuffix: true,
          })}
          avatar={creatorData.userInformation.avatar}
          subLink={"/community/post/" + post._id}
        />
      </DialogTitle>
      <DialogContent
        sx={{ background: theme.palette.background.main }}
        dividers={true}
      >
        {listComment.length > 0 ? (
          listComment.map((comment, index) => (
            <Comment key={index} data={comment} post={post} user={user} />
          ))
        ) : (
          <Box display="flex" justifyContent="center">
            <Typography>Chưa có bình luận</Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ background: theme.palette.foreground.main }}>
        <CommentField
          id={post._id}
          setListComment={setListComment}
          listComment={listComment}
        />
      </DialogActions>
    </MuiDialog>
  );
};

export default PostDialog;
