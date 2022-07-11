import { CameraAltOutlined as ImageIcon } from "@mui/icons-material";
import {
  Paper,
  Typography,
  useTheme,
  styled,
  Dialog as MuiDialog,
  DialogContent,
  DialogActions as MuiDialogActions,
  DialogTitle,
} from "@mui/material";
import Button from "components/button/Button";
import { format, formatDistanceToNow } from "date-fns";
import UserCard from "components/user-card/UserCard";
import viLocale from "date-fns/locale/vi";
import Image from "components/image/Image";
import { Icon } from "@iconify/react";
import CommentField from "./CommentField";
import { useEffect, useState } from "react";
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

  // useEffect(() => {
  //   if (comments) {
  //     setListComment(comments);
  //   }
  // }, [comments]);
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
        {listComment.map((comment, index) => (
          <Comment key={index} data={comment} user={user} />
        ))}
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
