import React, { useEffect, useState } from "react";
import { Box, Dialog, Slide, Stack, Typography } from "@mui/material";
import Button from "components/button/Button";
import {
  ArrowBackIosRounded,
  Assignment,
  PlayLesson,
} from "@mui/icons-material";
import Transition from "components/transition/Transition";
import LessonForm from "./lesson-form";
import TestForm from "./test-form";

const StepFormDialog = ({ open, setOpen, moduleData }) => {
  const [stepType, setStepType] = useState("");
  const [direction, setDirection] = useState("up");
  const goBack = () => setStepType("");

  useEffect(() => {
    stepType === "lesson" && setDirection("right");
    stepType === "test" && setDirection("left");
  }, [stepType]);

  return (
    <Dialog
      fullScreen
      open={open}
      TransitionComponent={Transition}
      TransitionProps={{ direction: "up" }}
      PaperProps={{ sx: { bgcolor: "background.main", overflowX: "hidden" } }}
    >
      {stepType === "" && (
        <Slide direction={direction} in={stepType === ""}>
          <Box className="h-full w-full relative flex items-center justify-center gap-4">
            <Button
              onClick={() => setOpen(false)}
              className="absolute"
              startIcon={<ArrowBackIosRounded />}
              sx={{ top: 10, left: 10 }}
            >
              Quay lại
            </Button>
            <Stack gap={1} p={2}>
              <Typography variant="h6">
                Chọn loại nội dung mà bạn muốn tạo
              </Typography>
              <Stack className="flex-row gap-2">
                <Button
                  className="grow shrink-0"
                  color="secondary"
                  variant="contained"
                  startIcon={<Assignment />}
                  onClick={() => setStepType("test")}
                >
                  Bài kiểm tra
                </Button>
                <Button
                  startIcon={<PlayLesson />}
                  className="grow shrink-0"
                  variant="contained"
                  onClick={() => setStepType("lesson")}
                >
                  Bài học
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Slide>
      )}
      {stepType === "lesson" && (
        <LessonForm goBack={goBack} open={stepType === "lesson"} />
      )}
      {stepType === "test" && (
        <TestForm goBack={goBack} open={stepType === "test"} />
      )}
    </Dialog>
  );
};

export default StepFormDialog;
