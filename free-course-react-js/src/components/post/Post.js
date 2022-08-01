import React, { useEffect, useState, useRef } from "react";
import {
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
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
  Button,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { differenceInDays, format, formatDistanceToNow } from "date-fns";
import UserCard from "components/user-card/UserCard";
import Caption from "components/caption/Caption";
import PostActionDropDown from "containers/dropdowns/post-action-dropdown/PostActionDropDown";
import { useDispatch, useSelector } from "react-redux";
import { GET_ACCOUNT_INFORMATION } from "store/types/data-types/common-types";
import viLocale from "date-fns/locale/vi";
import PostDialog from "pages/community/post/PostDialog";
import { LIKE_BLOG } from "store/types/data-types/blog-type";
import { useNavigate } from "react-router-dom";
import { useObserver } from "hooks/useObserver";
const CardActions = styled(MuiCardActions)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

const CardContent = styled(MuiCardContent)(({ theme }) => ({
  padding: theme.spacing(0, 1.6),
}));

const Post = ({ post, isLast, nextPage }) => {
  const {
    _id,
    title,
    createdAt,
    backgroundUrl,
    description,
    comments,
    likes,
    creator,
  } = post;
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const postRef = useRef();
  const entry = useObserver(postRef, { rootMargin: "50px" });

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
  }, [creator, dispatch, setCreatorData]);

  useEffect(() => {
    if (!entry) return;
    if (isLast && entry.isIntersecting) {
      nextPage();
    }
  }, [postRef, isLast, entry]);

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

  // Copy link
  const [openSnack, setOpenSnack] = useState(false);

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
        backgroundColor: theme.palette.foreground.main,
        width: "100%",
      }}
      ref={postRef}
    >
      <CardHeader
        avatar={
          <UserCard
            name={creatorData.userInformation.fullName}
            subtitle={
              differenceInDays(new Date(), new Date(createdAt)) <= 3
                ? formatDistanceToNow(new Date(createdAt), {
                    locale: viLocale,
                    addSuffix: true,
                  })
                : format(new Date(createdAt), "dd/MM/yyyy HH:mm:ss")
              //differenceInDays(new Date(), new Date(createdAt))
            }
            avatar={creatorData.userInformation.avatar}
            subLink={`/community/post/${_id}`}
          />
        }
        action={
          <PostActionDropDown
            post={post}
            user={user}
            isMarked={isMarked}
            setIsMark={setIsMark}
          />
        }
      />
      {backgroundUrl && <CardMedia component="img" image={backgroundUrl} />}
      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Sao chép địa chỉ thành công"
      />
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
          <IconButton onClick={handleClick}>
            <Icon icon="bx:share-alt" style={iconStyle.default} />
          </IconButton>
        </Box>
        <Button
          onClick={() => {
            navigate(`/community/post/${_id}`);
          }}
        >
          <Typography
            fontSize="15px"
            fontWeight={500}
            color={theme.palette.text.main}
          >
            Chi tiết
          </Typography>
        </Button>
      </CardActions>
      {/* <Divider /> */}
      <CardContent
        sx={{ padding: theme.spacing(0, 1.6), paddingBottom: "0 !important" }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {likeNum} {likeNum > 1 ? "likes" : "like"}
        </Typography>
        <Divider />
        <Box padding={theme.spacing(1, 0)}>
          <Typography fontWeight="bold">{title}</Typography>
          <Caption caption={description} />
        </Box>
      </CardContent>
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
