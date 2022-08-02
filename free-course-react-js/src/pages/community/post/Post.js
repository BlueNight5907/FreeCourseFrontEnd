import React, { useEffect, useState } from "react";
import { Divider, Paper, Typography, Box, useTheme, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GET_BLOG_REQUEST } from "store/types/data-types/blog-type";
import UserCard from "components/user-card/UserCard";
import CommentField from "./CommentField";
import Comment from "components/comment/Comment2";
import FeatureCourseSlide from "containers/courses-slide/FeatureCourseSlide";
import { format } from "date-fns";

const Post = (props) => {
  const theme = useTheme();
  const { id } = useParams();
  const { post } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch({ type: GET_BLOG_REQUEST, id });
  }, [id, dispatch]);

  const [listComment, setListComment] = useState([]);

  useEffect(() => {
    if (post?.comments) {
      setListComment(post?.comments);
    }
  }, [post, setListComment]);
  return (
    <Grid container spacing={2} minHeight={0}>
      <Grid item xs={12}>
        <Paper
          elevation={0}
          sx={{
            margin: theme.spacing(1, 0, 0, 0),
            display: "flex",
            flexDirection: "column",
            padding: theme.spacing(2, 4),
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <UserCard
              name={post?.creator && post.creator.userInformation.fullName}
              avatar={post?.creator && post.creator.userInformation.avatar}
            />
          </Box>
          <Divider sx={{ margin: theme.spacing(2, 0) }} />
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h2" fontSize={45} fontWeight={700}>
                {post?.title && post.title}
              </Typography>
              <Typography variant="h6" fontSize={13} fontWeight={400}>
                {"Đã đăng vào " +
                  (post?.createdAt &&
                    format(new Date(post.createdAt), "dd/MM/yyyy HH:mm:ss"))}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper
          elevation={0}
          sx={{
            padding: theme.spacing(1.5, 4),
            lineHeight: 1.8,
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: post?.content }}></div>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={0}>
          <Box padding={theme.spacing(2, 3)}>
            <Typography variant="h6" fontWeight={500}>
              Bình luận
            </Typography>
            <CommentField
              id={post?._id}
              setListComment={setListComment}
              listComment={listComment}
            />
            <Divider />
          </Box>

          <Box padding={theme.spacing(2, 3)}>
            {listComment.length > 0 ? (
              listComment.map((comment, index) => (
                <Comment
                  key={index}
                  data={comment}
                  post={post}
                  user={user}
                  setListComment={setListComment}
                />
              ))
            ) : (
              <Box display="flex" justifyContent="center">
                <Typography>Chưa có bình luận</Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <FeatureCourseSlide />
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
};

export default Post;
