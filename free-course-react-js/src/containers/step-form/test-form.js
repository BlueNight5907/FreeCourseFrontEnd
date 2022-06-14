import { Box, Slide } from "@mui/material";
import Button from "components/button/Button";
import React from "react";

const TestForm = ({ goBack, open }) => {
  return (
    <Slide direction="right" in={open}>
      <Box className="h-full w-full relative flex items-center justify-center gap-4">
        LessonForm
        <Button onClick={goBack}>Quay lại</Button>
      </Box>
    </Slide>
  );
};

export default TestForm;
