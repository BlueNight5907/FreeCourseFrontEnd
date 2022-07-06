import { Box } from "@mui/material";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { getRandomItem } from "../../utils/array-utils";
import colors from "../../utils/colors";
function Tag(props) {
  const { children, width, height, href, sx, ...others } = props;
  const color = useMemo(() => getRandomItem(colors), []);
  const style = {
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 3,
    paddingRight: 3,
    width: width && width,
    height: height || 45,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    backgroundColor: color,
    borderRadius: 1,
    cursor: "pointer",
    boxSizing: "border-box",
  };
  return (
    <Box
      sx={{
        ...style,
        ...sx,
      }}
      {...others}
    >
      {href ? <Link to={href}>{children}</Link> : children}
    </Box>
  );
}

export default Tag;
