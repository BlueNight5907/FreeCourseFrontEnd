import { Box, Paper, Typography, useTheme } from "@mui/material";
import React from "react";

const Wrapper = ({
  elevation,
  actions,
  title,
  children,
  flex,
  rounded = 1,
  sx,
  titleVariant,
  titleIcon,
  flexDirection,
  BoxProps,
  marginY,
  ...others
}) => {
  const theme = useTheme();
  const styles = {
    paper: {
      flexGrow: 1,
      marginY: marginY,
      backgroundColor: theme.palette.foreground.main,
      display: "flex",
      flexDirection: "column",
      padding: {
        md: 2,
        xs: 1,
      },
      gap: 2,
      ...(!title && {
        display: flex && "flex",
        height: "inherit",
        flexDirection: flexDirection,
      }),
      borderRadius: rounded,
      ...sx,
    },
    box: {
      display: flex && "flex",
      flexGrow: 1,
      flexDirection: flexDirection,
      position: "relative",
      gap: 2,
    },
  };
  return (
    <Paper {...others} sx={styles.paper} elevation={elevation}>
      {title || actions ? (
        <>
          <Box className="flex flex-row items-center justify-between mb-1">
            <Typography
              variant={titleVariant || "h5"}
              display="flex"
              alignItems="center"
              gap={1}
              ml={0.2}
            >
              {titleIcon}
              {title}
            </Typography>
            {actions}
          </Box>
          <Box sx={styles.box} {...BoxProps}>
            {children}
          </Box>
        </>
      ) : (
        children
      )}
    </Paper>
  );
};

export default Wrapper;
