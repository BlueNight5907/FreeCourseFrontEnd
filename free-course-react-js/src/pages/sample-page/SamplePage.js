import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { TOGGLE_PAGE_MODE } from "../../store/types/page-types/setting-types";

function SamplePage() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({ type: TOGGLE_PAGE_MODE });
  };
  return (
    <div>
      <Box
        sx={{
          width: 500,
          height: 5000,
          backgroundColor: (theme) => theme.palette.foreground.main,
        }}
      >
        hello
      </Box>
      <Button variant="contained" onClick={handleClick}>
        Click
      </Button>
    </div>
  );
}

export default SamplePage;
