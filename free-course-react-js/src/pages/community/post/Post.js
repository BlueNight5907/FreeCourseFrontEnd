import React, { useEffect, useRef, useState } from "react";
import {
  AppBar,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
  Box,
  useTheme,
  Grid,
  useMediaQuery,
  Stack,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GET_BLOG_REQUEST } from "store/types/data-types/blog-type";
import Image from "components/image/Image";

const Post = (props) => {
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.up("sm"));
  const matchMd = useMediaQuery(theme.breakpoints.up("md"));
  const { id } = useParams();
  const { post } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_BLOG_REQUEST, id });
  }, [id, dispatch]);

  // useEffect(() => {
  //   if (post) {
  //     console.log("hello world");
  //     console.log(post);
  //   }
  // }, [post]);
  return (
    <Grid container spacing={2} minHeight={0}>
      <Grid item xs={12}>
        <Typography variant="h4">{post?.title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Image
          src={post?.backgroundUrl}
          alt="course"
          style={{ objectFit: "cover" }}
          border={"0.5px solid #d1d7dc"}
          sx={{
            width: matchSm ? 260 : 80,
            height: matchSm ? 145 : 80,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Stack>
          <Typography>{post?.creator.userInformation.fullName}</Typography>
          <Typography>{post?.createdAt}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <div dangerouslySetInnerHTML={{ __html: post?.content }}></div>
      </Grid>
    </Grid>
  );
};

export default Post;
