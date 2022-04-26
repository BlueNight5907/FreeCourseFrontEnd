export const textEllipse = (line) => {
  return {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "line",
    overflow: "hidden",
  };
};

export const centerItems = () => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
};

export const scrollSetting = (
  options = {
    overflowX: "hidden",
    overflowY: "overlay",
    width: 8,
    scrollThumbColor: (theme) => theme.palette.shadow.main + "50",
  }
) => {
  return {
    overflowX: options.overflowX,
    overflowY: options.overflowY,
    height: "100%",
    "&::-webkit-scrollbar": {
      WebkitAppearance: "none",
    },
    "&::-webkit-scrollbar:vertical": {
      width: options.width,
    },

    "&::-webkit-scrollbar-thumb": {
      backgroundColor: options.scrollThumbColor,
      borderRadius: 1,
    },
  };
};
