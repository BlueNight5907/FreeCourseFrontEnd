import { useTheme } from "@emotion/react";

import {
  ListItemIcon,
  MenuItem as MuiMenuItem,
  ListItemText,
  Chip,
  useMediaQuery,
  Box,
  Typography,
  Divider,
} from "@mui/material";

import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MenuItem = ({
  selected,
  icon: Icon,
  primary,
  secondary,
  badge,
  onClick,
  href,
  children,
  type,
  title,
  additional,
  menuItemStyle,
  textStyle,
}) => {
  const { sideOpen } = useSelector((state) => state.setting);
  const theme = useTheme();
  const matchMd = useMediaQuery(theme.breakpoints.up("md"));
  const styles = {
    menuItem: {
      height: 50,
      borderRadius: 1,
      opacity: selected ? 1 : 0.9,
      mb: 0.5,
      ...additional,
    },
    listItemText: {
      color: (theme) =>
        selected ? theme.palette.primary.main : theme.palette.text2.main,
      "& .MuiListItemText-primary": {
        fontWeight: 400,
        fontSize: 18,
      },
    },
    chip: {
      padding: (theme) => theme.spacing(0.3, 0.3),
      color: (theme) => theme.palette.tomato.main,
      background: (theme) => theme.palette.foreground.main,
      height: "unset",
    },
    icon: {
      color: (theme) =>
        selected ? theme.palette.primary.main : theme.palette.text2.main,
    },
  };
  const navigate = useNavigate();
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      navigate(href);
    }
  };

  if (children) {
    return (
      <MuiMenuItem
        sx={{
          ...styles.menuItem,
          height: "unset",
        }}
        selected={selected}
        onClick={handleClick}
      >
        {children}
      </MuiMenuItem>
    );
  }

  if (type === "divider") {
    return (
      <Box
        sx={{
          display: sideOpen ? "flex" : "none",
          gap: 1,
          alignItems: "center",
          width: "100%",
          padding: (theme) => theme.spacing(1, 0),
          ...additional,
        }}
      >
        {title && <Typography variant="caption">{title}</Typography>}
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
    );
  }

  return (
    <MuiMenuItem
      sx={{
        ...styles.menuItem,
        ...menuItemStyle,
      }}
      selected={selected}
      onClick={handleClick}
    >
      {Icon && (
        <ListItemIcon
          sx={{
            ...styles.icon,
            ...textStyle,
          }}
        >
          <Icon />
        </ListItemIcon>
      )}
      {(sideOpen || !matchMd) && (
        <>
          <ListItemText
            sx={{
              ...styles.listItemText,
              ...textStyle,
            }}
            primary={primary}
            secondary={secondary}
          />
          {badge && <Chip label={badge} sx={styles.chip} />}
        </>
      )}
    </MuiMenuItem>
  );
};

export default MenuItem;
