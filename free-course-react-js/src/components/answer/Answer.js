import { Avatar, Box, Checkbox, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

const Answer = (props) => {
  const {
    type = "radio",
    value,
    onClick,
    answer,
    error,
    success,
    disable,
    index,
  } = props;
  const [mode, setMode] = useState("default");

  useEffect(() => {
    if (error) {
      setMode("error");
    } else if (success) {
      setMode("success");
    } else if (value && answer === value) {
      setMode("checked");
    } else {
      setMode("default");
    }
  }, [value, answer, error, success]);

  const setColor = (mode) => {
    switch (mode) {
      case "error":
        return (theme) => theme.palette.tomato.main;
      case "success":
        return (theme) => theme.palette.mintygreen.main;
      case "checked":
        return (theme) => theme.palette.primary.main;
      default:
        return (theme) => theme.palette.background.main;
    }
  };

  const styles = {
    box: {
      padding: (theme) => theme.spacing(0.8, 1),
      gap: 1,
      borderRadius: 1,
      cursor: "pointer",
      "&:hover": {
        backgroundColor: (theme) => theme.palette.select.main,
      },
      ...(mode !== "default" && {
        backgroundColor: (theme) => theme.palette.foreground.main,
        borderWidth: 1,
        borderColor: setColor(mode),
        borderStyle: "solid",
      }),
    },
    content: {
      color: mode !== "default" && setColor(mode),
    },
    answer: {
      ...(mode !== "default" && {
        color: (theme) => theme.palette.foreground.main,
        backgroundColor: setColor(mode),
      }),
    },
    checkbox: {
      ...(mode !== "default" && {
        color: setColor(mode),
      }),
    },
  };
  return (
    <Box sx={styles.box} className="flex flex-row" onClick={onClick && onClick}>
      {type === "radio" ? (
        <Avatar sx={styles.answer}>A</Avatar>
      ) : (
        <Checkbox
          onChange={onClick && onClick}
          checked={value && value === answer}
          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
        />
      )}
      <Box sx={styles.content} className="flex flex-row items-center">
        Mot con vit xoe ra 3 con than lan
      </Box>
    </Box>
  );
};

export default Answer;
