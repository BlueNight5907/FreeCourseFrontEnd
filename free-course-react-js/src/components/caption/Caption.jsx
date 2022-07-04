import React, { useState } from "react";
import { Typography, useTheme } from "@mui/material";

const Caption = ({ caption }) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const [captionText, setCaptionText] = useState(caption || "");
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
      {
        /* {isReadMore && caption.length > 100 ? caption : caption.slice(0, 100)} */
        captionText.length < 100
          ? captionText
          : isReadMore
          ? captionText
          : captionText.slice(0, 100)
      }
      <Typography
        component="span"
        className="font-semibold cursor-pointer"
        onClick={toggleReadMore}
      >
        {" "}
        {captionText.length < 100 ? "" : isReadMore ? "less" : "...more"}
      </Typography>
    </Typography>
  );
};

export default Caption;
