import React, { useState } from "react";
import { Typography, useTheme } from "@mui/material";

const Caption = ({ caption }) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const theme = useTheme();

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <Typography
      paragraph
      sx={{
        margin: theme.spacing(1, 0),
      }}
    >
      {isReadMore ? caption : caption.slice(0, 100)}
      <Typography
        component="span"
        className="font-semibold cursor-pointer"
        onClick={toggleReadMore}
      >
        {" "}
        {isReadMore ? "less" : "...more"}
      </Typography>
    </Typography>
  );
};

export default Caption;
