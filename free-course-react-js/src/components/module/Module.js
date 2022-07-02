import {
  Article,
  Assignment,
  ClearAll,
  DeleteRounded,
  EditRounded,
  SlowMotionVideoRounded,
} from "@mui/icons-material";
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { millisecondsToMinutes, millisecondsToSeconds } from "date-fns";

const Module = (props) => {
  const {
    component,
    type = "default",
    editMode,
    title,
    href,
    time,
    active,
    disabled,
  } = props;
  const navigate = useNavigate();
  const styles = {
    box: {
      padding: (theme) => theme.spacing(0.5, 1.5, 0.5, 1.2),
      minHeight: 50,
      borderRadius: 0.8,
      "&:hover p": {
        color: (theme) => theme.palette.primary.main,
      },
      borderLeft: "3px solid transparent",
      "&:hover": {
        backgroundColor: (theme) => theme.palette.hover.main + "60",
        borderLeft: (theme) => "3px solid " + theme.palette.primary.main,
      },
      mb: 0.4,
    },
    content: {
      color: (theme) => theme.palette.text.main,
      marginRight: 1,
      cursor: "pointer",
    },
  };
  let Icon;
  switch (type) {
    case "video":
      Icon = SlowMotionVideoRounded;
      break;
    case "document":
      Icon = Article;
      break;
    case "test":
      Icon = Assignment;
      break;
    default:
      Icon = ClearAll;
      break;
  }

  const setColor = (type) => {
    switch (type) {
      case "video":
        return (theme) => theme.palette.tomato.main;
      case "document":
        return (theme) => theme.palette.primary.main;
      case "test":
        return (theme) => theme.palette.puple.main;
      default:
        return null;
    }
  };

  return (
    <ListItemButton
      component={component}
      sx={styles.box}
      disableGutters
      selected={active}
      disabled={disabled}
      {...(!editMode && { onClick: () => navigate(href) })}
    >
      <ListItemIcon sx={{ minWidth: 40 }}>
        <Icon
          fontSize="medium"
          sx={{
            color: setColor(type),
          }}
        />
      </ListItemIcon>
      <div className="flex flex-row w-full justify-between ">
        <div className="grow relative">
          <Typography
            className="absolute left-0 right-0 w-full top-[50%]"
            style={{
              transform: "translateY(-50%)",
              whiteSpace: "normal",
            }}
            sx={styles.content}
            variant="body2"
          >
            {title}
          </Typography>
        </div>
        <div className="flex flex-row items-center flex-shrink-0">
          <Typography sx={styles.content} variant="body2">
            {millisecondsToMinutes(time)}:
            {(
              millisecondsToSeconds(time) -
              millisecondsToMinutes(time) * 60 +
              "0"
            ).substring(0, 2)}
          </Typography>
          {editMode && (
            <>
              <IconButton color="primary">
                <EditRounded />
              </IconButton>
              <IconButton color="tomato">
                <DeleteRounded />
              </IconButton>
            </>
          )}
        </div>
      </div>
    </ListItemButton>
  );
};

export default Module;
