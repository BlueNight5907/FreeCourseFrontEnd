import React from "react";
import { Button as MuiButton } from "@mui/material";

const specialBackground = {
  red: (theme) => theme.palette.special_red.main,
  blue: (theme) => theme.palette.special_blue.main,
  puple: (theme) => theme.palette.special_puple.main,
};

export const buttonBg = {
  red: "red",
  blue: "blue",
  puple: "puple",
};

function Button(props) {
  const {
    children,
    width,
    startIcon,
    endIcon,
    specialBg,
    height,
    sx,
    disabled = false,
    iconNearEdge = true,
    ...others
  } = props;

  const style = {
    width: width && width,
    height: height || 40,
    borderRadius: 1,
    textTransform: "unset",
    paddingTop: 1,
    paddingBottom: 1,
    gap: 0.8,
    background: specialBg && specialBackground[specialBg],

    "& .button-content": {
      flexGrow: 1,
    },
    "& .MuiButton-startIcon": {
      marginRight: 0,
    },
    "& .MuiButton-endIcon": {
      marginLeft: 0,
    },
  };
  return (
    <MuiButton
      sx={{
        ...style,
        ...sx,
      }}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      {...others}
    >
      {iconNearEdge ? (
        <>{children}</>
      ) : (
        <div className="button-content">{children}</div>
      )}
    </MuiButton>
  );
}

export default Button;
