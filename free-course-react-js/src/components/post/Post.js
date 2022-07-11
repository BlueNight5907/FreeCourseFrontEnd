import React, { useEffect, useState } from "react";
import {
  Bookmark,
  BookmarkBorderOutlined,
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
  ImportContactsOutlined,
  ImportContactsRounded,
  LaunchOutlined,
  OpenInFullOutlined,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions as MuiCardActions,
  CardContent as MuiCardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  useTheme,
  styled,
  Divider,
  Snackbar,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { format, formatDistanceToNow } from "date-fns";
import UserCard from "components/user-card/UserCard";

import Caption from "components/caption/Caption";
import PostActionDropDown from "containers/dropdowns/post-action-dropdown/PostActionDropDown";
import { useDispatch, useSelector } from "react-redux";
import { GET_ACCOUNT_INFORMATION } from "store/types/data-types/common-types";
import viLocale from "date-fns/locale/vi";
import PostDialog from "pages/community/post/PostDialog";
import { LIKE_BLOG } from "store/types/data-types/blog-type";
import { useNavigate } from "react-router-dom";
const CardActions = styled(MuiCardActions)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

const CardContent = styled(MuiCardContent)(({ theme }) => ({
  padding: theme.spacing(0, 1.6),
}));

const Post = ({ post }) => {
  const {
    _id,
    title,
    createdAt,
    backgroundUrl,
    description,
    content,
    comments,
    likes,
    creator,
  } = post;
  let { like } = post;
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { sideOpen } = useSelector((state) => state.setting);

  const iconStyle = {
    default: {
      color: theme.palette.text3,
      fontSize: theme.typography.pxToRem(34),
    },
    action: {
      love: {
        color: theme.palette.tomato.main,
        fontSize: theme.typography.pxToRem(34),
      },
      mark: {
        color: theme.palette.warning.main,
        fontSize: theme.typography.pxToRem(34),
      },
    },
  };

  // Creator data
  const [creatorData, setCreatorData] = useState({
    id: "",
    email: "",
    userInformation: {
      fullName: "",
      avatar: "",
    },
  });

  useEffect(() => {
    if (creator) {
      dispatch({
        type: GET_ACCOUNT_INFORMATION,
        accountId: creator,
        callback: (data) => setCreatorData(data),
      });
    }
    // console.log(likes);
    // console.log("Id:", user._id);
    // console.log();
  }, [creator, dispatch, setCreatorData]);

  // Like react
  const [likeNum, setLikeNum] = useState(likes.length);
  const [isLiked, setIsLike] = useState(likes.indexOf(user._id) !== -1);
  const toggleLike = () => {
    setIsLike(!isLiked);
    setLikeNum(isLiked ? likeNum - 1 : likeNum + 1);
    dispatch({ type: LIKE_BLOG, id: _id });
  };

  // Mark
  const [isMarked, setIsMark] = useState(false);
  const toggleMark = () => {
    setIsMark(!isMarked);
  };

  const [openSnack, setOpenSnack] = React.useState(false);

  const handleClick = () => {
    navigator.clipboard
      .writeText(`http://localhost:3000/community/post/${_id}`)
      .then(() => {
        setOpenSnack(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };
  const [openCommentDialog, setOpenCommentDialog] = useState(false);

  return (
    <Card
      elevation={0}
      sx={{
        margin: theme.spacing(2, 0),
        width: {
          lg: sideOpen ? 700 : 800,
          sm: sideOpen ? 600 : 700,
        },
        backgroundColor: theme.palette.foreground.main,
      }}
    >
      <CardHeader
        avatar={
          <UserCard
            name={creatorData.userInformation.fullName}
            subtitle={formatDistanceToNow(new Date(createdAt), {
              locale: viLocale,
              addSuffix: true,
            })}
            avatar={creatorData.userInformation.avatar}
            subLink={`/community/post/${_id}`}
          />
        }
        action={<PostActionDropDown />}
      />
      {backgroundUrl && <CardMedia component="img" image={backgroundUrl} />}
      <CardActions>
        <Box>
          <IconButton onClick={toggleLike}>
            {isLiked ? (
              <Favorite sx={iconStyle.action.love} />
            ) : (
              <FavoriteBorder sx={iconStyle.default} />
            )}
          </IconButton>

          <IconButton onClick={() => setOpenCommentDialog(true)}>
            <ChatBubbleOutline sx={iconStyle.default} />
          </IconButton>
          <IconButton
            onClick={() => {
              navigate(`/community/post/${_id}`);
            }}
          >
            <LaunchOutlined sx={iconStyle.default} />
          </IconButton>
          <IconButton onClick={handleClick}>
            {/* <SendOutlined sx={iconStyle.default} /> */}
            <Icon icon="bx:share-alt" style={iconStyle.default} />
          </IconButton>
        </Box>

        <IconButton onClick={toggleMark}>
          {isMarked ? (
            <Bookmark sx={iconStyle.action.mark} />
          ) : (
            <BookmarkBorderOutlined sx={iconStyle.default} />
          )}
        </IconButton>
      </CardActions>

      <CardContent sx={{ padding: theme.spacing(1, 1.6) }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {likeNum} {likeNum > 2 ? "likes" : "like"}
        </Typography>
        <Caption caption={description} />
      </CardContent>
      <Divider />
      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Sao chép địa chỉ thành công"
      />
      <PostDialog
        openCommentDialog={openCommentDialog}
        setOpenCommentDialog={setOpenCommentDialog}
        creatorData={creatorData}
        post={post}
        comments={comments}
        user={user}
      />
    </Card>
  );
};

export default Post;
