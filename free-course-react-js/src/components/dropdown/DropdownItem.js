import { Box, ListItem, ListItemButton } from "@mui/material";
import React, { useState } from "react";

function DropdownItem(props) {
  const {
    children,
    sx,
    toggleDropdown,
    component,
    square,
    disabledClick,
    selected,
    disabled = false,
    hover,
    ...others
  } = props;

  const style = {
    borderRadius: square ? 0 : 1,
    ...(selected && {
      backgroundColor: (theme) => theme.palette.select.main,
    }),
    "&:hover": {
      backgroundColor: (theme) => theme.palette.hover.main,
      "": {
        borderRadius: square ? 0 : 1,
      },
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
          onClick={() => toggleDropdown()}
        >
          {children}
        </ListItemButton>
      )}
    </ListItem>
  );
}

export default DropdownItem;
