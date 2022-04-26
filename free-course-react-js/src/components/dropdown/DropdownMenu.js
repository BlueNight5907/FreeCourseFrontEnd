import { Paper } from "@mui/material";
import React from "react";

function DropdownMenu(props) {
  const {
    children,
    maxWidth,
    width,
    height,
    title,
    toggleDropdown,
    open,
    sx,
    shadow,
    maxHeight,
    minHeight,
    direction = "auto",
    ...others
  } = props;

  const setMenuPosition = (direction) => {
    let option;
    switch (direction) {
      case "left":
        option = {
          top: "120%",
          left: 0,
          right: "auto",
        };
        break;
      case "right":
        option = {
          top: "120%",
          left: "auto",
          right: 0,
        };
        break;
      default:
        option = {
          top: "120%",
          left: "auto",
          right: "-350%",
        };
    }
    return option;
  };

  const style = {
    maxWidth: maxWidth || "unset",
    minWidth: "100%",
    width: width,
    height: height,
    maxHeight: maxHeight || "unset",
    minHeight: minHeight || "unset",
    overflowX: "hidden",
    hoverflowY: "auto",
    padding: (theme) => theme.spacing(1.5, 0),
    "& ul": {
      display: "flex",
      flexDirection: "column",
      gap: 0.1,
      overflowX: "hidden",
      overflowY: "overlay",
      height: "100%",
      padding: (theme) => theme.spacing(0, 1.5),
      "&::-webkit-scrollbar": {
        WebkitAppearance: "none",
      },
      "&::-webkit-scrollbar:vertical": {
        width: 8,
      },

      "&::-webkit-scrollbar-thumb": {
        backgroundColor: (theme) => theme.palette.shadow.main + "50",
        borderRadius: 1,
      },
    },
    borderRadius: 1,
    zIndex: 100,
    transition: "all 0.5s ease-in-out",
    visibility: "hidden",
    opacity: 0,
    "&.open": {
      visibility: "visible",
      opacity: 1,
    },
    backgroundColor: (theme) => theme.palette.foreground.main,
    ...setMenuPosition(direction),
  };

  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        toggleDropdown,
        open: open,
      });
    }
    return child;
  });

  return (
    <Paper
      elevation={shadow}
      sx={{
        ...style,
        ...sx,
      }}
      {...others}
      className={"absolute flex flex-col " + (open ? "open" : "")}
    >
      {title}
      <ul>{childrenWithProps}</ul>
    </Paper>
  );
}

export default DropdownMenu;
