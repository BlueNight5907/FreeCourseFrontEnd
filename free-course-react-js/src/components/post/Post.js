import React, { useEffect, useState } from "react";
import {
  Bookmark,
  BookmarkBorderOutlined,
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
  FavoriteBorderRounded,
  MoreHoriz,
  SendOutlined,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions as MuiCardActions,
  CardContent as MuiCardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  Typography,
  useTheme,
  styled,
  Tooltip,
  Divider,
  Snackbar,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { format, subDays } from "date-fns";
import UserCard from "components/user-card/UserCard";
import TextField from "components/text-field/TextField";
import Button from "components/button/Button";
import Caption from "components/caption/Caption";
import PostActionDropDown from "containers/dropdowns/post-action-dropdown/PostActionDropDown";
import { useDispatch } from "react-redux";
import { GET_ACCOUNT_INFORMATION } from "store/types/data-types/common-types";

const CardActions = styled(MuiCardActions)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

const CardContent = styled(MuiCardContent)(({ theme }) => ({
  padding: theme.spacing(0, 1.6),
}));

const InputWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 0.6),
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

  const iconStyle = {
    default: {
      color: "#000",
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

  // Like react
  const [likeNum, setLikeNum] = useState(likes.length);
  const [isLiked, setIsLike] = useState(false);
  const toggleLike = () => {
    setIsLike(!isLiked);
    setLikeNum(isLiked ? likeNum - 1 : likeNum + 1);
  };

  // Mark
  const [isMarked, setIsMark] = useState(false);
  const toggleMark = () => {
    setIsMark(!isMarked);
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
  }, [creator, dispatch]);

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
  return (
    <Card
      elevation={0}
      sx={{
        margin: theme.spacing(2, 0),
        width: 600,
        backgroundColor: theme.palette.foreground.main,
      }}
    >
      <CardHeader
        avatar={
          <UserCard
            name={creatorData.userInformation.fullName}
            subtitle={/*format(subDays(createdAt, 0), "dd/MM/yyyy")*/ createdAt}
            avatar={creatorData.userInformation.avatar}
            subLink={"/community/post/" + _id}
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

          <IconButton>
            <ChatBubbleOutline sx={iconStyle.default} />
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

      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {likeNum} {likeNum > 2 ? "likes" : "like"}
        </Typography>
        <Caption caption={description} />
      </CardContent>
      <Divider />
      <InputWrapper>
        <IconButton>
          <Icon icon="ant-design:smile-outlined" style={iconStyle.default} />
        </IconButton>
        <TextField
          padding={theme.spacing(0.2, 0)}
          placeholder="Bình luận cho bài viết..."
          border={false}
          fullWidth
        />
        <Button>
          <Typography variant="subtitle1" fontFamily="monospace">
            Gửi
          </Typography>
        </Button>
      </InputWrapper>
      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Sao chép địa chỉ thành công"
      />
    </Card>
  );
};

export default Post;
