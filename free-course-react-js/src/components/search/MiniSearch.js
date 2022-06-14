import { alpha, InputBase, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid " + theme.palette.text2.main,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  cursor: "pointer",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  color: theme.palette.text.main + "99",
  height: "100%",
  position: "absolute",
  top: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "100%",
  color: theme.palette.text.main + "99",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    cursor: "pointer",
  },
}));

const MiniSearch = (props) => {
  const { onChange, onClick, title, width, maxWidth } = props;
  return (
    <Search
      sx={{
        width: width,
        maxWidth: maxWidth,
      }}
      onClick={!onChange ? (onClick ? onClick : null) : onChange}
    >
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        disabled={!onChange ? (onClick ? true : false) : false}
        placeholder={title}
        inputProps={{ "aria-label": "search" }}
        onChange={onChange && onChange}
      />
    </Search>
  );
};

export default MiniSearch;
