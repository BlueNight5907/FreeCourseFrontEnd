import React, { useCallback, useEffect, useRef, useState } from "react";
import { CameraAltOutlined as ImageIcon } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  styled,
  Popover,
  Paper,
  LinearProgress,
} from "@mui/material";
import Button from "components/button/Button";
import TextField from "components/text-field/TextField";
import { Icon } from "@iconify/react";
import EmojiPicker from "emoji-picker-react";
import { POST_COMMENT_REQUEST } from "store/types/data-types/blog-type";
import { useDispatch } from "react-redux";

const InputWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 0.6),
}));

const CommentField = (props) => {
  const theme = useTheme();
  const { id, setListComment, listComment } = props;
  const iconStyle = {
    default: {
      color: theme.palette.basicText,
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

  const dispatch = useDispatch();

  // Comment + emoji
  const [commentText, setCommentText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(null);

  const handleOpenEmojiPicker = (e) => {
    setShowEmojiPicker(e.currentTarget);
  };

  const handleCloseEmojiPicker = () => {
    setShowEmojiPicker(null);
  };

  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const imageRef = useRef(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleCommentImage = (e) => {
    const file = e.target.files[0];
    if (!file?.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.onloadstart = () => {
        setIsLoading(true);
      };
      fileReader.onprogress = (data) => {
        if (data.lengthComputable) {
          console.log(progress);
          setProgress(parseInt((data.loaded / data.total) * 100, 10));
        }
      };
      fileReader.onloadend = () => {
        setIsLoading(false);
      };
      fileReader.readAsDataURL(file);
    } else {
      setFileDataURL();
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file, progress]);

  const updateListComment = useCallback(
    (comment) => {
      setListComment([...listComment, comment]);
    },
    [setListComment, listComment]
  );
  const handleComment = () => {
    dispatch({
      type: POST_COMMENT_REQUEST,
      postId: id,
      content: commentText,
      image: file,
      callback: updateListComment,
    });
    setCommentText("");
    if (file && fileDataURL) {
      setFile();
      setFileDataURL();
    }
  };

  useEffect(() => {
    if (listComment) {
      console.log(listComment);
    }
  }, [listComment]);

  const openEmojiPicker = Boolean(showEmojiPicker);
  return (
    <Box>
      <Paper
        sx={{
          ...(!fileDataURL && { display: "none" }),
          width: "180px",
          height: "100px",
          position: "relative",
          backgroundImage: `url(${fileDataURL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          margin: theme.spacing(0.8, 0),
        }}
        elevation={0}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: -6,
            right: -6,
            padding: 0,
          }}
          title="Xóa ảnh"
          onClick={() => {
            setFile();
            setFileDataURL();
          }}
        >
          <Icon
            icon="ion:close-circle"
            style={{ color: theme.palette.tomato.main }}
          />
        </IconButton>
        <input
          type="file"
          hidden
          ref={imageRef}
          accept=".png, .jpg, .jpeg"
          onChange={handleCommentImage}
          onClick={(e) => {
            e.target.value = null;
          }}
        />
      </Paper>
      {isLoading && (
        <LinearProgress
          sx={{ borderRadius: 5 }}
          variant="determinate"
          value={progress}
        />
      )}
      <Divider />
      <InputWrapper>
        <IconButton onClick={handleOpenEmojiPicker}>
          <Icon icon="ant-design:smile-outlined" style={iconStyle.default} />
        </IconButton>
        <Popover
          open={openEmojiPicker}
          onClose={handleCloseEmojiPicker}
          anchorEl={showEmojiPicker}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <EmojiPicker
            onEmojiClick={(e, emoji) => {
              setCommentText((text) => text + emoji.emoji);
            }}
          />
        </Popover>
        <TextField
          padding={theme.spacing(0.2, 0)}
          placeholder="Bình luận cho bài viết..."
          border={false}
          value={commentText}
          fullWidth
          multiline
          onChange={(e) => {
            setCommentText(e.target.value);
          }}
        />
        <IconButton title="Thêm ảnh" onClick={() => imageRef.current.click()}>
          <ImageIcon sx={iconStyle.default} />
          {/* <input
            type="file"
            hidden
            ref={null}
            accept=".png, .jpg, .jpeg"
            onChange={null}
          /> */}
        </IconButton>
        <Button disabled={commentText ? false : true} onClick={handleComment}>
          <Typography
            variant="subtitle1"
            fontWeight={600} /*fontFamily="monospace"*/
          >
            Gửi
          </Typography>
        </Button>
      </InputWrapper>
    </Box>
  );
};

export default CommentField;
