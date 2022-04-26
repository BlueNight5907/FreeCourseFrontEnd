import { Box, ListItem, ListItemButton } from "@mui/material";
import React, { useState } from "react";

function DropdownItem(props) {
  const {
    children,
    sx,
    toggleDropdown,
    component,
    disabledClick,
    selected,
    disabled = false,
    ...others
  } = props;

  const style = {
    borderRadius: 1,
    ...(selected && {
      backgroundColor: (theme) => theme.palette.select.main,
    }),
    "&:hover": {
      backgroundColor: (theme) => theme.palette.select.main,
    },
    padding: (theme) => theme.spacing(1),
  };

  return (
    <ListItem
      component={component}
      {...others}
      disabled={disabled}
      disablePadding
      className="relative"
    >
      {disabledClick ? (
        <Box
          sx={{
            ...style,
            ...sx,
          }}
        >
          {children}
        </Box>
      ) : (
        <ListItemButton
          sx={{
            ...style,
            ...sx,
          }}
        >
          {children}
        </ListItemButton>
      )}
    </ListItem>
  );
}

export default DropdownItem;
