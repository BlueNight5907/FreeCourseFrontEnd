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

const Module = (props) => {
  const { component, type = "default", mode, title } = props;
  const styles = {
    box: {
      padding: (theme) => theme.spacing(0.5, 1.5, 0.5, 1.2),
      borderRadius: 0.8,
      "&:hover p": {
        color: (theme) => theme.palette.primary.main,
      },
      borderLeft: "3px solid transparent",
      "&:hover": {
        backgroundColor: (theme) => theme.palette.hover.main + "60",
        borderLeft: (theme) => "3px solid " + theme.palette.primary.main,
      },
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
    <ListItem
      component={component}
      sx={styles.box}
      disableGutters
      disablePadding
    >
      <ListItemIcon>
        <Icon
          fontSize="medium"
          sx={{
            color: setColor(type),
          }}
        />
      </ListItemIcon>
      <div className="flex flex-row w-full justify-between items-center">
        <Typography sx={styles.content} className="grow" variant="body2">
          {title}
        </Typography>
        <div className="flex flex-row items-center">
          <Typography sx={styles.content} variant="body2">
            11:20
          </Typography>
          <IconButton color="primary">
            <EditRounded />
          </IconButton>
          <IconButton color="tomato">
            <DeleteRounded />
          </IconButton>
        </div>
      </div>
    </ListItem>
  );
};

export default Module;
