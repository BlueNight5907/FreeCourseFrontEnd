import { IconButton } from "@mui/material";
import React from "react";

function QuestionIcon(props) {
  const { children, size, sx, status, actived, flag, onClick, ...others } =
    props;
  const style = {
    width: size ? size : 35,
    height: size ? size : 35,
    fontSize: size ? (size * 2) / 5 : (35 * 2) / 5,
    fontWeight: 500,
    ...(actived && {
      border: (theme) =>
        "1px solid " +
        (flag
          ? theme.palette.warning.main
          : status === "fill"
          ? theme.palette.primary.main
          : status === "lack"
          ? theme.palette.tomato.main
          : status === "success"
          ? theme.palette.mintygreen.main
          : theme.palette.primary.main),
    }),
    backgroundColor: (theme) =>
      actived
        ? theme.palette.foreground.main
        : flag
        ? theme.palette.warning.main
        : status === "fill"
        ? theme.palette.primary.main
        : status === "lack"
        ? theme.palette.tomato.main
        : status === "success"
        ? theme.palette.mintygreen.main
        : theme.palette.subbackground.main,
    color: (theme) =>
      actived
        ? theme.palette.text.primary
        : status === "fill" || status === "lack" || flag || status === "success"
        ? "#fff"
        : theme.palette.text.primary,
    "&:hover": {
      backgroundColor: (theme) =>
        flag
          ? theme.palette.warning.dark
          : status === "fill"
          ? theme.palette.primary.dark
          : status === "lack"
          ? theme.palette.tomato.dark
          : status === "success"
          ? theme.palette.success.main
          : theme.palette.subbackground.dark,
      color: (theme) =>
        status === "fill" || status === "lack" || flag || status === "success"
          ? "#fff"
          : theme.palette.text.primary,
    },
  };
  return (
    <IconButton
      sx={{
        ...style,
        ...sx,
      }}
      onClick={onClick}
      {...others}
    >
      {children}
    </IconButton>
  );
}

export default QuestionIcon;
