import { Box, Paper, Typography, useTheme } from "@mui/material";
import React from "react";

const Wrapper = (props) => {
  const {
    elevation,
    actions,
    title,
    children,
    flex,
    rounded = 1,
    sx,
    titleVariant,
    flexDirection,
    marginY,
    ...others
  } = props;
  const theme = useTheme();
  const styles = {
    paper: {
      flexGrow: 1,
      marginY: marginY,
      backgroundColor: theme.palette.foreground.main,
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
      height: "inherit",
      flexDirection: flexDirection,
      gap: 2,
    },
  };
  return (
    <Paper {...others} sx={styles.paper} elevation={elevation}>
      {title ? (
        <>
          <Box className="flex flex-row items-center justify-between mb-5">
            <Typography variant={titleVariant || "h5"} className=" ml-3">
              {title}
            </Typography>
            {actions}
          </Box>
          <Box sx={styles.box}>{children}</Box>
        </>
      ) : (
        children
      )}
    </Paper>
  );
};

export default Wrapper;
