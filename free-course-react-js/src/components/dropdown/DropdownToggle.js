import { ArrowDropDownRounded } from "@mui/icons-material";

import React from "react";
import Button from "../button/Button";

function DropdownToggle(props) {
  const {
    children,
    sx,
    component,
    toggleIcon,
    render,
    onClick,
    className,
    ...others
  } = props;
  let Toggle = Button;

  if (render) {
    Toggle = render;
    return <Toggle toggleDropdown={onClick} sx={sx} {...others} />;
  }

  if (component) {
    Toggle = component;
  }
  let endIcon = <ArrowDropDownRounded sx={{ fontSize: 40 }} />;
  if (toggleIcon) {
    endIcon = toggleIcon;
  }

  return (
    <Toggle
      sx={sx}
      onClick={onClick}
      {...others}
      endIcon={endIcon}
      className={"relative " + className}
    >
      {children}
    </Toggle>
  );
}

export default DropdownToggle;
