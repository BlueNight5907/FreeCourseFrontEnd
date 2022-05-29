import { Avatar, Box, Checkbox } from "@mui/material";
import React, { useState, useEffect } from "react";

const Answer = (props) => {
  const {
    type = "radio",
    value,
    onClick,
    answer,
    error,
    success,
    disabled,
  } = props;
  const [mode, setMode] = useState("default");
  useEffect(() => {
    if (error) {
      setMode("error");
    } else if (success) {
      setMode("success");
    } else if (value && (answer === value || value.includes(answer))) {
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
      ...(mode !== "default"
        ? {
            backgroundColor: (theme) => theme.palette.foreground.main,
            borderWidth: 1,
            borderColor: setColor(mode),
            borderStyle: "solid",
          }
        : {
            "&:hover": {
              backgroundColor: (theme) => theme.palette.select.main,
            },
            borderWidth: 1,
            borderColor: (theme) => theme.palette.foreground.main,
            borderStyle: "solid",
          }),
    },
    content: {
      color: mode !== "default" && setColor(mode),
    },
    answer: {
      ...(mode !== "default" && {
        color: "#fff",
        border: "1px solid #fff",
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
    <Box
      sx={styles.box}
      className="flex flex-row"
      onClick={() => !disabled && onClick(answer)}
    >
      {type === "radio" ? (
        <Avatar sx={styles.answer}>A</Avatar>
      ) : (
        <Checkbox
          disabled={disabled}
          checked={value ? (value.includes(answer) ? true : false) : false}
          onChange={() => {}}
          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
        />
      )}
      <Box sx={styles.content} className="content flex flex-row items-center">
        {answer}
      </Box>
    </Box>
  );
};

export default Answer;
