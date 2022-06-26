import React, { useState } from "react";
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
} from "@mui/material";
import { Icon } from "@iconify/react";
import { format, subDays } from "date-fns";
import UserCard from "components/user-card/UserCard";
import TextField from "components/text-field/TextField";
import Button from "components/button/Button";
import Caption from "components/caption/Caption";
import PostActionDropDown from "containers/dropdowns/post-action-dropdown/PostActionDropDown";

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
  const { username, createDate, avatar, media, caption, id } = post;
  let { like } = post;
  const theme = useTheme();

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
  const [likeNum, setLikeNum] = useState(like);
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
            name={username}
            subtitle={format(subDays(createDate, 0), "dd/MM/yyyy")}
            avatar={avatar}
            subLink={"/community/post/" + id}
          />
        }
        action={<PostActionDropDown />}
      />
      <CardMedia component="img" image={media} />
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

          <IconButton>
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
        <Caption caption={caption} />
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
    </Card>
  );
};

export default Post;
