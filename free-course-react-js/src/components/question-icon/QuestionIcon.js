import { IconButton } from "@mui/material";
import React from "react";

function QuestionIcon(props) {
  const { children, size, sx, fill, lack, flag, onClick, ...others } = props;
  const style = {
    width: size ? size : 35,
    height: size ? size : 35,
    fontSize: size ? (size * 2) / 5 : (35 * 2) / 5,
    fontWeight: 500,
    backgroundColor: (theme) =>
      fill
        ? theme.palette.primary.main
        : lack
        ? theme.palette.tomato.main
        : flag
        ? theme.palette.warning.main
        : theme.palette.subbackground.main,
    color: (theme) =>
      fill || lack || flag ? "#fff" : theme.palette.text.primary,
    "&:hover": {
      backgroundColor: (theme) =>
        fill
          ? theme.palette.primary.dark
          : lack
          ? theme.palette.tomato.dark
          : flag
          ? theme.palette.warning.dark
          : theme.palette.subbackground.dark,
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
